# Troubleshooting "Failed to fetch" Error

## Common Causes and Solutions

### 1. ✅ CORS Configuration (FIXED)
**Problem:** Backend CORS not allowing your Vercel frontend URL.

**Solution:** Updated CORS to allow:
- Your specific Vercel URL: `https://zoundly-cipculyju-indhu248s-projects.vercel.app`
- All Vercel preview URLs (pattern matching)
- Localhost for development

**Status:** ✅ Fixed in latest commit

---

### 2. ⚠️ Backend URL Not Set in Vercel
**Problem:** Frontend doesn't know where your backend is.

**Solution:** 
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://zoundly-backend.onrender.com/api`
3. **Important:** Replace `zoundly-backend` with your actual Render service name
4. Redeploy frontend

**Check:** Open browser console, you should see the API URL being used.

---

### 3. ⚠️ Backend Not Running or Sleeping
**Problem:** Render free tier spins down after 15 minutes of inactivity.

**Symptoms:** First request takes 30-60 seconds, then works.

**Solution:**
- Wait for backend to wake up (first request will be slow)
- Or upgrade to paid tier for always-on service
- Or use a service like UptimeRobot to ping your backend every 10 minutes

**Test:** Visit `https://your-backend.onrender.com/api/health` directly in browser

---

### 4. ⚠️ Backend URL Incorrect
**Problem:** Wrong backend URL configured.

**Check:**
1. Go to Render Dashboard: https://dashboard.render.com/
2. Click on your backend service
3. Copy the URL shown (e.g., `https://zoundly-backend.onrender.com`)
4. Make sure Vercel environment variable uses: `https://your-backend.onrender.com/api`

**Note:** Must include `/api` at the end!

---

### 5. ⚠️ Backend Environment Variables Missing
**Problem:** Backend not configured correctly.

**Check in Render Dashboard:**
- `FRONTEND_URL` should match your Vercel URL
- `MONGODB_URI` should be set
- `NODE_ENV=production`
- All other required variables

---

### 6. ⚠️ Network/Firewall Issues
**Problem:** Browser blocking the request.

**Check:**
- Open browser DevTools → Network tab
- Look for the failed request
- Check error message and status code
- Check if request is being blocked by browser extension

---

## Debugging Steps

### Step 1: Check Browser Console
Open DevTools (F12) → Console tab
- Look for error messages
- Check what API URL is being used
- Look for CORS errors

### Step 2: Check Network Tab
Open DevTools → Network tab
- Find the failed request (usually `/api/products`)
- Click on it
- Check:
  - Request URL (should be your Render backend)
  - Status code (404, 500, CORS error?)
  - Response headers
  - Error message

### Step 3: Test Backend Directly
Open in browser:
```
https://your-backend.onrender.com/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

### Step 4: Check Backend Logs
1. Go to Render Dashboard
2. Click on your backend service
3. Go to "Logs" tab
4. Look for:
   - CORS errors
   - Database connection errors
   - Any error messages

### Step 5: Verify Environment Variables

**In Vercel:**
- `VITE_API_URL` = `https://your-backend.onrender.com/api`

**In Render:**
- `FRONTEND_URL` = `https://zoundly-cipculyju-indhu248s-projects.vercel.app`
- `MONGODB_URI` = (your MongoDB connection string)
- `NODE_ENV` = `production`
- `PORT` = `10000`

---

## Quick Fix Checklist

- [ ] Backend is deployed and running on Render
- [ ] Backend health check works: `https://your-backend.onrender.com/api/health`
- [ ] `VITE_API_URL` is set in Vercel environment variables
- [ ] `FRONTEND_URL` is set in Render environment variables
- [ ] Frontend has been redeployed after setting environment variables
- [ ] Backend CORS allows your Vercel URL
- [ ] No browser extensions blocking requests
- [ ] Check browser console for specific error messages

---

## Still Not Working?

1. **Share the exact error message** from browser console
2. **Share the Network tab details** (request URL, status code, response)
3. **Share backend logs** from Render dashboard
4. **Verify backend URL** is correct and accessible

---

## Test Commands

### Test Backend Health
```bash
curl https://your-backend.onrender.com/api/health
```

### Test Products Endpoint
```bash
curl https://your-backend.onrender.com/api/products
```

### Test with CORS Headers
```bash
curl -H "Origin: https://zoundly-cipculyju-indhu248s-projects.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://your-backend.onrender.com/api/products
```

