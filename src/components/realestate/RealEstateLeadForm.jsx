import { useState } from 'react';
import { useForm } from 'react-hook-form';

const RealEstateLeadForm = () => {
  const [submitStatus, setSubmitStatus] = useState({
    type: null, // 'success' or 'error'
    message: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitStatus({ type: null, message: '' });

      // Simulate API call (you can connect to Firebase/API later)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Form data:', data);

      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Our team will contact you shortly to discuss your property requirements.',
      });

      reset();
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again or contact us directly.',
      });
    }
  };

  const budgetRanges = [
    { value: '', label: 'Select Budget Range' },
    { value: 'under-50lakhs', label: 'Under ₹50 Lakhs' },
    { value: '50lakhs-1cr', label: '₹50 Lakhs - ₹1 Crore' },
    { value: '1cr-2cr', label: '₹1 Crore - ₹2 Crore' },
    { value: '2cr-5cr', label: '₹2 Crore - ₹5 Crore' },
    { value: '5cr-10cr', label: '₹5 Crore - ₹10 Crore' },
    { value: 'above-10cr', label: 'Above ₹10 Crore' },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto">
      <article className="glass-card rounded-2xl shadow-soft p-6 md:p-8 lg:p-10 backdrop-blur-xl">
        <header className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight leading-tight">
            Property Enquiry Form
          </h2>
          <p className="text-gray-600 leading-relaxed tracking-wide">
            Fill out the form below and our expert team will help you find your dream property.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Status Messages */}
          {submitStatus.type && (
            <section
              className={`p-4 rounded-lg border-2 ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <section className="flex items-start">
                {submitStatus.type === 'success' ? (
                  <svg
                    className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
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
                )}
                <p className="text-sm font-medium">{submitStatus.message}</p>
              </section>
            </section>
          )}

          {/* Full Name Field */}
          <section>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
                maxLength: {
                  value: 50,
                  message: 'Name must not exceed 50 characters',
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Name should only contain letters and spaces',
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                errors.fullName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.fullName.message}
              </p>
            )}
          </section>

          {/* Email and Phone Row */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Field */}
            <section>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </section>

            {/* Phone Number Field */}
            <section>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                    message: 'Please enter a valid phone number',
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                  errors.phone
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.phone.message}
                </p>
              )}
            </section>
          </section>

          {/* Property Type and Budget Range Row */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Property Type Field */}
            <section>
              <label
                htmlFor="propertyType"
                className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide"
              >
                Property Type <span className="text-red-500">*</span>
              </label>
              <select
                id="propertyType"
                {...register('propertyType', {
                  required: 'Please select a property type',
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white ${
                  errors.propertyType
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
              >
                <option value="">Select Property Type</option>
                <option value="flat">Flat / Apartment</option>
                <option value="villa">Villa</option>
                <option value="plot">Plot / Land</option>
              </select>
              {errors.propertyType && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.propertyType.message}
                </p>
              )}
            </section>

            {/* Budget Range Field */}
            <section>
              <label
                htmlFor="budgetRange"
                className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide"
              >
                Budget Range <span className="text-red-500">*</span>
              </label>
              <select
                id="budgetRange"
                {...register('budgetRange', {
                  required: 'Please select a budget range',
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white ${
                  errors.budgetRange
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
              >
                {budgetRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              {errors.budgetRange && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.budgetRange.message}
                </p>
              )}
            </section>
          </section>

          {/* Preferred Location Field */}
          <section>
            <label
              htmlFor="preferredLocation"
              className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide"
            >
              Preferred Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="preferredLocation"
              {...register('preferredLocation', {
                required: 'Preferred location is required',
                minLength: {
                  value: 2,
                  message: 'Location must be at least 2 characters',
                },
                maxLength: {
                  value: 100,
                  message: 'Location must not exceed 100 characters',
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                errors.preferredLocation
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="e.g., Downtown, Suburbs, Beachfront"
            />
            {errors.preferredLocation && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.preferredLocation.message}
              </p>
            )}
          </section>

          {/* Message Field */}
          <section>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              {...register('message', {
                maxLength: {
                  value: 1000,
                  message: 'Message must not exceed 1000 characters',
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none ${
                errors.message
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Tell us about your specific requirements, preferred amenities, or any questions you have..."
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.message.message}
              </p>
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
                Submitting...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Submit Enquiry
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </span>
            )}
          </button>

          <p className="text-sm text-gray-500 text-center tracking-wide">
            By submitting this form, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </article>
    </section>
  );
};

export default RealEstateLeadForm;

