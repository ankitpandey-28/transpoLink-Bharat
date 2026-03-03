/**
 * Booking Model
 * Handles bookings between truck drivers and businessmen
 */

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  // Type of booking
  bookingType: {
    type: String,
    enum: ['truck-booking', 'goods-booking'],
    required: true
  },

  // For truck bookings (businessman books a truck)
  truck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck'
  },

  // For goods bookings (driver books goods to transport)
  goods: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goods'
  },

  // Who initiated the booking
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Who needs to confirm
  requestedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Booking status
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled', 'completed'],
    default: 'pending'
  },

  // Pickup and delivery details
  pickupLocation: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },

  deliveryLocation: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },

  // Dates
  pickupDate: {
    type: Date,
    required: true
  },

  deliveryDate: Date,

  // Pricing
  agreedPrice: {
    type: Number,
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ['pending', 'advance-paid', 'paid', 'refunded'],
    default: 'pending'
  },

  // Contact details
  contactDetails: {
    name: String,
    phone: String,
    email: String
  },

  // Additional notes
  notes: String,

  // Response from the other party
  response: {
    message: String,
    respondedAt: Date
  },

  // Timestamps for status changes
  acceptedAt: Date,
  rejectedAt: Date,
  cancelledAt: Date,
  completedAt: Date

}, {
  timestamps: true
});

// Indexes for faster queries
bookingSchema.index({ requestedBy: 1, status: 1 });
bookingSchema.index({ requestedTo: 1, status: 1 });
bookingSchema.index({ truck: 1 });
bookingSchema.index({ goods: 1 });
bookingSchema.index({ createdAt: -1 });

// Virtual for booking age
bookingSchema.virtual('age').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)); // days
});

// Method to accept booking
bookingSchema.methods.accept = function(message) {
  this.status = 'accepted';
  this.acceptedAt = new Date();
  if (message) {
    this.response = {
      message,
      respondedAt: new Date()
    };
  }
  return this.save();
};

// Method to reject booking
bookingSchema.methods.reject = function(message) {
  this.status = 'rejected';
  this.rejectedAt = new Date();
  if (message) {
    this.response = {
      message,
      respondedAt: new Date()
    };
  }
  return this.save();
};

// Method to cancel booking
bookingSchema.methods.cancel = function() {
  this.status = 'cancelled';
  this.cancelledAt = new Date();
  return this.save();
};

// Method to complete booking
bookingSchema.methods.complete = function() {
  this.status = 'completed';
  this.completedAt = new Date();
  return this.save();
};

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
