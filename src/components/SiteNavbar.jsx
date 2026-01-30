import { useLocation, useNavigate } from "react-router-dom";
import secureIcon from "../assets/icons/secure.png";
import "../styles/components/SiteNav.css";

function SiteNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isOrderSuccess = location.pathname === "/order-success";

  const getStepIndex = () => {
    if (isOrderSuccess) return -1; 
    if (location.pathname === "/cart") return 0;
    if (location.pathname === "/checkout") return 1;
    if (location.pathname === "/payment") return 2;
    return -1;
  };

  const currentStep = getStepIndex();

  return (
    <div className="header">
      <div className="site-nav-container container">
        <div className="flora-logo">
          <h1 onClick={() => navigate("/")}>NovaCart</h1>
        </div>

        <ol className="checkout-steps">
          {/* BAG */}
          <li
            className={`step step1 ${
              currentStep === 0 ? "active" : ""
            } ${currentStep >= 0 && !isOrderSuccess ? "clickable" : ""}`}
            onClick={() => {
              if (!isOrderSuccess && currentStep >= 0) {
                navigate("/cart");
              }
            }}
          >
            BAG
          </li>

          <li className="SiteDivider"></li>

          {/* ADDRESS */}
          <li
            className={`step step2 ${
              currentStep === 1 ? "active" : ""
            } ${currentStep >= 1 && !isOrderSuccess ? "clickable" : ""}`}
            onClick={() => {
              if (!isOrderSuccess && currentStep >= 1) {
                navigate("/checkout");
              }
            }}
          >
            ADDRESS
          </li>

          <li className="SiteDivider"></li>

          {/* PAYMENT */}
          <li
            className={`step step3 ${
              currentStep === 2 ? "active" : ""
            } ${currentStep >= 2 && !isOrderSuccess ? "clickable" : ""}`}
            onClick={() => {
              if (!isOrderSuccess && currentStep >= 2) {
                navigate("/payment");
              }
            }}
          >
            PAYMENT
          </li>
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