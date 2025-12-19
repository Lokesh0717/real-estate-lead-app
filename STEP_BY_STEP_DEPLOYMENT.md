# 🚀 Step-by-Step Vercel Deployment Guide

Follow these exact steps to deploy your Real Estate Lead Management App to Vercel.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- ✅ Your code pushed to GitHub (already done ✅)
- ✅ Firebase project created
- ✅ Firebase credentials ready (6 environment variables)
- ✅ Vercel account (we'll create one if needed)

---

## Step 1: Get Your Firebase Credentials

### 1.1 Open Firebase Console
1. Go to: **https://console.firebase.google.com/**
2. Sign in with your Google account
3. Select your Firebase project (or create a new one)

### 1.2 Get Configuration Values
1. Click the **⚙️ gear icon** next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. If you don't have a web app yet:
   - Click the **`</>`** (web) icon
   - Register your app with a nickname (e.g., "Real Estate Web App")
   - Click **"Register app"**
5. You'll see a `firebaseConfig` object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### 1.3 Copy These 6 Values
Write them down or keep this tab open. You'll need:
- `apiKey` → This is your `VITE_FIREBASE_API_KEY`
- `authDomain` → This is your `VITE_FIREBASE_AUTH_DOMAIN`
- `projectId` → This is your `VITE_FIREBASE_PROJECT_ID`
- `storageBucket` → This is your `VITE_FIREBASE_STORAGE_BUCKET`
- `messagingSenderId` → This is your `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `appId` → This is your `VITE_FIREBASE_APP_ID`

**Keep this tab open!** You'll need these values in Step 4.

---

## Step 2: Sign Up / Login to Vercel

### 2.1 Go to Vercel
1. Open a new tab and go to: **https://vercel.com**
2. Click **"Sign Up"** (if new) or **"Log In"** (if you have an account)

### 2.2 Sign In with GitHub (Recommended)
1. Click **"Continue with GitHub"**
2. Authorize Vercel to access your GitHub account
3. You'll be redirected to Vercel dashboard

**Alternative**: You can also sign up with email, but GitHub is easier for deployment.

---

## Step 3: Import Your Project

### 3.1 Start New Project
1. In Vercel dashboard, click **"Add New..."** button (top right)
2. Click **"Project"** from the dropdown menu

### 3.2 Find Your Repository
1. You'll see a list of your GitHub repositories
2. Search for: **`real-estate-lead-app`**
3. Click **"Import"** button next to your repository

**Can't find your repo?**
- Make sure you're signed in with the correct GitHub account
- Check that the repository is public (or you've granted Vercel access)

---

## Step 4: Configure Project Settings

### 4.1 Review Auto-Detected Settings
Vercel should automatically detect:
- **Framework Preset**: `Vite` ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `dist` ✅
- **Install Command**: `npm install` ✅

**If these are correct, leave them as is!**

### 4.2 Add Environment Variables (CRITICAL!)

This is the most important step! ⚠️

1. Scroll down to **"Environment Variables"** section
2. Click **"Add"** or the **"+"** button
3. Add each variable **one by one**:

#### Variable 1: API Key
- **Name**: `VITE_FIREBASE_API_KEY`
- **Value**: Paste your `apiKey` from Firebase (Step 1.3)
- **Environment**: Select **all three** (Production, Preview, Development)
- Click **"Add"**

#### Variable 2: Auth Domain
- **Name**: `VITE_FIREBASE_AUTH_DOMAIN`
- **Value**: Paste your `authDomain` from Firebase
- **Environment**: Select **all three**
- Click **"Add"**

#### Variable 3: Project ID
- **Name**: `VITE_FIREBASE_PROJECT_ID`
- **Value**: Paste your `projectId` from Firebase
- **Environment**: Select **all three**
- Click **"Add"**

#### Variable 4: Storage Bucket
- **Name**: `VITE_FIREBASE_STORAGE_BUCKET`
- **Value**: Paste your `storageBucket` from Firebase
- **Environment**: Select **all three**
- Click **"Add"**

#### Variable 5: Messaging Sender ID
- **Name**: `VITE_FIREBASE_MESSAGING_SENDER_ID`
- **Value**: Paste your `messagingSenderId` from Firebase
- **Environment**: Select **all three**
- Click **"Add"**

#### Variable 6: App ID
- **Name**: `VITE_FIREBASE_APP_ID`
- **Value**: Paste your `appId` from Firebase
- **Environment**: Select **all three**
- Click **"Add"**

### 4.3 Verify All Variables Added
You should see **6 environment variables** listed:
- ✅ VITE_FIREBASE_API_KEY
- ✅ VITE_FIREBASE_AUTH_DOMAIN
- ✅ VITE_FIREBASE_PROJECT_ID
- ✅ VITE_FIREBASE_STORAGE_BUCKET
- ✅ VITE_FIREBASE_MESSAGING_SENDER_ID
- ✅ VITE_FIREBASE_APP_ID

**Important Notes:**
- Variable names are **case-sensitive** - use exact names above
- Don't include quotes around values
- Make sure all are set for **Production, Preview, and Development**

---

## Step 5: Deploy

### 5.1 Start Deployment
1. Scroll to the bottom of the page
2. Click the big **"Deploy"** button
3. Wait for the build to start (you'll see a loading screen)

### 5.2 Monitor Build Progress
You'll see:
- **"Building"** - Installing dependencies and building
- **"Deploying"** - Uploading to Vercel's servers
- **"Ready"** - Your app is live!

**Build time**: Usually 2-3 minutes

### 5.3 Build Complete!
Once you see **"Ready"**:
- Click **"Visit"** or copy your deployment URL
- Your app URL will look like: `https://real-estate-lead-app-xxxxx.vercel.app`

**🎉 Congratulations! Your app is live!**

---

## Step 6: Update Firebase Authorized Domains

### 6.1 Go Back to Firebase Console
1. Go back to: **https://console.firebase.google.com/**
2. Select your project
3. Click **"Authentication"** in the left sidebar
4. Click **"Settings"** tab
5. Scroll to **"Authorized domains"** section

### 6.2 Add Your Vercel Domain
1. Click **"Add domain"** button
2. Enter your Vercel domain (e.g., `real-estate-lead-app-xxxxx.vercel.app`)
   - You can find this in your Vercel dashboard → Project → Domains
3. Click **"Add"**

**Why this is important:**
- Firebase Authentication requires authorized domains
- Without this, login won't work on your deployed app

---

## Step 7: Test Your Deployed App

### 7.1 Test Landing Page
1. Visit your Vercel URL
2. Check that:
   - ✅ Page loads without errors
   - ✅ Navbar displays
   - ✅ Hero section shows
   - ✅ Form is visible
   - ✅ No console errors (press F12 to check)

### 7.2 Test Form Submission
1. Fill out the enquiry form:
   - Name: Test User
   - Phone: +91 98765 43210
   - Email: test@example.com
   - Property Type: Buy
   - Budget: Select any option
   - Message: Test message
2. Click **"Submit Enquiry"**
3. You should see a success message
4. Check Firebase Console → Firestore → `leads` collection
5. Your test lead should appear there

### 7.3 Test Admin Login
1. Go to: `https://your-app.vercel.app/realestate-login`
2. Enter your admin credentials
3. You should be redirected to the dashboard
4. Check that leads are displayed

### 7.4 Test Admin Dashboard
1. Verify you can see the leads table
2. Test search functionality
3. Test status filters
4. Try updating a lead status

---

## Step 8: Set Up Custom Domain (Optional)

### 8.1 Add Domain in Vercel
1. Go to your project in Vercel dashboard
2. Click **"Settings"** tab
3. Click **"Domains"** in the sidebar
4. Enter your domain (e.g., `realestate.yourdomain.com`)
5. Click **"Add"**

### 8.2 Configure DNS
Vercel will show you DNS records to add:
- Go to your domain registrar (GoDaddy, Namecheap, etc.)
- Add the DNS records Vercel provides
- Wait for DNS propagation (usually 5-30 minutes)

### 8.3 Update Firebase Authorized Domains
Don't forget to add your custom domain to Firebase Authorized Domains too!

---

## 🐛 Troubleshooting

### Build Fails

**Problem**: Build fails with errors

**Solutions**:
1. Check build logs in Vercel dashboard
2. Look for specific error messages
3. Common issues:
   - Missing environment variables → Add them
   - Syntax errors → Fix in code
   - Dependency issues → Check package.json

### Firebase Errors After Deployment

**Problem**: Firebase not working on deployed app

**Solutions**:
1. **Check environment variables**:
   - Go to Vercel → Project → Settings → Environment Variables
   - Verify all 6 variables are set correctly
   - Make sure they're set for Production environment

2. **Check Firebase Console**:
   - Verify your Firebase project is active
   - Check that Firestore is enabled
   - Check that Authentication is enabled

3. **Check Authorized Domains**:
   - Firebase Console → Authentication → Settings
   - Make sure your Vercel domain is added

### Routes Return 404

**Problem**: Direct URLs (like `/realestate-login`) return 404

**Solutions**:
1. Check `vercel.json` file exists in your repo
2. Verify it has rewrite rules (should already be there)
3. Redeploy if you just added `vercel.json`

### Environment Variables Not Working

**Problem**: App can't connect to Firebase

**Solutions**:
1. Variable names must start with `VITE_` prefix ✅
2. Variable names are case-sensitive
3. Redeploy after adding environment variables
4. Check Vercel logs for specific errors

---

## 📱 Quick Reference

### Your Deployment URLs:
- **Production**: `https://your-project.vercel.app`
- **Preview**: `https://your-project-git-branch.vercel.app` (for branches)

### Important Links:
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Firebase Console**: https://console.firebase.google.com/
- **GitHub Repo**: https://github.com/Lokesh0717/real-estate-lead-app

### Environment Variables Checklist:
- [ ] VITE_FIREBASE_API_KEY
- [ ] VITE_FIREBASE_AUTH_DOMAIN
- [ ] VITE_FIREBASE_PROJECT_ID
- [ ] VITE_FIREBASE_STORAGE_BUCKET
- [ ] VITE_FIREBASE_MESSAGING_SENDER_ID
- [ ] VITE_FIREBASE_APP_ID

---

## ✅ Success Checklist

After deployment, verify:
- [ ] App loads at Vercel URL
- [ ] Landing page displays correctly
- [ ] Form submission works
- [ ] Lead appears in Firestore
- [ ] Admin login works
- [ ] Dashboard displays leads
- [ ] No console errors
- [ ] Mobile responsive

---

## 🎉 You're Done!

Your Real Estate Lead Management App is now live on the internet!

**Next Steps**:
- Share your Vercel URL with others
- Set up a custom domain (optional)
- Monitor your app's performance in Vercel dashboard
- Every push to GitHub will auto-deploy! 🚀

---

## Need Help?

If you encounter any issues:
1. Check the build logs in Vercel dashboard
2. Check browser console (F12) for errors
3. Verify all environment variables are set
4. Check Firebase Console for any errors
5. Review `VERCEL_DEPLOYMENT.md` for more details

---

**Happy Deploying! 🚀**

