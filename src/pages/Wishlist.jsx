import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { BASE_URL } from "../api/axios";
import EmptyWishlist from "../components/EmptyWishlist";
import "../Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get("/products/wishlist/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const token = localStorage.getItem("access");
      await axios.delete(`/products/wishlist/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  async function addToCart(bookId) {
    try {
      const token = localStorage.getItem("access");

      await axios.post(
        "/cart/add/",
        { book_id: bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to cart"); // temporary feedback
    } catch (err) {
      console.error(err);
      alert("Login required");
    }
  }

  return (
    <div className="wishlist-layout">
      <div className="wishlist-container">
        {wishlist.length > 0 && (
          <h1 className="wishlist-heading">My Wishlist ❤️</h1>
        )}

        {wishlist.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div key={item.id} className="wishlist-card">
                {/* ❌ REMOVE ICON */}
                <button
                  className="wishlist-close"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  ×
                </button>

                {/* IMAGE */}
                <img
                  src={item.book.image}
                  alt={item.book.title}
                  className="wishlist-image"
                  onClick={() => navigate(`/products/${item.book.id}`)}
                />

                {/* INFO */}
                <div className="wishlist-info">
                  <h3 className="wishlist-title">{item.book.title}</h3>
                  <p className="wishlist-price">₹ {item.book.price}</p>

                  {/* ADD TO BAG */}
                  <button
                    className="wishlist-bag"
                    onClick={() => addToCart(item.book.id)}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
