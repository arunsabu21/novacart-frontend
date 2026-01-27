import "../styles/mobile/MobileCartV2.css";
export default function SecurePaymentBanner() {
  return (
    <div className="secureBanner">
      <div className="secureBanner-left">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 1.5L4.5 4.5v6c0 5.25 3.75 10.125 7.5 11.25
               3.75-1.125 7.5-6 7.5-11.25v-6L12 1.5z"
            stroke="#0f5132"
            strokeWidth="1.5"
            fill="#e6f7ee"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="#0f5132"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="secureBanner-text">
          100% Secure Payments
        </span>
      </div>

      <span className="secureBanner-powered">
        Powered by <strong>Stripe</strong>
      </span>
    </div>
  );
}