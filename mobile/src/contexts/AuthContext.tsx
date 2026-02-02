import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '../services/ApiClient';
import { IAuthLogin, User } from '../types';
import { storage } from '../utils/storage';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (credentials: IAuthLogin) => Promise<void>;
  signup: (credentials: IAuthLogin) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await storage.getToken();
      if (token) {
        const savedUser = await storage.getUser();
        if (savedUser) {
          setUser(savedUser);
        }
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: IAuthLogin) => {
    try {
      const response = await apiClient.login(credentials);
      await storage.setToken(response.token);
      await storage.setUser(response.user);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (credentials: IAuthLogin) => {
    try {
      const response = await apiClient.signup(credentials);
      await storage.setToken(response.token);
      await storage.setUser(response.user);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await storage.clear();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
