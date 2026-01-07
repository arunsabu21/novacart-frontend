import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SiteNav from "./components/SiteNavbar";
import AuthBackArrow from "./components/AuthBackArrow";
import MobileNav from "./components/MobileNav";

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
  const path = location.pathname;

  // ✅ reactive mobile detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🛒 checkout flow
  const checkoutRoutes = ["/cart", "/checkout", "/payment"];
  const isCheckoutFlow = checkoutRoutes.includes(path);

  // 🔐 auth pages
  const authRoutes = ["/login", "/signup", "/forgot-password"];
  const isAuthPage =
    authRoutes.includes(path) || path.startsWith("/reset-password");

  return (
    <>
      {/* 🛒 Checkout pages: SiteNav only */}
      {isCheckoutFlow && <SiteNav />}

      {/* 🔐 AUTH PAGES: no navbar anywhere */}
      {/* 🔐 AUTH PAGES */}
      {isAuthPage && (
        <>
          {/* 🖥️ Desktop → show normal navbar */}
          {!isMobile && (
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          )}

          {/* 📱 Mobile → only back arrow */}
          {isMobile && <AuthBackArrow />}
        </>
      )}

      {/* 🌐 NORMAL PAGES */}
      {!isCheckoutFlow && !isAuthPage && (
        <>
          {!isMobile && (
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          )}

          {isMobile && <MobileNav />}
        </>
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

        <Route
          path="/reset-password/:uid/:token"
          element={<SetNewPassword />}
        />

        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>

      {/* ⛔ Footer only on normal pages */}
      {!isCheckoutFlow && !isAuthPage && <Footer />}
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
    <Layout
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      handleLogout={handleLogout}
    />
  );
}

export default App;
