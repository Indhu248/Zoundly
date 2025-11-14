# How to Seed Products into Database

Your frontend is trying to fetch products from the backend API, but your database is empty. Here's how to add products:

## Option 1: Use the Seed Script (Recommended)

1. Make sure your backend is running and connected to MongoDB
2. Run the seed script:

```bash
cd backend
npm run seed
```

This will add 5 sample products to your database.

## Option 2: Add Products via API

You can add products using the API. First, you need to:

1. Register an admin user (or modify a user to be admin in MongoDB)
2. Use the admin account to create products via POST `/api/products`

Example using curl:

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Product Name",
    "description": "Product description",
    "category": "earphones",
    "price": 1999,
    "originalPrice": 2999,
    "discount": 33,
    "stockQuantity": 100,
    "sku": "PROD-001",
    "rating": 4.5,
    "images": ["/image1.webp"],
    "image": "/image1.webp",
    "features": ["Feature 1", "Feature 2"]
  }'
```

## Option 3: Add Products via MongoDB Atlas

1. Go to MongoDB Atlas Dashboard
2. Browse Collections
3. Find your `products` collection
4. Click "Insert Document"
5. Add products manually

## Image URLs

Make sure your product images are accessible. You can:

1. Put images in `front-end/public/` folder and reference them as `/image.webp`
2. Use external URLs (like Cloudinary, ImgBB, etc.)
3. Use relative paths from your frontend public folder

Example image paths:
- `/earphones_a_1.webp` (if in public folder)
- `https://example.com/image.webp` (external URL)

## After Seeding

Once products are added, refresh your frontend and you should see:
- Featured products on home page
- All products on products page
- Products available for cart and checkout

