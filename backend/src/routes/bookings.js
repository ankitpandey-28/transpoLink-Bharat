/**
 * Booking Routes
 * Handles booking requests between drivers and businessmen
 */

import express from 'express';
import Booking from '../models/Booking.js';
import Truck from '../models/Truck.js';
import Goods from '../models/Goods.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking request
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    console.log('📥 Booking request received from user:', req.user._id);
    console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
    
    const {
      bookingType,
      truck,
      goods,
      requestedTo,
      pickupLocation,
      deliveryLocation,
      pickupDate,
      deliveryDate,
      agreedPrice,
      contactDetails,
      notes
    } = req.body;

    // Validate booking type
    if (!['truck-booking', 'goods-booking'].includes(bookingType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking type'
      });
    }

    // Validate based on booking type
    if (bookingType === 'truck-booking' && !truck) {
      return res.status(400).json({
        success: false,
        message: 'Truck ID is required for truck booking'
      });
    }

    if (bookingType === 'goods-booking' && !goods) {
      return res.status(400).json({
        success: false,
        message: 'Goods ID is required for goods booking'
      });
    }

    // Create booking
    const booking = await Booking.create({
      bookingType,
      truck,
      goods,
      requestedBy: req.user._id,
      requestedTo,
      pickupLocation,
      deliveryLocation,
      pickupDate,
      deliveryDate,
      agreedPrice,
      contactDetails,
      notes
    });

    // Populate references
    await booking.populate([
      { path: 'requestedBy', select: 'name email phone userType' },
      { path: 'requestedTo', select: 'name email phone userType' },
      { path: 'truck', select: 'vehicleType vehicleNumber capacity currentLocation' },
      { path: 'goods', select: 'cargoType weight pickupLocation deliveryLocation' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Booking request sent successfully',
      data: booking
    });
  } catch (error) {
    console.error('❌ Create booking error:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings for current user (sent and received)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { type, status } = req.query;

    let query = {
      $or: [
        { requestedBy: req.user._id },
        { requestedTo: req.user._id }
      ]
    };

    if (type) {
      query.bookingType = type;
    }

    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('requestedBy', 'name email phone userType companyName')
      .populate('requestedTo', 'name email phone userType companyName')
      .populate('truck', 'vehicleType vehicleNumber vehicleModel capacity currentLocation pricePerKm')
      .populate('goods', 'cargoType weight pickupLocation deliveryLocation estimatedPrice')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

// @route   GET /api/bookings/received
// @desc    Get booking requests received by current user
// @access  Private
router.get('/received', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      requestedTo: req.user._id,
      status: 'pending'
    })
      .populate('requestedBy', 'name email phone userType companyName')
      .populate('truck', 'vehicleType vehicleNumber vehicleModel capacity')
      .populate('goods', 'cargoType weight pickupLocation deliveryLocation')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get received bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch received bookings',
      error: error.message
    });
  }
});

// @route   GET /api/bookings/sent
// @desc    Get booking requests sent by current user
// @access  Private
router.get('/sent', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      requestedBy: req.user._id
    })
      .populate('requestedTo', 'name email phone userType companyName')
      .populate('truck', 'vehicleType vehicleNumber vehicleModel capacity')
      .populate('goods', 'cargoType weight pickupLocation deliveryLocation')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get sent bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sent bookings',
      error: error.message
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('requestedBy', 'name email phone userType companyName')
      .populate('requestedTo', 'name email phone userType companyName')
      .populate('truck')
      .populate('goods');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is part of this booking
    if (
      booking.requestedBy._id.toString() !== req.user._id.toString() &&
      booking.requestedTo._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message
    });
  }
});

// @route   PUT /api/bookings/:id/accept
// @desc    Accept a booking request
// @access  Private
router.put('/:id/accept', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only the person who received the request can accept
    if (booking.requestedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to accept this booking'
      });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot accept booking with status: ${booking.status}`
      });
    }

    await booking.accept(req.body.message);

    // Update truck or goods status
    if (booking.bookingType === 'truck-booking' && booking.truck) {
      await Truck.findByIdAndUpdate(booking.truck, { status: 'booked' });
    } else if (booking.bookingType === 'goods-booking' && booking.goods) {
      await Goods.findByIdAndUpdate(booking.goods, { status: 'assigned' });
    }

    await booking.populate([
      { path: 'requestedBy', select: 'name email phone' },
      { path: 'requestedTo', select: 'name email phone' }
    ]);

    res.json({
      success: true,
      message: 'Booking accepted successfully',
      data: booking
    });
  } catch (error) {
    console.error('Accept booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to accept booking',
      error: error.message
    });
  }
});

// @route   PUT /api/bookings/:id/reject
// @desc    Reject a booking request
// @access  Private
router.put('/:id/reject', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only the person who received the request can reject
    if (booking.requestedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to reject this booking'
      });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot reject booking with status: ${booking.status}`
      });
    }

    await booking.reject(req.body.message);

    await booking.populate([
      { path: 'requestedBy', select: 'name email phone' },
      { path: 'requestedTo', select: 'name email phone' }
    ]);

    res.json({
      success: true,
      message: 'Booking rejected',
      data: booking
    });
  } catch (error) {
    console.error('Reject booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject booking',
      error: error.message
    });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking request
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only the person who created the request can cancel
    if (booking.requestedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    await booking.cancel();

    // Update truck or goods status back to available
    if (booking.status === 'accepted') {
      if (booking.bookingType === 'truck-booking' && booking.truck) {
        await Truck.findByIdAndUpdate(booking.truck, { status: 'available' });
      } else if (booking.bookingType === 'goods-booking' && booking.goods) {
        await Goods.findByIdAndUpdate(booking.goods, { status: 'posted' });
      }
    }

    res.json({
      success: true,
      message: 'Booking cancelled',
      data: booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message
    });
  }
});

// @route   PUT /api/bookings/:id/complete
// @desc    Mark booking as completed
// @access  Private
router.put('/:id/complete', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Both parties can mark as complete
    if (
      booking.requestedBy.toString() !== req.user._id.toString() &&
      booking.requestedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to complete this booking'
      });
    }

    if (booking.status !== 'accepted') {
      return res.status(400).json({
        success: false,
        message: 'Can only complete accepted bookings'
      });
    }

    await booking.complete();

    // Update truck or goods status
    if (booking.bookingType === 'truck-booking' && booking.truck) {
      await Truck.findByIdAndUpdate(booking.truck, { status: 'available' });
    } else if (booking.bookingType === 'goods-booking' && booking.goods) {
      await Goods.findByIdAndUpdate(booking.goods, { status: 'delivered' });
    }

    res.json({
      success: true,
      message: 'Booking marked as completed',
      data: booking
    });
  } catch (error) {
    console.error('Complete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete booking',
      error: error.message
    });
  }
});

export default router;
