import "../styles/mobile/MobilePayment.css";
import LocationIcon from "../assets/icons/gps.png";

export default function PlacingOrderLoader({ show }) {
  if (!show) return null;

  return (
    <div className="loader-container">
      <div className="loader-box">
        <img
          src={LocationIcon}
          className="loader-icon"
          alt="secure transaction"
        />
        <div className="loader-texts">
          <p>Placing Order</p>
          <p className="dots">
            Please wait <span>.</span>
            <span>.</span>
            <span>.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
