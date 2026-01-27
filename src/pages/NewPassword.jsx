import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "../api/axios";
import "../styles/desktop/AuthPage.css";

function SetNewPassword() {
  // only token needed
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

    if (!password || !confirm) return setMessage("Please fill both fields");
    if (password !== confirm) return setMessage("Passwords do not match");
    if (password.length < 6)
      return setMessage("Password must be at least 6 characters");

    try {
      setLoading(true);

      // send ONLY what backend expects
      const res = await axios.post("/password-reset/confirm/", {
        token,
        password,
      });

      if (res.status === 200) {
        setMessage("Password reset successful 🎉");

        setTimeout(() => {
          navigate("/login", { state: { message: "Password changed" } });
        }, 1200);
      }
    } catch (err) {
      console.log("RESET ERROR:", err.response?.data);

      setMessage(
        err.response?.data?.detail ||
          err.response?.data?.token ||
          "Reset failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="password-page-height base-password">
      <div className="page-page">
        <div className="page-password-reset">
          <div className="password-reset-card">
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                className="auth-input"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />

              <input
                type="password"
                className="auth-input"
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />

              <button className="auth-button" disabled={loading}>
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetNewPassword;
