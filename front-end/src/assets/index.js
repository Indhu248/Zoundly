// Earphones
import earphones_a_1 from './earphones_a_1.webp';
import earphones_a_2 from './earphones_a_2.webp';
import earphones_a_3 from './earphones_a_3.webp';
import earphones_a_4 from './earphones_a_4.webp';
import earphones_b_1 from './earphones_b_1.webp';
import earphones_b_2 from './earphones_b_2.webp';
import earphones_b_3 from './earphones_b_3.webp';
import earphones_b_4 from './earphones_b_4.webp';
import earphones_c_1 from './earphones_c_1.webp';
import earphones_c_2 from './earphones_c_2.webp';
import earphones_c_3 from './earphones_c_3.webp';
import earphones_c_4 from './earphones_c_4.webp';

// Headphones
import headphones_a_1 from './headphones_a_1.webp';
import headphones_a_2 from './headphones_a_2.webp';
import headphones_a_3 from './headphones_a_3.webp';
import headphones_a_4 from './headphones_a_4.webp';
import headphones_b_1 from './headphones_b_1.webp';
import headphones_b_2 from './headphones_b_2.webp';
import headphones_b_3 from './headphones_b_3.webp';
import headphones_b_4 from './headphones_b_4.webp';
import headphones_c_1 from './headphones_c_1.webp';
import headphones_c_2 from './headphones_c_2.webp';
import headphones_c_3 from './headphones_c_3.webp';
import headphones_c_4 from './headphones_c_4.webp';

// Speakers
import speaker1 from './speaker1.webp';
import speaker2 from './speaker2.webp';
import speaker3 from './speaker3.webp';

// Watches
import watch1 from './watch_1.webp';
import watch2 from './watch_2.webp';
import watch3 from './watch_3.webp';
import watch4 from './watch_4.webp';

//logo
import logo from './logo.png';
import ellipse1 from './Ellipse1.svg';
import ellipse2 from './Ellipse2.svg';
import vector from './Vector.svg';
import Banner from './banner.svg';

