import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "../App.css";

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
    <div
      style={{
        maxWidth: "400px",
        margin: "70px auto",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #d4d5d9",
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          backgroundColor: "#20bd99",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
          margin: "0 auto 20px",
        }}
      >
        {avatarLetter}
      </div>

      <h2 style={{ marginBottom: "10px" }}>Your Profile</h2>

      {/* Email */}
      <p style={{ marginBottom: "20px", fontSize: "14px", opacity: 0.7 }}>
        <strong>Email:</strong> {profile.email}
      </p>

      {/* Input Styles */}
      <input
        name="username"
        value={profile.username}
        onChange={handleChange}
        placeholder="Username"
        className="profile-input"
      />

      <input
        name="first_name"
        value={profile.first_name}
        onChange={handleChange}
        placeholder="First Name"
        className="profile-input"
      />

      <input
        name="last_name"
        value={profile.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        className="profile-input"
      />

      {/* Button */}
      <button onClick={handleUpdate} style={buttonStyle}>
        Update Profile
      </button>

      <button className="profile-logout">Logout</button>

      {/* Message */}
      {message && (
        <p
          style={{
            marginTop: "15px",
            color: message.includes("successfully") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}


const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#20bd99",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "bold",
  marginTop: "10px",
};

export default Profile;
