# 🔧 Quick Fix: Firestore Permission Denied Error

## The Problem
You're seeing: `❌ Missing or insufficient permissions`

This means your Firestore security rules are blocking reads from the admin dashboard.

## ✅ Solution: Update Firestore Rules (2 minutes)

### Step 1: Open Firebase Console
1. Go to: https://console.firebase.google.com/
2. Select project: **templet-db4e8**
3. Click: **Firestore Database** (left sidebar)
4. Click: **Rules** tab (top menu)

### Step 2: Replace Rules
**Delete everything** in the rules editor and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leads/{leadId} {
      allow create: if true;
      allow read: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }
  }
}
```

### Step 3: Publish
1. Click **"Publish"** button (top right)
2. Wait for green success message: "Rules published successfully"

### Step 4: Test
1. Refresh your admin dashboard: `http://localhost:5173/realestate-admin`
2. Check browser console - should see:
   - ✅ `📥 Firestore snapshot received`
   - ✅ `✅ Leads loaded: X`

## What These Rules Do

- **`allow create: if true`** - Anyone can submit leads from the landing page
- **`allow read: if request.auth != null`** - Only logged-in users can view leads
- **`allow update: if request.auth != null`** - Only logged-in users can update lead status
- **`allow delete: if request.auth != null`** - Only logged-in users can delete leads

## Still Not Working?

1. **Make sure you're logged in** - Check sidebar for your email
2. **Check rules syntax** - No extra commas, proper brackets
3. **Wait a few seconds** - Rules can take 10-30 seconds to propagate
4. **Hard refresh** - Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Test Rules

After updating, you should be able to:
- ✅ Submit leads from landing page (works for everyone)
- ✅ View leads in admin dashboard (works when logged in)
- ✅ Update lead status (works when logged in)

