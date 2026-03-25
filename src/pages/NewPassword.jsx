import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "../api/axios";
import "../styles/desktop/AuthPage.css";
import "../styles/desktop/Main.css";

function SetNewPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [loading, setLoading] = useState(false);

  const has8Chars = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isStrongPassword = has8Chars && hasUppercase && hasNumber;
  const isFormReady = isStrongPassword && confirm.length > 0;

  function showMessage(text, type = "error") {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  }

  function validate() {
    const newErrors = {};
    if (!password.trim()) newErrors.password = "Required";
    else if (!isStrongPassword) newErrors.password = "Password does not meet requirements";
    if (!confirm.trim()) newErrors.confirm = "Required";
    else if (password !== confirm) newErrors.confirm = "Passwords do not match";
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading || !isFormReady) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);
      const res = await axios.post("/password-reset/confirm/", { token, password });

      if (res.status === 200) {
        showMessage("Password reset successful 🎉", "success");
        setTimeout(() => navigate("/login", { state: { message: "Password changed" } }), 1500);
      }
    } catch (err) {
      showMessage(
        err.response?.data?.detail ||
        err.response?.data?.token ||
        "Reset failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {message && (
        <div id="messageMainDiv" className="messageMainContainer messageTopLevel messageShow">
          <div className={`messageContent ${messageType === "success" ? "messageSuccess" : "messageError"}`}>
            <div className="messageText" style={{ width: "100%", textAlign: "center" }}>
              {message}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: "-2px" }}>
        <div className="application-base full-height">
          <div className="page-page">
            <div className="page-password-reset">
              {loading && <Loader />}

              <div className="password-reset-card">
                <form onSubmit={handleSubmit}>

                  {/* New Password */}
                  <div className="myInput-inputRow myInput-md">
                    <input
                      type="password"
                      className={`input ${errors.password ? "myInput-inputError" : ""}`}
                      value={password}
                      autoComplete="new-password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, password: "" }));
                      }}
                    />
                    <label className={password ? "myInput-labelTop" : "myInput-label"}>
                      New Password*
                    </label>
                    <div className={`myInput-error ${errors.password ? "myInput-visible" : ""}`}>
                      {errors.password}
                    </div>
                    <div className="passwordStrength-passwordWidgets">
                      <div className={`passwordStrength-widget ${has8Chars ? "passwordStrength-success" : "passwordStrength-disabled"}`}>
                        <span className="passwordStrength-widgetText">8 Characters</span>
                      </div>
                      <div className={`passwordStrength-widget ${hasUppercase ? "passwordStrength-success" : "passwordStrength-disabled"}`}>
                        <span className="passwordStrength-widgetText">1 Uppercase</span>
                      </div>
                      <div className={`passwordStrength-widget ${hasNumber ? "passwordStrength-success" : "passwordStrength-disabled"}`}>
                        <span className="passwordStrength-widgetText">1 Numeric</span>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="myInput-inputRow myInput-md">
                    <input
                      type="password"
                      className={`input ${errors.confirm ? "myInput-inputError" : ""}`}
                      value={confirm}
                      autoComplete="new-password"
                      onChange={(e) => {
                        setConfirm(e.target.value);
                        setErrors((prev) => ({ ...prev, confirm: "" }));
                      }}
                    />
                    <label className={confirm ? "myInput-labelTop" : "myInput-label"}>
                      Confirm New Password*
                    </label>
                    <div className={`myInput-error ${errors.confirm ? "myInput-visible" : ""}`}>
                      {errors.confirm}
                    </div>
                    <div
                      className={`resetPassword-editButton ${!isFormReady || loading ? "resetPassword-disabled" : ""}`}
                      onClick={handleSubmit}
                    >
                      {loading ? "Resetting..." : "Reset Password"}
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

export default SetNewPassword;