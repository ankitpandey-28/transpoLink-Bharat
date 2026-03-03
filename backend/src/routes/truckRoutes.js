/**
 * Truck Routes
 * Handles posted trucks/vehicles management
 */

import express from 'express';
import {
  getTrucks,
  getTruckById,
  createTruck,
  updateTruck,
  deleteTruck,
  updateAvailability
} from '../controllers/truckController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.route('/')
  .get(getTrucks);      // Get all available trucks

// Protected routes
router.use(protect);

router.route('/')
  .post(createTruck);   // Post new truck (drivers only - checked in controller)

router.route('/:id')
  .get(getTruckById)    // Get single truck details
  .put(updateTruck)     // Update truck
  .delete(deleteTruck); // Delete truck

router.route('/:id/availability')
  .patch(updateAvailability); // Update truck availability status

export default router;
