import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from './firebase';
import { supabase, dbHelpers, User } from './supabase';

export interface AuthUser extends FirebaseUser {
  userType?: 'rider' | 'driver' | 'admin';
  dbUser?: User;
}

class AuthService {
  private currentUser: AuthUser | null = null;

  constructor() {
    // Listen for auth state changes
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get additional user data from Supabase
          const dbUser = await dbHelpers.getUserByEmail(firebaseUser.email!);
          this.currentUser = {
            ...firebaseUser,
            userType: dbUser.user_type,
            dbUser
          } as AuthUser;
        } catch (error) {
          console.error('Error fetching user data:', error);
          this.currentUser = firebaseUser as AuthUser;
        }
      } else {
        this.currentUser = null;
      }
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
      // Create Firebase user
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update Firebase profile
      await updateProfile(firebaseUser, {
        displayName: `${userData.firstName} ${userData.lastName}`
      });

      // Create user record in Supabase
      const dbUser = await dbHelpers.createUser({
        email: firebaseUser.email!,
        full_name: `${userData.firstName} ${userData.lastName}`,
        phone: userData.phone,
        user_type: userData.userType,
        profile_image_url: firebaseUser.photoURL || undefined
      });

      const authUser = {
        ...firebaseUser,
        userType: userData.userType,
        dbUser
      } as AuthUser;

      this.currentUser = authUser;
      return authUser;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create account');
    }
  }

  // Email/Password Sign In
  async signIn(email: string, password: string): Promise<AuthUser> {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      
      // Get user data from Supabase
      const dbUser = await dbHelpers.getUserByEmail(firebaseUser.email!);
      
      const authUser = {
        ...firebaseUser,
        userType: dbUser.user_type,
        dbUser
      } as AuthUser;

      this.currentUser = authUser;
      return authUser;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    }
  }

  // Google Sign In
  async signInWithGoogle(): Promise<AuthUser> {
    try {
      const { user: firebaseUser } = await signInWithPopup(auth, googleProvider);
      
      // Check if user exists in Supabase, create if not
      let dbUser;
      try {
        dbUser = await dbHelpers.getUserByEmail(firebaseUser.email!);
      } catch (error) {
        // User doesn't exist, create new user
        dbUser = await dbHelpers.createUser({
          email: firebaseUser.email!,
          full_name: firebaseUser.displayName || 'Google User',
          phone: firebaseUser.phoneNumber || '',
          user_type: 'rider', // Default to rider
          profile_image_url: firebaseUser.photoURL || undefined
        });
      }

      const authUser = {
        ...firebaseUser,
        userType: dbUser.user_type,
        dbUser
      } as AuthUser;

      this.currentUser = authUser;
      return authUser;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  }

  // Facebook Sign In
  async signInWithFacebook(): Promise<AuthUser> {
    try {
      const { user: firebaseUser } = await signInWithPopup(auth, facebookProvider);
      
      // Check if user exists in Supabase, create if not
      let dbUser;
      try {
        dbUser = await dbHelpers.getUserByEmail(firebaseUser.email!);
      } catch (error) {
        // User doesn't exist, create new user
        dbUser = await dbHelpers.createUser({
          email: firebaseUser.email!,
          full_name: firebaseUser.displayName || 'Facebook User',
          phone: firebaseUser.phoneNumber || '',
          user_type: 'rider', // Default to rider
          profile_image_url: firebaseUser.photoURL || undefined
        });
      }

      const authUser = {
        ...firebaseUser,
        userType: dbUser.user_type,
        dbUser
      } as AuthUser;

      this.currentUser = authUser;
      return authUser;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in with Facebook');
    }
  }

  // Sign Out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
      this.currentUser = null;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign out');
    }
  }

  // Reset Password
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  }

  // Update user profile
  async updateUserProfile(updates: {
    displayName?: string;
    photoURL?: string;
    phone?: string;
  }): Promise<void> {
    try {
      if (!this.currentUser) throw new Error('No user logged in');

      // Update Firebase profile
      if (updates.displayName || updates.photoURL) {
        await updateProfile(this.currentUser, {
          displayName: updates.displayName,
          photoURL: updates.photoURL
        });
      }

      // Update Supabase user record
      const supabaseUpdates: any = {};
      if (updates.displayName) supabaseUpdates.full_name = updates.displayName;
      if (updates.photoURL) supabaseUpdates.profile_image_url = updates.photoURL;
      if (updates.phone) supabaseUpdates.phone = updates.phone;

      if (Object.keys(supabaseUpdates).length > 0) {
        const { error } = await supabase
          .from('users')
          .update({ ...supabaseUpdates, updated_at: new Date().toISOString() })
          .eq('email', this.currentUser.email);

        if (error) throw error;
      }
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
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && this.currentUser) {
        callback(this.currentUser);
      } else {
        callback(null);
      }
    });
  }
}

// Create singleton instance
const authService = new AuthService();
export default authService;