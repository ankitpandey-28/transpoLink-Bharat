import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Building, 
  Truck, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  CheckCircle,
  CreditCard
} from 'lucide-react';
import { authAPI } from '../utils/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: '',
    companyName: '',
    licenseNumber: '',
    vehicleType: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, language } = useUser();

  const userTypes = [
    { 
      id: 'businessman', 
      label: language === 'hi' ? 'व्यवसाय मालिक' : 'Business Owner',
      icon: <Building className="w-5 h-5" />, 
      description: language === 'hi' ? 'मुझे सामान परिवहन की आवश्यकता है' : 'I need to transport goods'
    },
    { 
      id: 'truck_driver', 
      label: language === 'hi' ? 'ट्रक ड्राइवर' : 'Truck Driver',
      icon: <Truck className="w-5 h-5" />, 
      description: language === 'hi' ? 'मैं परिवहन सेवाएं प्रदान करता हूं' : 'I provide transport services'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = language === 'hi' ? 'पहला नाम आवश्यक है' : 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = language === 'hi' ? 'अंतिम नाम आवश्यक है' : 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = language === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'hi' ? 'कृपया एक वैध ईमेल पता दर्ज करें' : 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = language === 'hi' ? 'फोन नंबर आवश्यक है' : 'Phone number is required';
    }
    
    if (!formData.password) {
      newErrors.password = language === 'hi' ? 'पासवर्ड आवश्यक है' : 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = language === 'hi' ? 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए' : 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = language === 'hi' ? 'पासवर्ड की पुष्टि आवश्यक है' : 'Password confirmation is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = language === 'hi' ? 'पासवर्ड मेल नहीं खाते' : 'Passwords do not match';
    }
    
    if (!formData.userType) {
      newErrors.userType = language === 'hi' ? 'कृपया अपना उपयोगकर्ता प्रकार चुनें' : 'Please select your user type';
    }
    
    if (formData.userType === 'businessman' && !formData.companyName.trim()) {
      newErrors.companyName = language === 'hi' ? 'कंपनी का नाम आवश्यक है' : 'Company name is required for business accounts';
    }
    
    if (formData.userType === 'truck_driver' && !formData.licenseNumber.trim()) {
      newErrors.licenseNumber = language === 'hi' ? 'लाइसेंस नंबर आवश्यक है' : 'License number is required for truck drivers';
    }
    
    if (formData.userType === 'truck_driver' && !formData.vehicleType) {
      newErrors.vehicleType = language === 'hi' ? 'वाहन का प्रकार आवश्यक है' : 'Vehicle type is required for truck drivers';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = language === 'hi' ? 'आपको नियम और शर्तें स्वीकार करनी होंगी' : 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Prepare registration data
      const registrationData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        userType: formData.userType
      };
      
      // Add type-specific fields
      if (formData.userType === 'businessman') {
        registrationData.companyName = formData.companyName;
      } else if (formData.userType === 'truck_driver') {
        registrationData.licenseNumber = formData.licenseNumber;
        registrationData.vehicleType = formData.vehicleType;
      }
      
      // Call backend API
      const response = await authAPI.register(registrationData);
      
      if (response.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Login user with context
        login(response.data);
        
        // Redirect to home page
        navigate('/');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setErrors({ general: typeof error === 'string' ? error : (language === 'hi' ? 'साइन अप विफल हुआ। कृपया फिर से प्रयास करें।' : 'Signup failed. Please try again.') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'hi' ? 'वापस जाएँ' : 'Back to Home'}
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'hi' ? 'TranspoLink में शामिल हों' : 'Join TranspoLink'}
          </h2>
          <p className="text-gray-600">
            {language === 'hi' ? 'नया खाता बनाएं' : 'Create your account'}
          </p>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white py-8 px-6 shadow-lg rounded-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {language === 'hi' ? 'मैं हूं...' : 'I am a...'}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {userTypes.map((type) => (
                  <label
                    key={type.id}
                    className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all duration-200 ${
                      formData.userType === type.id
                        ? 'border-primary-green ring-2 ring-primary-green ring-opacity-50 bg-green-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type.id}
                      checked={formData.userType === type.id}
                      onChange={(e) => handleInputChange('userType', e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          formData.userType === type.id
                            ? 'border-primary-green bg-primary-green'
                            : 'border-gray-300'
                        }`}>
                          {formData.userType === type.id && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                      <div className="ml-3 flex flex-col">
                        <span className={`block text-sm font-medium ${
                          formData.userType === type.id ? 'text-primary-green' : 'text-gray-900'
                        }`}>
                          {type.label}
                        </span>
                        <span className="block text-sm text-gray-500">
                          {type.description}
                        </span>
                      </div>
                    </div>
                    {formData.userType === type.id && (
                      <CheckCircle className="absolute top-4 right-4 h-5 w-5 text-primary-green" />
                    )}
                  </label>
                ))}
              </div>
              {errors.userType && (
                <p className="mt-2 text-sm text-red-600">{errors.userType}</p>
              )}
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'पहला नाम' : 'First Name'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
                      errors.firstName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={language === 'hi' ? 'पहला नाम' : 'First name'}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'अंतिम नाम' : 'Last Name'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
                      errors.lastName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={language === 'hi' ? 'अंतिम नाम' : 'Last name'}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Company Name (for business users) */}
            {formData.userType === 'businessman' && (
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'कंपनी का नाम' : 'Company Name'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    autoComplete="organization"
                    required
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
                      errors.companyName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={language === 'hi' ? 'कंपनी का नाम' : 'Company name'}
                  />
                </div>
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                )}
              </div>
            )}

            {/* Truck Driver Fields */}
            {formData.userType === 'truck_driver' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* License Number */}
                <div>
                  <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'लाइसेंस नंबर' : 'License Number'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="licenseNumber"
                      name="licenseNumber"
                      type="text"
                      required
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
                        errors.licenseNumber ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder={language === 'hi' ? 'DL-1234567890123' : 'DL-1234567890123'}
                    />
                  </div>
                  {errors.licenseNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>
                  )}
                </div>

                {/* Vehicle Type */}
                <div>
                  <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'वाहन का प्रकार' : 'Vehicle Type'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Truck className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      required
                      value={formData.vehicleType}
                      onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
                        errors.vehicleType ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">{language === 'hi' ? 'वाहन प्रकार चुनें' : 'Select vehicle type'}</option>
                      <option value="mini-truck">{language === 'hi' ? 'मिनी ट्रक' : 'Mini Truck'}</option>
                      <option value="pickup">{language === 'hi' ? 'पिकअप' : 'Pickup'}</option>
                      <option value="truck">{language === 'hi' ? 'ट्रक' : 'Truck'}</option>
                      <option value="container">{language === 'hi' ? 'कंटेनर' : 'Container'}</option>
                      <option value="trailer">{language === 'hi' ? 'ट्रेलर' : 'Trailer'}</option>
                    </select>
                  </div>
                  {errors.vehicleType && (
                    <p className="mt-1 text-sm text-red-600">{errors.vehicleType}</p>
                  )}
                </div>
              </div>
            )}

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'ईमेल पता' : 'Email Address'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={language === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'फोन नंबर' : 'Phone Number'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={language === 'hi' ? '+91 98765 43210' : '+91 98765 43210'}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'पासवर्ड' : 'Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={language === 'hi' ? 'पासवर्ड बनाएं' : 'Create a password'}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'पासवर्ड की पुष्टि करें' : 'Confirm Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200 ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={language === 'hi' ? 'अपना पासवर्ड पुष्टि करें' : 'Confirm your password'}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  className="h-4 w-4 text-primary-green focus:ring-primary-green border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="acceptTerms" className="text-gray-700">
                  {language === 'hi' ? 'मैं सेवा की शर्तें और गोपनीयता नीति से सहमत हूं' : 'I agree to the Terms of Service and Privacy Policy'}
                </label>
                {errors.acceptTerms && (
                  <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
                )}
              </div>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="text-sm text-red-600 text-center bg-red-50 py-2 px-3 rounded-md">
                {errors.general}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  language === 'hi' ? 'खाता बनाएं' : 'Create Account'
                )}
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {language === 'hi' ? 'क्या आपका पहले से खाता है?' : 'Already have an account?'}{' '}
              <Link
                to="/login"
                className="font-medium text-primary-green hover:text-primary-green-dark transition-colors duration-200"
              >
                {language === 'hi' ? 'साइन इन करें' : 'Sign in'}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup; 