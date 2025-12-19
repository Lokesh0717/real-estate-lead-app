# Firestore Security Rules Setup

## Quick Setup for Real Estate Leads

The dashboard is slow because Firestore rules might be blocking reads. Follow these steps:

### Step 1: Go to Firestore Rules

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`templet-db4e8`)
3. Go to **Firestore Database** → **Rules** tab

### Step 2: Update Rules

Copy and paste these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Leads collection
    match /leads/{leadId} {
      // Anyone can create leads (for form submissions from landing page)
      allow create: if true;
      
      // Only authenticated users can read leads (for admin dashboard)
      allow read: if request.auth != null;
      
      // Only authenticated users can update leads (for status updates)
      allow update: if request.auth != null;
      
      // Only authenticated users can delete leads
      allow delete: if request.auth != null;
    }
  }
}
```

### Step 3: Publish Rules

1. Click **"Publish"** button
2. Wait for confirmation

### Step 4: Test

1. Refresh your admin dashboard
2. Check browser console for:
   - `📡 Setting up Firestore subscription`
   - `📥 Firestore snapshot received`
   - `✅ Leads loaded: X`

## Common Issues

### Issue: "Permission denied" error
**Solution**: Make sure rules allow `read: if request.auth != null`

### Issue: Still slow loading
**Check:**
- Are you logged in? (Check sidebar for email)
- Is Email/Password auth enabled?
- Check browser console for error messages

### Issue: Rules won't save
**Solution**: 
- Make sure you're using `rules_version = '2';`
- Check syntax (no extra commas, proper brackets)

## Production Rules (More Secure)

For production, use more restrictive rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leads/{leadId} {
      // Anyone can create leads
      allow create: if request.resource.data.keys().hasAll(['name', 'phone', 'email', 'propertyType', 'budget', 'status'])
                   && request.resource.data.status == 'New';
      
      // Only authenticated users can read
      allow read: if request.auth != null;
      
      // Only authenticated users can update status
      allow update: if request.auth != null
                   && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status', 'updatedAt']);
      
      // Only authenticated users can delete
      allow delete: if request.auth != null;
    }
  }
}
```

## Testing Rules

After updating rules:
1. Try submitting a lead from landing page (should work)
2. Try viewing leads in admin dashboard (should work if logged in)
3. Try updating lead status (should work if logged in)

