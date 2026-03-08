import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/desktop/App.css";
import "../styles/desktop/main.css";

function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await axios.get("/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.patch("/profile/update/", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Profile updated successfully!");
      setProfile(response.data);
    } catch (err) {
      setMessage("Error updating profile");
      console.log(err);
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  const avatarLetter = profile.username
    ? profile.username.charAt(0).toUpperCase()
    : "U";

  return (
    <div style={{marginTop: "-2px"}}>
      <div className="application-base full-height">
        <div className="page-page">
          <div className="account-account">
            <div className="account-heading">Account</div>
            <div>Arun Sabu</div>
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
          <div className="pageMainComponent">
            <div className="user-user">
              <div className="user-bg">
                <div className="user-wrapper">
                  <div className="user-default">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
