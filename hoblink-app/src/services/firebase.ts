import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
if (!process.env.REACT_APP_FIREBASE_API_KEY ||
    !process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    !process.env.REACT_APP_FIREBASE_PROJECT_ID ||
    !process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    !process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ||
    !process.env.REACT_APP_FIREBASE_APP_ID) {
  throw new Error('Missing Firebase environment variables');
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Facebook Auth Provider
export const facebookProvider = new FacebookAuthProvider();

export default app;