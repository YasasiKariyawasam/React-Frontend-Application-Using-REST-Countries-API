import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function UserProfile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex items-center gap-4">
      <span>Welcome, {user?.username}</span>
      <button
        onClick={logout}
        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}