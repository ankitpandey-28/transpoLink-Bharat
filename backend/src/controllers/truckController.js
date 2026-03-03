/**
 * Truck Controller
 * Handles posted trucks/vehicles operations
 */

import Truck from '../models/Truck.js';

/**
 * @desc    Get all trucks
 * @route   GET /api/trucks
 * @access  Public
 */
export const getTrucks = async (req, res) => {
  try {
    // Build query
    const query = { status: { $ne: 'inactive' } };

    // Filter by vehicle type
    if (req.query.vehicleType) {
      query.vehicleType = req.query.vehicleType;
    }

    // Filter by city
    if (req.query.city) {
      query['currentLocation.city'] = new RegExp(req.query.city, 'i');
    }

    // Filter by availability
    if (req.query.isAvailable) {
      query.isAvailable = req.query.isAvailable === 'true';
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    const trucks = await Truck.find(query)
      .populate('postedBy', 'name phone email licenseNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trucks.length,
      data: trucks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Get single truck by ID
 * @route   GET /api/trucks/:id
 * @access  Public
 */
export const getTruckById = async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id)
      .populate('postedBy', 'name phone email licenseNumber rating')
      .populate('currentTrip.goodsId');

    if (!truck) {
      return res.status(404).json({
        success: false,
        message: 'Truck not found'
      });
    }

    res.status(200).json({
      success: true,
      data: truck
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Create new truck posting
 * @route   POST /api/trucks
 * @access  Private (Driver only)
 */
export const createTruck = async (req, res) => {
  try {
    // Check if user is a truck driver
    if (req.user.userType !== 'truck_driver') {
      return res.status(403).json({
        success: false,
        message: 'Only truck drivers can post trucks'
      });
    }

    // Check if vehicle number already exists
    const existingTruck = await Truck.findOne({ vehicleNumber: req.body.vehicleNumber });
    if (existingTruck) {
      return res.status(400).json({
        success: false,
        message: 'Truck with this vehicle number already exists'
      });
    }

    // Add user to req.body
    req.body.postedBy = req.user.id;

    const truck = await Truck.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Truck posted successfully',
      data: truck
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Update truck
 * @route   PUT /api/trucks/:id
 * @access  Private
 */
export const updateTruck = async (req, res) => {
  try {
    let truck = await Truck.findById(req.params.id);

    if (!truck) {
      return res.status(404).json({
        success: false,
        message: 'Truck not found'
      });
    }

    // Check if user owns the truck
    if (truck.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this truck'
      });
    }

    truck = await Truck.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Truck updated successfully',
      data: truck
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Delete truck
 * @route   DELETE /api/trucks/:id
 * @access  Private
 */
export const deleteTruck = async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id);

    if (!truck) {
      return res.status(404).json({
        success: false,
        message: 'Truck not found'
      });
    }

    // Check if user owns the truck
    if (truck.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this truck'
      });
    }

    await truck.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Truck deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Update truck availability
 * @route   PATCH /api/trucks/:id/availability
 * @access  Private
 */
export const updateAvailability = async (req, res) => {
  try {
    const { isAvailable, status } = req.body;

    const truck = await Truck.findById(req.params.id);

    if (!truck) {
      return res.status(404).json({
        success: false,
        message: 'Truck not found'
      });
    }

    // Check if user owns the truck
    if (truck.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this truck'
      });
    }

    if (isAvailable !== undefined) {
      truck.isAvailable = isAvailable;
    }

    if (status) {
      truck.status = status;
    }

    await truck.save();

    res.status(200).json({
      success: true,
      message: 'Truck availability updated successfully',
      data: truck
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
