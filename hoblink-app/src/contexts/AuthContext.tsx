import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import supabaseAuthService, { AuthUser } from '../services/authSupabaseOnly';

interface AuthContextType {
  currentUser: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signUp: (
    email: string, 
    password: string, 
    userData: {
      firstName: string;
      lastName: string;
      phone: string;
      userType: 'rider' | 'driver';
    }
  ) => Promise<AuthUser>;
  signInWithGoogle: () => Promise<AuthUser>;
  signInWithFacebook: () => Promise<AuthUser>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: {
    displayName?: string;
    photoURL?: string;
    phone?: string;
  }) => Promise<void>;
  isAuthenticated: () => boolean;
  hasRole: (role: 'rider' | 'driver' | 'admin') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = supabaseAuthService.onAuthStateChange((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Set initial user if already authenticated
    const user = supabaseAuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthUser> => {
    setLoading(true);
    try {
      const user = await supabaseAuthService.signIn(email, password);
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userData: {
      firstName: string;
      lastName: string;
      phone: string;
      userType: 'rider' | 'driver';
    }
  ): Promise<AuthUser> => {
    setLoading(true);
    try {
      const user = await supabaseAuthService.signUp(email, password, userData);
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<AuthUser> => {
    setLoading(true);
    try {
      const user = await supabaseAuthService.signInWithGoogle();
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebook = async (): Promise<AuthUser> => {
    setLoading(true);
    try {
      const user = await supabaseAuthService.signInWithFacebook();
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    try {
      await supabaseAuthService.signOut();
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    return supabaseAuthService.resetPassword(email);
  };

  const updateUserProfile = async (updates: {
    displayName?: string;
    photoURL?: string;
    phone?: string;
  }): Promise<void> => {
    return supabaseAuthService.updateUserProfile(updates);
  };

  const isAuthenticated = (): boolean => {
    return supabaseAuthService.isAuthenticated();
  };

  const hasRole = (role: 'rider' | 'driver' | 'admin'): boolean => {
    return supabaseAuthService.hasRole(role);
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    resetPassword,
    updateUserProfile,
    isAuthenticated,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;