import "../App.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


function Home({ handleLogout }) {
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
  }, [location.state]);

  return (
    <div className="home-container">
      {/* ✅ SUCCESS TOAST */}
      {message && (
        <div className="toast success">
          <span className="toast-icon">✓</span>
          <div className="toast-text">
            <strong>Success</strong>
            <p>{message}</p>
          </div>
        </div>
      )}

      <h1>Welcome to Home 🏠</h1>
    </div>
  );
}

export default Home;
