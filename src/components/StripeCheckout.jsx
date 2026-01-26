import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

/* 🔑 Stripe public key */
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

/* ================= INNER FORM ================= */
function StripeForm({ clientSecret, onSuccess, amount, setMessage }) {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage({
        type: "error",
        text: "Payment service not ready. Please try again.",
      });
      return;
    }

    if (!name.trim()) {
      setMessage({
        type: "info",
        text: "Please enter the name on card",
      });
      return;
    }

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { name },
        },
      },
    );

    setLoading(false);

    if (error) {
      setMessage({
        type: "error",
        text: error.message || "Payment failed. Please try again.",
      });
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setMessage({
        type: "success",
        text: "Payment successful! Placing your order…",
      });
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripeCardForm">
      {/* CARD NUMBER */}
      <div className="stripeCardForm-base-row cardForm-base-cardNumberBottomMargin">
        <div className="floatingInputRow">
          <div className="floatingInput-container stripe-element-container">
            <CardNumberElement
              className="stripe-element"
              options={stripeStyle}
            />
            <label className="floatingLabel active">Card Number</label>
          </div>
        </div>
      </div>

      {/* NAME ON CARD */}
      <div className="stripeCardForm-base-row">
        <div className="floatingInputRow">
          <div className="floatingInput-container">
            <input
              type="text"
              className="floatingInput-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className={`floatingLabel ${name ? "active" : ""}`}>
              Name on Card
            </label>
          </div>
        </div>
      </div>

      {/* EXPIRY + CVV */}
      <div className="stripeCardForm-base-row cardForm-row-split">
        <div className="floatingInputRow">
          <div className="floatingInput-container stripe-element-container">
            <CardExpiryElement
              className="stripe-element"
              options={stripeStyle}
            />
            <label className="floatingLabel active">Valid Thru (MM/YY)</label>
          </div>
        </div>

        <div className="floatingInputRow">
          <div className="floatingInput-container stripe-element-container">
            <CardCvcElement className="stripe-element" options={stripeStyle} />
            <label className="floatingLabel active">CVV</label>
          </div>
        </div>
      </div>

      {/* PAY BUTTON */}
      <button
        type="submit"
        className="stripePayment-button stripePayment-buttonBase inlineCtaActionButton"
        disabled={!stripe || loading}
      >
        {loading ? "Processing…" : `Pay ₹${amount}`}
      </button>
    </form>
  );
}

/* ================= EXPORTED COMPONENT ================= */
export default function StripeCheckout({ clientSecret, onSuccess, amount, setMessage }) {
  if (!clientSecret) return null;

  return (
    <Elements stripe={stripePromise}>
      <StripeForm
        key={clientSecret} // 🔥 fixes accordion remount bug
        clientSecret={clientSecret}
        onSuccess={onSuccess}
        amount={amount}
        setMessage={setMessage}
      />
    </Elements>
  );
}

/* ================= STRIPE STYLE ================= */
const stripeStyle = {
  showIcon: true, // 🔥 CARD BRAND ICONS (Visa / MC / RuPay)
  style: {
    base: {
      fontSize: "14px",
      color: "#282c3f",
      fontFamily: "inherit",
      "::placeholder": {
        color: "transparent",
      },
    },
    invalid: {
      color: "#ff3f6c",
    },
  },
};
