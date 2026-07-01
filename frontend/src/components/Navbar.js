import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Flash Notifications</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FiUser className="text-gray-600" size={20} />
          <span className="text-gray-700 font-medium">{user?.username}</span>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-secondary flex items-center gap-2"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
