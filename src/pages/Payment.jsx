import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import MobilePayment from "../components/MobilePayment";
import DesktopPayment from "../components/DesktopPayment";
import Loader from "../components/Loader";
import "../styles/desktop/Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const addressId = location.state?.addressId;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const [cartLoaded, setCartLoaded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({ type: "", text: "" });
  const [showFlash, setShowFlash] = useState(false);

  const [amount, setAmount] = useState(0);
  const [displayAmount, setDisplayAmount] = useState(0);

  /* ---------------- FLASH MESSAGE ---------------- */
  useEffect(() => {
    if (!message.text) return;

    requestAnimationFrame(() => setShowFlash(true));

    const hideTimer = setTimeout(() => setShowFlash(false), 3000);
    const cleanupTimer = setTimeout(
      () => setMessage({ type: "", text: "" }),
      4500
    );

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(cleanupTimer);
    };
  }, [message]);

  /* ---------------- FETCH CART (PAGE LOAD) ---------------- */
  useEffect(() => {
    async function fetchCart() {
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get("/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCartItems(Array.isArray(res.data) ? res.data : []);
      } catch {
        setCartItems([]);
      } finally {
        setCartLoaded(true); // 🔥 page ready
      }
    }

    fetchCart();
  }, []);

  /* ---------------- CART VALIDATION ---------------- */
  useEffect(() => {
    if (!cartLoaded) return;

    if (cartItems.length === 0) {
      setMessage({
        type: "error",
        text: "Bag is invalid or empty. Redirecting back...",
      });

      const t = setTimeout(() => navigate("/cart"), 1800);
      return () => clearTimeout(t);
    }
  }, [cartLoaded, cartItems, navigate]);

  /* ---------------- TOTAL ---------------- */
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) =>
        sum + Number(item.product_price || 0) * Number(item.quantity || 1),
      0
    );
    setDisplayAmount(total);
  }, [cartItems]);

  /* ---------------- MOBILE / DESKTOP ---------------- */
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ---------------- ADDRESS GUARD ---------------- */
  useEffect(() => {
    if (!addressId) navigate("/checkout");
  }, [addressId, navigate]);

  /* ---------------- CARD PAYMENT ---------------- */
  async function startCardPayment() {
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const token = localStorage.getItem("access");
      const res = await axios.post(
        "/payments/payment-intent/",
        { address_id: addressId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setClientSecret(res.data.client_secret);
      setAmount(res.data.amount);
      setPaymentMethod("CARD");
    } catch {
      setMessage({ type: "error", text: "Payment Failed" });
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- COD ORDER ---------------- */
  async function placeCODOrder() {
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const token = localStorage.getItem("access");
      const res = await axios.post(
        "/orders/create/",
        { address_id: addressId, payment_method: "COD" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data;
    } finally {
      setLoading(false);
    }
  }

  if (!cartLoaded) {
    return <Loader />;
  }

  const commonProps = {
    loading,
    message,
    paymentMethod,
    clientSecret,
    amount,
    displayAmount,
    setPaymentMethod,
    startCardPayment,
    placeCODOrder,
    totalItems: cartItems.length,
    setMessage,
    navigate,
  };

  return (
    <>
      {message.text && (
        <div
          className={`flashNotifyContainer ${showFlash ? "flashShow" : ""}`}
          style={{ bottom: "105px" }}
        >
          <div
            className={`flashContent ${
              message.type === "error" ? "flashError" : "flashSuccess"
            }`}
          >
            <span className="flashText">{message.text}</span>
          </div>
        </div>
      )}

      {isMobile ? (
        <MobilePayment {...commonProps} />
      ) : (
        <DesktopPayment {...commonProps} />
      )}
    </>
  );
}