import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RealEstateProtectedRoute from './components/RealEstateProtectedRoute';
import Home from './pages/Home';
import RealEstateHome from './pages/RealEstateHome';
import Login from './components/Login';
import RealEstateLogin from './components/RealEstateLogin';
import AdminDashboard from './pages/AdminDashboard';
import RealEstateAdminDashboard from './pages/RealEstateAdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Navigate to="/realestate"/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/realestate" element={<RealEstateHome />} />
          {/* Redirect common typos */}
          <Route path="/realstate" element={<Navigate to="/realestate" replace />} />
          <Route path="/real-estate" element={<Navigate to="/realestate" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/realestate-login" element={<RealEstateLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/realestate-admin"
            element={
              <RealEstateProtectedRoute>
                <RealEstateAdminDashboard />
              </RealEstateProtectedRoute>
            }
          />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

