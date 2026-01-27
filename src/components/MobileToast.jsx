import { useEffect } from "react";
import "../styles/mobile/MobileProductDetail.css";

export default function MobileToast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }

      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return <div className={`m-toast ${show ? "show" : ""}`}>{message}</div>;
}
