# Real Estate Lead Flow Testing Guide

## Complete Testing Flow

### Step 1: Submit Enquiry from Landing Page

1. **Navigate to Landing Page**
   - Go to: `http://localhost:5173/realestate`
   - Verify all sections load correctly

2. **Fill Out the Enquiry Form**
   - Scroll to the "Get In Touch" section
   - Fill in all required fields:
     - **Full Name**: e.g., "Rajesh Kumar"
     - **Phone Number**: e.g., "+91 98765 43210"
     - **Email**: e.g., "rajesh@example.com"
     - **Property Type**: Select "Buy", "Sell", or "Rent"
     - **Budget Range**: Select a budget range
     - **Message**: Optional message
   - Click "Submit Enquiry"

3. **Verify Success Message**
   - Should see: "Thank you! We'll contact you shortly..."
   - Form should reset
   - Success message disappears after 5 seconds

### Step 2: Verify Firestore Data

1. **Open Firebase Console**
   - Go to: https://console.firebase.google.com/
   - Select your project
   - Navigate to: Firestore Database

2. **Check Leads Collection**
   - Open the `leads` collection
   - Verify new document was created with:
     - `name`: Full name from form
     - `phone`: Phone number
     - `email`: Email (lowercase)
     - `propertyType`: "buy", "sell", or "rent"
     - `budget`: Budget range value
     - `message`: Message (if provided)
     - `status`: "New"
     - `createdAt`: Timestamp
     - `updatedAt`: Timestamp

### Step 3: Login as Admin

1. **Navigate to Login Page**
   - Go to: `http://localhost:5173/realestate-login`
   - Or try accessing: `http://localhost:5173/realestate-admin` (should redirect to login)

2. **Login with Credentials**
   - Enter email and password (created in Firebase Console)
   - Click "Sign In"
   - Should redirect to `/realestate-admin`

### Step 4: View, Filter, and Update Leads

1. **View Leads**
   - Dashboard should load with sidebar
   - Stats cards show: Total, New, Contacted, Site Visit, Closed
   - Leads table displays all leads
   - Verify the lead you just submitted appears in the table

2. **Test Search Filter**
   - Enter search query in search box
   - Try searching by:
     - Name: "Rajesh"
     - Email: "rajesh"
     - Phone: "98765"
   - Table should filter results in real-time

3. **Test Status Filter**
   - Select "New" from Status dropdown
   - Should show only leads with "New" status
   - Select "All Status" to show all

4. **Test Property Type Filter**
   - Select "Buy" from Property Type dropdown
   - Should show only "Buy" leads
   - Try "Sell" and "Rent"
   - Select "All Types" to show all

5. **Update Lead Status**
   - Find the lead you submitted
   - Click the Status dropdown in the "Actions" column
   - Change status to:
     - "Contacted"
     - "Site Visit"
     - "Closed"
   - Status should update immediately
   - Badge color should change
   - Stats cards should update

6. **Verify Real-time Updates**
   - Open another browser/incognito window
   - Submit another lead from landing page
   - Dashboard should update automatically without refresh

## Expected Behavior

### Form Submission
- ✅ Form validates all required fields
- ✅ Shows loading state during submission
- ✅ Success message appears on success
- ✅ Error message appears on failure
- ✅ Form resets after successful submission

### Firestore Integration
- ✅ Data saved with correct field names
- ✅ Timestamps added automatically
- ✅ Status defaults to "New"
- ✅ Email normalized to lowercase

### Dashboard Display
- ✅ All leads displayed in table
- ✅ Columns: Name, Phone, Property Type, Budget, Status, Date
- ✅ Real-time updates work
- ✅ Stats cards show correct counts
- ✅ Filters work correctly
- ✅ Status updates persist

### Authentication
- ✅ Unauthenticated users redirected to login
- ✅ Login redirects to dashboard
- ✅ Logout works correctly
- ✅ Session persists on page refresh

## Common Issues & Fixes

### Issue: Form submission fails
**Check:**
- Firebase configuration in `.env` file
- Firestore security rules allow writes
- Network connection

**Fix:**
- Verify `.env` file has correct Firebase config
- Update Firestore rules to allow authenticated/unauthenticated writes for testing

### Issue: Leads not appearing in dashboard
**Check:**
- Firebase authentication is working
- Firestore security rules allow reads
- Collection name is "leads" (not "lead")

**Fix:**
- Check browser console for errors
- Verify Firestore rules allow reads for authenticated users

### Issue: Status update not working
**Check:**
- Firestore security rules allow updates
- Lead ID is correct
- Network connection

**Fix:**
- Verify update permissions in Firestore rules
- Check browser console for errors

### Issue: Real-time updates not working
**Check:**
- Firestore connection
- Browser console for errors
- Network connection

**Fix:**
- Refresh page
- Check Firebase project quota
- Verify Firestore is enabled

## Firestore Security Rules (Testing)

For testing, you can use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Leads collection - allow read/write for authenticated users
    match /leads/{leadId} {
      allow read: if request.auth != null;
      allow create: if true; // Allow anyone to create leads
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }
  }
}
```

**Note:** For production, tighten these rules based on your requirements.

## Test Data Examples

### Test Lead 1
- Name: "Priya Sharma"
- Phone: "+91 98765 43210"
- Email: "priya@example.com"
- Property Type: "Buy"
- Budget: "1cr-2cr"
- Message: "Looking for 2BHK apartment"

### Test Lead 2
- Name: "Amit Patel"
- Phone: "+91 87654 32109"
- Email: "amit@example.com"
- Property Type: "Rent"
- Budget: "under-50lakhs"
- Message: "Need temporary accommodation"

### Test Lead 3
- Name: "Sneha Reddy"
- Phone: "+91 76543 21098"
- Email: "sneha@example.com"
- Property Type: "Sell"
- Budget: "2cr-5cr"
- Message: "Want to sell my villa"

## Success Criteria

✅ Form submission works
✅ Data saved to Firestore correctly
✅ Login works
✅ Dashboard displays leads
✅ Filters work
✅ Status updates work
✅ Real-time updates work
✅ No console errors
✅ UI is responsive

