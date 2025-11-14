# Quick Admin Setup Guide

## The user wasn't found? Here's how to fix it:

### Step 1: Register/Create the User Account First

You need to create the user account BEFORE making them admin. Here are your options:

#### Option A: Register via Frontend (Easiest)
1. Start your frontend: `cd front-end && npm run dev`
2. Go to `http://localhost:5173/register`
3. Fill in the registration form with:
   - Name: Your name
   - Email: `botchaindravathi@gmail.com`
   - Phone: Your phone number
   - Password: Choose a password
4. Click "Create account"
5. Now proceed to Step 2

#### Option B: Check Existing Users
If you think the user already exists, check:
1. Go to MongoDB Atlas Dashboard
2. Browse Collections → `users` collection
3. Check what email addresses exist
4. Use the correct email in the make-admin command

### Step 2: Make the User Admin

Once the user account exists, run:

```bash
cd backend
npm run make-admin botchaindravathi@gmail.com
```

### Step 3: Login and Access Admin Dashboard

1. Go to `/login` page
2. Login with `botchaindravathi@gmail.com` and your password
3. You should see "Admin" button in navbar
4. Click it to access `/admin`

## Alternative: Create Admin Directly in MongoDB

If you prefer to create admin directly in database:

1. Go to MongoDB Atlas Dashboard
2. Browse Collections → `users` collection
3. Click "Insert Document"
4. Add this document:
```json
{
  "name": "Admin User",
  "email": "botchaindravathi@gmail.com",
  "password": "your-hashed-password",
  "phone": "1234567890",
  "role": "admin"
}
```

**Note:** The password needs to be hashed with bcrypt. It's easier to register via frontend first!

## Troubleshooting

**"User not found" error:**
- Make sure you registered the user first
- Check the email spelling matches exactly
- Verify user exists in MongoDB `users` collection

**Can't see Admin button:**
- Make sure you logged out and logged back in after making admin
- Check user role is "admin" in database
- Clear browser cache/localStorage




