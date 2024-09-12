import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, logout } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    if (!user) {
      logout();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
