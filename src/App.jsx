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
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";

/* =========================
   Layout Component
========================= */
function Layout({ isLoggedIn, setIsLoggedIn, handleLogout }) {
  const location = useLocation();
  const path = location.pathname;

  // reactive mobile detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // pages that use SiteNav / MobileNav
  const flowRoutes = ["/cart", "/checkout", "/payment"];
  const isFlowPage = flowRoutes.includes(path);

  // auth pages
  const authRoutes = ["/login", "/signup", "/forgot-password"];
  const isAuthPage =
    authRoutes.includes(path) || path.startsWith("/reset-password");

  return (
    <>
      {/* =====================
          TOP NAVIGATION
      ===================== */}

      {/* Cart / Checkout / Payment */}
      {isFlowPage && (
        <>
          {!isMobile && <SiteNav />}
          {isMobile && <MobileNav />}
        </>
      )}

      {/* AUTH PAGES */}
      {isAuthPage && (
        <>
          {!isMobile && (
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          )}
          {isMobile && <AuthBackArrow />}
        </>
      )}

      {/* NORMAL PAGES */}
      {!isFlowPage && !isAuthPage && (
        <>
          {!isMobile && (
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          )}
          {isMobile && <MobileNav />}
        </>
      )}

      {/* =====================
          ROUTES
      ===================== */}
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
        <Route path="order-success" element={<OrderSuccess/>} />
      </Routes>

      {/* =====================
          FOOTER
      ===================== */}
      {!isFlowPage && !isAuthPage && <Footer />}
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
