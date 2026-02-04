import "../styles/desktop/App.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function DesktopHome() {
  const location = useLocation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);

      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.key]);

  return (
    <div className="home-container">
      {message && (
        <div className="toast success">
          <strong>Success</strong>
          <p>{message}</p>
        </div>
      )}

      <h1>Welcome to Home 🏠</h1>
    </div>
  );
}

export default DesktopHome;