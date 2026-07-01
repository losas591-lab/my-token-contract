import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { notificationAPI } from '../services/api';
import { FiMail, FiPhone } from 'react-icons/fi';

function SendNotification() {
  const [channel, setChannel] = useState('sms');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [maskedData, setMaskedData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (channel === 'sms') {
        await notificationAPI.sendSMS({
          to: recipient,
          message,
          maskedData,
        });
        toast.success('SMS sent successfully!');
      } else {
        await notificationAPI.sendEmail({
          to: recipient,
          subject,
          htmlContent: message,
          maskedData,
        });
        toast.success('Email sent successfully!');
      }

      // Reset form
      setRecipient('');
      setSubject('');
      setMessage('');
      setMaskedData('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send notification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Send Notification</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <form onSubmit={handleSend} className="space-y-6">
              {/* Channel Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Channel
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="sms"
                      checked={channel === 'sms'}
                      onChange={(e) => setChannel(e.target.value)}
                      className="w-4 h-4"
                    />
                    <FiPhone className="text-blue-600" />
                    <span className="font-medium">SMS</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="email"
                      checked={channel === 'email'}
                      onChange={(e) => setChannel(e.target.value)}
                      className="w-4 h-4"
                    />
                    <FiMail className="text-blue-600" />
                    <span className="font-medium">Email</span>
                  </label>
                </div>
              </div>

              {/* Recipient */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {channel === 'sms' ? 'Phone Number' : 'Email Address'}
                </label>
                <input
                  type={channel === 'sms' ? 'tel' : 'email'}
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="input-field"
                  placeholder={channel === 'sms' ? '+1234567890' : 'recipient@example.com'}
                  required
                />
              </div>

              {/* Subject (Email only) */}
              {channel === 'email' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="input-field"
                    placeholder="Email subject"
                    required
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-field resize-none h-32"
                  placeholder="Enter your notification message..."
                  required
                />
              </div>

              {/* Masked Data */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Masked Data (e.g., ••••1234)
                </label>
                <input
                  type="text"
                  value={maskedData}
                  onChange={(e) => setMaskedData(e.target.value)}
                  className="input-field"
                  placeholder="••••1234"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  This is the masked version of sensitive information for the audit log
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Notification'}
              </button>
            </form>
          </div>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Best Practices</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Never send full account numbers</li>
              <li>• Always mask sensitive data</li>
              <li>• Keep messages concise</li>
              <li>• Include contact info for support</li>
              <li>• Use clear, professional language</li>
            </ul>
          </div>

          <div className="card bg-green-50 border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">✅ Example Masked Data</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>Account: ••••1234</li>
              <li>Card: ••••5678</li>
              <li>Phone: +1 (***) ***-1234</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendNotification;
