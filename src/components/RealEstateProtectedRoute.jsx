import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RealEstateProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <section className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-amber-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-600">Loading...</p>
        </section>
      </section>
    );
  }

  // Redirect to real estate login if not authenticated
  if (!user) {
    return <Navigate to="/realestate-login" state={{ from: location }} replace />;
  }

  // Render protected content if authenticated
  return children;
};

export default RealEstateProtectedRoute;

