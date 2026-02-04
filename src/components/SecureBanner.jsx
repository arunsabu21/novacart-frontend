import "../styles/mobile/MobileCategorySlider.css";
import secureGif from "../assets/images/SECURE-PAYMENTS.gif";

function SecureBanner() {
  return (
    <div className="secure-banner">
      <img src={secureGif} alt="secure payments" />
    </div>
  );
}

export default SecureBanner;