export const products = [
  {
    id: 'earphones-a',
    name: 'Zoundly Air Earphones A-Series',
    description: 'Premium wireless earphones with high-fidelity sound, ultra-comfort fit, and up to 24 hours of battery life.',
    features: [
      'Bluetooth 5.2 for quick pairing',
      'Up to 24 hours battery with case',
      'IPX4 sweat and splash resistance',
      'Touch-sensitive controls',
      'Built-in mic for clear calls',
      'Low-latency mode for gaming',
      'Noise-isolating design'
    ],
    images: [earphones_a_1, earphones_a_2, earphones_a_3, earphones_a_4],
    image: earphones_a_1,
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.4
  },
  {
    id: 'earphones-a-2',
    name: 'Zoundly Air Earphones A-Series V2',
    description: 'Updated edition with enhanced bass and refined fit, perfect for music lovers on the move.',
    features: [
      'Bluetooth 5.2 seamless connectivity',
      '24-hour total playtime',
      'IPX4 water resistance',
      'Smart touch control panel',
      'Built-in voice assistant',
      'Ergonomic ear fit',
      'Fast Type-C charging'
    ],
    images: [earphones_a_1, earphones_a_2, earphones_a_3, earphones_a_4],
    image: earphones_a_2,
    price: 2099,
    originalPrice: 3099,
    discount: 32,
    rating: 4.5
  },
  {
    id: 'earphones-a-3',
    name: 'Zoundly Air Earphones A-Series V3',
    description: 'Pro version of the A-Series with improved microphone quality and longer battery life.',
    features: [
      'Bluetooth 5.3 with auto-pairing',
      'Up to 28 hours battery backup',
      'Advanced noise isolation',
      'Optimized call clarity',
      'Smart tap gestures',
      'Lightweight build',
      'Dual pairing support'
    ],
    images: [earphones_a_1, earphones_a_2, earphones_a_3, earphones_a_4],
    image: earphones_a_3,
    price: 2299,
    originalPrice: 3299,
    discount: 30,
    rating: 4.6
  },
  {
    id: 'earphones-b-1',
    name: 'Zoundly BassBoost Earphones B-Series',
    description: 'Designed for bass lovers, these earphones deliver punchy low frequencies and crystal-clear audio.',
    features: [
      'Enhanced Bass technology',
      'Bluetooth 5.1 support',
      'Battery life up to 22 hours',
      'Sweat-proof and durable',
      'Quick-connect pairing',
      'Built-in microphone with noise reduction',
      'Type-C fast charging'
    ],
    images: [earphones_b_1, earphones_b_2, earphones_b_3, earphones_b_4],
    image: earphones_b_4,
    price: 1899,
    originalPrice: 2699,
    discount: 30,
    rating: 4.3,
    category: 'earphones'
  },
  {
    id: 'earphones-b-2',
    name: 'Zoundly BassBoost Earphones B-Series V2',
    description: 'Second-gen BassBoost earphones with stronger bass and better ear-grip design.',
    features: [
      'Extra Bass with dual dynamic drivers',
      'Ergonomic grip fit',
      'Bluetooth 5.1 for stable connectivity',
      '20-hour playback',
      'Hands-free calling',
      'Smart control buttons',
      'USB-C charging support'
    ],
    images: [earphones_b_1, earphones_b_2, earphones_b_3, earphones_b_4],
    image: earphones_b_1,
    price: 1999,
    originalPrice: 2799,
    discount: 28,
    rating: 4.4,
    category: 'earphones'
  },
  {
    id: 'earphones-b-3',
    name: 'Zoundly BassBoost Earphones B-Series V3',
    description: 'Pro version with gaming-optimized latency and ultra-rich bass depth.',
    features: [
      'Low-latency gaming mode',
      'Deep bass drivers',
      'Bluetooth 5.2 with auto reconnect',
      'Secure-fit design',
      'Dual-mic for call clarity',
      'Quick charge: 10 mins = 2 hours',
      'Noise reduction tech'
    ],
    images: [earphones_b_1, earphones_b_2, earphones_b_3, earphones_b_4],
    image: earphones_b_2,
    price: 2199,
    originalPrice: 3099,
    discount: 29,
    rating: 4.6,
    category: 'earphones'
  },
  {
    id: 'earphones-c-1',
    name: 'Zoundly ClassicPods C-Series',
    description: 'Classic-styled earphones with modern tech features and a timeless aesthetic.',
    features: [
      'Retro design with modern features',
      'Bluetooth 5.0 connectivity',
      'Long-lasting 25-hour battery',
      'Balanced audio output',
      'Comfortable all-day wear',
      'On-ear detection auto pause/play',
      'Magnetic case lid'
    ],
    images: [earphones_c_1, earphones_c_2, earphones_c_3, earphones_c_4],
    image: earphones_c_1,
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    rating: 4.2,
    category: 'earphones'
  },
  {
    id: 'earphones-c-2',
    name: 'Zoundly ClassicPods C-Series V2',
    description: 'Refined audio performance in a compact, stylish design ideal for professionals.',
    features: [
      'Compact charging case',
      'HD microphone with ENC',
      'Clear vocals and mids',
      'Fast pairing and auto connect',
      '25-hour combined battery',
      'Soft silicone ear tips',
      'Smart button interface'
    ],
    images: [earphones_c_1, earphones_c_2, earphones_c_3, earphones_c_4],
    image: earphones_c_2,
    price: 1899,
    originalPrice: 2699,
    discount: 30,
    rating: 4.3,
    category: 'earphones'
  },
  {
    id: 'earphones-c-3',
    name: 'Zoundly ClassicPods C-Series V3',
    description: 'The best of the C-Series with stronger connectivity and upgraded internals.',
    features: [
      'Bluetooth 5.3 enhanced signal',
      'Perfectly tuned dual drivers',
      'Noise-isolation for commute',
      'Ergonomic design for all-day wear',
      'Auto switch between devices',
      'Voice assistant support',
      'Water-resistant build'
    ],
    images: [earphones_c_1, earphones_c_2, earphones_c_3, earphones_c_4],
    image: earphones_c_3,
    price: 2099,
    originalPrice: 2899,
    discount: 28,
    rating: 4.5,
    category: 'earphones'
  },
  {
    id: 'headphones-a-1',
    name: 'Zoundly StudioHeadphones A-Series',
    description: 'Over-ear headphones built for audiophiles and studio clarity. Comfort meets high-res sound.',
    features: [
      'Hi-Fi sound for studio use',
      'Wired + Wireless hybrid',
      'Bluetooth 5.2 with aptX support',
      '40-hour battery life',
      'Active Noise Cancellation (ANC)',
      'Soft memory foam cushions',
      'Foldable design for portability'
    ],
    images: [headphones_a_1, headphones_a_2, headphones_a_3, headphones_a_4],
    imageNames: headphones_a_1,
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.6,
    category: 'headphones'
  },
  {
    id: 'headphones-a-2',
    name: 'Zoundly StudioHeadphones A-Series V2',
    description: 'Second-generation headphones with deeper bass and better wireless range.',
    features: [
      'Enhanced bass tuning',
      'Long-range Bluetooth 5.3',
      'Wired + Wireless modes',
      'Fast-charging support',
      'Premium PU leather finish',
      'Voice assistant integrated',
      'Multi-device switching'
    ],
    images: [headphones_a_1, headphones_a_2, headphones_a_3, headphones_a_4],
    imageNames: headphones_a_2,
    price: 3699,
    originalPrice: 5299,
    discount: 30,
    rating: 4.7,
    category: 'headphones'
  },
  {
    id: 'headphones-a-3',
    name: 'Zoundly StudioHeadphones A-Series Pro',
    description: 'Top-tier performance for professionals, with premium ANC and studio-grade drivers.',
    features: [
      'Premium active noise cancelling',
      'Hi-Res Audio certified',
      'Dual connectivity support',
      'Custom EQ presets',
      'Comfort-fit ear cups',
      'Voice clarity boost for calls',
      'USB-C charging port'
    ],
    images: [headphones_a_1, headphones_a_2, headphones_a_3, headphones_a_4],
    image: headphones_a_3,
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    rating: 4.8,
    category: 'headphones'
  },
  {
    id: 'headphones-b-1',
    name: 'Zoundly BoomHeadphones B-Series',
    description: 'Heavy bass headphones built for immersive movie and music experience.',
    features: [
      'Dynamic Bass Boost drivers',
      'Bluetooth 5.0 wireless',
      'Over 35-hour playback',
      'Lightweight headband',
      'Quick access buttons',
      'Cushioned ear padding',
      'Foldable for travel'
    ],
    images: [headphones_b_1, headphones_b_2, headphones_b_3, headphones_b_4],
    image: headphones_b_1,
    price: 2999,
    originalPrice: 4299,
    discount: 30,
    rating: 4.5,
    category: 'headphones'
  },
  {
    id: 'headphones-b-2',
    name: 'Zoundly BoomHeadphones B-Series V2',
    description: 'Enhanced low-end response and improved battery make this version perfect for bass lovers.',
    features: [
      'Heavy bass tuning',
      'Fast Type-C charging',
      '38-hour battery',
      'Rotatable ear cups',
      'Bluetooth 5.1',
      'Call & media controls',
      'Built-in mic with ENC'
    ],
    images: [headphones_b_1, headphones_b_2, headphones_b_3, headphones_b_4],
    image: headphones_b_2,
    price: 3199,
    originalPrice: 4599,
    discount: 30,
    rating: 4.6,
    category: 'headphones'
  },
  {
    id: 'headphones-b-3',
    name: 'Zoundly BoomHeadphones B-Series V3',
    description: 'The most advanced B-Series headphones with extreme bass and quick pairing.',
    features: [
      'Extreme bass profile',
      'Bluetooth 5.3 low latency',
      'Gaming optimized performance',
      'All-day comfort foam',
      'Fold & swivel design',
      'Customizable EQ via app',
      '40-hour battery backup'
    ],
    images: [headphones_b_1, headphones_b_2, headphones_b_3, headphones_b_4],
    image: headphones_b_3,
    price: 3399,
    originalPrice: 4899,
    discount: 31,
    rating: 4.7,
    category: 'headphones'
  },
  {
    id: 'headphones-c-1',
    name: 'Zoundly RetroPhones C-Series',
    description: 'Vintage style with modern tech. These headphones combine charm with functionality.',
    features: [
      'Classic retro design',
      'Bluetooth 5.0',
      '25-hour battery life',
      'Custom-tuned drivers',
      'In-line mic for calls',
      'Slim adjustable frame',
      'Leather-padded headband'
    ],
    images: [headphones_c_1, headphones_c_2, headphones_c_3, headphones_c_4],
    image: headphones_c_1,
    price: 2599,
    originalPrice: 3599,
    discount: 28,
    rating: 4.3,
    category: 'headphones'
  },
  {
    id: 'headphones-c-2',
    name: 'Zoundly RetroPhones C-Series V2',
    description: 'Upgraded comfort and battery with a nostalgic feel. Perfect for all-day listening.',
    features: [
      'Updated PU leather cushions',
      'Bluetooth 5.1 seamless pairing',
      '28-hour battery',
      'Foldable hinges',
      'Built-in voice assistant',
      'Fine-tuned mid-range',
      'Retro metallic accents'
    ],
    images: [headphones_c_1, headphones_c_2, headphones_c_3, headphones_c_4],
    image: headphones_c_2,
    price: 2799,
    originalPrice: 3899,
    discount: 28,
    rating: 4.4,
    category: 'headphones'
  },
  {
    id: 'headphones-c-3',
    name: 'Zoundly RetroPhones C-Series V3',
    description: 'V3 model adds ANC and premium materials, blending old-school looks with future tech.',
    features: [
      'ANC enabled',
      'Soft suede finish',
      'Wireless + wired modes',
      'Bluetooth 5.3',
      'Studio-grade mids and highs',
      'Cushioned comfort band',
      'Dual-pairing supported'
    ],
    images: [headphones_c_1, headphones_c_2, headphones_c_3, headphones_c_4],
    image: headphones_c_3,
    price: 2999,
    originalPrice: 4299,
    discount: 30,
    rating: 4.5,
    category: 'headphones'
  },

  {
    id: 'speaker-1',
    name: 'Zoundly BoomBox Mini',
    description: 'Compact Bluetooth speaker with explosive sound. Perfect for indoor and outdoor fun.',
    features: [
      '360° surround sound',
      '12-hour battery life',
      'IPX7 waterproof rating',
      'Bluetooth 5.0 with 10m range',
      'TWS pairing support',
      'Built-in mic for calls',
      'Durable silicone shell'
    ],
    images: [speaker1],
    image: speaker1,
    price: 1599,
    originalPrice: 2499,
    discount: 36,
    rating: 4.4,
    category: 'speakers'
  },
  {
    id: 'speaker-2',
    name: 'Zoundly BoomBox Max',
    description: 'Larger speaker with louder bass and longer battery for nonstop party vibes.',
    features: [
      'Dual bass radiators',
      '20-hour playback',
      'Bluetooth 5.1 stable connection',
      'IPX6 splash-proof',
      'USB-C fast charging',
      'Voice assistant compatible',
      'Aux and TF card support'
    ],
    images: [speaker2],
    image: speaker2,
    price: 2299,
    originalPrice: 3299,
    discount: 30,
    rating: 4.5,
    category: 'speakers'
  },
  {
    id: 'speaker-3',
    name: 'Zoundly TravelSound Pro',
    description: 'Ultra-portable speaker designed for travelers and outdoor adventurers.',
    features: [
      'Carabiner clip attached',
      'IP67 waterproof and dustproof',
      '10-hour playback',
      'Shockproof body',
      'Crystal clear sound',
      'Compact and lightweight',
      'Bluetooth 5.2'
    ],
    images: [speaker3],
    image: speaker3,
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    rating: 4.3,
    category: 'speakers'
  },
  {
    id: 'watch-1',
    name: 'Zoundly SmartFit X1',
    description: 'Fitness-focused smartwatch with heart rate monitoring and workout modes.',
    features: [
      '1.69" full-touch display',
      'Heart rate & SpO2 tracking',
      'Multiple sport modes',
      'IP68 water resistant',
      'Smart notifications',
      'Sleep monitoring',
      'Up to 10-day battery'
    ],
    images: [watch1],
    image: watch1,
    price: 2799,
    originalPrice: 3999,
    discount: 30,
    rating: 4.4,
    category: 'watches'
  },
  {
    id: 'watch-2',
    name: 'Zoundly SmartFit X2',
    description: 'Slimmer design with AMOLED display and additional health metrics.',
    features: [
      '1.43" AMOLED screen',
      'Blood pressure monitoring',
      'Custom watch faces',
      'Menstrual tracking',
      'Magnetic charging dock',
      'Step, calorie, and distance count',
      'Bluetooth calling supported'
    ],
    images: [watch2],
    image: watch2,
    price: 3199,
    originalPrice: 4699,
    discount: 32,
    rating: 4.5,
    category: 'watches'
  },
  {
    id: 'watch-3',
    name: 'Zoundly SmartFit Pro',
    description: 'Professional-grade smartwatch with GPS and health suite for active users.',
    features: [
      'Built-in GPS + GLONASS',
      'Advanced heart rate monitor',
      '5ATM water resistance',
      'Stress tracking + breathing guide',
      'Aluminum alloy frame',
      '1.78" Retina display',
      '15-day battery backup'
    ],
    images: [watch3],
    image: watch3,
    price: 3699,
    originalPrice: 5299,
    discount: 30,
    rating: 4.7,
    category: 'watches'
  },
  {
    id: 'watch-4',
    name: 'Zoundly Classic Watch Hybrid',
    description: 'Hybrid smartwatch that blends the traditional analog feel with smart features.',
    features: [
      'Analog dial with digital screen',
      'Fitness and sleep tracking',
      'Bluetooth 5.1',
      'Up to 30-day battery',
      'Stainless steel build',
      'Water resistant design',
      'Find my phone feature'
    ],
    images: [watch4],
    image: watch4,
    price: 2999,
    originalPrice: 4499,
    discount: 33,
    rating: 4.5,
    category: 'watches'
  },
];

