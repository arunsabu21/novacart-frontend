import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/icons/nc-logo.png";
import Wishlist from "../assets/icons/wishlist.png";
import Bag from "../assets/icons/shopping-bag.png";
import User from "../assets/icons/person.png";

const BottomMobileNav = ({ isLoggedIn }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const itemsRef = useRef([]);
  const navigate = useNavigate();

  const navItems = [
    { id: "home", label: "Home", icon: Logo, path: "/" },
    { id: "wishlist", label: "Wishlist", icon: Wishlist, path: "/wishlist" },
    { id: "bag", label: "Bag", icon: Bag, path: "/cart" },
    { id: "profile", label: "Profile", icon: User, path: "/my/dashboard" },
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
      <div className="active-indicator" style={indicatorStyle} />

      {navItems.map((item, index) => (
        <button
          key={item.id}
          ref={(el) => (itemsRef.current[index] = el)}
          className={`nav-item ${activeIndex === index ? "active" : ""}`}
          onClick={() => {
            setActiveIndex(index);

            if (!isLoggedIn && item.id !== "home") {
              navigate("/login");
            } else {
              navigate(item.path);
            }
          }}
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