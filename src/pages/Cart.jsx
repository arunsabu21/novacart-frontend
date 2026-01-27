import { useEffect, useState } from "react";
import axios from "../api/axios";
import EmptyCart from "../components/EmptyCart";
import Loader from "../components/Loader";
import MobileCart from "../components/MobileCart";
import DesktopCart from "../components/DesktopCart";
import "../styles/desktop/Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });
  const [showFlash, setShowFlash] = useState(false);

  /* ---------- SCREEN DETECTION ---------- */
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---------- FETCH CART ---------- */
  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const token = localStorage.getItem("access");
      const res = await axios.get("/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!message.text) return;

    requestAnimationFrame(() => {
      setShowFlash(true);
    });

    const hideTimer = setTimeout(() => {
      setShowFlash(false); 
    }, 3000);

    const cleanupTimer = setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 4500); 

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(cleanupTimer);
    };
  }, [message]);

  /* ---------- UPDATE QUANTITY ---------- */
  async function updateQuantity(cartId, action) {
    const item = cart.find((i) => i.id === cartId);

    if (action === "decrease" && item.quantity === 1) return;

    if (action === "increase" && item.quantity >= 10) {
      setMessage({
        type: "info",
        text: "Maximum 10 quantity allowed per item",
      });
      return;
    }

    try {
      const token = localStorage.getItem("access");

      const res = await axios.patch(
        `/cart/update/${cartId}/`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart((prev) =>
        prev.map((i) => {
          if (i.id !== cartId) return i;

          const qty = action === "increase" ? i.quantity + 1 : i.quantity - 1;

          return {
            ...i,
            quantity: qty,
            total_price: qty * Number(i.product_price),
          };
        })
      );
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Quantity update failed";

      setMessage({
        type: "error",
        text: errorMsg,
      });
    }
  }

  /* ---------- REMOVE ITEM ---------- */
  async function removeFromCart(cartId) {
    try {
      const token = localStorage.getItem("access");
      await axios.delete(`/cart/remove/${cartId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart((prev) => prev.filter((i) => i.id !== cartId));
    } catch (err) {
      console.error("Remove failed", err);
    }
  }

  /* ---------------BULK REMOVE-----------------*/
  async function bulkRemove(cart_ids) {
    try {
      const token = localStorage.getItem("access");

      await axios.post(
        `/cart/bulk-delete/`,
        { cart_ids },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart((prev) => prev.filter((i) => !cart_ids.includes(i.id)));

      const count = cart_ids.length;
      setMessage({
        type: "success",
        text: `${formatItemText(count)} removed from cart`,
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: "Bulk remove failed",
      });
    }
  }

  function formatItemText(count) {
    return count === 1 ? "1 item" : `${count} items`;
  }

  async function bulkMoveToWishlist(cart_ids) {
    try {
      const token = localStorage.getItem("access");

      await axios.post(
        "/cart/bulk-move-to-wishlist/",
        { cart_ids },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart((prev) => prev.filter((i) => !cart_ids.includes(i.id)));

      const count = cart_ids.length;
      setMessage({
        type: "success",
        text: `${formatItemText(count)} moved to wishlist`,
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: "Failed to move items",
      });
    }
  }

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = cart.reduce((sum, i) => sum + i.total_price, 0);

  return (
    <>
      {message.text && (
        <div
          className={`flashNotifyContainer ${showFlash ? "flashShow" : ""}`}
          style={{ bottom: "105px" }}
        >
          <div className="flashContent flashInfo">
            <span className="flashText">{message.text}</span>
          </div>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : cart.length === 0 ? (
        <EmptyCart />
      ) : isMobile ? (
        <MobileCart
          cart={cart}
          onQtyChange={updateQuantity}
          onRemove={removeFromCart}
          cartBulkRemove={bulkRemove}
          cartBulkMove={bulkMoveToWishlist}
          totalItems={totalItems}
          totalAmount={totalAmount}
        />
      ) : (
        <DesktopCart
          cart={cart}
          onQtyChange={updateQuantity}
          onRemove={removeFromCart}
          cartBulkRemove={bulkRemove}
          cartBulkMove={bulkMoveToWishlist}
          totalItems={totalItems}
          totalAmount={totalAmount}
        />
      )}
    </>
  );
}
