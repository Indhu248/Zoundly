import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import connectDB from '../config/database.js';

dotenv.config();

const products = [
  {
    name: 'Zoundly Air Earphones A-Series',
    description: 'Premium wireless earphones with high-fidelity sound, ultra-comfort fit, and up to 24 hours of battery life.',
    category: 'earphones',
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    stockQuantity: 100,
    sku: 'EAR-A-001',
    rating: 4.4,
    images: ['https://example.com/earphones_a_1.webp'],
    image: 'https://example.com/earphones_a_1.webp',
    features: [
      'Bluetooth 5.2 for quick pairing',
      'Up to 24 hours battery with case',
      'IPX4 sweat and splash resistance',
      'Touch-sensitive controls',
    ],
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany({});
    console.log('Products deleted');

    await Product.insertMany(products);
    console.log('Products seeded');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();

