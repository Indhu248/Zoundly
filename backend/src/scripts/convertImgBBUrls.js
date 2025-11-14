/**
 * Helper script to convert ImgBB page URLs to direct image URLs
 * 
 * To get direct image URLs from ImgBB page URLs:
 * 1. Open each page URL in your browser
 * 2. Right-click on the image
 * 3. Select "Copy Image Address" or "Copy Image Location"
 * 4. The direct URL will look like: https://i.ibb.co/[hash]/[filename]
 * 
 * Or visit the page and look at the page source to find the direct image URL
 */

// Your ImgBB page URLs
const pageUrls = [
  'https://ibb.co/mrrX9hpr',
  'https://ibb.co/Vc812PSC',
  'https://ibb.co/Q3Pj9bpb',
  'https://ibb.co/ZpDPrHYD',
  'https://ibb.co/FLJKy2Yb',
  'https://ibb.co/1YPcmzzR',
  'https://ibb.co/27ZGNdJM',
  'https://ibb.co/NdtbsYFJ',
  'https://ibb.co/8L9P74h6',
  'https://ibb.co/Hf31nnPH',
  'https://ibb.co/M5j6xcLD',
  'https://ibb.co/ZpLKpTpZ',
  'https://ibb.co/7wGM1RL',
  'https://ibb.co/fGCzNH3J',
  'https://ibb.co/Fqyn4pmf',
  'https://ibb.co/CKvRyy2n',
  'https://ibb.co/Y7f6ySnv',
  'https://ibb.co/B5XtbWCy',
  'https://ibb.co/vn6HTMD',
  'https://ibb.co/d0rHSkNR',
  'https://ibb.co/QyC6pRM',
  'https://ibb.co/Sw95Fff4',
  'https://ibb.co/svzjyh7Q',
  'https://ibb.co/GQwNPxXw',
  'https://ibb.co/q6Y53k9',
  'https://ibb.co/hR8sCCMS',
  'https://ibb.co/7Dq8y9r',
  'https://ibb.co/Q3cn2wCD',
  'https://ibb.co/FLX9qSWr',
  'https://ibb.co/jdzD6br',
  'https://ibb.co/wrwkJGdj',
  'https://ibb.co/PGmgBhrP',
];

console.log('Please visit each URL and get the direct image URL:');
console.log('Direct URLs should start with: https://i.ibb.co/');
console.log('\nPage URLs:');
pageUrls.forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});

