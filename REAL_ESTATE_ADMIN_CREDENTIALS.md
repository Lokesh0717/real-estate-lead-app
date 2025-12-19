# Real Estate Admin Credentials Setup

## ⚠️ Important: No Default Credentials

**There are no default admin credentials.** You must create admin users in Firebase Console.

## Step-by-Step: Create Real Estate Admin Account

### Step 1: Go to Firebase Console

1. Navigate to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`templet-db4e8`)

### Step 2: Enable Authentication (if not already enabled)

1. Click on **"Authentication"** in the left sidebar
2. If you see "Get started", click it
3. Go to the **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Enable the **"Email/Password"** toggle
6. Click **"Save"**

### Step 3: Create Admin User

1. In Firebase Console, go to **Authentication** → **Users** tab
2. Click **"Add user"** button (top right, blue button)
3. Enter:
   - **Email**: `admin@eliteproperties.com` (or any email you prefer)
   - **Password**: Choose a strong password (minimum 6 characters)
     - Example: `Admin123!` or `EliteProperties2024!`
4. Click **"Add user"**

### Step 4: Login to Admin Dashboard

1. Navigate to `http://localhost:5173/realestate-login`
2. Enter the email and password you just created
3. Click **"Sign In"**
4. You'll be redirected to `/realestate-admin` dashboard

## Example Admin Credentials (For Testing)

You can create a test admin account with:

**Email**: `admin@eliteproperties.com`  
**Password**: `Admin123!` (or any password you choose)

⚠️ **Important**: 
- Change this password immediately in production!
- Use strong passwords (8+ characters, mix of letters, numbers, symbols)
- Never commit credentials to Git

## Creating Multiple Admin Users

You can create multiple admin users by repeating Step 3. All authenticated users can access the admin dashboard currently.

## Troubleshooting

### Issue: "User not found" or "Invalid password"
- **Solution**: Make sure you created the user in Firebase Console → Authentication → Users
- **Solution**: Verify the email/password are correct (case-sensitive)

### Issue: Can't access `/realestate-admin` route
- **Solution**: Make sure you're logged in (check if you see your email in the sidebar)
- **Solution**: Clear browser cache and try again
- **Solution**: Check browser console for errors

### Issue: Firebase Authentication not enabled
- **Solution**: Go to Firebase Console → Authentication → Sign-in method → Enable Email/Password

### Issue: "Permission denied" when viewing leads
- **Solution**: Check Firestore security rules (see below)

## Firestore Security Rules (Recommended)

Add these rules in Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Leads collection
    match /leads/{leadId} {
      // Anyone can create leads (for form submissions)
      allow create: if true;
      
      // Only authenticated users can read leads
      allow read: if request.auth != null;
      
      // Only authenticated users can update leads
      allow update: if request.auth != null;
      
      // Only authenticated users can delete leads
      allow delete: if request.auth != null;
    }
  }
}
```

## Security Best Practices

1. **Use Strong Passwords**: Minimum 8 characters with mix of letters, numbers, and symbols
2. **Enable 2FA**: Consider enabling two-factor authentication for admin accounts in Firebase
3. **Firestore Rules**: Set up proper security rules to protect your data
4. **Limit Admin Access**: Only create admin accounts for trusted users
5. **Regular Audits**: Review who has access to your Firebase project

## Quick Reference

- **Login URL**: `http://localhost:5173/realestate-login`
- **Dashboard URL**: `http://localhost:5173/realestate-admin`
- **Firebase Console**: https://console.firebase.google.com/
- **Create User**: Firebase Console → Authentication → Users → Add user

## Need Help?

If you're having trouble:
1. Check Firebase Console → Authentication → Users to see if user exists
2. Verify Email/Password authentication is enabled
3. Check browser console for error messages
4. Ensure Firestore rules allow reads for authenticated users

