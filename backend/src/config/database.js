import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    
    if (error.message.includes('authentication failed')) {
      console.error('\nAuthentication failed. Please check:');
      console.error('1. Your MongoDB Atlas username and password in MONGODB_URI');
      console.error('2. Make sure your IP address is whitelisted in MongoDB Atlas');
      console.error('3. Verify your database user has proper permissions');
    } else if (error.message.includes('MONGODB_URI is not defined')) {
      console.error('\nPlease set MONGODB_URI in your .env file');
    }
    
    process.exit(1);
  }
};

export default connectDB;

