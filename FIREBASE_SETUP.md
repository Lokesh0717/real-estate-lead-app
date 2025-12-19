# Firebase Setup Guide

This project uses Firebase with modular v9 syntax for Firestore and Authentication.

## Prerequisites

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Enable Authentication (Email/Password)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon ⚙️ next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. Click the web icon `</>` to add a web app (if not already added)
7. Copy the configuration values

### 3. Create Environment File

Create a `.env` file in the root directory with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 4. Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development) or "Start in production mode"
4. Select a location for your database
5. Click "Enable"

### 5. Enable Authentication (Email/Password)

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Email/Password"
5. Enable "Email/Password" toggle
6. Click "Save"

## Usage

Import Firebase services in your components:

```javascript
import { db, auth } from './firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Example: Add data to Firestore
const addData = async () => {
  try {
    const docRef = await addDoc(collection(db, 'leads'), {
      name: 'John Doe',
      email: 'john@example.com',
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

// Example: Create user with email/password
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created: ', userCredential.user);
  } catch (error) {
    console.error('Error signing up: ', error);
  }
};
```

## Security Rules

Don't forget to set up proper security rules for Firestore and Authentication in the Firebase Console before deploying to production.

