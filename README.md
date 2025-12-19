# Real Estate Lead Management Web App

A premium, modern Real Estate Lead Management Web App built with React, Tailwind CSS, and Firebase. Designed for real estate agents and builders in India to capture, manage, and track property leads efficiently.

## Features

- 🏠 **Premium Landing Page** - Modern, trustworthy real estate landing page with glassmorphism design
- 📱 **Fully Responsive** - Mobile-first design that works seamlessly on all devices
- 📝 **Lead Capture Form** - Property enquiry form with validation (Buy/Sell/Rent)
- 🔐 **Admin Dashboard** - Professional CRM-style dashboard for managing leads
- 🔄 **Real-time Updates** - Live lead updates using Firebase Firestore
- 👤 **Authentication** - Secure admin login with Firebase Authentication
- 📊 **Lead Management** - Track leads with status updates (New, Contacted, Site Visit, Closed)
- 🔍 **Search & Filter** - Search by name/email/phone and filter by status/property type
- 💬 **WhatsApp Integration** - Floating WhatsApp button for quick contact

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Backend-as-a-Service
  - **Firestore** - Real-time NoSQL database
  - **Authentication** - Email/password authentication
- **React Hook Form** - Form validation and management
- **React Router DOM** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Lokesh0717/real-estate-lead-app.git
cd real-estate-lead-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Copy your Firebase config and create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

4. Configure Firestore Security Rules:
   - See `FIRESTORE_RULES_SETUP.md` for detailed instructions
   - Or use `QUICK_FIX_FIRESTORE_RULES.md` for quick setup

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── realestate/
│   │   ├── RealEstateNavbar.jsx
│   │   ├── RealEstateHero.jsx
│   │   ├── PropertyServices.jsx
│   │   ├── WhyChooseUs.jsx
│   │   ├── PropertyEnquiryForm.jsx
│   │   ├── RealEstateFooter.jsx
│   │   └── RealEstateWhatsAppButton.jsx
│   ├── RealEstateLogin.jsx
│   ├── RealEstateProtectedRoute.jsx
│   └── RealEstateSidebar.jsx
├── pages/
│   ├── RealEstateHome.jsx
│   └── RealEstateAdminDashboard.jsx
├── firebase/
│   ├── config.js
│   ├── auth.js
│   └── firestore.js
├── contexts/
│   └── AuthContext.jsx
└── App.jsx
```

## Routes

- `/` - Redirects to `/realestate`
- `/realestate` - Landing page with enquiry form
- `/realestate-login` - Admin login page
- `/realestate-admin` - Admin dashboard (protected route)

## Admin Setup

1. Create an admin user in Firebase Console:
   - Go to Authentication > Users
   - Click "Add user"
   - Enter email and password
   - Save credentials securely

2. See `REAL_ESTATE_ADMIN_CREDENTIALS.md` for detailed setup instructions

## Documentation

- `FIRESTORE_RULES_SETUP.md` - Firestore security rules configuration
- `QUICK_FIX_FIRESTORE_RULES.md` - Quick fix for permission errors
- `REAL_ESTATE_ADMIN_CREDENTIALS.md` - Admin user setup guide
- `REAL_ESTATE_TESTING_GUIDE.md` - Complete testing guide

## Customization

### WhatsApp Number

Edit `src/components/realestate/RealEstateWhatsAppButton.jsx` and update the `phoneNumber` variable.

### Colors & Styling

Modify Tailwind classes in components or update `tailwind.config.js` for global theme changes.

### Property Types & Budget Ranges

Edit the dropdown options in `src/components/realestate/PropertyEnquiryForm.jsx`.

## Security Notes

- Never commit `.env` file (already in `.gitignore`)
- Keep Firebase credentials secure
- Regularly review Firestore security rules
- Use strong passwords for admin accounts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ for real estate professionals in India
