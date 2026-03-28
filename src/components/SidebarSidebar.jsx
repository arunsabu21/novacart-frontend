import React from "react";
import { Link } from "react-router-dom";
function Sidebar({ username }) {
  return (
    <>
      <div className="account-account">
        <div className="account-heading">Account</div>
        <div>{username}</div>
      </div>

      <div className="sidebar-sidebar">
        <div className="segment-segment">
          <Link to="/my/dashboard" className="segment-link segment-activeLink">
            Overview
          </Link>
        </div>

        <div className="segment-segment">
          <div className="segment-heading">ORDERS</div>
          <Link to="/my/orders" className="segment-link">Orders & Returns</Link>
        </div>

        <div className="segment-segment">
          <div className="segment-heading">ACCOUNT</div>
          <a href="" className="segment-link">Profile</a>
          <Link to="/cart" className="segment-link">Shopping Bag</Link>
          <Link to="/wishlist" className="segment-link">Wishlist</Link>
          <a href="" className="segment-link">Account Deletion</a>
        </div>

        <div className="segment-segment">
          <div className="segment-heading">SUPPORT</div>
          <a href="" className="segment-link">Contact Us</a>
        </div>
      </div>
    </>
  );
}

export default Sidebar;