import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { BASE_URL } from "../api/axios";
import EmptyCart from "../components/EmptyCart";
import "../Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  async function updateQuantity(cartId, action) {
    if (action === "decrease") {
      const item = cart.find((i) => i.id === cartId);
      if (item.quantity === 1) return;
    }

    try {
      const token = localStorage.getItem("access");
      await axios.patch(
        `/cart/update/${cartId}/`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart((prev) =>
        prev.map((item) => {
          if (item.id !== cartId) return item;
          const price = Number(item.product_price);
          const qty =
            action === "increase" ? item.quantity + 1 : item.quantity - 1;

          return {
            ...item,
            quantity: qty,
            total_price: qty * price,
          };
        })
      );
    } catch (err) {
      console.error("Quantity update failed", err);
    }
  }

  async function removeFromCart(cartId) {
    try {
      const token = localStorage.getItem("access");
      await axios.delete(`/cart/remove/${cartId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart((prev) => prev.filter((item) => item.id !== cartId));
    } catch (err) {
      console.error("Remove failed", err);
    }
  }

  if (loading) return <p className="cart-loading">Loading...</p>;

  const totalAmount = cart.reduce((sum, i) => sum + i.total_price, 0);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <div className="cart-container">
        {cart.length > 0 && (
          <h2 className="cart-heading">My Cart {totalItems}</h2>
        )}

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cart-layout">
            {/* LEFT */}
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <button
                    className="cart-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ×
                  </button>

                  <img
                    src={item.product_image}
                    alt={item.product_title}
                    className="cart-image"
                  />

                  <div className="cart-info">
                    <h4>{item.product_title}</h4>
                    <p className="price">₹ {item.product_price}</p>

                    <div className="qty-controls">
                      <button
                        onClick={() => updateQuantity(item.id, "decrease")}
                        disabled={item.quantity === 1}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, "increase")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT */}
            <div className="cart-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹ {totalAmount}</span>
              </div>

              {/* <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
