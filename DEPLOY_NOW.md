# Deploy Backend to Render - Quick Steps

## Option 1: Web Dashboard (Recommended - 5 minutes) ✅

Since we're on Windows, the web dashboard is the fastest way:

### Step 1: Go to Render Dashboard
1. Open: https://dashboard.render.com/
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

### Step 4: Configure Service
Fill in these settings:

- **Name:** `zoundly-backend`
- **Region:** Choose closest to you (e.g., `Oregon (US West)`)
- **Branch:** `master`
- **Root Directory:** `backend` ⚠️ **CRITICAL - Must be exactly `backend`**
- **Runtime:** `Node`
- **Build Command:** `npm install` (or leave blank)
- **Start Command:** `npm start` (or leave blank)
- **Instance Type:** `Free` (or upgrade for better performance)

### Step 5: Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"** and add:

```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend.vercel.app
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/zoundly?retryWrites=true&w=majority
JWT_SECRET=your-random-64-character-secret-here
JWT_REFRESH_SECRET=another-random-64-character-secret-here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

**⚠️ Important:** Replace placeholder values with your actual:
- MongoDB Atlas connection string
- JWT secrets (generate random 64-char strings)
- Razorpay keys (from Razorpay dashboard)
- Frontend URL (your Vercel URL)

### Step 6: Deploy
1. Click **"Create Web Service"**
2. Wait 2-5 minutes for deployment
3. Your backend will be live at: `https://zoundly-backend.onrender.com`

### Step 7: Test
Visit: `https://zoundly-backend.onrender.com/api/health`

Should see: `{"success":true,"message":"Server is running"}`

---

## Option 2: CLI (If you want to try)

For Windows, you can try:

### Download Render CLI Binary
1. Go to: https://github.com/render-oss/render-cli/releases
2. Download the Windows binary (`render-windows-amd64.exe`)
3. Rename to `render.exe`
4. Add to your PATH or use full path

### Then run:
```bash
render login
render blueprint launch
```

---

## Quick Checklist Before Deploying

- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created and connection string ready
- [ ] Database user created (username/password)
- [ ] Network access set to allow all IPs (0.0.0.0/0)
- [ ] Razorpay account created
- [ ] Razorpay API keys obtained
- [ ] JWT secrets generated (use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)
- [ ] Frontend URL ready (your Vercel URL)

---

## Generate JWT Secrets (Run in Terminal)

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Run this twice to get two different secrets for JWT_SECRET and JWT_REFRESH_SECRET.

---

## After Deployment

1. **Update Frontend:**
   - Go to Vercel Dashboard
   - Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://zoundly-backend.onrender.com`
   - Redeploy frontend

2. **Set up Razorpay Webhook:**
   - Go to Razorpay Dashboard → Settings → Webhooks
   - Add URL: `https://zoundly-backend.onrender.com/api/webhooks/razorpay`
   - Copy webhook secret and add to Render environment variables

3. **Test Everything:**
   - Test login/signup
   - Test product listing
   - Test cart functionality
   - Test checkout (use Razorpay test mode)

---

## Need Help?

- Render Docs: https://render.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Render Support: https://render.com/docs/support


