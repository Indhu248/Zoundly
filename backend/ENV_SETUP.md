# Environment Variables Setup Guide

This guide explains what values to put in your `.env` file and where to get them.

## Required Environment Variables

### 1. Server Configuration

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Explanation:**
- `PORT`: Port number for the backend server (default: 5000)
- `NODE_ENV`: Environment mode - use `development` for local, `production` for deployed
- `FRONTEND_URL`: Your frontend URL (for CORS). Use `http://localhost:5173` for local development

---

### 2. Database Configuration (MongoDB)

```env
MONGODB_URI=mongodb://localhost:27017/zoundly
```

**Option A: Local MongoDB**
- If you have MongoDB installed locally:
  ```env
  MONGODB_URI=mongodb://localhost:27017/zoundly
  ```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `zoundly` or your preferred database name
   
   Example:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/zoundly?retryWrites=true&w=majority
   ```

---

### 3. JWT Authentication Secrets

```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

**How to generate secrets:**
- Use any random string generator
- Or run in Node.js: `require('crypto').randomBytes(64).toString('hex')`
- Make them long and random (at least 32 characters)
- **IMPORTANT:** Use different values for production!

**Example:**
```env
JWT_SECRET=a7f3b9c2d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2
JWT_REFRESH_SECRET=f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

### 4. Razorpay Configuration

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
```

**How to get Razorpay credentials:**

1. **Sign up for Razorpay:**
   - Go to https://razorpay.com/
   - Sign up for a free account
   - Login to Razorpay Dashboard

2. **Get API Keys:**
   - Go to Settings → API Keys
   - Click "Generate Test Key" (for development)
   - Copy the `Key ID` (starts with `rzp_test_`)
   - Copy the `Key Secret`
   - Paste them in your `.env` file

3. **Get Webhook Secret (Optional for now):**
   - Go to Settings → Webhooks
   - Create a webhook endpoint: `https://your-backend-url.com/api/webhooks/razorpay`
   - Copy the webhook secret
   - For local development, you can use a placeholder or skip this

**Example:**
```env
RAZORPAY_KEY_ID=rzp_test_AbCdEfGhIjKlMn
RAZORPAY_KEY_SECRET=xyz123abc456def789ghi012jkl345mno678pqr901
RAZORPAY_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

---

### 5. File Storage (Optional)

**We're using MongoDB Atlas for database and storing image URLs directly in MongoDB.**

You don't need AWS S3. Instead, you can:

**Option A: Store images in frontend public folder**
- Put images in `front-end/public/images/`
- Use URLs like: `/images/product1.webp`

**Option B: Use free image hosting**
- Cloudinary (free tier): https://cloudinary.com/
- ImgBB: https://imgbb.com/
- Upload images and use the provided URLs

**Option C: Use AWS S3 (if you want)**
- Only needed if you want server-side file uploads
- See AWS documentation for setup

**For now, skip AWS S3 - it's not required!**

---

### 6. Email Configuration (Optional - for order notifications)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@zoundly.com
```

**How to configure Gmail SMTP:**

1. **Enable 2-Factor Authentication** on your Gmail account

2. **Generate App Password:**
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Go to App Passwords
   - Generate new app password for "Mail"
   - Copy the 16-character password

3. **Use in .env:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx  (the app password)
   EMAIL_FROM=noreply@zoundly.com
   ```

**Alternative Email Services:**
- **SendGrid:** Use `smtp.sendgrid.net` with SendGrid credentials
- **Mailgun:** Use Mailgun SMTP settings
- **Outlook:** Use `smtp-mail.outlook.com`

**Note:** Email is optional. The app works without it, but order confirmations won't be sent.

---

## Complete .env File Template

Copy this template and fill in your values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/zoundly
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/zoundly?retryWrites=true&w=majority

# JWT Secrets (generate random strings)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Razorpay (get from Razorpay Dashboard)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here

# AWS S3 - NOT NEEDED (we're using MongoDB Atlas and storing image URLs)
# Only add these if you want server-side file uploads to S3
# AWS_ACCESS_KEY_ID=your_aws_access_key
# AWS_SECRET_ACCESS_KEY=your_aws_secret_key
# AWS_REGION=us-east-1
# AWS_S3_BUCKET_NAME=zoundly-products

# Email Configuration (Optional - skip if not sending emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@zoundly.com
```

---

## Minimum Required Variables (to get started)

If you want to start quickly, you only need these:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/zoundly
JWT_SECRET=change-this-to-random-string-min-32-characters-long
JWT_REFRESH_SECRET=change-this-to-another-random-string-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

You can add AWS and Email later when needed.

---

## Quick Start Checklist

- [ ] MongoDB running locally OR MongoDB Atlas connection string
- [ ] Razorpay account created and API keys obtained
- [ ] JWT secrets generated (random strings)
- [ ] (Optional) AWS S3 credentials if uploading files
- [ ] (Optional) Email SMTP credentials if sending emails

---

## Need Help?

- **MongoDB:** https://www.mongodb.com/docs/manual/installation/
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas/register
- **Razorpay:** https://razorpay.com/docs/
- **AWS S3:** https://docs.aws.amazon.com/s3/

