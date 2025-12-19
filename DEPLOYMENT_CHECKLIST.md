# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment Verification

### 1. Build Configuration ✅
- [x] **package.json** - Has correct build script: `npm run build`
- [x] **vite.config.js** - Properly configured
- [x] **vercel.json** - Configured with correct output directory (`dist`)
- [x] **Build Test** - Project builds successfully locally
- [x] **Output Directory** - Build outputs to `dist/` folder

### 2. Environment Variables Required ⚠️
**CRITICAL**: These 6 environment variables MUST be set in Vercel:

```
✅ VITE_FIREBASE_API_KEY
✅ VITE_FIREBASE_AUTH_DOMAIN
✅ VITE_FIREBASE_PROJECT_ID
✅ VITE_FIREBASE_STORAGE_BUCKET
✅ VITE_FIREBASE_MESSAGING_SENDER_ID
✅ VITE_FIREBASE_APP_ID
```

**Where to find these:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click ⚙️ Settings → Project Settings
4. Scroll to "Your apps" section
5. Click on your Web app (or create one)
6. Copy values from the `firebaseConfig` object

### 3. Firebase Configuration ✅
- [x] **Firebase Config** - Uses environment variables correctly
- [x] **Error Handling** - Validates missing env vars
- [x] **Firestore** - Initialized properly
- [x] **Authentication** - Initialized properly

### 4. Routing Configuration ✅
- [x] **React Router** - Properly configured
- [x] **vercel.json** - Has rewrite rules for SPA routing
- [x] **Routes** - All routes defined correctly:
  - `/` → redirects to `/realestate`
  - `/realestate` → Landing page
  - `/realestate-login` → Admin login
  - `/realestate-admin` → Admin dashboard (protected)

### 5. Project Structure ✅
- [x] **index.html** - Root HTML file exists
- [x] **src/main.jsx** - Entry point configured
- [x] **src/App.jsx** - Main app component
- [x] **All Components** - Present and imported correctly
- [x] **Firebase Files** - All helper files present

### 6. Dependencies ✅
- [x] **React** - v18.2.0
- [x] **React Router DOM** - v6.21.1
- [x] **Firebase** - v10.7.1
- [x] **React Hook Form** - v7.49.2
- [x] **Vite** - v7.3.0
- [x] **Tailwind CSS** - v3.4.0

### 7. Configuration Files ✅
- [x] **tailwind.config.js** - Configured
- [x] **postcss.config.js** - Configured
- [x] **vite.config.js** - Configured
- [x] **vercel.json** - Deployment config ready

### 8. Git Repository ✅
- [x] **Code on GitHub** - Repository: `Lokesh0717/real-estate-lead-app`
- [x] **All Files Committed** - Latest changes pushed
- [x] **.gitignore** - Excludes `.env` files (correct)

---

## 🔧 Vercel Deployment Steps

### Step 1: Sign Up / Login
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign in with GitHub account

### Step 2: Import Project
- [ ] Click "Add New..." → "Project"
- [ ] Find repository: `Lokesh0717/real-estate-lead-app`
- [ ] Click "Import"

### Step 3: Configure Project
- [ ] **Framework Preset**: Vite (should auto-detect)
- [ ] **Root Directory**: `./` (default)
- [ ] **Build Command**: `npm run build` (should auto-fill)
- [ ] **Output Directory**: `dist` (should auto-fill)
- [ ] **Install Command**: `npm install` (should auto-fill)

### Step 4: Add Environment Variables ⚠️ CRITICAL
- [ ] Click "Environment Variables" section
- [ ] Add each variable one by one:

```
VITE_FIREBASE_API_KEY = [your-api-key]
VITE_FIREBASE_AUTH_DOMAIN = [your-project.firebaseapp.com]
VITE_FIREBASE_PROJECT_ID = [your-project-id]
VITE_FIREBASE_STORAGE_BUCKET = [your-project.appspot.com]
VITE_FIREBASE_MESSAGING_SENDER_ID = [your-sender-id]
VITE_FIREBASE_APP_ID = [your-app-id]
```

**Important:**
- ✅ Use exact variable names (case-sensitive)
- ✅ Don't include quotes around values
- ✅ Set for all environments (Production, Preview, Development)

### Step 5: Deploy
- [ ] Click "Deploy" button
- [ ] Wait for build to complete (2-3 minutes)
- [ ] Check build logs for any errors

### Step 6: Verify Deployment
- [ ] Visit your Vercel URL: `https://your-project.vercel.app`
- [ ] Test landing page loads correctly
- [ ] Test form submission
- [ ] Test admin login
- [ ] Test admin dashboard

---

## 🔐 Post-Deployment: Firebase Configuration

### Update Authorized Domains
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click **"Add domain"**
5. Add your Vercel domain: `your-project.vercel.app`
6. If using custom domain, add that too

### Verify Firestore Rules
Ensure your Firestore rules allow:
- ✅ **Public create** (for form submissions)
- ✅ **Authenticated read/update** (for admin dashboard)

Current rules should be:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leads/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

---

## 🧪 Testing Checklist After Deployment

### Landing Page Tests
- [ ] Page loads without errors
- [ ] Navbar displays correctly
- [ ] Hero section displays
- [ ] Property services section visible
- [ ] Why Choose Us section visible
- [ ] Enquiry form displays
- [ ] WhatsApp button visible
- [ ] Footer displays

### Form Submission Tests
- [ ] Form validation works
- [ ] Can submit valid form data
- [ ] Success message displays
- [ ] Lead appears in Firestore
- [ ] Error handling works

### Authentication Tests
- [ ] Can access `/realestate-login`
- [ ] Can login with valid credentials
- [ ] Invalid credentials show error
- [ ] Redirects to dashboard after login

### Admin Dashboard Tests
- [ ] Can access `/realestate-admin` when logged in
- [ ] Redirects to login when not authenticated
- [ ] Leads table displays
- [ ] Search functionality works
- [ ] Status filter works
- [ ] Property type filter works
- [ ] Can update lead status
- [ ] Stats cards display correctly

### Mobile Responsiveness
- [ ] Test on mobile device
- [ ] All sections responsive
- [ ] Form works on mobile
- [ ] Dashboard works on mobile

---

## 🐛 Troubleshooting

### Build Fails
**Check:**
- Build logs in Vercel dashboard
- All environment variables are set
- No syntax errors in code
- Dependencies are correct

### Firebase Errors
**Check:**
- All 6 environment variables are set correctly
- Firebase project is active
- Authorized domains include Vercel URL
- Firestore rules are correct

### Routes Return 404
**Check:**
- `vercel.json` has rewrite rules
- Framework preset is set to Vite
- Output directory is `dist`

### Environment Variables Not Working
**Check:**
- Variables start with `VITE_` prefix
- Variables are set for correct environment
- Redeploy after adding variables
- No typos in variable names

---

## 📋 Quick Reference

### Vercel Project Settings
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x or higher (auto-detected)

### Required Environment Variables
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

### Important URLs
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Firebase Console**: https://console.firebase.google.com/
- **GitHub Repo**: https://github.com/Lokesh0717/real-estate-lead-app

---

## ✅ Ready to Deploy!

If all items above are checked, you're ready to deploy! 🚀

**Next Step**: Follow the Vercel Deployment Steps above.

