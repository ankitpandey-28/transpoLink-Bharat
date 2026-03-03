/**
 * Test MongoDB Connection
 * Run this to verify MongoDB Atlas connectivity
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  console.log('🔍 Testing MongoDB connection...');
  console.log('📍 URI:', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'));
  
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log('🌐 Host:', conn.connection.host);
    console.log('📊 Database:', conn.connection.name);
    console.log('🔌 Ready State:', conn.connection.readyState);
    
    // Close connection
    await mongoose.connection.close();
    console.log('👋 Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed!');
    console.error('Error:', error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.error('\n💡 DNS resolution failed. Possible causes:');
      console.error('   - Check your internet connection');
      console.error('   - Verify the MongoDB Atlas cluster URL');
    } else if (error.message.includes('Authentication failed')) {
      console.error('\n💡 Authentication failed. Possible causes:');
      console.error('   - Check username and password in .env file');
      console.error('   - Verify database user exists in MongoDB Atlas');
    } else if (error.message.includes('IP')) {
      console.error('\n💡 IP whitelist issue. Possible causes:');
      console.error('   - Add your IP to MongoDB Atlas Network Access');
      console.error('   - Or allow access from anywhere (0.0.0.0/0)');
    }
    
    process.exit(1);
  }
};

testConnection();
