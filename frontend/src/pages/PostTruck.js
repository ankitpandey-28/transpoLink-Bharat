import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  MapPin, 
  Phone, 
  Calendar, 
  DollarSign, 
  FileText, 
  User, 
  AlertCircle,
  CheckCircle,
  Upload
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { trucksAPI } from '../utils/api';
import toast from 'react-hot-toast';

/**
 * PostTruck Component
 * Allows truck owners/drivers to post their available trucks for businesses to find
 * Includes full language support (English/Hindi) via the global translation system
 */
const PostTruck = () => {
  const { t } = useUser();

  // Form state management
  const [formData, setFormData] = useState({
    truckTitle: '',
    truckType: '',
    capacity: '',
    fromLocation: '',
    toLocation: '',
    route: '',
    availableFrom: '',
    pricePerKm: '',
    contactNumber: '',
    alternateContact: '',
    truckRegistration: '',
    driverName: '',
    additionalDetails: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Indian truck type options
  const truckTypes = [
    { value: 'tata-ace', label: 'Tata Ace / Chota Hathi (750 kg - 1 ton)' },
    { value: 'pickup', label: 'Pickup / Chhota Truck (1-2 ton)' },
    { value: 'mini-truck', label: 'Mini Truck (2-3 ton)' },
    { value: 'truck', label: 'Truck / LCV (3-7 ton)' },
    { value: 'container', label: 'Container / Closed Body (7-10 ton)' },
    { value: 'trailer', label: 'Trailer / Heavy Vehicle (10-20 ton)' },
    { value: 'multi-axle', label: 'Multi-Axle / ODC (20+ ton)' },
    { value: 'tanker', label: 'Tanker (Liquid Transport)' },
    { value: 'refrigerated', label: 'Refrigerated / Cold Storage' },
    { value: 'tempo', label: 'Tempo / Auto Rickshaw (Small loads)' }
  ];

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Helper function to parse location string
  const parseLocation = (locationString) => {
    if (!locationString || locationString.trim() === '') {
      return null;
    }
    const parts = locationString.split(',').map(s => s.trim());
    return {
      address: locationString,
      city: parts[0] || 'Unknown',
      state: parts[1] || 'India',
      pincode: parts[2] || '000000'
    };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Map truck type to backend enum (mini-truck, pickup, truck, container, trailer, tempo)
      const truckTypeMap = {
        'tata-ace': 'mini-truck',
        'pickup': 'pickup',
        'mini-truck': 'mini-truck',
        'truck': 'truck',
        'container': 'container',
        'trailer': 'trailer',
        'multi-axle': 'trailer',
        'tanker': 'trailer',
        'refrigerated': 'container',
        'tempo': 'tempo'
      };

      // Validate required fields
      if (!formData.truckRegistration) {
        toast.error('Truck registration number is required');
        setIsSubmitting(false);
        return;
      }
      if (!formData.fromLocation) {
        toast.error('From location is required');
        setIsSubmitting(false);
        return;
      }
      if (!formData.availableFrom) {
        toast.error('Available from date is required');
        setIsSubmitting(false);
        return;
      }

      // Prepare data for backend matching Truck model schema
      const truckData = {
        vehicleType: truckTypeMap[formData.truckType] || 'truck',
        vehicleNumber: formData.truckRegistration.toUpperCase().trim(),
        vehicleModel: formData.truckTitle || 'Standard Truck',
        capacity: {
          weight: parseFloat(formData.capacity) // Already in kg
        },
        currentLocation: parseLocation(formData.fromLocation),
        destinationLocation: formData.toLocation ? parseLocation(formData.toLocation) : undefined,
        availableFrom: formData.availableFrom,
        pricePerKm: parseInt(formData.pricePerKm) || 0,
        features: {
          refrigerated: formData.truckType === 'refrigerated',
          covered: formData.truckType === 'container' || formData.truckType === 'truck',
          gpsTracking: true // Default
        },
        driverContact: {
          name: formData.driverName,
          phone: formData.contactNumber,
          alternatePhone: formData.alternateContact
        },
        notes: formData.additionalDetails
      };

      console.log('Sending truck data:', truckData); // Debug log

      // Call backend API
      const response = await trucksAPI.create(truckData);

      if (response.success) {
        setSubmitSuccess(true);
        toast.success(t('postTruckSuccess'), {
          duration: 4000,
          position: 'top-center',
        });

        // Reset form after 2 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          setFormData({
            truckTitle: '',
            truckType: '',
            capacity: '',
            fromLocation: '',
            toLocation: '',
            route: '',
            availableFrom: '',
            pricePerKm: '',
            contactNumber: '',
            alternateContact: '',
            truckRegistration: '',
            driverName: '',
            additionalDetails: ''
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to post truck:', error);
      
      // Extract error message
      let errorMessage = 'Failed to post truck. Please try again.';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-green to-green-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Truck className="w-10 h-10 text-primary-green" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {t('postTruck')}
            </h1>
            <p className="text-xl text-green-50 max-w-2xl mx-auto">
              {t('postTruckDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-6 h-6 text-primary-green mr-2" />
                  {t('truckInformation')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Truck Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('truckTitle')} *
                    </label>
                    <input
                      type="text"
                      value={formData.truckTitle}
                      onChange={(e) => handleInputChange('truckTitle', e.target.value)}
                      placeholder={t('truckTitlePlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Truck Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('truckType')} *
                    </label>
                    <select
                      value={formData.truckType}
                      onChange={(e) => handleInputChange('truckType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                      required
                    >
                      <option value="">{t('selectTruckType')}</option>
                      {truckTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Capacity in KG */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacity (in kg) *
                    </label>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange('capacity', e.target.value)}
                      placeholder="e.g., 5000 (for 5 ton truck)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                      required
                      min="100"
                      step="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter capacity in kilograms (1 ton = 1000 kg)</p>
                  </div>

                  {/* From and To Locations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        {t('fromLocation')} *
                      </label>
                      <input
                        type="text"
                        value={formData.fromLocation}
                        onChange={(e) => handleInputChange('fromLocation', e.target.value)}
                        placeholder={t('fromLocationPlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        {t('toLocation')} *
                      </label>
                      <input
                        type="text"
                        value={formData.toLocation}
                        onChange={(e) => handleInputChange('toLocation', e.target.value)}
                        placeholder={t('toLocationPlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Route */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('route')}
                    </label>
                    <input
                      type="text"
                      value={formData.route}
                      onChange={(e) => handleInputChange('route', e.target.value)}
                      placeholder={t('routePlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Available From Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Available From *
                    </label>
                    <input
                      type="date"
                      value={formData.availableFrom}
                      onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Select the date from which your truck is available</p>
                  </div>

                  {/* Price per KM */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      {t('pricePerKm')} *
                    </label>
                    <input
                      type="number"
                      value={formData.pricePerKm}
                      onChange={(e) => handleInputChange('pricePerKm', e.target.value)}
                      placeholder={t('pricePerKmPlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                      required
                      min="0"
                      step="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter price in whole rupees (e.g., 20, 25, 30)</p>
                  </div>

                  {/* Contact Numbers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        {t('contactNumber')} *
                      </label>
                      <input
                        type="tel"
                        value={formData.contactNumber}
                        onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                        placeholder={t('contactNumberPlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        {t('alternateContact')}
                      </label>
                      <input
                        type="tel"
                        value={formData.alternateContact}
                        onChange={(e) => handleInputChange('alternateContact', e.target.value)}
                        placeholder={t('contactNumberPlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Truck Registration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('truckRegistration')} *
                    </label>
                    <input
                      type="text"
                      value={formData.truckRegistration}
                      onChange={(e) => handleInputChange('truckRegistration', e.target.value)}
                      placeholder={t('truckRegistrationPlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Driver Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      {t('driverName')} *
                    </label>
                    <input
                      type="text"
                      value={formData.driverName}
                      onChange={(e) => handleInputChange('driverName', e.target.value)}
                      placeholder={t('driverNamePlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Additional Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('additionalDetails')}
                    </label>
                    <textarea
                      value={formData.additionalDetails}
                      onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                      placeholder={t('additionalDetailsPlaceholder')}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-primary-green text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t('loading')}
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          {t('submitTruck')}
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Success Message */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-green-800 font-medium">
                      {t('postTruckSuccess')}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Tips Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-blue-50 rounded-xl shadow-lg p-6 sticky top-24">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      {t('tipsForTruckOwners')}
                    </h3>
                    <ul className="text-blue-800 space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{t('truckTip1')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{t('truckTip2')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{t('truckTip3')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{t('truckTip4')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{t('truckTip5')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostTruck;
