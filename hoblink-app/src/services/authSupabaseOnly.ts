import { supabase } from './supabase';
import { DatabaseService } from './database';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  userType?: 'rider' | 'driver' | 'admin';
  dbUser?: any;
}

class SupabaseOnlyAuthService {
  private currentUser: AuthUser | null = null;
  private listeners: ((user: AuthUser | null) => void)[] = [];

  constructor() {
    // Listen for auth state changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          // Get additional user data from database
          const dbUser = await DatabaseService.getUserById(session.user.id);
          this.currentUser = {
            uid: session.user.id,
            email: session.user.email || null,
            displayName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || null,
            userType: dbUser.role,
            dbUser
          };
        } catch (error) {
          console.error('Error fetching user data:', error);
          this.currentUser = {
            uid: session.user.id,
            email: session.user.email || null,
            displayName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || null,
          };
        }
      } else {
        this.currentUser = null;
      }
      
      // Notify all listeners
      this.listeners.forEach(callback => callback(this.currentUser));
    });
  }

  // Get current user
  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  // Email/Password Sign Up
  async signUp(
    email: string, 
    password: string, 
    userData: {
      firstName: string;
      lastName: string;
      phone: string;
      userType: 'rider' | 'driver';
    }
  ): Promise<AuthUser> {
    try {
      // Check if email should be assigned admin role
      const userType = email === 'info@thabodigital.co.za' ? 'admin' : userData.userType;

      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${userData.firstName} ${userData.lastName}`,
            phone: userData.phone,
            user_type: userType
          }
        }
      });

      if (error) throw error;
      if (!data.user) throw new Error('User creation failed');

      // The user profile will be automatically created by the database trigger
      // Wait a bit for the trigger to complete
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user role in the database
      try {
        await DatabaseService.updateUser(data.user.id, {
          role: userType,
          phone: userData.phone,
          full_name: `${userData.firstName} ${userData.lastName}`
        });
      } catch (dbError) {
        console.error('Error updating user role:', dbError);
      }

      const authUser: AuthUser = {
        uid: data.user.id,
        email: data.user.email || null,
        displayName: `${userData.firstName} ${userData.lastName}`,
        userType: userType
      };

      return authUser;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create account');
    }
  }

  // Email/Password Sign In
  async signIn(email: string, password: string): Promise<AuthUser> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('Sign in failed');

      // Get user data from database
      let dbUser;
      try {
        dbUser = await DatabaseService.getUserById(data.user.id);
      } catch (dbError) {
        console.error('Error fetching user data:', dbError);
      }

      const authUser: AuthUser = {
        uid: data.user.id,
        email: data.user.email || null,
        displayName: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || null,
        userType: dbUser?.role || 'rider',
        dbUser
      };

      this.currentUser = authUser;
      return authUser;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    }
  }

  // Google Sign In
  async signInWithGoogle(): Promise<AuthUser> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: process.env.REACT_APP_OAUTH_REDIRECT_URL
        }
      });

      if (error) throw error;

      // Note: The actual user data will be available after redirect
      // This method initiates the OAuth flow
      throw new Error('Redirect to Google initiated');
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  }

  // Facebook Sign In
  async signInWithFacebook(): Promise<AuthUser> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: process.env.REACT_APP_OAUTH_REDIRECT_URL
        }
      });

      if (error) throw error;

      // Note: The actual user data will be available after redirect
      // This method initiates the OAuth flow
      throw new Error('Redirect to Facebook initiated');
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in with Facebook');
    }
  }

  // Sign Out
  async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.currentUser = null;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign out');
    }
  }

  // Reset Password
  async resetPassword(email: string): Promise<void> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  }

  // Update user profile
  async updateUserProfile(updates: {
    displayName?: string;
    phone?: string;
  }): Promise<void> {
    try {
      if (!this.currentUser) throw new Error('No user logged in');

      // Update Supabase auth metadata
      const authUpdates: any = {};
      if (updates.displayName) {
        authUpdates.data = { full_name: updates.displayName };
      }

      if (Object.keys(authUpdates).length > 0) {
        const { error: authError } = await supabase.auth.updateUser(authUpdates);
        if (authError) throw authError;
      }

      // Update user record in database
      const dbUpdates: any = {};
      if (updates.displayName) dbUpdates.full_name = updates.displayName;
      if (updates.phone) dbUpdates.phone = updates.phone;

      if (Object.keys(dbUpdates).length > 0) {
        await DatabaseService.updateUser(this.currentUser.uid, dbUpdates);
      }

      // Update current user
      if (updates.displayName) this.currentUser.displayName = updates.displayName;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update profile');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Check if user has specific role
  hasRole(role: 'rider' | 'driver' | 'admin'): boolean {
    return this.currentUser?.userType === role;
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
}

// Create singleton instance
const supabaseAuthService = new SupabaseOnlyAuthService();
export default supabaseAuthService;