import React from "react";

function Sidebar({ username }) {
  return (
    <>
      <div className="account-account">
        <div className="account-heading">Account</div>
        <div>{username}</div>
      </div>

      <div className="sidebar-sidebar">
        <div className="segment-segment">
          <a href="" className="segment-link segment-activeLink">
            Overview
          </a>
        </div>

        <div className="segment-segment">
          <div className="segment-heading">ORDERS</div>
          <a href="" className="segment-link">Orders & Returns</a>
        </div>

        <div className="segment-segment">
          <div className="segment-heading">ACCOUNT</div>
          <a href="" className="segment-link">Profile</a>
          <a href="" className="segment-link">Shopping Bag</a>
          <a href="" className="segment-link">Wishlist</a>
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