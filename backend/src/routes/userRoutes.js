/**
 * User Routes
 * Handles user profile management
 */

import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getUsers); // Get all users (admin only in production)

router.route('/:id')
  .get(getUser)    // Get single user
  .put(updateUser)  // Update user
  .delete(deleteUser); // Delete user

export default router;
