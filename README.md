# NovaCart Frontend

[![Languages](https://img.shields.io/badge/languages-JavaScript%2072.5%25%20%7C%20CSS%2026.5%25%20%7C%20HTML%201%25-brightgreen.svg)](https://github.com/arunsabu21/novacart-frontend)

NovaCart is a modern and dynamic e-commerce frontend powered by **React** and **Vite**. This project delivers a seamless shopping experience with real-time cart actions, user authentication, wishlists, and secure Stripe payments. NovaCart consumes a Django REST API backend, providing end-to-end integration from browsing products to checking out.

> **Status**: Actively in development.  
> The UI, payment flow, and overall UX are being continuously improved.

---

## Live Demo & Backend

- **Live Backend API:** [https://novacart-backend-bnnb.onrender.com](https://novacart-backend-bnnb.onrender.com)
- **Frontend Deployment:** _Coming soon!_

---

## Tech Stack

- **React** (with Vite)
- **React Router** (routing)
- **Axios**
- **Stripe** (secure card payments)
- **JWT Authentication**
- **Cloudinary** (product images)
- **Custom CSS**

---

## Environment Setup

1. Install dependencies:
    ```sh
    npm install
    ```
2. Create a `.env` file in the project root:
    ```
    VITE_API_BASE_URL=https://novacart-backend-bnnb.onrender.com/api
    VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key_here
    ```
   > `.env` is gitignored and should not be committed.

3. Start the development server:
    ```sh
    npm run dev
    ```

---

## Features

- User Signup & Login (JWT-based auth)
- Browse All Products
- Product Detail Pages
- Wishlists
- Shopping Cart
- Secure Stripe Checkout
- Password Reset Flow
- Responsive Layout

---

## Roadmap

- Improved UI/UX polish
- Order Tracking Pages
- Product Search & Filters
- Public Frontend Deployment

---

## Related Projects

- **Backend (Django + DRF):**  
  [https://github.com/arunsabu21/novacart-backend](https://github.com/arunsabu21/novacart-backend)

---

## Author

**Arun Sabu**  
Full-Stack Developer (Django & React)

---

## Version

- **Frontend:** Work in Progress
- **Backend:** v1 API Ready

---
