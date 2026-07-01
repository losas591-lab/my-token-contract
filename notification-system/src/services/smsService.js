const twilio = require('twilio');
const Notification = require('../models/Notification');

class SMSService {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    this.phoneNumber = process.env.TWILIO_PHONE_NUMBER;
  }

  /**
   * Send SMS notification with masked data
   * @param {Object} options - SMS options
   * @param {string} options.to - Recipient phone number
   * @param {string} options.content - Message content
   * @param {string} options.maskedData - Masked sensitive info (e.g., ••••1234)
   * @param {Object} options.user - User object for logging
   */
  async sendSMS({ to, content, maskedData, user }) {
    try {
      // Validate phone number format
      if (!this.isValidPhoneNumber(to)) {
        throw new Error('Invalid phone number format');
      }

      // Create notification record BEFORE sending
      const notification = new Notification({
        userId: user._id,
        type: 'sms',
        channel: 'sms',
        recipient: to,
        content: content,
        maskedData: maskedData,
        status: 'pending',
        deliveryProvider: 'twilio',
      });

      // Send SMS via Twilio
      const message = await this.client.messages.create({
        body: content,
        from: this.phoneNumber,
        to: to,
      });

      // Update notification with delivery info
      notification.externalMessageId = message.sid;
      notification.status = 'sent';
      notification.deliveredAt = new Date();
      await notification.save();

      console.log(`SMS sent successfully to ${to}: ${message.sid}`);
      return {
        success: true,
        messageId: message.sid,
        notificationId: notification._id,
      };
    } catch (error) {
      console.error('SMS sending error:', error);

      // Log failed notification
      if (notification) {
        notification.status = 'failed';
        notification.error = error.message;
        await notification.save();
      }

      throw new Error(`SMS sending failed: ${error.message}`);
    }
  }

  /**
   * Validate phone number format (E.164)
   */
  isValidPhoneNumber(phone) {
    const e164Regex = /^\+?[1-9]\d{1,14}$/;
    return e164Regex.test(phone.replace(/\D/g, ''));
  }

  /**
   * Mask sensitive data for SMS (keep last 4 chars)
   */
  maskSensitiveData(data) {
    if (data.length <= 4) return '****';
    return '•'.repeat(data.length - 4) + data.slice(-4);
  }
}

module.exports = new SMSService();
