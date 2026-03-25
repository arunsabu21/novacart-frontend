import MobileDrawer from "../components/MobileDrawer";
import { useState } from "react";
export default function MobileSecondaryNav({ isLoggedIn, handleLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="mobile-header">
      <div className="mobile-left">
        <a onClick={() => setDrawerOpen(true)} className="svgImages-hamBurger mobile-leftNavBar hamburger-hamburger"></a>
        <a href="/" className="svgImages-novaCartLogo mobile-ncLogo"></a>
      </div>

      <div className="mobile-right">
        <a className="svgImages-mSearch mobileSearch"></a>
        <a className="svgImages-profile mobile-user"></a>
        <a className="svgImages-bag mobile-bag"></a>
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
