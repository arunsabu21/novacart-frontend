import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../AuthPage.css";
import Loader from "../components/Loader";


function Login({ setIsLoggedIn }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
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

    if (loading) return;

    if (!username || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/token/", {
        username,
        password,
      });

      // ✅ AXIOS DATA
      const data = response.data;

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setIsLoggedIn(true);

      navigate("/", {
        state: { message: "Logged in successfully" },
      });
    } catch (error) {
      if (error.response) {
        // ❌ 400 / 401 from backend
        setMessage("Invalid username or password");
      } else {
        // ❌ server down / network issue
        setMessage("Server error. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Fixed background only */}
      <div className="bgColor" />

      {/* Scrollable content */}
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
                <div className="authHeader plHeader">Login to your account</div>

                <form onSubmit={handleSubmit}>
                  <input
                    className="auth-input"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={loading}
                  />

                  <input
                    type="password"
                    className="auth-input"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />

                  <button className="auth-button" disabled={loading}>
                    Login
                  </button>

                  <div style={{ marginTop: "14px", fontSize: "12px" }}>
                    <p style={{ marginBottom: "8px" }}>
                      Don't have an account?{" "}
                      <span
                        onClick={() => navigate("/signup")}
                        style={{
                          color: "#20bd99",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Signup
                      </span>
                    </p>

                    <p>
                      Forgot password?{" "}
                      <span
                        onClick={() => navigate("/forgot-password")}
                        style={{
                          color: "#20bd99",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Reset
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

export default Login;
