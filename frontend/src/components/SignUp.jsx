import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    signUp({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      favoriteCountries: []
    });
    
    navigate('/'); // Redirect to home after signup
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Create Account
        </button>
      </form>
      
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <button 
          onClick={() => navigate('/login')} 
          className="text-green-500 hover:underline"
        >
          Log In
        </button>
      </p>
    </div>
  );
}