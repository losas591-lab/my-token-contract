import React, { useEffect, useState } from 'react';
import { notificationAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FiFilter, FiDownload } from 'react-icons/fi';

function NotificationHistory() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterChannel, setFilterChannel] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterStatus, filterChannel, notifications]);

  const fetchNotifications = async () => {
    try {
      const response = await notificationAPI.getHistory();
      setNotifications(response.data.data);
    } catch (error) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = notifications;

    if (filterStatus !== 'all') {
      filtered = filtered.filter((n) => n.status === filterStatus);
    }

    if (filterChannel !== 'all') {
      filtered = filtered.filter((n) => n.channel === filterChannel);
    }

    setFilteredNotifications(filtered);
  };

  const exportToCSV = () => {
    const headers = ['Type', 'Recipient', 'Status', 'Sent Date', 'Delivered Date'];
    const data = filteredNotifications.map((n) => [
      n.channel.toUpperCase(),
      n.recipient,
      n.status,
      new Date(n.createdAt).toLocaleString(),
      n.deliveredAt ? new Date(n.deliveredAt).toLocaleString() : 'N/A',
    ]);

    const csv = [
      headers.join(','),
      ...data.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notifications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('File downloaded successfully!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Notification History</h1>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 flex-wrap">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field max-w-xs"
            >
              <option value="all">All Statuses</option>
              <option value="sent">Sent</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
              <option value="bounced">Bounced</option>
            </select>
            <select
              value={filterChannel}
              onChange={(e) => setFilterChannel(e.target.value)}
              className="input-field max-w-xs"
            >
              <option value="all">All Channels</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </select>
          </div>
          <button
            onClick={exportToCSV}
            className="btn btn-secondary flex items-center gap-2"
          >
            <FiDownload size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <p className="text-gray-600 text-center py-8">Loading...</p>
        ) : filteredNotifications.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No notifications found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300 bg-gray-50">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Recipient</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Sent</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Delivered</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Message ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotifications.map((notification) => (
                  <tr key={notification._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {notification.channel.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{notification.recipient}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          notification.status === 'sent'
                            ? 'bg-green-100 text-green-800'
                            : notification.status === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : notification.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {notification.status.charAt(0).toUpperCase() +
                          notification.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">
                      {notification.deliveredAt
                        ? new Date(notification.deliveredAt).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm font-mono text-xs">
                      {notification.externalMessageId
                        ? notification.externalMessageId.substring(0, 8) + '...'
                        : '-'}
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

export default NotificationHistory;
