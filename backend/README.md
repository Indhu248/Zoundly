# Zoundly Backend API

Backend API for Zoundly e-commerce platform built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT and refresh tokens
- Product management (CRUD operations)
- Shopping cart functionality
- Order management
- Razorpay payment integration with webhook verification
- Email notifications for orders
- Image URL storage (images stored as URLs in MongoDB)
- RESTful API design
- Error handling and validation
- Role-based access control (Admin/Customer)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Payment:** Razorpay
- **File Storage:** AWS S3
- **Email:** Nodemailer

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Razorpay account
- AWS account (for S3, optional)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

MONGODB_URI=mongodb://localhost:27017/zoundly

JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=zoundly-products

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@zoundly.com
```

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Products

- `GET /api/products` - Get all products (with pagination, filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart

- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:itemId` - Update cart item quantity (protected)
- `DELETE /api/cart/:itemId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear entire cart (protected)

### Orders

- `GET /api/orders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get order details (protected)
- `PUT /api/orders/:id/status` - Update order status (admin only)
- `POST /api/orders/:id/cancel` - Cancel order (protected)

### Checkout

- `POST /api/checkout/initiate` - Create order and Razorpay order (protected)
- `POST /api/checkout/verify` - Verify Razorpay payment

### Webhooks

- `POST /api/webhooks/razorpay` - Razorpay webhook handler

## Request/Response Examples

### Register User

**Request:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    },
    "token": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

### Login

**Request:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    },
    "token": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

### Get Products

**Request:**
```
GET /api/products?category=earphones&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
}
```

### Add to Cart

**Request:**
```json
POST /api/cart
Headers: Authorization: Bearer <token>
{
  "productId": "product_id",
  "quantity": 1
}
```

### Initiate Checkout

**Request:**
```json
POST /api/checkout/initiate
Headers: Authorization: Bearer <token>
{
  "items": [
    {
      "productId": "product_id",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St",
    "city": "Mumbai",
    "pincode": "400001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order initiated successfully",
  "data": {
    "order": {
      "id": "order_id",
      "orderNumber": "ORD-123456-001",
      "finalAmount": 2049
    },
    "razorpayOrderId": "order_razorpay_id",
    "razorpayKeyId": "rzp_test_xxx"
  }
}
```

### Verify Payment

**Request:**
```json
POST /api/checkout/verify
{
  "orderId": "order_id",
  "paymentId": "pay_xxx",
  "signature": "signature_xxx",
  "razorpayOrderId": "order_razorpay_id"
}
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns errors in the following format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Database Models

### User
- id, name, email, password, phone, role, emailVerified, refreshToken, timestamps

### Product
- id, name, description, category, price, originalPrice, discount, stockQuantity, sku, rating, images, image, features, isActive, timestamps

### Cart
- id, user, product, quantity, timestamps

### Order
- id, orderNumber, user, status, paymentStatus, totalAmount, shippingAmount, finalAmount, razorpayOrderId, razorpayPaymentId, razorpaySignature, shippingAddress, billingAddress, timestamps

### OrderItem
- id, order, product, quantity, priceAtPurchase, subtotal, timestamps

## Razorpay Integration

1. Create a Razorpay order via `/api/checkout/initiate`
2. Use the returned `razorpayOrderId` and `razorpayKeyId` in the frontend
3. After payment, verify via `/api/checkout/verify`
4. Webhooks are handled at `/api/webhooks/razorpay`

## Environment Variables

See `.env.example` for all required environment variables.

## Deployment

### Railway

1. Connect your GitHub repository
2. Set the root directory to `backend`
3. Add all environment variables
4. Set build command: `npm install`
5. Set start command: `npm start`

### Render

1. Create a new Web Service
2. Connect your repository
3. Set root directory to `backend`
4. Add environment variables
5. Build command: `npm install`
6. Start command: `npm start`

## Development

Run in development mode with auto-reload:
```bash
npm run dev
```

## Production

Build and start:
```bash
npm start
```

## License

MIT

