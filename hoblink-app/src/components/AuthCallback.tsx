import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import LoadingSpinner from './LoadingSpinner';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        // Get the intended destination from localStorage if it exists
        const destination = localStorage.getItem('auth_redirect') || '/';
        localStorage.removeItem('auth_redirect'); // Clean up
        navigate(destination, { replace: true });
      } else if (event === 'SIGNED_OUT') {
        navigate('/login', { replace: true });
      }
    });

    // Cleanup subscription
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  return <LoadingSpinner />;
};

export default AuthCallback;