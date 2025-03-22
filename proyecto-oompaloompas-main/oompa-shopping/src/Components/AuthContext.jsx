import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { config } from '../config/config';

const AuthContext = createContext({});

const api = axios.create({
  baseURL: config.BACKEND_URL,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadStoredAuth = () => {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        setUser({
          email: parsedUser.email,
          role: parsedUser.role
        });
      }
      
      setInitialized(true);
      checkUser();
    };

    loadStoredAuth();
  }, []);

  const checkUser = async () => {
    try {
      const response = await api.get('/auth/session');
      if (response.data.success) {
        const userData = response.data.data.user;
        const profileData = response.data.data.profile;
        
        const minimalUserData = {
          email: userData.email,
          role: userData.role
        };

        setUser(minimalUserData);
        setProfile(profileData);
        
        localStorage.setItem('user', JSON.stringify(minimalUserData));
      } else {
        clearStoredAuth();
      }
    } catch (error) {
      clearStoredAuth();
    } finally {
      setLoading(false);
    }
  };

  const clearStoredAuth = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    localStorage.removeItem('cartItems')
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        const userData = response.data.data.user;
        const profileData = response.data.data.profile;
        
        const minimalUserData = {
          email: userData.email,
          role: userData.role
        };

        setUser(minimalUserData);
        setProfile(profileData);

        localStorage.setItem('user', JSON.stringify(minimalUserData));
        localStorage.setItem('profile', JSON.stringify(profileData));
        return true;
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      clearStoredAuth();
    } catch (error) {
      console.error('Logout error:', error);
      clearStoredAuth();
    }
  };

  if (!initialized) {
    return null;
  }

  const value = {
    user,
    profile,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};