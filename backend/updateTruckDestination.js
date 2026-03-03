/**
 * Quick script to add destination to existing trucks
 * Run this with: node updateTruckDestination.js
 */

import mongoose from 'mongoose';
import Truck from './src/models/Truck.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const updateTruckDestinations = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/transpolink');
    console.log('✅ Connected to MongoDB');

    // Find all trucks
    const allTrucks = await Truck.find({});
    console.log(`\n📦 Total trucks in database: ${allTrucks.length}\n`);

    // Show all trucks
    for (const truck of allTrucks) {
      console.log(`Truck: ${truck.vehicleNumber}`);
      console.log(`  Current: ${truck.currentLocation.city}, ${truck.currentLocation.state}`);
      console.log(`  Destination: ${truck.destinationLocation?.city || 'NOT SET'}`);
      console.log(`  Price: ₹${truck.pricePerKm}/km`);
      console.log('---');
    }

    // Find trucks without destination OR with "Unknown" state
    const trucksToUpdate = await Truck.find({
      $or: [
        { destinationLocation: { $exists: false } },
        { 'destinationLocation.city': { $exists: false } },
        { 'currentLocation.state': 'Unknown' }
      ]
    });

    console.log(`\n🔧 Found ${trucksToUpdate.length} trucks to update`);

    // Update each truck
    for (const truck of trucksToUpdate) {
      console.log(`\n📍 Updating Truck: ${truck.vehicleNumber}`);
      console.log(`   From: ${truck.currentLocation.city}, ${truck.currentLocation.state}`);
      
      // Set destination to Patiala for all trucks (you can customize this)
      truck.destinationLocation = {
        address: 'Patiala, Punjab',
        city: 'Patiala',
        state: 'Punjab',
        pincode: '147001'
      };
      
      // Also fix the current location state if it's "Unknown"
      if (truck.currentLocation.state === 'Unknown') {
        truck.currentLocation.state = 'Himachal Pradesh';
      }
      
      await truck.save();
      console.log('   ✅ Destination set to: Patiala, Punjab');
      console.log('   ✅ Current location state fixed');
    }

    console.log('\n✅ All trucks updated successfully!');
    console.log('\n🔄 Please refresh your browser to see the changes.\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

updateTruckDestinations();
