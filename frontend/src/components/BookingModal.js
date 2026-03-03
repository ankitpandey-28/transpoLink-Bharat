import React, { useState } from 'react';
import { X, Truck, Package, MapPin, Calendar, DollarSign, Phone, User } from 'lucide-react';
import { bookingsAPI } from '../utils/api';
import toast from 'react-hot-toast';

const BookingModal = ({ isOpen, onClose, item, bookingType, user }) => {
  const [formData, setFormData] = useState({
    pickupDate: '',
    deliveryDate: '',
    agreedPrice: '',
    contactName: user?.name || '',
    contactPhone: user?.phone || '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.pickupDate) {
        toast.error('Please select a pickup date');
        setIsSubmitting(false);
        return;
      }

      if (!formData.agreedPrice || parseFloat(formData.agreedPrice) <= 0) {
        toast.error('Please enter a valid price');
        setIsSubmitting(false);
        return;
      }

      if (!formData.contactName || !formData.contactPhone) {
        toast.error('Please enter your contact details');
        setIsSubmitting(false);
        return;
      }

      // Get the owner ID
      const ownerId = item.postedBy?._id || item.postedBy?.id || item.postedBy;
      
      if (!ownerId) {
        toast.error('Cannot find owner information');
        console.error('Item postedBy:', item.postedBy);
        setIsSubmitting(false);
        return;
      }

      const bookingData = {
        bookingType,
        [bookingType === 'truck-booking' ? 'truck' : 'goods']: item._id,
        requestedTo: ownerId,
        pickupLocation: bookingType === 'goods-booking' ? item.pickupLocation : item.currentLocation,
        deliveryLocation: bookingType === 'goods-booking' ? item.deliveryLocation : null,
        pickupDate: formData.pickupDate,
        deliveryDate: formData.deliveryDate || undefined,
        agreedPrice: parseFloat(formData.agreedPrice),
        contactDetails: {
          name: formData.contactName,
          phone: formData.contactPhone
        },
        notes: formData.notes
      };

      console.log('Sending booking data:', bookingData);

      const response = await bookingsAPI.create(bookingData);

      if (response.success) {
        toast.success('Booking request sent successfully!');
        onClose();
        // Reset form
        setFormData({
          pickupDate: '',
          deliveryDate: '',
          agreedPrice: '',
          contactName: user?.name || '',
          contactPhone: user?.phone || '',
          notes: ''
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
      console.error('Error details:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message || 'Failed to send booking request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-primary-green px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              {bookingType === 'truck-booking' ? (
                <><Truck className="w-5 h-5" /> Book Truck</>
              ) : (
                <><Package className="w-5 h-5" /> Book Goods</>
              )}
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="px-6 py-4">
            {/* Item Details */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-primary-green">
              <h4 className="font-semibold text-gray-900 mb-3">
                {bookingType === 'truck-booking' 
                  ? `Available ${item.vehicleType?.replace(/-/g, ' ') || 'Truck'} from ${item.currentLocation?.city || 'Location'} to ${item.currentLocation?.state || 'Destination'} - ${item.vehicleNumber || 'Vehicle'}`
                  : `${item.cargoType?.charAt(0).toUpperCase() + item.cargoType?.slice(1) || 'Cargo'} - ${item.weight} kg`
                }
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  {bookingType === 'truck-booking' ? (
                    <span>
                      {item.currentLocation?.city || 'City'}, {item.currentLocation?.state || 'State'}
                    </span>
                  ) : (
                    <span>
                      {item.pickupLocation?.city || 'Pickup'} → {item.deliveryLocation?.city || 'Delivery'}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span>Owner: {item.postedBy?.name || item.postedBy?.companyName || 'Owner'}</span>
                </div>
                {bookingType === 'truck-booking' && item.capacity?.weight && (
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 flex-shrink-0" />
                    <span>Capacity: {item.capacity.weight} kg</span>
                  </div>
                )}
                {bookingType === 'truck-booking' && item.pricePerKm && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 flex-shrink-0" />
                    <span>Rate: ₹{item.pricePerKm}/km</span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Pickup Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Pickup Date *
                </label>
                <input
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => handleChange('pickupDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Delivery Date */}
              {bookingType === 'goods-booking' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => handleChange('deliveryDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              )}

              {/* Agreed Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Agreed Price (₹) *
                </label>
                <input
                  type="number"
                  value={formData.agreedPrice}
                  onChange={(e) => handleChange('agreedPrice', e.target.value)}
                  placeholder="Enter agreed price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  required
                  min="0"
                  step="1"
                />
              </div>

              {/* Contact Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleChange('contactName', e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  required
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Your Phone *
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  placeholder="Your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  required
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Any special requirements or notes..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Booking Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
