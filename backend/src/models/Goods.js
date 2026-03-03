/**
 * Goods Model
 * Schema for posted goods/cargo
 */

import mongoose from 'mongoose';

const goodsSchema = new mongoose.Schema(
  {
    // Posted by (Client)
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    // Goods Details
    cargoType: {
      type: String,
      required: [true, 'Please specify cargo type'],
      enum: [
        'householdGoods',
        'constructionMaterial',
        'agriculturalProduce',
        'industrialEquipment',
        'fmcgGoods',
        'automobileParts',
        'textiles',
        'electronics',
        'perishableGoods',
        'other'
      ]
    },
    description: {
      type: String,
      required: [true, 'Please provide goods description'],
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    weight: {
      type: Number,
      required: [true, 'Please specify weight in kg']
    },
    quantity: {
      type: Number,
      default: 1
    },
    // Pickup and Delivery
    pickupLocation: {
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      pincode: {
        type: String,
        required: true
      },
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    deliveryLocation: {
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      pincode: {
        type: String,
        required: true
      },
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    // Dates
    pickupDate: {
      type: Date,
      required: [true, 'Please specify pickup date']
    },
    deliveryDate: {
      type: Date
    },
    // Pricing
    estimatedPrice: {
      type: Number
    },
    finalPrice: {
      type: Number
    },
    // Status
    status: {
      type: String,
      enum: ['posted', 'assigned', 'in-transit', 'delivered', 'cancelled'],
      default: 'posted'
    },
    // Assigned Driver
    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    // Special Requirements
    requiresRefrigeration: {
      type: Boolean,
      default: false
    },
    requiresInsurance: {
      type: Boolean,
      default: false
    },
    fragile: {
      type: Boolean,
      default: false
    },
    // Contact
    contactPerson: {
      name: String,
      phone: String
    },
    // Images
    images: [{
      type: String
    }],
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
goodsSchema.index({ 'pickupLocation.city': 1, 'deliveryLocation.city': 1 });
goodsSchema.index({ status: 1 });
goodsSchema.index({ cargoType: 1 });

const Goods = mongoose.model('Goods', goodsSchema);

export default Goods;
