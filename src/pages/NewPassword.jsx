import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "../api/axios";   
import "../App.css";

function SetNewPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(""), 3500);
      return () => clearTimeout(t);
    }
  }, [message]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    if (!password || !confirm) return setMessage("Please fill both fields");
    if (password !== confirm) return setMessage("Passwords do not match");
    if (password.length < 6)
      return setMessage("Password should be at least 6 characters");

    try {
      setLoading(true);

      // ✅ axios automatically uses BASE_URL/api
      const response = await axios.post("/password-reset/confirm/", {
        token,
        password,
      });

      if (response.status === 200) {
        setMessage("Password reset successful");
        setTimeout(() => {
          navigate("/login", { state: { message: "Password changed" } });
        }, 1200);
      }
    } catch (err) {
      setMessage(
        err.response?.data?.detail || "Reset failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      {loading && <Loader text="Resetting password..." />}

      {message && (
        <div
          className={`toast ${
            message.toLowerCase().includes("success") ? "success" : "error"
          }`}
        >
          <span className="toast-icon">
            {message.toLowerCase().includes("success") ? "✓" : "!"}
          </span>
          <div className="toast-text">
            <strong>
              {message.toLowerCase().includes("success") ? "Success" : "Error"}
            </strong>
            <p>{message}</p>
          </div>
        </div>
      )}

      <div className="auth-box">
        <h2 style={{ textAlign: "left", fontSize: 20 }}>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="auth-input"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            className="auth-input"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={loading}
          />

          <button className="auth-button" disabled={loading}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetNewPassword;
