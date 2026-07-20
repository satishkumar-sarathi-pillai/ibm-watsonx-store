import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f4f4f4' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ width: 48, height: 48, border: '4px solid #e0e0e0', borderTopColor: '#0062ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#525252', fontFamily: 'IBM Plex Sans, sans-serif' }}>Loading...</p>
          <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
