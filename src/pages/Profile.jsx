import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import { setTitle } from "../utils/setTitle";
import "../styles/desktop/App.css";
import "../styles/desktop/main.css";
import Sidebar from "../components/SidebarSidebar";

import orderIcon from "../assets/icons/gift.png";
import wishlistIcon from "../assets/icons/wishlist-card.png";
import editIcon from "../assets/icons/edit.png";

function Profile({ setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("My Dashboard")
  })

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    delete axios.defaults.headers.common["Authorization"];

    setIsLoggedIn(false);

    navigate("/", { replace: true });
  };
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await axios.get("/my/dashboard/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="mobile" style={{ marginTop: "-2px" }}>
      <div className="application-base full-height">
        <div className="page-page">
          <Sidebar username={profile.username} />

          <div className="pageMainComponent">
            <div className="user-user">
              <div className="user-bg">
                <div className="user-wrapper">
                  <div className="user-default">
                    <div className="userDefaultImage"></div>
                  </div>

                  <div className="user-info">
                    <a href="#" className="userEditProfile">
                      Edit Profile
                    </a>
                    <div className="user-email">{profile.email}</div>
                  </div>
                </div>
              </div>

              <div className="userMinInfo">{profile.email}</div>
            </div>

            <div className="user-dashboard-data">
              <table className="dataMainContainer">
                <tbody>
                  <tr>
                    <td>
                      <Link to="/my/orders" className="link-card">
                        <div className="link-content">
                          <img src={orderIcon} alt="" className="link-icon" />
                          <div className="link-labels">
                            <div className="link-label">Orders</div>
                            <div className="link-subLabel">
                              Check your order status
                            </div>
                          </div>
                        </div>
                      </Link>
                    </td>

                    <td>
                      <Link to="/wishlist" className="link-card">
                        <div className="link-content">
                          <img
                            src={wishlistIcon}
                            alt=""
                            className="link-icon"
                          />
                          <div className="link-labels">
                            <div className="link-label">Wishlist</div>
                            <div className="link-subLabel">
                              Your saved products
                            </div>
                          </div>
                        </div>
                      </Link>
                    </td>

                    <td>
                      <a href="#" className="link-card">
                        <div className="link-content">
                          <img src={editIcon} alt="" className="link-icon" />
                          <div className="link-labels">
                            <div className="link-label">Edit Profile</div>
                            <div className="link-subLabel">
                              Change your profile details
                            </div>
                          </div>
                        </div>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="dashboard-mobileContainer">
                <div className="dashboard-section">
                  <Link to="/my/orders" className="link-card">
                    <div className="link-content">
                      <img src={orderIcon} alt="Orders" className="link-icon" />
                      <div className="link-labels">
                        <div className="link-label">Orders</div>
                        <div className="link-subLabel">
                          Check your order status
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link to="/wishlist" className="link-card">
                    <div className="link-content">
                      <img
                        src={wishlistIcon}
                        alt="Wishlist"
                        className="link-icon"
                      />
                      <div className="link-labels">
                        <div className="link-label">Collections & Wishlist</div>
                        <div className="link-subLabel">
                          All your curated product collections
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="dashboard-section">
                  <a href="#" className="link-card">
                    <div className="link-content">
                      <img
                        src={editIcon}
                        alt="Edit Profile"
                        className="link-icon"
                      />
                      <div className="link-labels">
                        <div className="link-label">Edit Profile</div>
                        <div className="link-subLabel">
                          Change your profile details
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="dashboard-mobileContainer">
                <a href="#" className="footer-card">
                  <div className="footer-content">ABOUT US</div>
                </a>
                <a href="#" className="footer-card">
                  <div className="footer-content">TERMS AND CONDITIONS</div>
                </a>
              </div>
            </div>

            <div style={{ paddingTop: "15px" }}>
              <div className="dashboard-logout" onClick={handleLogout}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
