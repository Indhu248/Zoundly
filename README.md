# Zoundly - E-commerce Platform

Zoundly is a full-stack e-commerce web application with a modern React frontend and Node.js backend. It features dynamic product listings, shopping cart functionality, user authentication, and secure payments via Razorpay.

---

## Features

- User authentication with JWT and refresh tokens
- Browse and view product listings with filters
- Detailed product view page
- Shopping cart with persistent storage
- Checkout page with order summary
- Razorpay payment integration with backend verification
- Order management and tracking
- Admin panel for product management
- Email notifications for orders
- Fully responsive and mobile-friendly design

---

## Tech Stack

### Frontend
- React 19 + Vite
- Tailwind CSS
- React Router DOM
- React Context API
- Lucide Icons

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT Authentication
- Razorpay Payment Gateway
- Image URLs stored in MongoDB
- Nodemailer (for emails)

### Deployment
- Frontend: Netlify
- Backend: Railway/Render

---

## Project Structure
```
Zoundly/
├── front-end/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── package.json
│   └── server.js
└── README.md
```

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier available)
- Razorpay account

### Frontend Setup

1. **Navigate to front-end directory**

```bash
cd front-end
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory**

```bash
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

Copy `.env.example` to `.env` and fill in your configuration:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/zoundly
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
# ... other environment variables
```

4. **Run the backend server**

```bash
npm run dev
```

Backend will start on `http://localhost:5000`

See [backend/README.md](backend/README.md) for detailed backend documentation.

---

## API Documentation

The backend provides a RESTful API with the following main endpoints:

- **Authentication:** `/api/auth/*`
- **Products:** `/api/products/*`
- **Cart:** `/api/cart/*`
- **Orders:** `/api/orders/*`
- **Checkout:** `/api/checkout/*`
- **Webhooks:** `/api/webhooks/*`

For complete API documentation, see [backend/README.md](backend/README.md)

## Razorpay Integration

- Backend creates Razorpay orders and verifies payments
- Webhook support for payment status updates
- Secure payment verification on the server side
- Test mode supported for development

## Deployment

### Frontend (Netlify)

1. Connect your GitHub repository
2. Set base directory to `front-end`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables for API URL

### Backend (Railway/Render)

1. Connect your GitHub repository
2. Set root directory to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all environment variables from `.env`

See deployment guides in respective README files for detailed instructions.

---

## 📄 License

This project is licensed under the MIT License.

---

## Development

### Running Both Frontend and Backend

1. Start MongoDB (if running locally)
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd front-end && npm run dev`

### Environment Variables

Make sure to configure all required environment variables in `backend/.env`. See `backend/.env.example` for reference.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Razorpay Docs](https://razorpay.com/docs/)
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
