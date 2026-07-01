const nodemailer = require('nodemailer');
const Notification = require('../models/Notification');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  /**
   * Send Email notification with masked data
   * @param {Object} options - Email options
   * @param {string} options.to - Recipient email
   * @param {string} options.subject - Email subject
   * @param {string} options.htmlContent - HTML email body
   * @param {string} options.maskedData - Masked sensitive info
   * @param {Object} options.user - User object for logging
   */
  async sendEmail({ to, subject, htmlContent, maskedData, user }) {
    try {
      // Validate email format
      if (!this.isValidEmail(to)) {
        throw new Error('Invalid email format');
      }

      // Create notification record BEFORE sending
      const notification = new Notification({
        userId: user._id,
        type: 'email',
        channel: 'email',
        recipient: to,
        subject: subject,
        content: htmlContent,
        maskedData: maskedData,
        status: 'pending',
        deliveryProvider: 'nodemailer',
      });

      // Send email
      const info = await this.transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to: to,
        subject: subject,
        html: htmlContent,
      });

      // Update notification with delivery info
      notification.externalMessageId = info.messageId;
      notification.status = 'sent';
      notification.deliveredAt = new Date();
      await notification.save();

      console.log(`Email sent successfully to ${to}: ${info.messageId}`);
      return {
        success: true,
        messageId: info.messageId,
        notificationId: notification._id,
      };
    } catch (error) {
      console.error('Email sending error:', error);

      // Log failed notification
      if (notification) {
        notification.status = 'failed';
        notification.error = error.message;
        await notification.save();
      }

      throw new Error(`Email sending failed: ${error.message}`);
    }
  }

  /**
   * Validate email format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Generate masked account HTML template
   */
  generateAccountAlertTemplate(accountType, maskedAccount, action, timestamp) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; }
          .content { background: #f3f4f6; padding: 20px; margin: 10px 0; }
          .alert { color: #dc2626; font-weight: bold; }
          .masked { font-weight: bold; color: #0066cc; }
          .footer { color: #6b7280; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Account Alert</h2>
          </div>
          <div class="content">
            <p>Dear Customer,</p>
            <p>A <span class="alert">${action}</span> has occurred on your account:</p>
            <ul>
              <li><strong>Account Type:</strong> ${accountType}</li>
              <li><strong>Account Number:</strong> <span class="masked">${maskedAccount}</span></li>
              <li><strong>Time:</strong> ${timestamp}</li>
            </ul>
            <p>If this was not you, please contact our support team immediately.</p>
          </div>
          <div class="footer">
            <p>© 2026 Your Bank. This is an automated message, please do not reply.</p>
            <p>For security inquiries: support@yourbank.com | 1-800-XXX-XXXX</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();
