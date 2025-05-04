import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usersDB, setUsersDB] = useState([]); // For storing all users

  // Initialize from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedUsers = localStorage.getItem('usersDB');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedUsers) setUsersDB(JSON.parse(storedUsers));
  }, []);

  // Sign up new user
  const signUp = (userData) => {
    const newUsersDB = [...usersDB, userData];
    setUsersDB(newUsersDB);
    localStorage.setItem('usersDB', JSON.stringify(newUsersDB));
    login(userData); // Auto-login after signup
  };

  // Login existing user
  const login = (credentials) => {
    const foundUser = usersDB.find(
      u => u.username === credentials.username && u.password === credentials.password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, usersDB, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};