# Setting Up Frontend Environment Variables in Vercel

## Problem
If you're seeing "Failed to fetch" errors on your deployed frontend, it's because the frontend is trying to connect to `localhost` instead of your deployed Render backend.

## Solution: Add Environment Variable in Vercel

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Sign in to your account
3. Find and click on your **Zoundly** project

### Step 2: Add Environment Variable
1. Click on **"Settings"** tab
2. Click on **"Environment Variables"** in the left sidebar
3. Click **"Add New"** button

### Step 3: Configure the Variable
Add the following environment variable:

- **Key:** `VITE_API_URL`
- **Value:** `https://zoundly-backend.onrender.com/api`
  - ⚠️ **Important:** Replace `zoundly-backend` with your actual Render service name if different
  - Make sure to include `/api` at the end
- **Environment:** Select all (Production, Preview, Development)

### Step 4: Redeploy
1. After adding the environment variable, go to **"Deployments"** tab
2. Click the **"..."** menu on your latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger automatic redeployment

### Step 5: Verify
After redeployment, test your frontend:
- Products should load correctly
- No more "Failed to fetch" errors
- API calls should work

## How to Find Your Backend URL

1. Go to Render Dashboard: https://dashboard.render.com/
2. Click on your backend service (`zoundly-backend`)
3. Your backend URL will be shown at the top (e.g., `https://zoundly-backend.onrender.com`)
4. Add `/api` to the end for the full API URL

## Troubleshooting

### Still Getting Errors?
1. **Check the backend URL:** Make sure your Render backend is deployed and running
2. **Test backend directly:** Visit `https://your-backend.onrender.com/api/health` in browser
3. **Check CORS:** Make sure `FRONTEND_URL` in Render environment variables matches your Vercel URL
4. **Clear browser cache:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### For Local Development
Create a `.env` file in the `front-end` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

This will use your local backend when running `npm run dev` locally.

