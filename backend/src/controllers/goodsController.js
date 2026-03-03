/**
 * Goods Controller
 * Handles posted goods/cargo operations
 */

import Goods from '../models/Goods.js';

/**
 * @desc    Get all goods
 * @route   GET /api/goods
 * @access  Public
 */
export const getGoods = async (req, res) => {
  try {
    // Build query
    const query = { status: { $ne: 'cancelled' } };

    // Filter by cargo type
    if (req.query.cargoType) {
      query.cargoType = req.query.cargoType;
    }

    // Filter by pickup city
    if (req.query.from) {
      query['pickupLocation.city'] = new RegExp(req.query.from, 'i');
    }

    // Filter by delivery city
    if (req.query.to) {
      query['deliveryLocation.city'] = new RegExp(req.query.to, 'i');
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    const goods = await Goods.find(query)
      .populate('postedBy', 'name phone email companyName')
      .populate('assignedDriver', 'name phone vehicleType')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: goods.length,
      data: goods
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Get single goods by ID
 * @route   GET /api/goods/:id
 * @access  Public
 */
export const getGoodsById = async (req, res) => {
  try {
    const goods = await Goods.findById(req.params.id)
      .populate('postedBy', 'name phone email companyName')
      .populate('assignedDriver', 'name phone vehicleType licenseNumber');

    if (!goods) {
      return res.status(404).json({
        success: false,
        message: 'Goods not found'
      });
    }

    res.status(200).json({
      success: true,
      data: goods
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Create new goods posting
 * @route   POST /api/goods
 * @access  Private (Client only)
 */
export const createGoods = async (req, res) => {
  try {
    // Check if user is a businessman
    if (req.user.userType !== 'businessman') {
      return res.status(403).json({
        success: false,
        message: 'Only business owners can post goods'
      });
    }

    // Add user to req.body
    req.body.postedBy = req.user.id;

    const goods = await Goods.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Goods posted successfully',
      data: goods
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Update goods
 * @route   PUT /api/goods/:id
 * @access  Private
 */
export const updateGoods = async (req, res) => {
  try {
    let goods = await Goods.findById(req.params.id);

    if (!goods) {
      return res.status(404).json({
        success: false,
        message: 'Goods not found'
      });
    }

    // Check if user owns the goods
    if (goods.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this goods'
      });
    }

    goods = await Goods.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Goods updated successfully',
      data: goods
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Delete goods
 * @route   DELETE /api/goods/:id
 * @access  Private
 */
export const deleteGoods = async (req, res) => {
  try {
    const goods = await Goods.findById(req.params.id);

    if (!goods) {
      return res.status(404).json({
        success: false,
        message: 'Goods not found'
      });
    }

    // Check if user owns the goods
    if (goods.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this goods'
      });
    }

    await goods.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Goods deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Assign driver to goods
 * @route   POST /api/goods/:id/assign
 * @access  Private (Client only)
 */
export const assignDriver = async (req, res) => {
  try {
    const { driverId } = req.body;

    const goods = await Goods.findById(req.params.id);

    if (!goods) {
      return res.status(404).json({
        success: false,
        message: 'Goods not found'
      });
    }

    // Check if user owns the goods
    if (goods.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to assign driver'
      });
    }

    goods.assignedDriver = driverId;
    goods.status = 'assigned';
    await goods.save();

    res.status(200).json({
      success: true,
      message: 'Driver assigned successfully',
      data: goods
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
