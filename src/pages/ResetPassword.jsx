import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../AuthPage.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      await axios.post("/password-reset/", new URLSearchParams({ email }));

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
    <>
      <div className="bgColor" />
      <div className="layout">
        <div id="mainContent">
          <div id="reactPage">
            <div className="authPage">
              {loading && <Loader />}
              {message && (
                <div className="login-messages">
                  <div className="login-alert error">{message}</div>
                </div>
              )}

              <div className="formContainer Gap">
                <div className="authHeader plHeader">Reset Password</div>
                <p>
                  Enter your email and we’ll send a link on your email to reset
                  your password.
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <button className="auth-button">Send Reset Link</button>

                  <div style={{ marginTop: "14px", fontSize: "12px" }}>
                    <p style={{ marginBottom: "8px" }}>
                      Back to login?{" "}
                      <span
                        onClick={() => navigate("/login")}
                        style={{
                          color: "#20bd99",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Login
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
