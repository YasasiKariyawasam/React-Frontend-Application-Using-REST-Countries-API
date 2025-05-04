import { useState } from 'react';

export default function UserAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    // In a real app, you would verify credentials with a backend
    setIsLoggedIn(true);
    setUser({ username });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-4">
        <span>Welcome, {user.username}</span>
        <button 
          onClick={handleLogout}
          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} className="flex gap-2">
      <input 
        type="text" 
        name="username" 
        placeholder="Username" 
        className="px-2 py-1 border rounded"
        required
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        className="px-2 py-1 border rounded"
        required
      />
      <button 
        type="submit"
        className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Login
      </button>
    </form>
  );
}