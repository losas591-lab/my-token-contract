import React, { useEffect, useState } from 'react';
import { FiSend, FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi';
import { notificationAPI } from '../services/api';
import { toast } from 'react-toastify';

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    sent: 0,
    failed: 0,
    pending: 0,
  });
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await notificationAPI.getHistory();
      const notifications = response.data.data;
      setRecentNotifications(notifications.slice(0, 5));

      // Calculate stats
      const stats = {
        total: notifications.length,
        sent: notifications.filter((n) => n.status === 'sent').length,
        failed: notifications.filter((n) => n.status === 'failed').length,
        pending: notifications.filter((n) => n.status === 'pending').length,
      };
      setStats(stats);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className={`card border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <Icon size={40} className="text-gray-300" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiSend}
          label="Total Notifications"
          value={stats.total}
          color="border-blue-500"
        />
        <StatCard
          icon={FiCheckCircle}
          label="Successfully Sent"
          value={stats.sent}
          color="border-green-500"
        />
        <StatCard
          icon={FiAlertCircle}
          label="Failed"
          value={stats.failed}
          color="border-red-500"
        />
        <StatCard
          icon={FiClock}
          label="Pending"
          value={stats.pending}
          color="border-yellow-500"
        />
      </div>

      {/* Recent Notifications */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Notifications</h2>
        {loading ? (
          <p className="text-gray-600 text-center py-8">Loading...</p>
        ) : recentNotifications.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No notifications yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Recipient</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentNotifications.map((notification) => (
                  <tr key={notification._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {notification.channel.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{notification.recipient}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          notification.status === 'sent'
                            ? 'bg-green-100 text-green-800'
                            : notification.status === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {notification.status.charAt(0).toUpperCase() +
                          notification.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
