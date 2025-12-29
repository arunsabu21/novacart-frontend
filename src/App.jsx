import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SiteNav from "./components/SiteNavbar";


import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ResetPassword";
import SetNewPassword from "./pages/NewPassword";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/StripeCheckout";

/* =========================
   Layout Component
========================= */
function Layout({ isLoggedIn, setIsLoggedIn, handleLogout }) {
  const location = useLocation();

  // checkout flow pages
  const checkoutRoutes = ["/cart", "/checkout", "/payment"];
  const isCheckoutFlow = checkoutRoutes.includes(location.pathname);

  return (
    <>
      {/* ✅ SHOW SiteNav ONLY for checkout flow */}
      {isCheckoutFlow && <SiteNav />}

      {/* ✅ SHOW Main Navbar ONLY for non-checkout pages */}
      {!isCheckoutFlow && (
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      )}

      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<SetNewPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>

      {/* ✅ FOOTER ONLY FOR NON-CHECKOUT */}
      {!isCheckoutFlow && <Footer />}
    </>
  );
}

/* =========================
   App Component
========================= */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
  );

  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <Layout
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        handleLogout={handleLogout}
      />
    </BrowserRouter>
  );
}

export default App;
