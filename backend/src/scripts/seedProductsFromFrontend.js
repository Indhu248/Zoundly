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
    images: ['/earphones_a_1.webp'],
    image: '/earphones_a_1.webp',
    features: [
      'Bluetooth 5.2 for quick pairing',
      'Up to 24 hours battery with case',
      'IPX4 sweat and splash resistance',
      'Touch-sensitive controls',
      'Built-in mic for clear calls',
      'Low-latency mode for gaming',
      'Noise-isolating design'
    ],
  },
  {
    name: 'Zoundly Air Earphones A-Series V2',
    description: 'Updated edition with enhanced bass and refined fit, perfect for music lovers on the move.',
    category: 'earphones',
    price: 2099,
    originalPrice: 3099,
    discount: 32,
    stockQuantity: 100,
    sku: 'EAR-A-002',
    rating: 4.5,
    images: ['/earphones_a_2.webp'],
    image: '/earphones_a_2.webp',
    features: [
      'Bluetooth 5.2 seamless connectivity',
      '24-hour total playtime',
      'IPX4 water resistance',
      'Smart touch control panel',
      'Built-in voice assistant',
      'Ergonomic ear fit',
      'Fast Type-C charging'
    ],
  },
  {
    name: 'Zoundly StudioHeadphones A-Series',
    description: 'Over-ear headphones built for audiophiles and studio clarity. Comfort meets high-res sound.',
    category: 'headphones',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    stockQuantity: 50,
    sku: 'HP-A-001',
    rating: 4.6,
    images: ['/headphones_a_1.webp'],
    image: '/headphones_a_1.webp',
    features: [
      'Hi-Fi sound for studio use',
      'Wired + Wireless hybrid',
      'Bluetooth 5.2 with aptX support',
      '40-hour battery life',
      'Active Noise Cancellation (ANC)',
      'Soft memory foam cushions',
      'Foldable design for portability'
    ],
  },
  {
    name: 'Zoundly BoomBox Mini',
    description: 'Compact Bluetooth speaker with explosive sound. Perfect for indoor and outdoor fun.',
    category: 'speakers',
    price: 1599,
    originalPrice: 2499,
    discount: 36,
    stockQuantity: 75,
    sku: 'SPK-001',
    rating: 4.4,
    images: ['/speaker1.webp'],
    image: '/speaker1.webp',
    features: [
      '360° surround sound',
      '12-hour battery life',
      'IPX7 waterproof rating',
      'Bluetooth 5.0 with 10m range',
      'TWS pairing support',
      'Built-in mic for calls',
      'Durable silicone shell'
    ],
  },
  {
    name: 'Zoundly SmartFit X1',
    description: 'Fitness-focused smartwatch with heart rate monitoring and workout modes.',
    category: 'watches',
    price: 2799,
    originalPrice: 3999,
    discount: 30,
    stockQuantity: 60,
    sku: 'WATCH-001',
    rating: 4.4,
    images: ['/watch_1.webp'],
    image: '/watch_1.webp',
    features: [
      '1.69" full-touch display',
      'Heart rate & SpO2 tracking',
      'Multiple sport modes',
      'IP68 water resistant',
      'Smart notifications',
      'Sleep monitoring',
      'Up to 10-day battery'
    ],
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    console.log('Deleting existing products...');
    await Product.deleteMany({});
    console.log('Products deleted');

    console.log('Seeding products...');
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products`);

    const allProducts = await Product.find({});
    console.log(`Total products in database: ${allProducts.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();

