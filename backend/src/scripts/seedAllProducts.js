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
    images: ['https://i.ibb.co/pv4gRTVC/earphones-a-1.webp', 'https://i.ibb.co/hJPybQmB/earphones-a-2.webp', 'https://i.ibb.co/mWVG2PS/earphones-a-3.webp', 'https://i.ibb.co/cc1sP2Wj/earphones-a-4.webp'],
    image: 'https://i.ibb.co/pv4gRTVC/earphones-a-1.webp',
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
    images: ['https://i.ibb.co/pv4gRTVC/earphones-a-1.webp', 'https://i.ibb.co/hJPybQmB/earphones-a-2.webp', 'https://i.ibb.co/mWVG2PS/earphones-a-3.webp', 'https://i.ibb.co/cc1sP2Wj/earphones-a-4.webp'],
    image: 'https://i.ibb.co/hJPybQmB/earphones-a-2.webp',
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
    name: 'Zoundly Air Earphones A-Series V3',
    description: 'Pro version of the A-Series with improved microphone quality and longer battery life.',
    category: 'earphones',
    price: 2299,
    originalPrice: 3299,
    discount: 30,
    stockQuantity: 100,
    sku: 'EAR-A-003',
    rating: 4.6,
    images: ['https://i.ibb.co/pv4gRTVC/earphones-a-1.webp', 'https://i.ibb.co/hJPybQmB/earphones-a-2.webp', 'https://i.ibb.co/mWVG2PS/earphones-a-3.webp', 'https://i.ibb.co/cc1sP2Wj/earphones-a-4.webp'],
    image: 'https://i.ibb.co/mWVG2PS/earphones-a-3.webp',
    features: [
      'Bluetooth 5.3 with auto-pairing',
      'Up to 28 hours battery backup',
      'Advanced noise isolation',
      'Optimized call clarity',
      'Smart tap gestures',
      'Lightweight build',
      'Dual pairing support'
    ],
  },
  {
    name: 'Zoundly BassBoost Earphones B-Series',
    description: 'Designed for bass lovers, these earphones deliver punchy low frequencies and crystal-clear audio.',
    category: 'earphones',
    price: 1899,
    originalPrice: 2699,
    discount: 30,
    stockQuantity: 100,
    sku: 'EAR-B-001',
    rating: 4.3,
    images: ['https://i.ibb.co/kN9h5fX/earphones-b-1.webp', 'https://i.ibb.co/8gSN1YYL/earphones-b-2.webp', 'https://i.ibb.co/yn70WD25/earphones-b-3.webp', 'https://i.ibb.co/B2DFszmD/earphones-b-4.webp'],
    image: 'https://i.ibb.co/B2DFszmD/earphones-b-4.webp',
    features: [
      'Enhanced Bass technology',
      'Bluetooth 5.1 support',
      'Battery life up to 22 hours',
      'Sweat-proof and durable',
      'Quick-connect pairing',
      'Built-in microphone with noise reduction',
      'Type-C fast charging'
    ],
  },
  {
    name: 'Zoundly BassBoost Earphones B-Series V2',
    description: 'Second-gen BassBoost earphones with stronger bass and better ear-grip design.',
    category: 'earphones',
    price: 1999,
    originalPrice: 2799,
    discount: 28,
    stockQuantity: 100,
    sku: 'EAR-B-002',
    rating: 4.4,
    images: ['https://i.ibb.co/kN9h5fX/earphones-b-1.webp', 'https://i.ibb.co/8gSN1YYL/earphones-b-2.webp', 'https://i.ibb.co/yn70WD25/earphones-b-3.webp', 'https://i.ibb.co/B2DFszmD/earphones-b-4.webp'],
    image: 'https://i.ibb.co/kN9h5fX/earphones-b-1.webp',
    features: [
      'Extra Bass with dual dynamic drivers',
      'Ergonomic grip fit',
      'Bluetooth 5.1 for stable connectivity',
      '20-hour playback',
      'Hands-free calling',
      'Smart control buttons',
      'USB-C charging support'
    ],
  },
  {
    name: 'Zoundly BassBoost Earphones B-Series V3',
    description: 'Pro version with gaming-optimized latency and ultra-rich bass depth.',
    category: 'earphones',
    price: 2199,
    originalPrice: 3099,
    discount: 29,
    stockQuantity: 100,
    sku: 'EAR-B-003',
    rating: 4.6,
    images: ['https://i.ibb.co/kN9h5fX/earphones-b-1.webp', 'https://i.ibb.co/8gSN1YYL/earphones-b-2.webp', 'https://i.ibb.co/yn70WD25/earphones-b-3.webp', 'https://i.ibb.co/B2DFszmD/earphones-b-4.webp'],
    image: 'https://i.ibb.co/8gSN1YYL/earphones-b-2.webp',
    features: [
      'Low-latency gaming mode',
      'Deep bass drivers',
      'Bluetooth 5.2 with auto reconnect',
      'Secure-fit design',
      'Dual-mic for call clarity',
      'Quick charge: 10 mins = 2 hours',
      'Noise reduction tech'
    ],
  },
  {
    name: 'Zoundly ClassicPods C-Series',
    description: 'Classic-styled earphones with modern tech features and a timeless aesthetic.',
    category: 'earphones',
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    stockQuantity: 100,
    sku: 'EAR-C-001',
    rating: 4.2,
    images: ['https://i.ibb.co/8kgcL62/earphones-c-1.webp', 'https://i.ibb.co/d0KB77cR/earphones-c-2.webp', 'https://i.ibb.co/Zr0tTZc/earphones-c-3.webp', 'https://i.ibb.co/FLWJST0H/earphones-c-4.webp'],
    image: 'https://i.ibb.co/8kgcL62/earphones-c-1.webp',
    features: [
      'Retro design with modern features',
      'Bluetooth 5.0 connectivity',
      'Long-lasting 25-hour battery',
      'Balanced audio output',
      'Comfortable all-day wear',
      'On-ear detection auto pause/play',
      'Magnetic case lid'
    ],
  },
  {
    name: 'Zoundly ClassicPods C-Series V2',
    description: 'Refined audio performance in a compact, stylish design ideal for professionals.',
    category: 'earphones',
    price: 1899,
    originalPrice: 2699,
    discount: 30,
    stockQuantity: 100,
    sku: 'EAR-C-002',
    rating: 4.3,
    images: ['https://i.ibb.co/8kgcL62/earphones-c-1.webp', 'https://i.ibb.co/d0KB77cR/earphones-c-2.webp', 'https://i.ibb.co/Zr0tTZc/earphones-c-3.webp', 'https://i.ibb.co/FLWJST0H/earphones-c-4.webp'],
    image: 'https://i.ibb.co/d0KB77cR/earphones-c-2.webp',
    features: [
      'Compact charging case',
      'HD microphone with ENC',
      'Clear vocals and mids',
      'Fast pairing and auto connect',
      '25-hour combined battery',
      'Soft silicone ear tips',
      'Smart button interface'
    ],
  },
  {
    name: 'Zoundly ClassicPods C-Series V3',
    description: 'The best of the C-Series with stronger connectivity and upgraded internals.',
    category: 'earphones',
    price: 2099,
    originalPrice: 2899,
    discount: 28,
    stockQuantity: 100,
    sku: 'EAR-C-003',
    rating: 4.5,
    images: ['https://i.ibb.co/8kgcL62/earphones-c-1.webp', 'https://i.ibb.co/d0KB77cR/earphones-c-2.webp', 'https://i.ibb.co/Zr0tTZc/earphones-c-3.webp', 'https://i.ibb.co/FLWJST0H/earphones-c-4.webp'],
    image: 'https://i.ibb.co/Zr0tTZc/earphones-c-3.webp',
    features: [
      'Bluetooth 5.3 enhanced signal',
      'Perfectly tuned dual drivers',
      'Noise-isolation for commute',
      'Ergonomic design for all-day wear',
      'Auto switch between devices',
      'Voice assistant support',
      'Water-resistant build'
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
    images: ['https://i.ibb.co/C36qsktc/headphones-a-1.webp', 'https://i.ibb.co/KYDW0br/headphones-a-2.webp', 'https://i.ibb.co/84dCzvmt/headphones-a-3.webp', 'https://i.ibb.co/JjBHX7cG/headphones-a-4.webp'],
    image: 'https://i.ibb.co/C36qsktc/headphones-a-1.webp',
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
    name: 'Zoundly StudioHeadphones A-Series V2',
    description: 'Second-generation headphones with deeper bass and better wireless range.',
    category: 'headphones',
    price: 3699,
    originalPrice: 5299,
    discount: 30,
    stockQuantity: 50,
    sku: 'HP-A-002',
    rating: 4.7,
    images: ['https://i.ibb.co/C36qsktc/headphones-a-1.webp', 'https://i.ibb.co/KYDW0br/headphones-a-2.webp', 'https://i.ibb.co/84dCzvmt/headphones-a-3.webp', 'https://i.ibb.co/JjBHX7cG/headphones-a-4.webp'],
    image: 'https://i.ibb.co/KYDW0br/headphones-a-2.webp',
    features: [
      'Enhanced bass tuning',
      'Long-range Bluetooth 5.3',
      'Wired + Wireless modes',
      'Fast-charging support',
      'Premium PU leather finish',
      'Voice assistant integrated',
      'Multi-device switching'
    ],
  },
  {
    name: 'Zoundly StudioHeadphones A-Series Pro',
    description: 'Top-tier performance for professionals, with premium ANC and studio-grade drivers.',
    category: 'headphones',
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    stockQuantity: 50,
    sku: 'HP-A-003',
    rating: 4.8,
    images: ['https://i.ibb.co/C36qsktc/headphones-a-1.webp', 'https://i.ibb.co/KYDW0br/headphones-a-2.webp', 'https://i.ibb.co/84dCzvmt/headphones-a-3.webp', 'https://i.ibb.co/JjBHX7cG/headphones-a-4.webp'],
    image: 'https://i.ibb.co/84dCzvmt/headphones-a-3.webp',
    features: [
      'Premium active noise cancelling',
      'Hi-Res Audio certified',
      'Dual connectivity support',
      'Custom EQ presets',
      'Comfort-fit ear cups',
      'Voice clarity boost for calls',
      'USB-C charging port'
    ],
  },
  {
    name: 'Zoundly BoomHeadphones B-Series',
    description: 'Heavy bass headphones built for immersive movie and music experience.',
    category: 'headphones',
    price: 2999,
    originalPrice: 4299,
    discount: 30,
    stockQuantity: 60,
    sku: 'HP-B-001',
    rating: 4.5,
    images: ['https://i.ibb.co/p66Rf4q6/headphones-b-1.webp', 'https://i.ibb.co/DHnJ5SCM/headphones-b-2.webp', 'https://i.ibb.co/Kp2z60b0/headphones-b-3.webp', 'https://i.ibb.co/xtT0bmfT/headphones-b-4.webp'],
    image: 'https://i.ibb.co/p66Rf4q6/headphones-b-1.webp',
    features: [
      'Dynamic Bass Boost drivers',
      'Bluetooth 5.0 wireless',
      'Over 35-hour playback',
      'Lightweight headband',
      'Quick access buttons',
      'Cushioned ear padding',
      'Foldable for travel'
    ],
  },
  {
    name: 'Zoundly BoomHeadphones B-Series V2',
    description: 'Enhanced low-end response and improved battery make this version perfect for bass lovers.',
    category: 'headphones',
    price: 3199,
    originalPrice: 4599,
    discount: 30,
    stockQuantity: 60,
    sku: 'HP-B-002',
    rating: 4.6,
    images: ['https://i.ibb.co/p66Rf4q6/headphones-b-1.webp', 'https://i.ibb.co/DHnJ5SCM/headphones-b-2.webp', 'https://i.ibb.co/Kp2z60b0/headphones-b-3.webp', 'https://i.ibb.co/xtT0bmfT/headphones-b-4.webp'],
    image: 'https://i.ibb.co/DHnJ5SCM/headphones-b-2.webp',
    features: [
      'Heavy bass tuning',
      'Fast Type-C charging',
      '38-hour battery',
      'Rotatable ear cups',
      'Bluetooth 5.1',
      'Call & media controls',
      'Built-in mic with ENC'
    ],
  },
  {
    name: 'Zoundly BoomHeadphones B-Series V3',
    description: 'The most advanced B-Series headphones with extreme bass and quick pairing.',
    category: 'headphones',
    price: 3399,
    originalPrice: 4899,
    discount: 31,
    stockQuantity: 60,
    sku: 'HP-B-003',
    rating: 4.7,
    images: ['https://i.ibb.co/p66Rf4q6/headphones-b-1.webp', 'https://i.ibb.co/DHnJ5SCM/headphones-b-2.webp', 'https://i.ibb.co/Kp2z60b0/headphones-b-3.webp', 'https://i.ibb.co/xtT0bmfT/headphones-b-4.webp'],
    image: 'https://i.ibb.co/Kp2z60b0/headphones-b-3.webp',
    features: [
      'Extreme bass profile',
      'Bluetooth 5.3 low latency',
      'Gaming optimized performance',
      'All-day comfort foam',
      'Fold & swivel design',
      'Customizable EQ via app',
      '40-hour battery backup'
    ],
  },
  {
    name: 'Zoundly RetroPhones C-Series',
    description: 'Vintage style with modern tech. These headphones combine charm with functionality.',
    category: 'headphones',
    price: 2599,
    originalPrice: 3599,
    discount: 28,
    stockQuantity: 60,
    sku: 'HP-C-001',
    rating: 4.3,
    images: ['https://i.ibb.co/yc5XZtkn/headphones-c-1.webp', 'https://i.ibb.co/ZRF9M22c/headphones-c-2.webp', 'https://i.ibb.co/GvHzTRmM/headphones-c-3.webp', 'https://i.ibb.co/FLmCK7hy/headphones-c-4.webp'],
    image: 'https://i.ibb.co/yc5XZtkn/headphones-c-1.webp',
    features: [
      'Classic retro design',
      'Bluetooth 5.0',
      '25-hour battery life',
      'Custom-tuned drivers',
      'In-line mic for calls',
      'Slim adjustable frame',
      'Leather-padded headband'
    ],
  },
  {
    name: 'Zoundly RetroPhones C-Series V2',
    description: 'Upgraded comfort and battery with a nostalgic feel. Perfect for all-day listening.',
    category: 'headphones',
    price: 2799,
    originalPrice: 3899,
    discount: 28,
    stockQuantity: 60,
    sku: 'HP-C-002',
    rating: 4.4,
    images: ['https://i.ibb.co/yc5XZtkn/headphones-c-1.webp', 'https://i.ibb.co/ZRF9M22c/headphones-c-2.webp', 'https://i.ibb.co/GvHzTRmM/headphones-c-3.webp', 'https://i.ibb.co/FLmCK7hy/headphones-c-4.webp'],
    image: 'https://i.ibb.co/ZRF9M22c/headphones-c-2.webp',
    features: [
      'Updated PU leather cushions',
      'Bluetooth 5.1 seamless pairing',
      '28-hour battery',
      'Foldable hinges',
      'Built-in voice assistant',
      'Fine-tuned mid-range',
      'Retro metallic accents'
    ],
  },
  {
    name: 'Zoundly RetroPhones C-Series V3',
    description: 'V3 model adds ANC and premium materials, blending old-school looks with future tech.',
    category: 'headphones',
    price: 2999,
    originalPrice: 4299,
    discount: 30,
    stockQuantity: 60,
    sku: 'HP-C-003',
    rating: 4.5,
    images: ['https://i.ibb.co/yc5XZtkn/headphones-c-1.webp', 'https://i.ibb.co/ZRF9M22c/headphones-c-2.webp', 'https://i.ibb.co/GvHzTRmM/headphones-c-3.webp', 'https://i.ibb.co/FLmCK7hy/headphones-c-4.webp'],
    image: 'https://i.ibb.co/GvHzTRmM/headphones-c-3.webp',
    features: [
      'ANC enabled',
      'Soft suede finish',
      'Wireless + wired modes',
      'Bluetooth 5.3',
      'Studio-grade mids and highs',
      'Cushioned comfort band',
      'Dual-pairing supported'
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
    images: ['https://i.ibb.co/HfqGHpJn/speaker1.webp', 'https://i.ibb.co/RkvPkHk5/speaker4.webp'],
    image: 'https://i.ibb.co/HfqGHpJn/speaker1.webp',
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
    name: 'Zoundly BoomBox Max',
    description: 'Larger speaker with louder bass and longer battery for nonstop party vibes.',
    category: 'speakers',
    price: 2299,
    originalPrice: 3299,
    discount: 30,
    stockQuantity: 60,
    sku: 'SPK-002',
    rating: 4.5,
    images: ['https://i.ibb.co/cSVMDD8r/speaker2.webp'],
    image: 'https://i.ibb.co/cSVMDD8r/speaker2.webp',
    features: [
      'Dual bass radiators',
      '20-hour playback',
      'Bluetooth 5.1 stable connection',
      'IPX6 splash-proof',
      'USB-C fast charging',
      'Voice assistant compatible',
      'Aux and TF card support'
    ],
  },
  {
    name: 'Zoundly TravelSound Pro',
    description: 'Ultra-portable speaker designed for travelers and outdoor adventurers.',
    category: 'speakers',
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    stockQuantity: 80,
    sku: 'SPK-003',
    rating: 4.3,
    images: ['https://i.ibb.co/qF453NwM/speaker3.webp'],
    image: 'https://i.ibb.co/qF453NwM/speaker3.webp',
    features: [
      'Carabiner clip attached',
      'IP67 waterproof and dustproof',
      '10-hour playback',
      'Shockproof body',
      'Crystal clear sound',
      'Compact and lightweight',
      'Bluetooth 5.2'
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
    images: ['https://i.ibb.co/ddQC5Lx/watch-1.webp'],
    image: 'https://i.ibb.co/ddQC5Lx/watch-1.webp',
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
  {
    name: 'Zoundly SmartFit X2',
    description: 'Slimmer design with AMOLED display and additional health metrics.',
    category: 'watches',
    price: 3199,
    originalPrice: 4699,
    discount: 32,
    stockQuantity: 50,
    sku: 'WATCH-002',
    rating: 4.5,
    images: ['https://i.ibb.co/Z1hpgxQ9/watch-2.webp'],
    image: 'https://i.ibb.co/Z1hpgxQ9/watch-2.webp',
    features: [
      '1.43" AMOLED screen',
      'Blood pressure monitoring',
      'Custom watch faces',
      'Menstrual tracking',
      'Magnetic charging dock',
      'Step, calorie, and distance count',
      'Bluetooth calling supported'
    ],
  },
  {
    name: 'Zoundly SmartFit Pro',
    description: 'Professional-grade smartwatch with GPS and health suite for active users.',
    category: 'watches',
    price: 3699,
    originalPrice: 5299,
    discount: 30,
    stockQuantity: 40,
    sku: 'WATCH-003',
    rating: 4.7,
    images: ['https://i.ibb.co/gFf6ZYmX/watch-3.webp'],
    image: 'https://i.ibb.co/gFf6ZYmX/watch-3.webp',
    features: [
      'Built-in GPS + GLONASS',
      'Advanced heart rate monitor',
      '5ATM water resistance',
      'Stress tracking + breathing guide',
      'Aluminum alloy frame',
      '1.78" Retina display',
      '15-day battery backup'
    ],
  },
  {
    name: 'Zoundly Classic Watch Hybrid',
    description: 'Hybrid smartwatch that blends the traditional analog feel with smart features.',
    category: 'watches',
    price: 2999,
    originalPrice: 4499,
    discount: 33,
    stockQuantity: 55,
    sku: 'WATCH-004',
    rating: 4.5,
    images: ['https://i.ibb.co/nMfxyyCD/watch-4.webp'],
    image: 'https://i.ibb.co/nMfxyyCD/watch-4.webp',
    features: [
      'Analog dial with digital screen',
      'Fitness and sleep tracking',
      'Bluetooth 5.1',
      'Up to 30-day battery',
      'Stainless steel build',
      'Water resistant design',
      'Find my phone feature'
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

    console.log('\nProduct breakdown by category:');
    const byCategory = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    byCategory.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count} products`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
