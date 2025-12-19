import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Replace these values with your Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate Firebase configuration
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
];

const missingVars = requiredEnvVars.filter(
  (varName) => !import.meta.env[varName] || import.meta.env[varName] === 'your-api-key-here'
);

if (missingVars.length > 0) {
  console.error('❌ Firebase Configuration Error:');
  console.error('Missing or invalid environment variables:', missingVars.join(', '));
  console.error('\n📝 Please create a .env file in the root directory with your Firebase credentials.');
  console.error('See FIREBASE_SETUP.md for instructions.\n');
  
  // Show helpful error in development
  if (import.meta.env.DEV) {
    throw new Error(
      `Firebase configuration is missing. Please create a .env file with the following variables:\n${missingVars.join('\n')}\n\nSee FIREBASE_SETUP.md for setup instructions.`
    );
  }
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  if (import.meta.env.DEV) {
    console.log('✅ Firebase initialized successfully');
    console.log('Project ID:', firebaseConfig.projectId);
    console.log('Auth Domain:', firebaseConfig.authDomain);
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  throw error;
}

// Initialize Firestore with settings for better performance
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

// Set persistence for better performance (optional)
if (import.meta.env.DEV) {
  console.log('🔧 Firestore and Auth initialized');
}

// Export the app instance (useful for other Firebase services)
export default app;

