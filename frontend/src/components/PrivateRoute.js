import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import toast from 'react-hot-toast';

/**
 * PrivateRoute Component
 * Protects routes that require authentication
 * Redirects to login page if user is not authenticated
 * Preserves the intended destination for redirect after login
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useUser();
  const location = useLocation();
  const toastShown = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !toastShown.current) {
      toastShown.current = true;
      toast.error('Please sign in to continue', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#EF4444',
          color: '#fff',
          fontWeight: '500',
        },
      });
    }
  }, [isAuthenticated]);

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default PrivateRoute;
