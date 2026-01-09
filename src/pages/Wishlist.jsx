import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

import DesktopWishlist from "../components/DesktopWishlist";
import MobileWishlist from "../components/MobileWishlist";
import EmptyWishlist from "../components/EmptyWishlist";
import Loader from "../components/Loader";
import MobileNav from "../components/MobileNav";
import DesktopNotify from "../components/DesktopNotify";

export default function Wishlist() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // message object: {text, image, showButton}
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  // ---------- responsive detect ----------
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---------- fetch wishlist ----------
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
    } finally {
      setLoading(false);
    }
  };

  // ---------- GLOBAL NOTIFY ----------
  const showNotify = ({ text, image = null, showButton = false }) => {
    setMessage({ text, image, showButton });

    // auto hide
    setTimeout(() => setMessage(null), 3000);
  };

  // ---------- REMOVE ----------
  const removeFromWishlist = async (arg) => {
    try {
      const token = localStorage.getItem("access");

      // if arg is object -> use arg.id
      // if arg is number -> use directly
      const id = typeof arg === "object" ? arg.id : arg;

      await axios.delete(`/products/wishlist/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // find full item to show image when only id was passed
      const fullItem =
        typeof arg === "object" ? arg : wishlist.find((w) => w.id === arg);

      showNotify({
        text: isMobile
          ? "Product removed from wishlist"
          : "Item removed from wishlist",
        image: fullItem?.book?.image || null,
        showButton: false,
      });

      fetchWishlist();
    } catch (err) {}
  };

  // ---------- ADD TO CART ----------
  const addToCart = async (book) => {
    try {
      const token = localStorage.getItem("access");

      await axios.post(
        "/cart/add/",
        { book_id: book.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 🔥 REMOVE FROM UI IMMEDIATELY
      setWishlist((prev) => prev.filter((item) => item.book.id !== book.id));

      showNotify({
        text: isMobile
          ? "Product moved to bag"
          : "Item successfully added to bag",
        image: book.image,
        showButton: !isMobile,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ---------- LOADING ----------
  if (loading) return <Loader />;

  // ---------- EMPTY LIST ----------
  if (wishlist.length === 0)
    return (
      <>
        <MobileNav count={0} />

        {/* mobile toast only */}
        {isMobile && message && (
          <div className="login-messages">
            <div className="login-alert info">{message.text}</div>
          </div>
        )}

        <div style={{ paddingTop: "60px" }}>
          <EmptyWishlist />
        </div>
      </>
    );

  // ---------- NON-EMPTY ----------
  return isMobile ? (
    <>
      <MobileNav count={wishlist.length} />

      {/* 📱 mobile toast */}
      {message && (
        <div className="login-messages">
          <div className="login-alert info">{message.text}</div>
        </div>
      )}

      <MobileWishlist
        wishlist={wishlist}
        removeFromWishlist={removeFromWishlist}
        addToCart={(bookId, image) => addToCart({ id: bookId, image })}
      />
    </>
  ) : (
    <>
      {/* 🖥 desktop notification */}
      {!isMobile && message && (
        <DesktopNotify
          type="info"
          message={message.text}
          thumbnail={message.image}
          actionText={message.showButton ? "VIEW BAG" : null}
          onAction={() => navigate("/cart")}
        />
      )}

      <DesktopWishlist
        wishlist={wishlist}
        removeFromWishlist={(itemId) => {
          const item = wishlist.find((w) => w.id === itemId);
          removeFromWishlist(item);
        }}
        addToCart={(book) => addToCart(book)}
      />
    </>
  );
}
