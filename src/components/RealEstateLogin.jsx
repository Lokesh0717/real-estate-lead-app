import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { signIn } from '../firebase/auth';
import { useAuth } from '../contexts/AuthContext';

const RealEstateLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const [submitError, setSubmitError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      const from = location.state?.from?.pathname || '/realestate-admin';
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, location.state?.from]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitError('');

      const result = await signIn(data.email, data.password);

      if (result.success) {
        // Redirect is handled by the useEffect hook
        const from = location.state?.from?.pathname || '/realestate-admin';
        navigate(from, { replace: true });
      } else {
        setSubmitError(result.error || 'Failed to sign in. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
        <svg
          className="animate-spin h-12 w-12 text-amber-600"
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
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-md w-full space-y-8">
        <header className="text-center">
          <section className="flex items-center justify-center mb-4">
            <section className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </section>
          </section>
          <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Agent Login
          </h2>
          <p className="text-gray-600 tracking-wide">
            Sign in to access your real estate leads dashboard
          </p>
        </header>

        <section className="glass-card rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Error Message */}
            {submitError && (
              <section className="p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-800">
                <section className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm font-medium">{submitError}</p>
                </section>
              </section>
            )}

            {/* Email Field */}
            <section>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="agent@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </section>

            {/* Password Field */}
            <section>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </section>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-soft hover:shadow-glow"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <section className="mt-6 text-center">
            <details className="text-xs text-gray-500">
              <summary className="cursor-pointer hover:text-gray-700">Need help?</summary>
              <section className="mt-2 p-3 bg-gray-50 rounded-lg text-left space-y-1">
                <p className="font-semibold">How to create an agent account:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Go to Firebase Console → Authentication</li>
                  <li>Click "Add user" button</li>
                  <li>Enter email and password</li>
                  <li>Click "Add user"</li>
                  <li>Use those credentials to login here</li>
                </ol>
              </section>
            </details>
          </section>
        </section>
      </article>
    </section>
  );
};

export default RealEstateLogin;

