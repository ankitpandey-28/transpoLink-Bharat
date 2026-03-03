/**
 * Quick Fix Script - Update User Type to truck_driver
 * Usage: node fix-user-type.js <email>
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const fixUserType = async (email) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/transpolink');
    console.log('✅ Connected to MongoDB\n');

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ User not found with email:', email);
      console.log('\nPlease check the email address and try again.');
      process.exit(1);
    }

    console.log('👤 Current User Details:');
    console.log('========================');
    console.log('Name:', user.name);
    console.log('Email:', user.email);
    console.log('Current User Type:', user.userType);
    console.log('');

    // Check if already correct
    if (user.userType === 'truck_driver') {
      console.log('✅ User type is already correct: truck_driver');
      console.log('\nThe issue might be something else. Please:');
      console.log('1. Logout from the application');
      console.log('2. Clear browser cache (Ctrl+Shift+Delete)');
      console.log('3. Login again');
      console.log('4. Try posting truck details again');
      process.exit(0);
    }

    // Update user type
    console.log('🔧 Updating user type to: truck_driver');
    user.userType = 'truck_driver';
    await user.save();

    console.log('✅ User type updated successfully!\n');
    console.log('Updated User Details:');
    console.log('====================');
    console.log('Name:', user.name);
    console.log('Email:', user.email);
    console.log('New User Type:', user.userType);
    console.log('');
    console.log('✅ NEXT STEPS:');
    console.log('==============');
    console.log('1. Go to the application');
    console.log('2. Click "Sign Out"');
    console.log('3. Login again with your credentials');
    console.log('4. Go to "Post Truck" page');
    console.log('5. Fill in the form and submit');
    console.log('');
    console.log('You should now be able to post trucks without any errors!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Get email from command line
const email = process.argv[2];

if (!email) {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║         TranspoLink - Fix User Type Script                ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('This script will update your user type to "truck_driver"');
  console.log('so you can post truck details without errors.');
  console.log('');
  console.log('Usage:');
  console.log('  node fix-user-type.js <your-email>');
  console.log('');
  console.log('Example:');
  console.log('  node fix-user-type.js driver@example.com');
  console.log('');
  process.exit(1);
}

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║         TranspoLink - Fix User Type Script                ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');
console.log('Fixing user type for:', email);
console.log('');

fixUserType(email);
