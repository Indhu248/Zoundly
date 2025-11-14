# Authentication Fix Guide

## Problem: "Not authorized to access this route"

This error occurs when:
1. Token is missing from localStorage
2. Token has expired
3. Token is invalid
4. User is not logged in

## Solution Steps:

### Step 1: Check if you're logged in

1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Check Local Storage
4. Look for `token` key
5. If it's missing or empty, you need to login

### Step 2: Login Again

1. Go to `/login` page
2. Login with your admin credentials
3. This will store a fresh token

### Step 3: Verify Admin Role

After logging in, verify your user is admin:

**Option A: Check in Browser Console**
```javascript
// Open browser console (F12)
localStorage.getItem('token')
// Should show a JWT token string

// Check user data
// The user role should be checked by the backend
```

**Option B: Check MongoDB**
1. Go to MongoDB Atlas
2. Browse Collections → `users`
3. Find your user document
4. Verify `role` field is `"admin"`

### Step 4: Make User Admin (if needed)

If your user is not admin:

```bash
cd backend
npm run make-admin your-email@example.com
```

**Important:** The user must exist first! Register at `/register` if needed.

### Step 5: Clear Cache and Reload

1. Clear browser cache
2. Clear localStorage (or logout and login again)
3. Reload the page

## Debugging Steps:

### Check Token in Console:
```javascript
// In browser console
console.log('Token:', localStorage.getItem('token'));
console.log('Refresh Token:', localStorage.getItem('refreshToken'));
```

### Check API Response:
Open Network tab in DevTools and check:
- Request headers should include: `Authorization: Bearer <token>`
- Response status should be 200 (not 401)

### Common Issues:

1. **Token expired**: Login again to get a new token
2. **User not admin**: Run `npm run make-admin <email>`
3. **Token not stored**: Check if login was successful
4. **Backend not running**: Make sure backend server is running on port 5000

## Quick Fix:

1. **Logout**: Click logout button
2. **Clear localStorage**: 
   ```javascript
   localStorage.clear()
   ```
3. **Login again**: Go to `/login` and login
4. **Access admin**: Click Admin button or go to `/admin`

## Still Having Issues?

1. Check backend is running: `cd backend && npm run dev`
2. Check backend logs for errors
3. Verify JWT_SECRET is set in backend `.env`
4. Check MongoDB connection is working
5. Try registering a new user and making them admin




