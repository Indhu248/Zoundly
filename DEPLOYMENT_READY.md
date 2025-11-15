# 🚀 Backend Deployment - Ready to Deploy!

All configuration is ready. Follow these steps to deploy your backend to Render.

## ✅ Pre-generated Secrets

Your JWT secrets have been generated and saved to `deployment-secrets.txt`:

```
JWT_SECRET=88db536049f82df75baae2cfe57c91b19db66a76bdb1b9cfbe9b693715a513fb7b22b2ae281d117540a9f28f9087491f250087010fa34440d615ba2f1e9277e4
JWT_REFRESH_SECRET=46f89b32e87d71642e0c4a856318c36ab09ca6fe283bc19d307bcafe174bd2f98c39779f40f8f29a5602ea2edb1b9216ecc05f1f91ae35af89b6f8deda78ac75
```

## 📋 Step-by-Step Deployment

### Step 1: Open Render Dashboard
1. Go to: **https://dashboard.render.com/**
2. Sign in (or sign up with GitHub)

### Step 2: Create New Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**

### Step 3: Connect Repository
1. Click **"Connect account"** if not connected
2. Select **GitHub**
3. Authorize Render to access your repositories
4. Select repository: **`Indhu248/Zoundly`**
5. Click **"Connect"**

### Step 4: Configure Service Settings

Fill in these **exact** settings:

| Setting | Value |
|---------|-------|
| **Name** | `zoundly-backend` |
| **Region** | Choose closest to you (e.g., `Oregon (US West)`) |
| **Branch** | `master` |
| **Root Directory** | `backend` ⚠️ **CRITICAL - Must be exactly `backend`** |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### Step 5: Add Environment Variables

Click **"Advanced"** → **"Environment"** → **"Add Environment Variable"**

Add these variables **one by one**:

```bash
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://zoundly-cipculyju-indhu248s-projects.vercel.app
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/zoundly?retryWrites=true&w=majority
JWT_SECRET=88db536049f82df75baae2cfe57c91b19db66a76bdb1b9cfbe9b693715a513fb7b22b2ae281d117540a9f28f9087491f250087010fa34440d615ba2f1e9277e4
JWT_REFRESH_SECRET=46f89b32e87d71642e0c4a856318c36ab09ca6fe283bc19d307bcafe174bd2f98c39779f40f8f29a5602ea2edb1b9216ecc05f1f91ae35af89b6f8deda78ac75
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

**⚠️ Important:** Replace these placeholder values:
- `FRONTEND_URL` - Your actual Vercel frontend URL (if deployed)
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `RAZORPAY_KEY_ID` - Your Razorpay test/live key ID
- `RAZORPAY_KEY_SECRET` - Your Razorpay secret key
- `RAZORPAY_WEBHOOK_SECRET` - Your Razorpay webhook secret

### Step 6: Deploy
1. Click **"Create Web Service"**
2. Wait 2-5 minutes for deployment
3. Your backend will be live at: `https://zoundly-backend.onrender.com`

### Step 7: Test Deployment
Visit: `https://zoundly-backend.onrender.com/api/health`

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-..."
}
```

## 🔧 After Deployment

### 1. Update Frontend (if deployed)
- Go to Vercel Dashboard
- Settings → Environment Variables
- Add: `VITE_API_URL` = `https://zoundly-backend.onrender.com`
- Redeploy frontend

### 2. Set up Razorpay Webhook
- Go to Razorpay Dashboard → Settings → Webhooks
- Add URL: `https://zoundly-backend.onrender.com/api/webhooks/razorpay`
- Copy webhook secret and add to Render environment variables

### 3. Test Everything
- Test login/signup
- Test product listing
- Test cart functionality
- Test checkout (use Razorpay test mode)

## 📝 Quick Reference

**Backend URL:** `https://zoundly-backend.onrender.com`  
**Health Check:** `https://zoundly-backend.onrender.com/api/health`  
**API Base:** `https://zoundly-backend.onrender.com/api`

## ⚠️ Important Notes

1. **Free Tier Limitation:** Render's free tier spins down after 15 minutes of inactivity. The first request after inactivity may take 30-60 seconds to wake up.

2. **Root Directory:** Make sure it's set to `backend` (not `/backend` or `./backend`)

3. **Environment Variables:** All variables are case-sensitive. Make sure they match exactly.

4. **MongoDB Atlas:** Make sure your IP is whitelisted (or use `0.0.0.0/0` for all IPs)

## 🆘 Troubleshooting

### Deployment Fails
- Check Render logs: Dashboard → Your Service → Logs
- Verify Root Directory is set to `backend`
- Ensure all environment variables are set correctly

### Health Check Fails
- Check MongoDB connection string
- Verify all environment variables are set
- Check Render logs for errors

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes Render IPs
- Check MongoDB username/password in connection string
- Ensure database user has proper permissions

## ✅ Deployment Checklist

Before deploying, make sure you have:
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created and connection string ready
- [ ] Database user created (username/password)
- [ ] Network access set to allow all IPs (0.0.0.0/0)
- [ ] Razorpay account created
- [ ] Razorpay API keys obtained
- [ ] Frontend URL ready (if frontend is deployed)

---

**Ready to deploy?** Go to: https://dashboard.render.com/

