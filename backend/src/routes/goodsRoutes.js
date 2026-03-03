/**
 * Goods Routes
 * Handles posted goods/cargo management
 */

import express from 'express';
import {
  getGoods,
  getGoodsById,
  createGoods,
  updateGoods,
  deleteGoods,
  assignDriver
} from '../controllers/goodsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.route('/')
  .get(getGoods);      // Get all available goods

// Protected routes
router.use(protect);

router.route('/')
  .post(createGoods);  // Post new goods (businessmen only - checked in controller)

router.route('/:id')
  .get(getGoodsById)   // Get single goods details
  .put(updateGoods)    // Update goods
  .delete(deleteGoods); // Delete goods

router.route('/:id/assign')
  .post(assignDriver); // Assign driver to goods

export default router;
