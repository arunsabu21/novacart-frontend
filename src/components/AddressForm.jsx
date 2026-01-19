import { useState, useEffect } from "react";
import axios from "../api/axios";
export default function AddressForm({ onSave }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [addressType, setAddressType] = useState("HOME");
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);

  async function handleSaveAddress() {
    if (!name || !mobile || !pincode || !city || !state) {
      alert("Please fill all required fields");
      return;
    }

    const token = localStorage.getItem("access");
    if (!token) {
      alert("Login required");
      return;
    }

    const payload = {
      name,
      mobile,
      pincode,
      state,
      district: city,
      town: locality,
      house_number: houseNumber,
      address,
      address_type: addressType,
      is_default: isDefault,
    };

    try {
      setLoading(true);

      const res = await axios.post("/addresses/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onSave(res.data); // ✅ send up
    } catch {
      alert("Failed to save address");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (pincode.length !== 6) {
      setCity("");
      setState("");
      setAutoFilled(false);
      return;
    }

    const fetchAddress = async () => {
      try {
        const res = await axios.get(`/addresses/pincode/?pincode=${pincode}`);
      
        if (res.data.city && res.data.state) {
          setCity(res.data.city);
          setState(res.data.state);
          setAutoFilled(true); // 🔒 lock fields
        } else {
          setCity("");
          setState("");
          setAutoFilled(false); // ✍️ manual allowed
        }
      } catch {
        setCity("");
        setState("");
        setAutoFilled(false);
      }
    };

    const timer = setTimeout(fetchAddress, 400);
    return () => clearTimeout(timer);
  }, [pincode]);

  return (
    <div className="addressForm-container">
      <div className="addressForm-container-scrollable addressForm-containerMT addressForm-containerMB">
        <div className="addressForm-containerMobile">
          <div className="addressForm-containerMobileHeader">
            Contact Details
          </div>
          <div className="floatingInputRow">
            <div className="floatingInput-container">
              <input
                type="text"
                className="floatingInput-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
              />

              <label htmlFor="name" className="floatingLabel">
                Name*
              </label>
            </div>
          </div>
          <div className="floatingInputRow">
            <div className="floatingInput-container">
              <input
                type="text"
                className="floatingInput-input"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder=""
              />

              <label htmlFor="mobile" className="floatingLabel">
                Mobile No*
              </label>
            </div>
          </div>
        </div>
        <div className="addressForm-containerMobile">
          <div className="addressForm-containerMobileHeader">Address</div>
          <div className="floatingInputRow">
            <div className="floatingInput-container">
              <input
                type="text"
                className="floatingInput-input"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder=""
              />

              <label htmlFor="pincode" className="floatingLabel">
                Pincode*
              </label>
            </div>
          </div>
          <div className="floatingInputRow">
            <div className="floatingInput-container">
              <input
                type="text"
                className="floatingInput-input"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                placeholder=""
              />
              <label htmlFor="house_number" className="floatingLabel">
                House Number/Tower/Block*
              </label>
            </div>
          </div>
          <div className="floatingInputRow">
            <div className="floatingInput-container">
              <input
                type="text"
                className="floatingInput-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder=""
              />
              <label htmlFor="address" className="floatingLabel">
                Address(locality,building,street)*
              </label>
            </div>
          </div>
          <div className="floatingInputRow">
            <div className="floatingInput-container">
              <input
                type="text"
                className="floatingInput-input"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder=""
              />

              <label htmlFor="locality" className="floatingLabel">
                Locality / Town*
              </label>
            </div>
          </div>
          <div className="floatingInput-cityLocality">
            <div className="floatingInputRow halfWidth-form">
              <div className="floatingInput-container">
                <label htmlFor="locality" className="floatingLabel">
                  City / District*
                </label>
                <input
                  type="text"
                  className="floatingInput-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={autoFilled}
                />
              </div>
            </div>
            <div className="floatingInputRow halfWidth-form">
              <div className="floatingInput-container">
                <label htmlFor="locality" className="floatingLabel">
                  State*
                </label>
                <input
                  type="text"
                  className="floatingInput-input"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={autoFilled}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="addressForm-containerMobile">
          <div className="addressForm-containerMobileHeader">Address Type</div>
          <div>
            <div className="floatingInput-addressTypes">
              <div
                className={`floatingInput-addressTypeIcon ${
                  addressType === "HOME" ? "active" : ""
                }`}
                onClick={() => setAddressType("HOME")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="floatingInput-radioIcon"
                >
                  <g fillRule="evenodd">
                    {/* Outer circle */}
                    <path d="M8 14.933A6.941 6.941 0 0 1 1.067 8 6.941 6.941 0 0 1 8 1.067 6.941 6.941 0 0 1 14.933 8 6.941 6.941 0 0 1 8 14.933M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8" />

                    {/* Inner fill ONLY when active */}
                    {addressType === "HOME" && (
                      <path d="M8 3.429a4.571 4.571 0 1 0 0 9.143 4.571 4.571 0 0 0 0-9.143" />
                    )}
                  </g>
                </svg>
                <span style={{ fontSize: "16px", marginLeft: "8px" }}>
                  HOME
                </span>
              </div>

              <div
                className={`floatingInput-addressTypeIcon ${
                  addressType === "HOME" ? "active" : ""
                }`}
                onClick={() => setAddressType("OFFICE")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="floatingInput-radioIcon"
                >
                  <g fillRule="evenodd">
                    {/* Outer circle */}
                    <path d="M8 14.933A6.941 6.941 0 0 1 1.067 8 6.941 6.941 0 0 1 8 1.067 6.941 6.941 0 0 1 14.933 8 6.941 6.941 0 0 1 8 14.933M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8" />

                    {/* Inner fill ONLY when active */}
                    {addressType === "OFFICE" && (
                      <path d="M8 3.429a4.571 4.571 0 1 0 0 9.143 4.571 4.571 0 0 0 0-9.143" />
                    )}
                  </g>
                </svg>
                <span style={{ fontSize: "16px", marginLeft: "8px" }}>
                  OFFICE
                </span>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <label className="isDefault">
            <input
              type="checkbox"
              className="floatingInput-checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
            />

            <svg width="16" height="16" viewBox="0 0 16 16">
              <rect
                x="1"
                y="1"
                width="14"
                height="14"
                rx="2"
                fill={isDefault ? "#26a69a" : "none"}
                stroke="#26a69a"
                strokeWidth="1.5"
              />
              {isDefault && (
                <path
                  d="M4.5 8.5l2.2 2.2 4.8-4.8"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
                />
              )}
            </svg>

            <span style={{ marginLeft: "8px", fontSize: "14px" }}>Make this as my default address</span>
          </label>
        </div>
      </div>
      <div className="addressMobile-stickyActions">
        <button
          onClick={handleSaveAddress}
          className="stickyButton-base-placeOrderButton stickyButton-base-fullWidthButton"
        >
          SAVE AND CONTINUE
        </button>
      </div>
    </div>
  );
}
