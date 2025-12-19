# Deploy to Vercel - Step by Step Guide

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Prepare Your Repository
✅ Your code is already on GitHub at: `https://github.com/Lokesh0717/real-estate-lead-app`

### Step 2: Sign Up / Login to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"** (recommended)

### Step 3: Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Find and select your repository: `Lokesh0717/real-estate-lead-app`
3. Click **"Import"**

### Step 4: Configure Project Settings
1. **Framework Preset**: Vite (should auto-detect)
2. **Root Directory**: `./` (leave as default)
3. **Build Command**: `npm run build` (should auto-fill)
4. **Output Directory**: `dist` (should auto-fill)
5. **Install Command**: `npm install` (should auto-fill)

### Step 5: Add Environment Variables
**CRITICAL**: Add your Firebase configuration variables:

Click **"Environment Variables"** and add these 6 variables:

```
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

**Where to find these values:**
- Go to Firebase Console → Project Settings → General
- Scroll to "Your apps" → Web app → Config object
- Copy each value (without quotes)

### Step 6: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your app will be live at: `https://your-project-name.vercel.app`

### Step 7: Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `realestate.yourdomain.com`)
3. Follow DNS configuration instructions

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No** (first time)
- Project name? **real-estate-lead-app** (or your choice)
- Directory? **./** (current directory)
- Override settings? **No**

### Step 4: Add Environment Variables
```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
```

For each variable, enter the value when prompted.

### Step 5: Redeploy with Environment Variables
```bash
vercel --prod
```

---

## Post-Deployment Checklist

### ✅ Verify Deployment
1. Visit your Vercel URL
2. Test the landing page loads correctly
3. Submit a test lead from the enquiry form
4. Verify lead appears in Firestore
5. Test admin login at `/realestate-login`
6. Test admin dashboard at `/realestate-admin`

### ✅ Update Firebase Authorized Domains
1. Go to Firebase Console → Authentication → Settings
2. Scroll to "Authorized domains"
3. Add your Vercel domain: `your-project.vercel.app`
4. If using custom domain, add that too

### ✅ Firestore Security Rules
Ensure your Firestore rules allow:
- **Public create** (for form submissions)
- **Authenticated read/update** (for admin dashboard)

See `FIRESTORE_RULES_SETUP.md` for details.

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify `package.json` has correct build script

### Firebase Errors After Deployment
- Verify all environment variables are set correctly
- Check Firebase project settings
- Ensure authorized domains include your Vercel URL

### Routes Not Working (404)
- The `vercel.json` file includes rewrite rules for React Router
- If issues persist, check Vercel project settings → Framework Preset

### Environment Variables Not Working
- Environment variables must start with `VITE_` for Vite projects
- Redeploy after adding environment variables
- Check Vercel dashboard → Settings → Environment Variables

---

## Continuous Deployment

Once connected to GitHub:
- ✅ Every push to `main` branch = automatic deployment
- ✅ Preview deployments for pull requests
- ✅ Automatic rollback on build failures

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Firebase Docs: https://firebase.google.com/docs

---

**Your app will be live in minutes! 🚀**

