'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const currentUserJson = localStorage.getItem('currentUser');
    if (currentUserJson) {
      try {
        const currentUser = JSON.parse(currentUserJson);
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to parse current user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const usersJson = localStorage.getItem('hospital_users');
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('rememberEmail', email);
      }
    } catch (error) {
      throw error;
    }
  };

  const signup = async (name: string, email: string, phone: string, password: string) => {
    try {
      const usersJson = localStorage.getItem('hospital_users');
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];

      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        throw new Error('Email already registered');
      }

      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('hospital_users', JSON.stringify(users));
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update in hospital_users as well
    const usersJson = localStorage.getItem('hospital_users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('hospital_users', JSON.stringify(users));
    }
  };

  const resetPassword = async (email: string, newPassword: string) => {
    try {
      const usersJson = localStorage.getItem('hospital_users');
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];

      const userIndex = users.findIndex((u) => u.email === email);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      users[userIndex].password = newPassword;
      localStorage.setItem('hospital_users', JSON.stringify(users));

      if (user?.email === email) {
        const updatedUser = { ...users[userIndex] };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
