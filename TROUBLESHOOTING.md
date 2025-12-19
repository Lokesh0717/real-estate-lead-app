# Troubleshooting Guide

## Firebase Authentication 400 Bad Request Error

If you're seeing this error:
```
GET https://www.googleapis.com/identitytoolkit/v3/relyingparty/getProjectConfig?key=... 400 (Bad Request)
```

### Common Causes & Solutions:

#### 1. **Authentication Not Enabled**
- **Solution**: Go to Firebase Console → Authentication → Sign-in method
- Enable "Email/Password" authentication
- Click "Save"

#### 2. **API Key Restrictions**
- **Solution**: Go to Firebase Console → Project Settings → General
- Scroll to "Your apps" → Click on your web app
- Check if API key restrictions are enabled
- If restricted, make sure your domain is allowed, or temporarily remove restrictions for testing

#### 3. **API Key Not Enabled for Authentication**
- **Solution**: Go to [Google Cloud Console](https://console.cloud.google.com/)
- Select your Firebase project
- Go to "APIs & Services" → "Enabled APIs"
- Make sure "Identity Toolkit API" is enabled
- If not, enable it

#### 4. **Restart Dev Server**
After making changes to `.env` file:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

#### 5. **Clear Browser Cache**
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Or clear browser cache completely

### Chrome Extension Errors (Harmless)

These errors are from browser extensions and can be ignored:
```
GET chrome-extension://... net::ERR_FILE_NOT_FOUND
```

They don't affect your application functionality.

## Quick Fix Checklist

1. ✅ Check `.env` file has correct Firebase config
2. ✅ Enable Email/Password authentication in Firebase Console
3. ✅ Enable Identity Toolkit API in Google Cloud Console
4. ✅ Restart dev server after `.env` changes
5. ✅ Clear browser cache
6. ✅ Check browser console for specific error messages

## Still Having Issues?

1. Check Firebase Console → Authentication → Users tab
2. Verify your project ID matches in `.env` file
3. Try creating a new Firebase project and updating `.env`
4. Check Firebase Console → Project Settings → General for any warnings

