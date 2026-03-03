/**
 * Truck Model
 * Schema for posted trucks/vehicles available for hire
 */

import mongoose from 'mongoose';

const truckSchema = new mongoose.Schema(
  {
    // Posted by (Driver)
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    // Truck Details
    vehicleType: {
      type: String,
      required: [true, 'Please specify vehicle type'],
      enum: ['mini-truck', 'pickup', 'truck', 'container', 'trailer', 'tempo']
    },
    vehicleNumber: {
      type: String,
      required: [true, 'Please provide vehicle number'],
      unique: true,
      uppercase: true,
      trim: true
    },
    vehicleModel: {
      type: String,
      required: [true, 'Please provide vehicle model']
    },
    manufacturingYear: {
      type: Number,
      min: 1990,
      max: new Date().getFullYear()
    },
    // Capacity
    capacity: {
      weight: {
        type: Number,
        required: [true, 'Please specify weight capacity in kg']
      },
      volume: {
        type: Number // in cubic meters
      }
    },
    // Dimensions
    dimensions: {
      length: Number, // in feet
      width: Number,
      height: Number
    },
    // Current Location
    currentLocation: {
      address: String,
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      pincode: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    // Destination Location
    destinationLocation: {
      address: String,
      city: String,
      state: String,
      pincode: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    // Availability
    availableFrom: {
      type: Date,
      required: [true, 'Please specify availability date']
    },
    availableTo: {
      type: Date
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    // Pricing
    pricePerKm: {
      type: Number,
      required: [true, 'Please specify price per km']
    },
    minimumCharge: {
      type: Number
    },
    // Features
    features: {
      gpsTracking: {
        type: Boolean,
        default: false
      },
      refrigerated: {
        type: Boolean,
        default: false
      },
      covered: {
        type: Boolean,
        default: true
      },
      insurance: {
        type: Boolean,
        default: false
      },
      loadingUnloading: {
        type: Boolean,
        default: false
      }
    },
    // Documents
    documents: {
      rcCopy: String,
      insurance: String,
      permit: String,
      puc: String // Pollution Under Control
    },
    // Status
    status: {
      type: String,
      enum: ['available', 'booked', 'in-transit', 'maintenance', 'inactive'],
      default: 'available'
    },
    // Current Trip (if booked)
    currentTrip: {
      goodsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goods'
      },
      startDate: Date,
      estimatedEndDate: Date
    },
    // Driver Contact
    driverContact: {
      name: String,
      phone: String,
      alternatePhone: String
    },
    // Images
    images: [{
      type: String
    }],
    // Rating
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalTrips: {
      type: Number,
      default: 0
    },
    // Additional Notes
    notes: {
      type: String,
      maxlength: [200, 'Notes cannot exceed 200 characters']
    }
  },
  {
    timestamps: true
  }
);

// Index for searching
truckSchema.index({ 'currentLocation.city': 1 });
truckSchema.index({ vehicleType: 1 });
truckSchema.index({ status: 1 });
truckSchema.index({ isAvailable: 1 });

const Truck = mongoose.model('Truck', truckSchema);

export default Truck;
