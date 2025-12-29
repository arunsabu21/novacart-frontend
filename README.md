# NovaCart - Frontend (React + Vite)

NovaCart is a modern e-commerce frontend built with **React + Vite**.
It consumes a Django REST API backend and implements a complete shopping flow including authentication, cart, wishlist, and online payments.

> Status: **Actively in development**
> UI, payment flow, and UX polish are continuously improving.

---

## Live Backend API
https://novacart-backend-bnnb.onrender.com

Frontend deployment coming soon.

---

## Tech Stack
- React (Vite)
- React Router
- Axios
- Stripe (Card Payments)
- JWT Authentication
- Cloudinary (Product Images)
- Custom CSS Components

---

## Environment Variables

Create a `.env` file in the project root:

VITE_API_BASE_URL=https://novacart-backend-bnnb.onrender.com/api  
VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key_here

> `.env` is already gitignored — do not commit it.

---

## Current Features
- User signup & login (JWT)
- View all products
- Product detail page
- Wishlist system
- Cart system
- Checkout page
- Stripe card checkout
- Password reset flow
- Responsive layout

---

## Planned Work
- Improved UI/UX
- Order tracking pages
- Product search and filters
- Frontend deployment

---

## Related Repository
Backend (Django + DRF):
https://github.com/arunsabu21/novacart-backend.git

---

## Author
**Arun Sabu**  
Full-Stack Developer (Django + React)

---

## Version
Frontend – Work in progress  
Backend – v1 API ready
