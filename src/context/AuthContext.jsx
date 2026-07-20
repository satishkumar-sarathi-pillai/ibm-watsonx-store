import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('wx_current_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const getUsers = () => {
    const data = localStorage.getItem('wx_users');
    return data ? JSON.parse(data) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem('wx_users', JSON.stringify(users));
  };

  const register = ({ firstName, lastName, email, password }) => {
    const users = getUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: `user_${Date.now()}`,
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      createdAt: new Date().toISOString()
    };

    saveUsers([...users, newUser]);
    return { success: true };
  };

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) {
      return { success: false, message: 'Incorrect email or password. Please try again.' };
    }

    const sessionUser = {
      id: found.id,
      firstName: found.firstName,
      lastName: found.lastName,
      email: found.email
    };

    setUser(sessionUser);
    localStorage.setItem('wx_current_user', JSON.stringify(sessionUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wx_current_user');
  };

  const resetPassword = (email, newPassword) => {
    const users = getUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());

    if (idx === -1) {
      return { success: false, message: 'No account found with this email address.' };
    }

    users[idx].password = newPassword;
    saveUsers(users);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
