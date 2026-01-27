import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import MobileCheckout from "../components/MobileCheckout";
import DesktopCheckout from "../components/DesktopCheckout";
import "../styles/desktop/Checkout.css";

export default function CheckOut() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [checkoutLoading, setCheckoutLoading] = useState(true);

  /* ---------- RESPONSIVE ---------- */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------- FETCH CART + ADDRESS ---------- */
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    setCheckoutLoading(true);

    Promise.all([
      axios.get("/cart/", { headers }),
      axios.get("/addresses/", { headers }),
    ])
      .then(([cartRes, addressRes]) => {
        if (!cartRes.data || cartRes.data.length === 0) {
          navigate("/cart");
          return;
        }

        setCartItems(cartRes.data);
        setAddresses(addressRes.data);

        const defaultAddr = addressRes.data.find((a) => a.is_default);
        if (defaultAddr) {
          setSelectedAddress(defaultAddr);
        } else if (addressRes.data.length > 0) {
          setSelectedAddress(addressRes.data[0]);
        }
      })
      .finally(() => setCheckoutLoading(false));
  }, [navigate]);

  /* ---------- CONTINUE (MOBILE) ---------- */
  function continueToPayment() {
    if (!selectedAddress) {
      alert("Please select address");
      return;
    }

    navigate("/payment", {
      state: { addressId: selectedAddress.id },
    });
  }

  /* ---------- SAVE ADDRESS ---------- */
  function handleAddressSaved(newAddress) {
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddress(newAddress);

    navigate("/payment", {
      state: { addressId: newAddress.id },
    });
  }

  /* ---------- PLACE ORDER (DESKTOP) ---------- */
  function handlePlaceOrder() {
    if (!selectedAddress) {
      alert("Please select address");
      return;
    }

    navigate("/payment", {
      state: { addressId: selectedAddress.id },
    });
  }

  const checkoutProps = {
    cartItems,
    addresses,
    selectedAddress,
    onContinue: continueToPayment,
  };

  return isMobile ? (
    <MobileCheckout
      {...checkoutProps}
      loading={checkoutLoading}
      onAddressSaved={handleAddressSaved}
      onPlaceOrder={handlePlaceOrder}
    />
  ) : (
    <DesktopCheckout
      {...checkoutProps}
      loading={checkoutLoading}
      onPlaceOrder={handlePlaceOrder}
      onAddressSaved={handleAddressSaved}
    />
  );
}
