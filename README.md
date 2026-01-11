# NovaCart Frontend

[![JavaScript](https://img.shields.io/badge/JavaScript-70.7%25-F7DF1E?style=flat-square&logo=javascript)](https://github.com/arunsabu21/novacart-frontend)
[![CSS](https://img.shields.io/badge/CSS-28.5%25-1572B6?style=flat-square&logo=css3)](https://github.com/arunsabu21/novacart-frontend)
[![HTML](https://img.shields.io/badge/HTML-0.8%25-E34C26?style=flat-square&logo=html5)](https://github.com/arunsabu21/novacart-frontend)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)](https://github.com/arunsabu21/novacart-frontend)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite)](https://github.com/arunsabu21/novacart-frontend)

A modern, responsive e-commerce frontend built with React and Vite. NovaCart delivers a seamless shopping experience with intuitive UI, secure payment processing, and real-time cart management.

## Overview

NovaCart Frontend is a full-featured e-commerce platform providing users with a complete shopping journey from product discovery to secure checkout. The application integrates with a Django REST API backend and Stripe for secure payment processing.

## Features

- User Authentication with JWT-based signup & login
- Product Catalog with detailed product information
- Wishlists for saving favorite products
- Shopping Cart with real-time management
- Secure Payments with Stripe integration
- Responsive Design optimized for all devices
- Image Optimization with Cloudinary
- Fast Performance powered by Vite
- Continuous Integration (CI) pipeline with GitHub Actions


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
