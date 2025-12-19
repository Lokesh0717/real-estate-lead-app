# Admin Credentials Setup Guide

## Creating Admin User in Firebase

### Step 1: Go to Firebase Console

1. Navigate to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`templet-db4e8`)

### Step 2: Enable Authentication (if not already enabled)

1. Click on **"Authentication"** in the left sidebar
2. Click **"Get started"** if you haven't enabled it yet
3. Go to the **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Enable the **"Email/Password"** toggle
6. Click **"Save"**

### Step 3: Create Admin User

1. In Firebase Console, go to **Authentication** → **Users** tab
2. Click **"Add user"** button (top right)
3. Enter:
   - **Email**: Your admin email (e.g., `admin@example.com`)
   - **Password**: A strong password (at least 6 characters)
4. Click **"Add user"**

### Step 4: Login to Admin Dashboard

1. Navigate to `http://localhost:5173/login`
2. Enter the email and password you just created
3. Click **"Sign In"**
4. You'll be redirected to `/admin` dashboard

## Default Admin Credentials (For Testing)

If you want to create a test admin account:

**Email**: `admin@leadgenpro.com`  
**Password**: `Admin123!` (or any password you choose)

⚠️ **Important**: Change this password immediately in production!

## Troubleshooting

### Issue: "User not found" or "Invalid password"
- **Solution**: Make sure you created the user in Firebase Console → Authentication → Users
- **Solution**: Verify the email/password are correct (case-sensitive)

### Issue: Can't access `/admin` route
- **Solution**: Make sure you're logged in (check if you see your email in the sidebar)
- **Solution**: Clear browser cache and try again

### Issue: Firebase Authentication not enabled
- **Solution**: Go to Firebase Console → Authentication → Sign-in method → Enable Email/Password

## Security Best Practices

1. **Use Strong Passwords**: Minimum 8 characters with mix of letters, numbers, and symbols
2. **Enable 2FA**: Consider enabling two-factor authentication for admin accounts
3. **Firestore Rules**: Set up proper security rules to protect your data
4. **Limit Admin Access**: Only create admin accounts for trusted users

## Firestore Security Rules (Recommended)

Add these rules in Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Leads collection - only authenticated users can read/write
    match /leads/{leadId} {
      allow read, write: if request.auth != null;
    }
    
    // You can add more specific rules here
    // For example, only allow admins to update status:
    // allow update: if request.auth != null && 
    //               request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status', 'updatedAt']);
  }
}
```

## Creating Multiple Admin Users

You can create multiple admin users by repeating Step 3. All authenticated users can access the admin dashboard currently. If you need role-based access control, you'll need to:

1. Add a `role` field to user documents in Firestore
2. Check the role in your ProtectedRoute component
3. Only allow users with `role: 'admin'` to access admin routes