export const featured_products = [
  {
    id: 'headphones-c-1',
    name: 'Zoundly RetroPhones C-Series',
    description: 'Vintage style with modern tech. These headphones combine charm with functionality.',
    features: [
      'Classic retro design',
      'Bluetooth 5.0',
      '25-hour battery life',
      'Custom-tuned drivers',
      'In-line mic for calls',
      'Slim adjustable frame',
      'Leather-padded headband'
    ],
    images: [headphones_c_1, headphones_c_2, headphones_c_3, headphones_c_4],
    image: headphones_c_1,
    price: 2599,
    originalPrice: 3599,
    discount: 28,
    rating: 4.3,
    category: 'headphones'
  },
  {
    id: 'headphones-c-2',
    name: 'Zoundly RetroPhones C-Series V2',
    description: 'Upgraded comfort and battery with a nostalgic feel. Perfect for all-day listening.',
    features: [
      'Updated PU leather cushions',
      'Bluetooth 5.1 seamless pairing',
      '28-hour battery',
      'Foldable hinges',
      'Built-in voice assistant',
      'Fine-tuned mid-range',
      'Retro metallic accents'
    ],
    images: [headphones_c_1, headphones_c_2, headphones_c_3, headphones_c_4],
    image: headphones_c_2,
    price: 2799,
    originalPrice: 3899,
    discount: 28,
    rating: 4.4,
    category: 'headphones'
  },
]
export const product_images = {
  earphones: {
    a: [earphones_a_1, earphones_a_2, earphones_a_3, earphones_a_4],
    b: [earphones_b_1, earphones_b_2, earphones_b_3, earphones_b_4],
    c: [earphones_c_1, earphones_c_2, earphones_c_3, earphones_c_4],
  },
  headphones: {
    a: [headphones_a_1, headphones_a_2, headphones_a_3, headphones_a_4],
    b: [headphones_b_1, headphones_b_2, headphones_b_3, headphones_b_4],
    c: [headphones_c_1, headphones_c_2, headphones_c_3, headphones_c_4],
  },
  speakers: [speaker1, speaker2, speaker3],
  watches: [watch1, watch2, watch3, watch4],
};

export const logoImage = logo;
export const ellipse1Image = ellipse1;
export const ellipse2Image = ellipse2;
export const VectorImage = vector;
export const earphonesImages = product_images.headphones.c[0];
export const BannerImage = Banner;