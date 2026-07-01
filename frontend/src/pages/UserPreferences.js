import React, { useState, useEffect } from 'react';
import { notificationAPI } from '../services/api';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/authStore';

function UserPreferences() {
  const { user } = useAuthStore();
  const [preferences, setPreferences] = useState({
    smsNotifications: true,
    emailNotifications: true,
    pushNotifications: false,
  });
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (user) {
      setPreferences(user.preferences || preferences);
    }
  }, [user]);

  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await notificationAPI.updatePreferences(preferences);
      toast.success('Preferences updated successfully!');
      setHasChanges(false);
    } catch (error) {
      toast.error('Failed to update preferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Notification Preferences</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preferences Form */}
        <div className="lg:col-span-2">
          <div className="card space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Channel Preferences</h2>

              {/* SMS Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800">SMS Notifications</h3>
                  <p className="text-sm text-gray-600 mt-1">Receive alerts via SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.smsNotifications}
                    onChange={() => handleToggle('smsNotifications')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Email Notifications</h3>
                  <p className="text-sm text-gray-600 mt-1">Receive alerts via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Push Notifications</h3>
                  <p className="text-sm text-gray-600 mt-1">Receive browser push alerts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.pushNotifications}
                    onChange={() => handleToggle('pushNotifications')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={!hasChanges || loading}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => {
                  setPreferences(user?.preferences || preferences);
                  setHasChanges(false);
                }}
                disabled={!hasChanges}
                className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">📱 About Preferences</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Control how you receive notifications</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Changes save automatically</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Enable/disable channels anytime</span>
              </li>
            </ul>
          </div>

          <div className="card bg-amber-50 border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-3">⚠️ Important</h3>
            <p className="text-sm text-amber-800">
              Disabling all notification channels may prevent you from receiving critical alerts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPreferences;
