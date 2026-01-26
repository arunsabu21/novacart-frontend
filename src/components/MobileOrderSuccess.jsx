import { useEffect, useState } from "react";
import SuccessGif from "../assets/icons/success-check.gif";
import MobileOrderDetails from "./MobileOrderDetails";
import "../styles/desktop/OrderSuccess.css";

export default function MobileOrderSuccess({ order }) {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="layout">
      {showAnimation ? (
        <div className="orderConfirm-base">
          <div className="orderConfirm-content">
            <img
              src={SuccessGif}
              alt="Order Successful"
              className="orderConfirm-successGif"
            />
            <h2 className="orderConfirm-title">Order Placed Successfully</h2>
            <p className="orderConfirm-subtitle">
              Yay! Your order is confirmed
            </p>
          </div>
        </div>
      ) : (
        <MobileOrderDetails order={order} />
      )}
    </div>
  );
}
