/**
 * User Model
 * Schema for user accounts (drivers and clients)
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Don't return password by default
    },
    userType: {
      type: String,
      enum: ['truck_driver', 'businessman'],
      required: [true, 'Please specify user type']
    },
    // Driver-specific fields
    licenseNumber: {
      type: String,
      required: function() {
        return this.userType === 'truck_driver';
      }
    },
    vehicleType: {
      type: String,
      enum: ['mini-truck', 'pickup', 'truck', 'container', 'trailer'],
      required: function() {
        return this.userType === 'truck_driver';
      }
    },
    // Businessman-specific fields
    companyName: {
      type: String,
      required: function() {
        return this.userType === 'businessman';
      }
    },
    gstNumber: {
      type: String
    },
    // Common fields
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalRatings: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt
  }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
