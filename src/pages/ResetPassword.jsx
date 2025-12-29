import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";   
import "../App.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setMessage("Email is required");
      return;
    }

    try {
      //  axios automatically calls:  <BASE_URL>/api/password-reset/
      await axios.post(
        "/password-reset/",
        new URLSearchParams({ email })
      );

      setMessage("Reset link sent to your email");
      setEmail("");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      if (err.response?.status === 404) {
        setMessage("Email not registered");
      } else {
        setMessage("Server error. Try again");
      }
    }
  }

  return (
    <div className="auth-container">
      {message && <div className="toast">{message}</div>}

      <div className="auth-box">
        <h2 style={{ textAlign: "left", fontSize: 20, color: "#424553" }}>
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="auth-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="auth-button">Send Reset Link</button>

          <p
            style={{
              marginTop: 14,
              fontSize: 13,
              cursor: "pointer",
              color: "#20bd99",
              textAlign: "center",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/login")}
          >
            Back to Login
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
