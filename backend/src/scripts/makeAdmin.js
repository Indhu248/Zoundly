import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/database.js';

dotenv.config();

const makeAdmin = async () => {
  try {
    await connectDB();

    const email = process.argv[2];

    if (!email) {
      console.error('Please provide an email address');
      console.log('Usage: node src/scripts/makeAdmin.js <email>');
      process.exit(1);
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.error(`User with email ${email} not found`);
      process.exit(1);
    }

    if (user.role === 'admin') {
      console.log(`User ${email} is already an admin`);
      process.exit(0);
    }

    user.role = 'admin';
    await user.save();

    console.log(`Successfully made ${email} an admin`);
    process.exit(0);
  } catch (error) {
    console.error('Error making user admin:', error);
    process.exit(1);
  }
};

makeAdmin();




