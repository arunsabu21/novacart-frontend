# NovaCart Frontend

[![JavaScript](https://img.shields.io/badge/JavaScript-70.7%25-F7DF1E?style=flat-square&logo=javascript)](https://github.com/arunsabu21/novacart-frontend)
[![CSS](https://img.shields.io/badge/CSS-28.5%25-1572B6?style=flat-square&logo=css3)](https://github.com/arunsabu21/novacart-frontend)
[![HTML](https://img.shields.io/badge/HTML-0.8%25-E34C26?style=flat-square&logo=html5)](https://github.com/arunsabu21/novacart-frontend)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)](https://github.com/arunsabu21/novacart-frontend)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite)](https://github.com/arunsabu21/novacart-frontend)

A modern, responsive e-commerce frontend built with React and Vite. NovaCart delivers a seamless shopping experience with intuitive UI, secure payment processing, and real-time cart management.

## Overview

NovaCart Frontend provides a complete end-to-end shopping journey — from product discovery to secure checkout.
It integrates seamlessly with a Django REST API backend and Stripe for reliable and secure payment processing.
The application is fully responsive, offering optimized user experiences for both mobile and desktop users.

## Features

### User Authentication & Authorization

- JWT-based signup, login, and secure session handling
- Protected routes for authenticated users

### Product Catalog

- Browse products with detailed information
- Optimized product images using Cloudinary
- Clean and scalable product APIs

### Wishlist Management

- Add and remove products from wishlist
- Persistent wishlist per user account

### Shopping Cart

- Add, update, and remove items from cart
- Real-time quantity and price updates
- Cart persistence across sessions

### Checkout & Address Management

- Add and manage multiple delivery addresses
- Default address selection
- Responsive checkout flow for mobile and desktop

### Secure Payments

- Stripe integration for online payments
- Backend-driven payment intent creation
- Ready for webhook-based payment confirmation

### Order Flow

- Mobile & Desktop specific checkout UI
- Address selection before payment
- Cash on Delivery (COD) fully implemented
- Stripe card payments using Payment Intents
- Animated order success screen
- Order details view after confirmation


## Tech Stack

- React 19.2.0
- Vite 7.2.4
- React Router DOM 7.10.1
- Axios 1.13.2
- Stripe (React & JS)
- React Icons 5.5.0
- CSS3
- JWT Authentication
- Netlify (deployment)
- GitHub Actions (CI pipeline)


## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. Clone the repository
   ```sh
   git clone https://github.com/arunsabu21/novacart-frontend.git
   cd novacart-frontend
   ```

2. Install dependencies
   ```sh
   npm install
   ```

3. Create a `.env` file in the project root:
   ```
   VITE_API_BASE_URL=https://novacart-backend-bnnb.onrender.com/api
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. Start the development server
   ```sh
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
novacart-frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   └── App.jsx
├── public/
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## API Integration

Backend Repository: [arunsabu21/novacart-backend](https://github.com/arunsabu21/novacart-backend)

API Base URL: https://novacart-backend-bnnb.onrender.com/api

## Roadmap

- Frontend deployment
- Order tracking dashboard
- Advanced product search & filters
- Customer reviews & ratings
- Admin dashboard

## Author

**Arun Sabu**
Full-Stack Developer (Django & React)

GitHub: [@arunsabu21](https://github.com/arunsabu21)
