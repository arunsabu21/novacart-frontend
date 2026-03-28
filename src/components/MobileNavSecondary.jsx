import MobileDrawer from "../components/MobileDrawer";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function MobileSecondaryNav({ isLoggedIn, handleLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="mobile-header">
      <div className="mobile-left">
        <a onClick={() => setDrawerOpen(true)} className="svgImages-hamBurger mobile-leftNavBar hamburger-hamburger"></a>
        <Link to="/" className="svgImages-novaCartLogo mobile-ncLogo"></Link>
      </div>

      <div className="mobile-right">
        <a className="svgImages-mSearch mobileSearch"></a>
        <Link to="/my/dashboard" className="svgImages-profile mobile-user"></Link>
        <Link to="/cart" className="svgImages-bag mobile-bag"></Link>
      </div>
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
    </div>
  );
}
