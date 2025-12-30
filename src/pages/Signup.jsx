import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios"; 
import "../AuthPage.css";
import Loader from "../components/Loader";

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
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

    if (!username || !email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/register/", {
        username,
        email,
        password,
      });

      setMessage("Signup successful");
      setUserName("");
      setEmail("");
      setPassword("");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      if (err.response?.status === 400 || err.response?.status === 409) {
        setMessage("User already exists");
      } else {
        setMessage("Server error. Try again.");
      }
    } finally {
      setLoading(false);
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
                <div className="authHeader plHeader">Create Account</div>

                <form onSubmit={handleSubmit}>
                  <input
                    className="auth-input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={loading}
                  />

                  <input
                    className="auth-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />

                  <input
                    type="password"
                    className="auth-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />

                  <button className="auth-button" disabled={loading}>
                    Signup
                  </button>

                  <div style={{ marginTop: 14, fontSize: 13 }}>
                    <p style={{ marginBottom: 8, color: "#424553" }}>
                      Already have an account?{" "}
                      <span
                        onClick={() => !loading && navigate("/login")}
                        style={{
                          color: "#20bd99",
                          cursor: "pointer",
                          fontWeight: "bold",
                          opacity: loading ? 0.5 : 1,
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

export default Signup;
