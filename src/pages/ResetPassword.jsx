import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Loader from "../components/Loader";
import "../styles/desktop/AuthPage.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); // "error" | "success"
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function showMessage(text, type = "error") {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      showMessage("Email is required");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/password-reset/", { email: cleanEmail });

      setEmail("");
      showMessage("Reset link sent to your email", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      if (err.response?.status === 404) {
        showMessage("Email not registered");
      } else if (err.response?.data?.email) {
        showMessage(err.response.data.email);
      } else if (err.response?.data?.detail) {
        showMessage(err.response.data.detail);
      } else {
        showMessage("Server error. Try again");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="bgColor" />

      {message && (
        <div
          id="messageMainDiv"
          className="messageMainContainer messageTopLevel messageShow"
        >
          <div
            className={`messageContent ${messageType === "success" ? "messageSuccess" : "messageError"}`}
          >
            <div
              className="messageText"
              style={{ width: "100%", textAlign: "center" }}
            >
              {message}
            </div>
          </div>
        </div>
      )}

      <div className="layout">
        <div id="mainContent">
          <div id="reactPage">
            <div className="authPage">
              {loading && <Loader />}

              <div className="formContainer Gap">
                <div className="authHeader" style={{marginBottom: "8px"}}>Reset Password</div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#94969f",
                    marginBottom: "10px",
                  }}
                >
                  Enter your email and we’ll send a link on
                  your email to reset your password.
                </p>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginTop: "30px" }}>
                    {/* Email */}
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="placeholderAlternative">
                        Email
                        <span style={{ color: "rgb(255, 87, 34)" }}>*</span>
                      </span>
                    </div>

                    {/* Submit */}
                    <div className="form-group">
                      <button className="auth-button" disabled={loading}>
                        Send Reset Link
                      </button>
                    </div>

                    <div style={{ marginTop: "14px", fontSize: "12px" }}>
                      <p>
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
