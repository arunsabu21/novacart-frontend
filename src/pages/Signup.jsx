import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/desktop/AuthPage.css";
import Loader from "../components/Loader";

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    special: false,
    uppercase: false,
    numeric: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  function validateEmail(val) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val);
  }

  function handlePasswordChange(val) {
    setPassword(val);
    setPasswordTouched(true);
    setPasswordChecks({
      length: val.length >= 8,
      special: /[~!@#$%^&*()_+\-?,]/.test(val),
      uppercase: /[A-Z]/.test(val),
      numeric: /[0-9]/.test(val),
    });

    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  }

  function validate() {
    const newErrors = { email: "", username: "", password: "" };
    let valid = true;

    if (!email || !validateEmail(email)) {
      newErrors.email = "Please enter a valid email id";
      valid = false;
    }

    if (!username.trim()) {
      newErrors.username = "Please choose a username";
      valid = false;
    }

    const { length, special, uppercase, numeric } = passwordChecks;
    if (!length || !special || !uppercase || !numeric) {
      newErrors.password =
        "Please enter at least 8 characters, 1 special character ~!@#$%^&*()_+-?, 1 uppercase character and 1 number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;

    try {
      setLoading(true);

      await axios.post("/register/", { username, email, password });

      setMessage("Signup successful");
      setUserName("");
      setEmail("");
      setPassword("");
      setPasswordChecks({
        length: false,
        special: false,
        uppercase: false,
        numeric: false,
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {

      if (err.response?.status === 400 || err.response?.status === 409) {
        const data = err.response?.data;
        if (data?.username) {
          setErrors((prev) => ({ ...prev, username: data.username }));
        } else if (data?.email) {
          setErrors((prev) => ({ ...prev, email: data.email }));
        } else {
          setMessage(typeof data === "string" ? data : "User already exists");
        }
      } else {
        setMessage("Server error. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="registration-container">
        <div className="registration-box">
          <div>
            <p className="register-title">Signup with NovaCart</p>
          </div>

          {message && (
            <div
              id="messageMainDiv"
              className="messageMainContainer messageTopLevel messageShow"
            >
              <div className="messageContent messageError">
                <div
                  className="messageText"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  {message}
                </div>
              </div>
            </div>
          )}

          <form className="registerForm" onSubmit={handleSubmit}>
            <fieldset className="register-input-container">
              {/* Email */}
              <div className="register-input-item">
                <input
                  type="email"
                  className={`register-user-input-email register-user-input ${errors.email ? "register-error" : ""}`}
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                />
                {errors.email && (
                  <div>
                    <span className="register-error-icon">!</span>
                    <p className="register-error-message">{errors.email}</p>
                  </div>
                )}
              </div>

              {/* Username */}
              <div className="register-input-item">
                <input
                  type="text"
                  className={`register-user-input-email register-user-input ${errors.username ? "register-error" : ""}`}
                  placeholder="Choose Username"
                  value={username}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    if (errors.username)
                      setErrors((prev) => ({ ...prev, username: "" }));
                  }}
                />
                {errors.username && (
                  <div>
                    <span className="register-error-icon">!</span>
                    <p className="register-error-message">{errors.username}</p>
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="register-input-item">
                <input
                  type="password"
                  className={`register-user-input register-user-input-password ${errors.password ? "register-error" : ""}`}
                  placeholder="Choose Password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
                <div className="register-password-widgets">
                  <span
                    className={`register-widget ${
                      passwordChecks.length
                        ? "register-active"
                        : passwordTouched
                          ? "register-error"
                          : "register-disabled"
                    }`}
                  >
                    <span className="register-widget-text">8 Characters</span>
                  </span>

                  <span
                    className={`register-widget ${
                      passwordChecks.special
                        ? "register-active"
                        : passwordTouched
                          ? "register-error"
                          : "register-disabled"
                    }`}
                  >
                    <span className="register-widget-text">1 Special</span>
                  </span>

                  <span
                    className={`register-widget ${
                      passwordChecks.uppercase
                        ? "register-active"
                        : passwordTouched
                          ? "register-error"
                          : "register-disabled"
                    }`}
                  >
                    <span className="register-widget-text">1 Uppercase</span>
                  </span>

                  <span
                    className={`register-widget ${
                      passwordChecks.numeric
                        ? "register-active"
                        : passwordTouched
                          ? "register-error"
                          : "register-disabled"
                    }`}
                  >
                    <span className="register-widget-text">1 Numeric</span>
                  </span>
                </div>
                {errors.password && (
                  <div>
                    <span className="register-error-icon">!</span>
                    <p className="register-error-message">{errors.password}</p>
                  </div>
                )}
              </div>
            </fieldset>

            <div className="register-register-button-container">
              <button
                className="register-register-button"
                type="submit"
                disabled={loading}
              >
                {loading ? <Loader /> : "REGISTER"}
              </button>
            </div>
          </form>

          <div className="register-link-container">
            <div className="register-login-link">
              <span className="register-info-text">
                Already have an account?
              </span>
              <a
                href="/login"
                className="register-create-account-link register-link"
              >
                {" "}
                Login!
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
