import { useState, useEffect, useRef } from "react";
import Logo from "../assets/icons/nc-logo.png";
import Wishlist from "../assets/icons/wishlist.png";
import Bag from "../assets/icons/shopping-bag.png";
import User from "../assets/icons/person.png";

const BottomMobileNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const itemsRef = useRef([]);

  const navItems = [
    { id: "home", label: "Home", icon: Logo },
    { id: "wishlist", label: "Wishlist", icon: Wishlist },
    { id: "bag", label: "Bag", icon: Bag },
    { id: "profile", label: "Profile", icon: User },
  ];

  useEffect(() => {
    const currentItem = itemsRef.current[activeIndex];
    if (currentItem) {
      setIndicatorStyle({
        width: `${currentItem.offsetWidth}px`,
        left: `${currentItem.offsetLeft}px`,
      });
    }
  }, [activeIndex]);

  return (
    <nav className="bottom-nav">
      {/* ACTIVE SLIDING INDICATOR */}
      <div className="active-indicator" style={indicatorStyle} />

      {/* NAV ITEMS */}
      {navItems.map((item, index) => (
        <button
          key={item.id}
          ref={(el) => (itemsRef.current[index] = el)}
          className={`nav-item ${activeIndex === index ? "active" : ""}`}
          onClick={() => setActiveIndex(index)}
        >
          <img
            src={item.icon}
            alt={item.label}
            className="nav-icon"
          />
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomMobileNav;
