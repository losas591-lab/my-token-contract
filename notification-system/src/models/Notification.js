const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['sms', 'email', 'push'],
    required: true,
  },
  channel: {
    type: String,
    enum: ['sms', 'email'],
    required: true,
  },
  recipient: {
    type: String,
    required: true, // Phone number or email address
  },
  subject: String,
  content: {
    type: String,
    required: true,
  },
  maskedData: {
    // Store only masked version (e.g., last 4 digits of account)
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed', 'bounced'],
    default: 'pending',
  },
  error: String,
  deliveryProvider: {
    type: String,
    enum: ['twilio', 'sendgrid', 'nodemailer'],
  },
  externalMessageId: String,
  deliveredAt: Date,
  readAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 90 * 24 * 60 * 60 * 1000), // 90 days retention
  },
});

// TTL index for automatic deletion
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Notification', notificationSchema);
