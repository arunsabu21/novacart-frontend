import { useLocation, useNavigate } from "react-router-dom";
import secureIcon from "../assets/icons/secure.png";
import "../styles/components/SiteNav.css";

function SiteNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="site-nav-container container">
        <div className="flora-logo">
          <a href="/">
            <h1>NovaCart</h1>
          </a>
        </div>
        <ol className="checkout-steps">
          <li className="step step1 active">BAG</li>
          <li className="divider"></li>
          <li className="step step2">ADDRESS</li>
          <li className="divider"></li>
          <li className="step step3">PAYMENT</li>
        </ol>
        <div className="security-container">
          <img
            src={secureIcon}
            alt="Secure"
            className="secureIcon"
            width="26"
            height="28"
          />
          <div className="secure">100% SECURE</div>
        </div>
      </div>
    </div>
  );
}

export default SiteNav;
