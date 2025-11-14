# Quick Deployment Guide - Render (5 Minutes) ⚡

## Step-by-Step Deployment

### 1. Prepare MongoDB Atlas (5 minutes)
- Go to https://www.mongodb.com/cloud/atlas
- Sign up → Create free cluster
- Database Access → Create user (save password!)
- Network Access → Allow from anywhere (0.0.0.0/0)
- Database → Connect → Copy connection string
- Replace `<password>` with your password

### 2. Deploy to Render (5 minutes)

1. **Go to Render:** https://render.com/
2. **Sign up** with GitHub
3. **New +** → **Web Service**
4. **Connect GitHub** → Select `Indhu248/Zoundly`
5. **Settings:**
   - Name: `zoundly-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance: **Free**

6. **Environment Variables** (click "Environment" tab):
   ```
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/zoundly?retryWrites=true&w=majority
   JWT_SECRET=generate-random-64-char-string-here
   JWT_REFRESH_SECRET=generate-another-random-64-char-string-here
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_razorpay_secret_key
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```

7. **Click "Create Web Service"**
8. **Wait 2-5 minutes** for deployment
9. **Copy your backend URL** (e.g., `https://zoundly-backend.onrender.com`)

### 3. Update Frontend (2 minutes)

1. **Go to Vercel Dashboard**
2. **Your Project** → **Settings** → **Environment Variables**
3. **Add:**
   - Key: `VITE_API_URL`
   - Value: `https://zoundly-backend.onrender.com`
4. **Redeploy** frontend

### 4. Test

- Visit: `https://your-backend-url.onrender.com/api/health`
- Should see: `{"success":true,"message":"Server is running"}`

✅ **Done!** Your backend is live!

---

## Generate JWT Secrets

Run this in Node.js console or terminal:
```javascript
require('crypto').randomBytes(64).toString('hex')
```

Or use online generator: https://randomkeygen.com/

---

## Need Help?

- Full guide: See `DEPLOYMENT.md`
- Render Docs: https://render.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com/

