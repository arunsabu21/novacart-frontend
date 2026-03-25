import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/desktop/AuthPage.css";
import Loader from "../components/Loader";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  function validate() {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Please enter Username";
    if (!password.trim()) newErrors.password = "Please enter Password";
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);
      const response = await axios.post("/token/", { username, password });
      const data = response.data;

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setIsLoggedIn(true);
      navigate("/", { state: { message: "Logged in successfully" } });
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        setMessage("Invalid username or password");
      } else if (error.response) {
        setMessage("Something went wrong");
      } else {
        setMessage("Server busy. Try again");
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

      <div className="layout">
        <div id="mainContent">
          <div id="reactPage">
            <div className="authPage">
              {loading && <Loader />}

              <div className="formContainer Gap">
                <div className="authHeader plHeader">Login to your account</div>

                <form onSubmit={handleSubmit}>
                  {/* Username */}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=" "
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setErrors((prev) => ({ ...prev, username: "" }));
                      }}
                    />
                    <span className="placeholderAlternative">
                      Username
                      <span style={{ color: "rgb(255, 87, 34)" }}>*</span>
                    </span>
                    <div className="errorContainer">{errors.username}</div>
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder=" "
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, password: "" }));
                      }}
                    />
                    <span className="placeholderAlternative">
                      Password
                      <span style={{ color: "rgb(255, 87, 34)" }}>*</span>
                    </span>
                    <div className="errorContainer">{errors.password}</div>
                  </div>

                  {/* Submit */}
                  <div className="form-group">
                    <button className="auth-button" disabled={loading}>
                      Login
                    </button>
                  </div>

                  <div style={{ marginTop: "14px", fontSize: "12px" }}>
                    <p style={{ marginBottom: "18px" }}>
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
                        Reset here
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
