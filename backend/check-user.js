/**
 * Quick script to check user details in MongoDB
 * Usage: node check-user.js <email>
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const checkUser = async (email) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/transpolink');
    console.log('✅ Connected to MongoDB\n');

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ User not found with email:', email);
      process.exit(1);
    }

    console.log('👤 User Details:');
    console.log('================');
    console.log('Name:', user.name);
    console.log('Email:', user.email);
    console.log('Phone:', user.phone);
    console.log('User Type:', user.userType);
    console.log('Is Verified:', user.isVerified);
    console.log('Is Active:', user.isActive);
    console.log('Created:', user.createdAt);
    console.log('\n');

    // Check user type
    if (user.userType === 'truck_driver') {
      console.log('✅ User type is correct for posting trucks');
      console.log('License Number:', user.licenseNumber);
      console.log('Vehicle Type:', user.vehicleType);
    } else if (user.userType === 'businessman') {
      console.log('✅ User type is correct for posting goods');
      console.log('Company Name:', user.companyName);
      console.log('GST Number:', user.gstNumber || 'Not provided');
    } else {
      console.log('❌ Invalid user type:', user.userType);
      console.log('Valid types: "truck_driver" or "businessman"');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Get email from command line
const email = process.argv[2];

if (!email) {
  console.log('Usage: node check-user.js <email>');
  console.log('Example: node check-user.js driver@example.com');
  process.exit(1);
}

checkUser(email);
