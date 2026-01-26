import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import MobilePayment from "../components/MobilePayment";
import DesktopPayment from "../components/DesktopPayment";
import StripeCheckout from "../components/StripeCheckout";
import Loader from "../components/Loader";
import "../styles/desktop/Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const addressId = location.state?.addressId;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });
  const [showFlash, setShowFlash] = useState(false);
  const [amount, setAmount] = useState(0);
  const [displayAmount, setDisplayAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!message.text) return;

    requestAnimationFrame(() => {
      setShowFlash(true);
    });

    const hideTimer = setTimeout(() => {
      setShowFlash(false);
    }, 3000);

    const cleanupTimer = setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 4500);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(cleanupTimer);
    };
  }, [message]);

  useEffect(() => {
    if (!cartLoaded) return; 

    if (cartItems.length === 0) {
      setMessage({
        type: "error",
        text: "Bag is invalid or empty. Redirecting back...",
      });

      const timer = setTimeout(() => {
        navigate("/cart");
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [cartLoaded, cartItems, navigate]);

  useEffect(() => {
    async function fetchCart() {
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get("/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("CART RESPONSE 👉", res.data);

        setCartItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log("Cart fetch failed", err);
        setCartItems([]);
      } finally {
        setCartLoaded(true);
      }
    }

    fetchCart();
  }, []);

  const totalItems = cartItems.length;

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) =>
        sum + Number(item.product_price || 0) * Number(item.quantity || 1),
      0,
    );
    setDisplayAmount(total);
  }, [cartItems]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!addressId) navigate("/checkout");
  }, [addressId, navigate]);

  async function startCardPayment() {
    try {
      setLoading(true);
      setMessage({type: "", text: ""});
      const token = localStorage.getItem("access");

      const res = await axios.post(
        "/payments/payment-intent/",
        { address_id: addressId },
        { headers: { Authorization: `Bearer ${token}` } },
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

  async function placeCODOrder() {
    setLoading(true);
    setMessage({type: "", text: ""});

    try {
      const token = localStorage.getItem("access");

      const res = await axios.post(
        "/orders/create/",
        { address_id: addressId, payment_method: "COD" },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      return res.data; // ✅ return backend response
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
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
    totalItems,
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
