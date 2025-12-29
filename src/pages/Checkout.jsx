import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../Checkout.css";

function Checkout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function placeOrder() {
    try {
      setLoading(true);

      const token = localStorage.getItem("access");
      if (!token) {
        alert("Please login first");
        return;
      }

      // Create order
      const orderRes = await axios.post(
        "/orders/create/",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const order = orderRes.data;

      // Create payment intent
      const paymentRes = await axios.post(
        "/payments/payment-intent/",
        { order_id: order.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Navigate to payment
      navigate("/payment", {
        state: {
          clientSecret: paymentRes.data.client_secret,
          orderId: order.id,
        },
      });
    } catch (err) {
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h2>Checkout</h2>
        <p className="subtitle">
          Review your order and proceed securely
        </p>

        <div className="checkout-info">
          <div className="row">
            <span>Payment Method</span>
            <span>Card (Stripe)</span>
          </div>
          <div className="row">
            <span>Security</span>
            <span>🔒 Encrypted</span>
          </div>
        </div>

        <button
          className="checkout-btn"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? "Processing..." : "Continue to Payment"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
