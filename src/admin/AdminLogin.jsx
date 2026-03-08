import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import styles from "./AdminLogin.module.css";
import LoginBackground from "./assets/login-background.jpg";
import Logo from "./assets/nc-logo.png";
function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if ( !username && !password ) {
      setError("Username and password required");
      return;
    }

    if ( !username ) {
      setError("Username is required");
      return;
    }

    if ( !password ) {
      setError("Password is required");
      return;
    }

    try {
      const response = await axios.post("/token/", {
        username,
        password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      navigate("/admin/dashboard");
    } catch (error) {
      setError("Invalid username and password");
    }
  };
  return (
    <div className={styles.adminLoginBaseLogin}>
      <div className={styles.imageImageWrapper}>
        <span
          style={{
            boxSizing: "border-box",
            display: "block",
            overflow: "hidden",
            width: "initial",
            height: "initial",
            background: "none",
            opacity: "1",
            border: "0",
            margin: "0",
            padding: "0",
            position: "absolute",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
          }}
        >
          <img
            srcSet={LoginBackground}
            alt="Login Background"
            sizes="100vw"
            decoding="async"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              bottom: "0",
              right: "0",
              boxSizing: "border-box",
              padding: "0",
              border: "none",
              margin: "auto",
              display: "block",
              width: "0",
              height: "0",
              minWidth: "100%",
              maxWidth: "100%",
              minHeight: "100%",
              maxHeight: "100%",
            }}
          />
        </span>
      </div>
      <div className={`${styles.actionWrapper} ${styles.loginActionWrapper}`}>
        <div className={styles.actionWrapperLogoContainer}>
          <span
            style={{
              boxSizing: "border-box",
              display: "inline-block",
              overflow: "hidden",
              width: "initial",
              height: "initial",
              background: "none",
              opacity: "1",
              border: "0",
              margin: "0",
              padding: "0",
              position: "relative",
              maxWidth: "100%",
            }}
          >
            <span
              style={{
                boxSizing: "border-box",
                display: "block",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: "1",
                border: "0",
                margin: "0",
                padding: "0",
                maxWidth: "100%",
              }}
            >
              <img
                src={Logo}
                alt="Logo"
                decoding="async"
                className={styles.actionWrapperLogo}
                style={{
                  top: "0",
                  left: "0",
                  bottom: "0",
                  right: "0",
                  boxSizing: "border-box",
                  padding: "0",
                  border: "none",
                  margin: "auto",
                  display: "block",
                  minWidth: "100%",
                  maxWidth: "100%",
                  minHeight: "100%",
                  maxHeight: "100%",
                }}
              />
            </span>
          </span>
        </div>
        <form onSubmit={handleAdminLogin}>
          <div className={styles.adminLoginContainer}>
            <div className={styles.adminLoginHeader}>NovaCart_admin</div>
            <div className={styles.adminLoginLabel}>Powered by NovaCart</div>
            <div
              className={`${styles.inputTextBox} ${styles.adminLoginUsernameInput}`}
            >
              <input
                type="text"
                id="user_name"
                className={styles.inputTextBoxInputValue}
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder=" "
              />
              <label
                htmlFor="user_name"
                className={styles.inputTextBoxInputLabel}
              >
                Username
              </label>
              <div className={styles.inputTextBoxBorderBottom}></div>
            </div>
            <div
              className={`${styles.inputTextBox} ${styles.adminLoginPasswordInput}`}
            >
              <input
                type="password"
                id="pass_word"
                className={styles.inputTextBoxInputValue}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
              />
              <label
                htmlFor="pass_word"
                className={styles.inputTextBoxInputLabel}
              >
                Password
              </label>
              <div className={styles.inputTextBoxBorderBottom}></div>
            </div>
            <div className={styles.buttonWrap}>
              <button type="submit" className={styles.adminActionButton}>LOGIN</button>
            </div>
            {error && <div className={styles.actionErrorMessage}>{error}</div>}
            <div className={styles.adminTermsAndConditions}>
              <span className={styles.adminTermsAndConditionsHeader}>
                Terms and Conditions
              </span>
              <ul className={styles.adminTermsAndConditionsList}>
                <li>
                  This admin panel is restricted to authorized personnel only.
                </li>
                <li>
                  All activities are logged and monitored for security purposes.
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
