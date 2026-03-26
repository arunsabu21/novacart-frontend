import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
function MobileDrawer({ open, onClose, isLoggedIn, handleLogout }) {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("/whoami/")
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log("User Fetch Error:", err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    axios
      .get("/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={`mobileDrawer ${open ? "open" : ""}`}>
      <div className="drawerNav" onClick={(e) => e.stopPropagation()}>
        <div className="side-drawer-container">
          {/* TOP AUTH SECTION */}
          <div
            className="authCenter"
            style={{
              height: "140px",
              width: "100%",
              background: "#3f3947",
              padding: "22px 20px 4px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {!isLoggedIn ? (
              <>
                <div onClick={() => onClose()} className="side-drawer-close">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="close-icon"
                    fill="#ffffff"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path d="M0 0h24v24H0z" opacity="0.05"></path>
                      <path
                        fill="#ffffff"
                        d="M12.967 12L19.3 5.666a.685.685 0 000-.967.686.686 0 00-.967 0L12 11.033 5.666 4.7a.686.686 0 00-.967 0 .685.685 0 000 .967L11.033 12 4.7 18.334a.685.685 0 000 .967.686.686 0 00.967 0L12 12.967l6.334 6.334a.686.686 0 00.967 0 .685.685 0 000-.967L12.967 12z"
                      ></path>
                    </g>
                  </svg>
                </div>
                <h3 style={{ margin: 0, color: "#fff" }}>Welcome</h3>
                <p
                  style={{
                    fontSize: "13px",
                    margin: "8px 0 12px",
                    color: "#fff",
                  }}
                >
                  Login to manage orders & wishlist
                </p>

                <button
                  style={{
                    padding: "7px",
                    borderRadius: "6px",
                    background: "transparent",
                    border: "2px solid #fff",
                    color: "#fff",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    onClose();
                    window.location.href = "/login";
                  }}
                >
                  LOGIN / SIGNUP
                </button>
              </>
            ) : (
              <>
                <div onClick={() => onClose()} className="side-drawer-close">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="close-icon"
                    fill="#ffffff"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path d="M0 0h24v24H0z" opacity="0.05"></path>
                      <path
                        fill="#ffffff"
                        d="M12.967 12L19.3 5.666a.685.685 0 000-.967.686.686 0 00-.967 0L12 11.033 5.666 4.7a.686.686 0 00-.967 0 .685.685 0 000 .967L11.033 12 4.7 18.334a.685.685 0 000 .967.686.686 0 00.967 0L12 12.967l6.334 6.334a.686.686 0 00.967 0 .685.685 0 000-.967L12.967 12z"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="user-logged">
                  <Link to="/my/dashboard">
                    <svg
                      fill="#000000"
                      width="36px"
                      height="36px"
                      viewBox="0 0 1020 1020"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M511.728 64c108.672 0 223.92 91.534 223.92 159.854v159.92c0 61.552-25.6 179.312-94.256 233.376a63.99 63.99 0 0 0-23.968 57.809c2.624 22.16 16.592 41.312 36.848 50.625l278.496 132.064c2.176.992 26.688 5.104 26.688 39.344l.032 62.464L64 959.504V894.56c0-25.44 19.088-33.425 26.72-36.945l281.023-132.624c20.16-9.248 34.065-28.32 36.769-50.32 2.72-22-6.16-43.84-23.456-57.712-66.48-53.376-97.456-170.704-97.456-233.185v-159.92C287.615 157.007 404.016 64 511.728 64zm0-64.002c-141.312 0-288.127 117.938-288.127 223.857v159.92c0 69.872 31.888 211.248 121.392 283.088l-281.04 132.64S.001 827.999.001 863.471v96.032c0 35.344 28.64 63.968 63.951 63.968h895.552c35.344 0 63.968-28.624 63.968-63.968v-96.032c0-37.6-63.968-63.968-63.968-63.968L681.008 667.439c88.656-69.776 118.656-206.849 118.656-283.665v-159.92c0-105.92-146.64-223.855-287.936-223.855z" />
                    </svg>
                  </Link>
                  <div className="user-links">
                    <Link to="/my/dashboard" className="username text-ellipsis">
                      {user?.username || "User"}
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="navList">
            <div className="ripple-container">
              <div
                className="clearfix navLink level-1"
                onClick={() => setOpenCategory(!openCategory)}
              >
                <span className="pull-left">Categories</span>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#a9abb3"
                  className="pull-right"
                  style={{
                    transform: openCategory ? "rotate(0deg)" : "rotate(-90deg)",
                    transition: "0.3s",
                  }}
                >
                  <path
                    fill="#a9abb3"
                    d="M12.55 15.768l6.183-6.36a.815.815 0 000-1.128.761.761 0 00-1.095 0l-5.68 5.844-5.678-5.844a.761.761 0 00-1.095 0 .816.816 0 000 1.127l6.182 6.361A.761.761 0 0012 16a.76.76 0 00.55-.232"
                  />
                </svg>
              </div>
              {openCategory && (
                <div>
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="navList-wrapper"
                      style={{ marginBottom: "0" }}
                    >
                      <div className="ripple-container">
                        <div
                          className="clearfix navLink"
                          onClick={() => {
                            onClose();
                            navigate(`/category/${cat.slug}`);
                          }}
                        >
                          <span className="pull-left">{cat.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {isLoggedIn ? (
            <>
              <div className="navList">
                <div className="navList-wrapper">
                  <Link to="/my/dashboard" className="navLink">
                    Account
                  </Link>
                </div>
                <div className="navList-wrapper">
                  <Link to="/my/orders" className="navLink">
                    Orders
                  </Link>
                </div>
                <div className="navList-wrapper">
                  <Link to="/wishlist" className="navLink">
                    Wishlist
                  </Link>
                </div>
                <div className="navList-wrapper">
                  <Link to="/cart" className="navLink">
                    Bag
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="navList">
                <div className="navList-wrapper">
                  <Link to="/login" className="navLink">
                    Account
                  </Link>
                </div>
                <div className="navList-wrapper">
                  <Link to="/login" className="navLink">
                    Orders
                  </Link>
                </div>
                <div className="navList-wrapper">
                  <Link to="/login" className="navLink">
                    Wishlist
                  </Link>
                </div>
                <div className="navList-wrapper">
                  <Link to="/login" className="navLink">
                    Bag
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileDrawer;
