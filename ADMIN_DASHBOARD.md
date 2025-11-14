# Admin Dashboard Guide

## How to Access the Admin Dashboard

### Step 1: Make a User Admin

First, you need to make a user account an admin. You can do this in two ways:

#### Option A: Using the Script (Recommended)

1. Make sure your backend is running and connected to MongoDB
2. Run the following command in the `backend` directory:

```bash
npm run make-admin <user-email>
```

Example:
```bash
npm run make-admin admin@example.com
```

#### Option B: Manually in MongoDB Atlas

1. Go to MongoDB Atlas Dashboard
2. Browse Collections → Find `users` collection
3. Find the user document you want to make admin
4. Edit the document and change `role` from `"customer"` to `"admin"`
5. Save the document

### Step 2: Login as Admin

1. Go to `/login` page
2. Login with the admin account credentials
3. You should see an "Admin" button in the navbar

### Step 3: Access Admin Dashboard

1. Click the "Admin" button in the navbar, OR
2. Navigate directly to `/admin`

## Admin Dashboard Features

### 1. Dashboard Overview (`/admin`)

- **Statistics Cards:**
  - Total Products
  - Total Orders
  - Total Revenue (from paid orders)
  - Pending Orders

- **Quick Actions:**
  - Manage Products
  - Manage Orders

### 2. Product Management (`/admin/products`)

**Features:**
- View all products in a table
- Add new products
- Edit existing products
- Delete products (soft delete - sets isActive to false)

**To Add a Product:**
1. Click "Add Product" button
2. Fill in the form:
   - Product Name (required)
   - Category (earphones, headphones, speakers, watches)
   - Price (₹)
   - Original Price (₹)
   - Stock Quantity
   - SKU (optional)
   - Image URL (e.g., `/earphones_a_1.webp`)
   - Rating (0-5)
   - Description
   - Features (click "Add" after typing each feature)
3. Click "Create Product"

**To Edit a Product:**
1. Click the Edit icon (pencil) next to the product
2. Modify the fields
3. Click "Update Product"

**To Delete a Product:**
1. Click the Delete icon (trash) next to the product
2. Confirm deletion

### 3. Order Management (`/admin/orders`)

**Features:**
- View all orders
- Update order status
- View order details

**Order Statuses:**
- **Pending** - Order placed, payment pending
- **Processing** - Payment received, order being prepared
- **Shipped** - Order shipped
- **Delivered** - Order delivered
- **Cancelled** - Order cancelled

**To Update Order Status:**
1. Find the order in the table
2. Click the status dropdown
3. Select new status
4. Status updates automatically

**To View Order Details:**
1. Click the eye icon next to an order
2. View full order information including:
   - Order number
   - Customer details
   - Shipping address
   - Order items
   - Payment status

## API Endpoints Used

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `GET /api/orders` - Get all orders (admin sees all, users see their own)
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (admin only)

## Security

- All admin routes require authentication
- Admin-only endpoints check user role
- Non-admin users are redirected if they try to access admin pages
- Admin button only shows for users with `role: 'admin'`

## Troubleshooting

**Can't see Admin button:**
- Make sure you're logged in
- Verify your user role is set to 'admin' in database
- Try logging out and logging back in

**Can't access admin pages:**
- Check that you're logged in
- Verify your user role is 'admin'
- Check browser console for errors

**Products not saving:**
- Check that all required fields are filled
- Verify image URL is correct format
- Check backend console for errors

**Orders not updating:**
- Make sure backend is running
- Check that order status is valid (pending, processing, shipped, delivered, cancelled)
- Verify you have admin role

## Quick Start Checklist

- [ ] Create a user account (via `/register`)
- [ ] Make the user admin (using `npm run make-admin` script)
- [ ] Login with admin credentials
- [ ] Click "Admin" button in navbar
- [ ] Start managing products and orders!




