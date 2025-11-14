# Backend Deployment Guide

This guide will help you deploy your Zoundly backend to various hosting platforms.

## Prerequisites

Before deploying, make sure you have:
- ✅ MongoDB Atlas account (free tier available)
- ✅ Razorpay account with API keys
- ✅ GitHub repository with your code pushed
- ✅ Environment variables ready

---

## Option 1: Render (Recommended - Free Tier Available) 🚀

**Render** offers a free tier perfect for Node.js backends.

### Steps:

1. **Sign up for Render**
   - Go to https://render.com/
   - Sign up with GitHub

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository: `Indhu248/Zoundly`
   - Choose branch: `master`

3. **Configure Build Settings**
   - **Name:** `zoundly-backend` (or any name you prefer)
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (or paid for better performance)

4. **Add Environment Variables**
   Click "Environment" tab and add:
   ```
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_here
   JWT_REFRESH_SECRET=your_refresh_secret_here
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (usually 2-5 minutes)
   - Your backend will be available at: `https://zoundly-backend.onrender.com`

6. **Update Frontend API URL**
   - Update your frontend's API base URL to point to your Render backend
   - Example: `https://zoundly-backend.onrender.com/api`

**Note:** Free tier on Render spins down after 15 minutes of inactivity. First request may take 30-60 seconds to wake up.

---

## Option 2: Railway 🚂

**Railway** offers easy deployment with a free tier ($5 credit monthly).

### Steps:

1. **Sign up for Railway**
   - Go to https://railway.app/
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Railway will auto-detect Node.js
   - Set **Root Directory** to `backend`
   - Set **Start Command** to `npm start`

4. **Add Environment Variables**
   - Go to "Variables" tab
   - Add all environment variables (same as Render above)

5. **Deploy**
   - Railway will automatically deploy
   - Get your backend URL from the "Settings" → "Domains" section

---

## Option 3: Heroku 🟣

**Heroku** is a popular platform (now requires paid plan, but reliable).

### Steps:

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create zoundly-backend
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set FRONTEND_URL=https://your-frontend-url.vercel.app
   heroku config:set MONGODB_URI=your_mongodb_atlas_connection_string
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set JWT_REFRESH_SECRET=your_refresh_secret
   heroku config:set RAZORPAY_KEY_ID=your_razorpay_key_id
   heroku config:set RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

5. **Deploy**
   ```bash
   git push heroku master
   ```

6. **Open App**
   ```bash
   heroku open
   ```

---

## Option 4: DigitalOcean App Platform 🌊

**DigitalOcean** offers App Platform with a free tier.

### Steps:

1. **Sign up for DigitalOcean**
   - Go to https://www.digitalocean.com/
   - Sign up (get $200 credit for new users)

2. **Create App**
   - Go to "Apps" → "Create App"
   - Connect GitHub repository
   - Select repository and branch

3. **Configure**
   - **Type:** Web Service
   - **Source Directory:** `backend`
   - **Build Command:** `npm install`
   - **Run Command:** `npm start`

4. **Add Environment Variables**
   - Add all required environment variables in the app settings

5. **Deploy**
   - Click "Create Resources"
   - Wait for deployment

---

## Important: Update Frontend After Deployment

After deploying your backend, update your frontend's API configuration:

### Update `front-end/src/utils/api.js`:

```javascript
// Change the base URL from localhost to your deployed backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend-url.onrender.com';
```

### Add to `front-end/.env`:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### Update Vercel Environment Variables:

1. Go to your Vercel project settings
2. Go to "Environment Variables"
3. Add: `VITE_API_URL` = `https://your-backend-url.onrender.com`
4. Redeploy your frontend

---

## MongoDB Atlas Setup (Required)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Choose free tier (M0)
   - Select your region
   - Create cluster

3. **Configure Database Access**
   - Go to "Database Access"
   - Create database user
   - Set username and password (save these!)

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for production)
   - Or add specific IPs for security

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `zoundly`

   Example:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/zoundly?retryWrites=true&w=majority
   ```

6. **Use in Environment Variables**
   - Add this as `MONGODB_URI` in your hosting platform

---

## Razorpay Webhook Setup

After deploying, set up Razorpay webhooks:

1. **Get Your Backend Webhook URL**
   - Your webhook endpoint: `https://your-backend-url.com/api/webhooks/razorpay`

2. **Configure in Razorpay Dashboard**
   - Go to Razorpay Dashboard → Settings → Webhooks
   - Add webhook URL: `https://your-backend-url.com/api/webhooks/razorpay`
   - Select events: `payment.captured`, `payment.failed`
   - Copy the webhook secret

3. **Add Webhook Secret**
   - Add `RAZORPAY_WEBHOOK_SECRET` to your environment variables

---

## Testing Your Deployment

1. **Health Check**
   ```bash
   curl https://your-backend-url.com/api/health
   ```
   Should return: `{"success":true,"message":"Server is running"}`

2. **Test API Endpoints**
   - Try: `https://your-backend-url.com/api/products`
   - Should return product list

3. **Test from Frontend**
   - Make sure frontend is pointing to new backend URL
   - Test login, products, cart functionality

---

## Troubleshooting

### Backend Not Starting
- Check environment variables are set correctly
- Check MongoDB connection string
- Check logs in hosting platform dashboard

### CORS Errors
- Make sure `FRONTEND_URL` matches your frontend domain exactly
- Include protocol (`https://`) and no trailing slash

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0` (all IPs)
- Check username/password in connection string
- Verify database name is correct

### Payment Issues
- Verify Razorpay keys are correct
- Check webhook URL is accessible
- Verify webhook secret matches

---

## Recommended Setup

For best results, we recommend:
- **Backend:** Render (free tier) or Railway
- **Frontend:** Vercel (already set up)
- **Database:** MongoDB Atlas (free tier)
- **Payments:** Razorpay

---

## Need Help?

- **Render Docs:** https://render.com/docs
- **Railway Docs:** https://docs.railway.app/
- **MongoDB Atlas:** https://docs.atlas.mongodb.com/
- **Razorpay Docs:** https://razorpay.com/docs/

