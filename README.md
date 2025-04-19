Awesome! Here's an updated `README.md` file with **Razorpay** and **Netlify** included:

```markdown
# Zoundly - Shopping Website 🛍️

Zoundly is a modern and responsive e-commerce web application built using **React + Vite**. It features dynamic product listings, shopping cart functionality, and secure payments via **Razorpay**. The project is deployed on **Netlify**.

---

## 🚀 Features

- 🛒 Browse and view product listings
- 🔍 Detailed product view page (`/products/:id`)
- 🛍️ Add to Cart / Remove from Cart
- 💳 Razorpay payment integration
- 📱 Fully responsive and mobile-friendly
- 🌐 Deployed on **Netlify**

---

## 🛠 Tech Stack

- **Frontend:** React, Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **State Management:** React Context API
- **Icons:** Lucide Icons
- **Payments:** Razorpay
- **Deployment:** Netlify

---

## 📦 Project Structure

```
Zoundly/
├── front-end/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── App.jsx
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── ...
└── README.md
```

---

## ⚙️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/Indhu248/Zoundly.git
```

2. **Navigate to front-end**

```bash
cd Zoundly/front-end
```

3. **Install dependencies**

```bash
npm install
```

4. **Run the development server**

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 💳 Razorpay Integration

- Integrated Razorpay to accept payments.
- Test Payments supported via Razorpay test mode.
- Payments handled in the frontend using Razorpay’s Checkout Script.

> Make sure to configure your Razorpay keys in environment variables or securely in production.

---

## 🌐 Deployment

Zoundly is live on **Netlify**:

🔗 [https://zoundly.netlify.app/](https://zoundly.netlify.app)

Netlify Settings:

- **Base directory:** `front-end`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

Make sure you’ve also handled SPA routes using `redirects` (via `netlify.toml` or `_redirects` file):

**_redirects**
```
/*    /index.html   200
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- [Razorpay Docs](https://razorpay.com/docs/)
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)
- [Netlify](https://www.netlify.com/)

---

> Feel free to contribute, star ⭐ the repo, or fork it!

```
