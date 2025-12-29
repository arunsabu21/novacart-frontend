import { Link, useNavigate } from "react-router-dom";

import userIcon from "../assets/icons/user.png";
import wishListIcon from "../assets/icons/wishlist.png";
import bagIcon from "../assets/icons/shopping-bag.png";

function Navbar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  function onLogout() {
    handleLogout();
    navigate("/login");
  }

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        NovaCart
      </Link>

      {/* Right Section */}
      <div style={styles.right}>
        {isLoggedIn ? (
          <>
            <Link to="/products" style={styles.link}>
              Products
            </Link>

            <div
              style={styles.dropdownWrapper}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector(".dropdown").style.display =
                  "block";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector(".dropdown").style.display =
                  "none";
              }}
            >
              <img src={userIcon} alt="User" style={styles.iconImg} />

              <div className="dropdown" style={styles.dropdown}>
                <Link to="/profile" style={styles.dropdownItem}>
                  Profile
                </Link>

                <div style={styles.dropdownItem} onClick={onLogout}>
                  Logout
                </div>
              </div>
            </div>

            <Link to="/wishlist" style={styles.iconWrapper}>
              <img src={wishListIcon} alt="Wishlist" style={styles.iconImg} />
            </Link>

            <Link to="/cart" style={styles.iconWrapper}>
              <img src={bagIcon} alt="Cart" style={styles.iconImg} />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/signup" style={styles.link}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    width: "100%",
    height: "70px",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 25px",
    position: "fixed",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#282C3F",
    textDecoration: "none",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  link: {
    color: "#282C3F",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
  },

  iconWrapper: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },

  iconImg: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
  },

  dropdownWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  dropdown: {
    position: "absolute",
    top: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    minWidth: "140px",
    overflow: "hidden",
    zIndex: 2000,
    display: "none",
  },

  dropdownItem: {
    padding: "10px 14px",
    fontSize: "14px",
    color: "#282C3F",
    cursor: "pointer",
    textDecoration: "none",
    display: "block",
  },
};

export default Navbar;
