import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from "./api/axios";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SiteNav from "./components/SiteNavbar";
import AuthBackArrow from "./components/AuthBackArrow";
import MobileNav from "./components/MobileNav";
import NotFound from "./pages/NotFound";

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
import MyOrders from "./pages/MyOrders";
import CancelOrder from "./pages/CancelOrder";
import CancellationSuccess from "./pages/CancellationSuccess";
import OrderItemDetails from "./pages/OrderItemDetails";

// Admin Routes
import AdminLogin from "./admin/AdminLogin";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";

/* =========================
   Layout Component
========================= */
function Layout({ isLoggedIn, setIsLoggedIn, handleLogout }) {
  const location = useLocation();
  const path = location.pathname;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // flow pages
  const flowRoutes = ["/cart", "/checkout", "/payment", "/order-success"];
  const isFlowPage = flowRoutes.includes(path);

  // auth pages
  const authRoutes = ["/login", "/signup", "/forgot-password"];
  const isAuthPage =
    authRoutes.includes(path) || path.startsWith("/reset-password");

  const isAdminRoute = path.startsWith("/admin");

  return (
    <>
      {/* =====================
          TOP NAVIGATION
      ===================== */}

      {!isAdminRoute && isFlowPage && (
        <>
          {!isMobile && <SiteNav />}
          {isMobile && (
            <MobileNav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          )}
        </>
      )}

      {!isAdminRoute && isAuthPage && (
        <>
          {!isMobile && (
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          )}
          {isMobile && <AuthBackArrow />}
        </>
      )}

      {!isAdminRoute && !isFlowPage && !isAuthPage && (
        <>
          {!isMobile && (
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          )}
          {isMobile && (
            <MobileNav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          )}
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

        {/* ✅ FIX 1: HOME IS PUBLIC */}
        <Route path="/" element={<Home />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:uid/:token"
          element={<SetNewPassword />}
        />

        <Route path="/my/dashboard/" element={<Profile setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/category/:slug" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />

        
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my/orders" element={<MyOrders />} />
        <Route path="/cancel" element={<CancelOrder/>} />
        <Route path="/cancel/success" element={<CancellationSuccess />} />
        <Route path="/my/item/details" element={<OrderItemDetails  />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>

      {/* =====================
          FOOTER
      ===================== */}
      {!isAdminRoute && !isFlowPage && !isAuthPage && <Footer />}
    </>
  );
}

/* =========================
   App Component
========================= */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access"),
  );

  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    delete axios.defaults.headers.common["Authorization"];
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
