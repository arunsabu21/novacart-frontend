import { Link, useNavigate } from "react-router-dom";
import desktopUser from "../assets/icons/desktopuser.png";
import Logo from "../assets/icons/nc-logo.png";
import DesktopWishlist from "../assets/icons/wishlist.png";
import ShoppingBag from "../assets/icons/shopping-bag.png";

function Navbar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  function onLogout() {
    handleLogout();
    navigate("/", { replace: true});
  }

  function goLogin(e) {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <header className="desktop-nav-container">
      <div className="desktop-nav-mount">

        {/* LOGO */}
        <div className="desktop-nav-logo-container">
          <Link to="/" className="desktop-logo-link">
            <img src={Logo} alt="NovaCart" className="desktop-logo-img" />
          </Link>
        </div>

        {/* NAV RIGHT */}
        <nav className="desktop-navbar">
          <Link to="/products" className="desktop-main">
            PRODUCTS
          </Link>

          <div className="desktop-actions">

            {/* USER + DROPDOWN */}
            <div className="desktop-user-wrapper">
              <img
                src={desktopUser}
                alt="User"
                className="desktop-user-icon"
              />

              <div className="desktop-userDropdown">
                <div className="desktop-userBar"></div>

                <div className="desktop-user-actionContents">

                  {/* HEADER */}
                  <div className="desktop-actionInfo">
                    {isLoggedIn ? (
                      <>
                        <div className="desktop-infoTitle">Hello User</div>
                        <div className="desktop-infoEmail">
                          user123@gmail.com
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="desktop-infoTitle">Welcome</div>
                        <div className="desktop-infoEmail">
                          To access account and manage orders
                        </div>
                        <a href="/login" className="desktop-linkButton">login / signup</a>
                      </>
                    )}
                  </div>

                  {/* LINKS */}
                  <div className="desktop-actionLinks">
                    {isLoggedIn ? (
                      <>
                        <Link to="/orders" className="desktop-info">
                          <div className="desktop-infoSection">Orders</div>
                        </Link>
                        <Link to="/wishlist" className="desktop-info">
                          <div className="desktop-infoSection">Wishlist</div>
                        </Link>
                        <Link to="/cart" className="desktop-info">
                          <div className="desktop-infoSection">Shopping Bag</div>
                        </Link>
                      </>
                    ) : (
                      <>
                        <a href="/login" onClick={goLogin} className="desktop-info">
                          <div className="desktop-infoSection">Orders</div>
                        </a>
                        <a href="/login" onClick={goLogin} className="desktop-info">
                          <div className="desktop-infoSection">Wishlist</div>
                        </a>
                        <a href="/login" onClick={goLogin} className="desktop-info">
                          <div className="desktop-infoSection">Shopping Bag</div>
                        </a>
                      </>
                    )}
                  </div>

                  {/* FOOTER ACTION */}
                  <div className="desktop-actionLinks">
                    {isLoggedIn ? (
                      <div
                        className="desktop-infoSection logout"
                        onClick={onLogout}
                      >
                        Logout
                      </div>
                    ) : (
                      <Link to="/login" className="desktop-loginBtn">
                        LOGIN / SIGNUP
                      </Link>
                    )}
                  </div>

                </div>
              </div>
            </div>

            {/* ICONS */}
            <img
              src={DesktopWishlist}
              alt="Wishlist"
              className="desktop-wishlist-icon"
              onClick={() => navigate(isLoggedIn ? "/wishlist" : "/login")}
            />

            <img
              src={ShoppingBag}
              alt="Bag"
              className="desktop-shopBag"
              onClick={() => navigate(isLoggedIn ? "/cart" : "/login")}
            />

          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;