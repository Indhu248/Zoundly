# 🚨 URGENT: Fix Frontend API URL in Vercel

## Problem
Your frontend is trying to connect to `http://localhost:5000/api/products` instead of your Render backend.

**Error:** `GET http://localhost:5000/api/products net::ERR_CONNECTION_REFUSED`

## Solution: Set Environment Variable in Vercel

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Sign in
3. Click on your **Zoundly** project

### Step 2: Add Environment Variable
1. Click **"Settings"** tab (top navigation)
2. Click **"Environment Variables"** in the left sidebar
3. Click **"Add New"** button

### Step 3: Configure the Variable
Fill in:
- **Key:** `VITE_API_URL`
- **Value:** `https://zoundly-backend.onrender.com/api`
  - ⚠️ **Replace `zoundly-backend` with your actual Render service name if different**
  - ⚠️ **Must include `/api` at the end**
- **Environment:** Select **ALL** (Production, Preview, Development)

### Step 4: Save and Redeploy
1. Click **"Save"**
2. Go to **"Deployments"** tab
3. Click the **"..."** menu (three dots) on your latest deployment
4. Click **"Redeploy"**
5. Wait for deployment to complete (2-3 minutes)

### Step 5: Verify
1. After redeployment, refresh your frontend
2. Open browser DevTools (F12) → Console
3. You should see: `🌐 Using API URL: https://zoundly-backend.onrender.com/api`
4. Products should now load!

---

## How to Find Your Render Backend URL

1. Go to Render Dashboard: https://dashboard.render.com/
2. Click on your backend service (usually named `zoundly-backend`)
3. Your backend URL is shown at the top (e.g., `https://zoundly-backend.onrender.com`)
4. Add `/api` to make it: `https://zoundly-backend.onrender.com/api`

---

## Quick Checklist

- [ ] Environment variable `VITE_API_URL` added in Vercel
- [ ] Value is: `https://your-backend.onrender.com/api` (with `/api` at end)
- [ ] Environment set to "All" (Production, Preview, Development)
- [ ] Frontend redeployed after adding variable
- [ ] Checked browser console - should show correct API URL
- [ ] Products page loads without errors

---

## Still Not Working?

### Check 1: Verify Environment Variable is Set
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Make sure `VITE_API_URL` exists and has correct value
3. Make sure it's enabled for Production environment

### Check 2: Verify Backend is Running
Test in browser:
```
https://your-backend.onrender.com/api/health
```
Should return: `{"success": true, "message": "Server is running"}`

### Check 3: Check Browser Console
1. Open DevTools (F12) → Console
2. Look for: `🌐 Using API URL: ...`
3. Should show your Render backend URL, NOT localhost

### Check 4: Clear Browser Cache
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or clear browser cache completely

---

## Why This Happens

Vite environment variables (like `VITE_API_URL`) are **baked into the build** at build time. If you:
1. Deploy without setting the variable → Uses fallback (localhost)
2. Set variable after deployment → Old build still has localhost
3. **Solution:** Set variable BEFORE deployment, or redeploy after setting it

---

## For Future Deployments

Always make sure `VITE_API_URL` is set in Vercel **before** deploying, or the build will use the fallback URL.

