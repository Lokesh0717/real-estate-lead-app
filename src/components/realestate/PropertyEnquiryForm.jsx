import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addDocument } from '../../firebase/firestore';

const PropertyEnquiryForm = () => {
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const budgetRanges = [
    { value: '', label: 'Select Budget Range' },
    { value: 'under-50lakhs', label: 'Under ₹50 Lakhs' },
    { value: '50lakhs-1cr', label: '₹50 Lakhs - ₹1 Crore' },
    { value: '1cr-2cr', label: '₹1 Crore - ₹2 Crore' },
    { value: '2cr-5cr', label: '₹2 Crore - ₹5 Crore' },
    { value: '5cr-10cr', label: '₹5 Crore - ₹10 Crore' },
    { value: 'above-10cr', label: 'Above ₹10 Crore' },
  ];

  const onSubmit = async (data) => {
    try {
      setSubmitStatus({ type: null, message: '' });

      // Prepare lead data for Firestore
      const leadData = {
        name: data.fullName.trim(),
        phone: data.phone.trim(),
        email: data.email.trim().toLowerCase(),
        propertyType: data.propertyType,
        budget: data.budgetRange,
        message: data.message ? data.message.trim() : '',
        status: 'New', // Default status for new leads
      };

      // Add document to Firestore 'leads' collection
      const result = await addDocument('leads', leadData);

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! We\'ll contact you shortly to discuss your property needs.',
        });

        // Reset form after successful submission
        reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 5000);
      } else {
        throw new Error(result.error || 'Failed to submit your enquiry');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Provide user-friendly error messages
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.code) {
        switch (error.code) {
          case 'permission-denied':
            errorMessage = 'Permission denied. Please check your Firebase rules.';
            break;
          case 'unavailable':
            errorMessage = 'Service temporarily unavailable. Please try again later.';
            break;
          default:
            errorMessage = `Error: ${error.code}`;
        }
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage,
      });
      
      // Clear error message after 8 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 8000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="max-w-2xl mx-auto">
          <header className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
              Get In Touch
            </h2>
            <p className="text-xl text-white/90 leading-relaxed tracking-wide">
              Let us help you find your perfect property
            </p>
          </header>

          <article className="glass-card rounded-2xl shadow-soft p-8 md:p-10 lg:p-12 backdrop-blur-xl border border-white/20">
            {submitStatus.type && (
              <section
                className={`p-4 rounded-lg border-2 mb-6 ${
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm ${
                      errors.fullName
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm ${
                      errors.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm ${
                      errors.propertyType
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select property type</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                    <option value="rent">Rent</option>
                  </select>
                  {errors.propertyType && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm ${
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
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none bg-white/50 backdrop-blur-sm ${
                    errors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="Tell us about your property requirements, preferred location, or any specific needs..."
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
                  'Submit Enquiry'
                )}
              </button>
            </form>
          </article>
        </section>
      </section>
    </section>
  );
};

export default PropertyEnquiryForm;

