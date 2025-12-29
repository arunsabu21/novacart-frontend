import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../Payment.css";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

function PaymentForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      alert(error.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment Successful 🎉");
      window.location.href = "/orders";
    }
  }

  return (
    <form className="payment-card" onSubmit={handleSubmit}>
      <h2>Pay securely</h2>
      <p className="subtitle">Enter your card details</p>

      <div className="card-box">
        <CardElement />
      </div>

      <button className="pay-btn" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
}

export default function StripeCheckout({ clientSecret }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm clientSecret={clientSecret} />
    </Elements>
  );
}
