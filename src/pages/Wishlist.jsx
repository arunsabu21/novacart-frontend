import { useState, useEffect } from "react";
import axios from "../api/axios";
import DesktopWishlist from "../components/DesktopWishlist";
import MobileWishlist from "../components/MobileWishlist";
import EmptyWishlist from "../components/EmptyWishlist";
import Loader from "../components/Loader";

export default function Wishlist() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // responsive switch
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // fetch wishlist once here
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await axios.get("/products/wishlist/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWishlist(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const token = localStorage.getItem("access");

      await axios.delete(`/products/wishlist/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (bookId) => {
    try {
      const token = localStorage.getItem("access");

      await axios.post(
        "/cart/add/",
        { book_id: bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Moved to bag 😄");
    } catch (err) {
      console.log("❌ CART ERROR:", err.response?.data);
    }
  };

  // ---------- CONDITIONAL RENDER ----------

  if (loading) return <Loader />;

  if (!loading && wishlist.length === 0) return <EmptyWishlist />;

  // send data + handlers to children
  return isMobile ? (
    <MobileWishlist
      wishlist={wishlist}
      removeFromWishlist={removeFromWishlist}
      addToCart={addToCart}
    />
  ) : (
    <DesktopWishlist
      wishlist={wishlist}
      removeFromWishlist={removeFromWishlist}
      addToCart={addToCart}
    />
  );
}
