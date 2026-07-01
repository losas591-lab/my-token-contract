import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiSend,
  FiHistory,
  FiSettings,
  FiBell,
} from 'react-icons/fi';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/send', label: 'Send Notification', icon: FiSend },
    { path: '/history', label: 'History', icon: FiHistory },
    { path: '/preferences', label: 'Preferences', icon: FiSettings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <FiBell size={28} />
          <span className="text-2xl font-bold">Notify</span>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-100 hover:bg-blue-700'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
