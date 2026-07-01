const express = require('express');
const authMiddleware = require('../middleware/auth');
const smsService = require('../services/smsService');
const emailService = require('../services/emailService');
const User = require('../models/User');
const Notification = require('../models/Notification');
const router = express.Router();

/**
 * Send SMS notification
 * POST /notifications/send-sms
 */
router.post('/send-sms', authMiddleware, async (req, res) => {
  try {
    const { to, message, maskedData } = req.body;

    // Validate input
    if (!to || !message || !maskedData) {
      return res.status(400).json({
        success: false,
        message: 'Phone number, message, and masked data are required',
      });
    }

    // Get user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check user preferences
    if (!user.preferences.smsNotifications) {
      return res.status(403).json({
        success: false,
        message: 'SMS notifications are disabled for this user',
      });
    }

    // Send SMS
    const result = await smsService.sendSMS({
      to,
      content: message,
      maskedData,
      user,
    });

    res.json({
      success: true,
      message: 'SMS sent successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send SMS',
      error: error.message,
    });
  }
});

/**
 * Send Email notification
 * POST /notifications/send-email
 */
router.post('/send-email', authMiddleware, async (req, res) => {
  try {
    const { to, subject, htmlContent, maskedData } = req.body;

    // Validate input
    if (!to || !subject || !htmlContent || !maskedData) {
      return res.status(400).json({
        success: false,
        message: 'Email, subject, content, and masked data are required',
      });
    }

    // Get user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check user preferences
    if (!user.preferences.emailNotifications) {
      return res.status(403).json({
        success: false,
        message: 'Email notifications are disabled for this user',
      });
    }

    // Send email
    const result = await emailService.sendEmail({
      to,
      subject,
      htmlContent,
      maskedData,
      user,
    });

    res.json({
      success: true,
      message: 'Email sent successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message,
    });
  }
});

/**
 * Get notification history
 * GET /notifications/history
 */
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notification history',
      error: error.message,
    });
  }
});

/**
 * Update user notification preferences
 * PATCH /notifications/preferences
 */
router.patch('/preferences', authMiddleware, async (req, res) => {
  try {
    const { smsNotifications, emailNotifications, pushNotifications } =
      req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        preferences: {
          smsNotifications:
            smsNotifications !== undefined
              ? smsNotifications
              : user.preferences.smsNotifications,
          emailNotifications:
            emailNotifications !== undefined
              ? emailNotifications
              : user.preferences.emailNotifications,
          pushNotifications:
            pushNotifications !== undefined
              ? pushNotifications
              : user.preferences.pushNotifications,
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: user.preferences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update preferences',
      error: error.message,
    });
  }
});

module.exports = router;
