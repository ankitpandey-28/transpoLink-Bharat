import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  Calendar, 
  DollarSign, 
  User, 
  Phone, 
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Mail
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { bookingsAPI } from '../utils/api';
import toast from 'react-hot-toast';

const Bookings = () => {
  const { user, userType } = useUser();
  const [activeTab, setActiveTab] = useState('current');
  const [receivedBookings, setReceivedBookings] = useState([]);
  const [sentBookings, setSentBookings] = useState([]);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const [receivedRes, sentRes] = await Promise.all([
        bookingsAPI.getReceived(),
        bookingsAPI.getSent()
      ]);

      const received = receivedRes.data || [];
      const sent = sentRes.data || [];

      setReceivedBookings(received);
      setSentBookings(sent);

      // Current bookings = all accepted bookings (both received and sent)
      const current = [...received, ...sent].filter(
        booking => booking.status === 'accepted'
      );
      setCurrentBookings(current);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (bookingId) => {
    try {
      const response = await bookingsAPI.accept(bookingId, 'I accept your booking request!');
      
      if (response.success) {
        toast.success('Booking accepted successfully!');
        fetchBookings(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to accept booking:', error);
      toast.error(error.response?.data?.message || 'Failed to accept booking');
    }
  };

  const handleReject = async (bookingId) => {
    const reason = prompt('Please provide a reason for rejection (optional):');
    
    try {
      const response = await bookingsAPI.reject(bookingId, reason || 'Sorry, not available');
      
      if (response.success) {
        toast.success('Booking rejected');
        fetchBookings(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to reject booking:', error);
      toast.error(error.response?.data?.message || 'Failed to reject booking');
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const response = await bookingsAPI.cancel(bookingId);
      
      if (response.success) {
        toast.success('Booking cancelled');
        fetchBookings(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const handleComplete = async (bookingId) => {
    if (!window.confirm('Mark this booking as completed?')) {
      return;
    }

    try {
      const response = await bookingsAPI.complete(bookingId);
      
      if (response.success) {
        toast.success('Booking marked as completed!');
        fetchBookings(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to complete booking:', error);
      toast.error(error.response?.data?.message || 'Failed to complete booking');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-4 h-4" />, text: 'Pending' },
      accepted: { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-4 h-4" />, text: 'Accepted' },
      rejected: { color: 'bg-red-100 text-red-800', icon: <XCircle className="w-4 h-4" />, text: 'Rejected' },
      cancelled: { color: 'bg-gray-100 text-gray-800', icon: <XCircle className="w-4 h-4" />, text: 'Cancelled' },
      completed: { color: 'bg-blue-100 text-blue-800', icon: <CheckCircle className="w-4 h-4" />, text: 'Completed' }
    };

    const badge = badges[status] || badges.pending;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
        {badge.icon}
        {badge.text}
      </span>
    );
  };

  const renderBookingCard = (booking, isReceived) => {
    const isTruckBooking = booking.bookingType === 'truck-booking';
    const otherParty = isReceived ? booking.requestedBy : booking.requestedTo;

    return (
      <motion.div
        key={booking._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isTruckBooking ? 'bg-blue-100' : 'bg-green-100'
            }`}>
              {isTruckBooking ? (
                <Truck className="w-6 h-6 text-blue-600" />
              ) : (
                <Package className="w-6 h-6 text-green-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {isTruckBooking ? 'Truck Booking' : 'Goods Booking'}
              </h3>
              <p className="text-sm text-gray-500">
                {isReceived ? 'Request from' : 'Request to'} {otherParty?.name}
              </p>
            </div>
          </div>
          {getStatusBadge(booking.status)}
        </div>

        {/* Item Details */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">
            {isTruckBooking ? (
              <>
                {booking.truck?.vehicleType?.replace(/-/g, ' ')} - {booking.truck?.vehicleNumber}
              </>
            ) : (
              <>
                {booking.goods?.cargoType} - {booking.goods?.weight} kg
              </>
            )}
          </h4>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {isTruckBooking ? (
                <span>{booking.pickupLocation?.city}, {booking.pickupLocation?.state}</span>
              ) : (
                <span>
                  {booking.pickupLocation?.city} → {booking.deliveryLocation?.city}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">Pickup Date</span>
            </div>
            <p className="text-gray-900">{new Date(booking.pickupDate).toLocaleDateString()}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-medium">Agreed Price</span>
            </div>
            <p className="text-gray-900 font-semibold">₹{booking.agreedPrice?.toLocaleString()}</p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-2">Contact Information</h5>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-4 h-4" />
              <span>{booking.contactDetails?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4" />
              <a href={`tel:${booking.contactDetails?.phone}`} className="hover:text-primary-green">
                {booking.contactDetails?.phone}
              </a>
            </div>
            {otherParty?.email && (
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${otherParty.email}`} className="hover:text-primary-green">
                  {otherParty.email}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> {booking.notes}
            </p>
          </div>
        )}

        {/* Response Message */}
        {booking.response?.message && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm text-gray-700">
              <strong>Response:</strong> {booking.response.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {isReceived && booking.status === 'pending' && (
            <>
              <button
                onClick={() => handleAccept(booking._id)}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Accept
              </button>
              <button
                onClick={() => handleReject(booking._id)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </>
          )}

          {!isReceived && booking.status === 'pending' && (
            <button
              onClick={() => handleCancel(booking._id)}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel Request
            </button>
          )}

          {booking.status === 'accepted' && (
            <>
              <button
                onClick={() => handleComplete(booking._id)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Completed
              </button>
              <a
                href={`tel:${booking.contactDetails?.phone}`}
                className="flex-1 bg-primary-green text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
            </>
          )}
        </div>

        {/* Timestamp */}
        <div className="mt-3 text-xs text-gray-500 text-center">
          Requested on {new Date(booking.createdAt).toLocaleString()}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your booking requests</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab('current')}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'current'
                ? 'text-primary-green border-b-2 border-primary-green'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Current Bookings ({currentBookings.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('received')}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'received'
                ? 'text-primary-green border-b-2 border-primary-green'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>Received ({receivedBookings.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'sent'
                ? 'text-primary-green border-b-2 border-primary-green'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Sent ({sentBookings.length})</span>
            </div>
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        ) : (
          <>
            {/* Current Bookings */}
            {activeTab === 'current' && (
              <div>
                {currentBookings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentBookings.map(booking => {
                      // Determine if this is a received or sent booking
                      const isReceived = booking.requestedTo?._id === user?.id || 
                                        booking.requestedTo?.email === user?.email;
                      return renderBookingCard(booking, isReceived);
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-lg">
                    <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No current bookings
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Accepted bookings will appear here
                    </p>
                    <a
                      href={userType === 'truck_driver' ? '/goods' : '/trucks'}
                      className="inline-block px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Browse {userType === 'truck_driver' ? 'Available Goods' : 'Available Trucks'}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Received Bookings */}
            {activeTab === 'received' && (
              <div>
                {receivedBookings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {receivedBookings.map(booking => renderBookingCard(booking, true))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-lg">
                    <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No booking requests received
                    </h3>
                    <p className="text-gray-600">
                      When someone books your {userType === 'truck_driver' ? 'truck' : 'goods'}, you'll see it here
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Sent Bookings */}
            {activeTab === 'sent' && (
              <div>
                {sentBookings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sentBookings.map(booking => renderBookingCard(booking, false))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-lg">
                    <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No booking requests sent
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start by booking a {userType === 'truck_driver' ? 'goods shipment' : 'truck'}
                    </p>
                    <a
                      href={userType === 'truck_driver' ? '/goods' : '/trucks'}
                      className="inline-block px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Browse {userType === 'truck_driver' ? 'Available Goods' : 'Available Trucks'}
                    </a>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Bookings;
