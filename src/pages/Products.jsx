import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "../api/axios";
import "../Products.css";

import wishlistIcon from "../assets/icons/wishlist.png";
import wishListed from "../assets/icons/wishlisted.png";

function Products() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [pageLoading, setPageLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  // ---------------------- FETCH PRODUCTS ----------------------
  useEffect(() => {
    const fetchProducts = async () => {
      setPageLoading(true);

      try {
        const res = await axios.get("/products/");
        setProducts(res.data);
      } catch (err) {
        console.log("Products fetch error:", err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ---------------------- FETCH WISHLIST ----------------------
  const loadWishlist = async () => {
    if (!token) return;

    try {
      const res = await axios.get("/products/wishlist/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("👉 REAL wishlist from backend:", res.data);
      setWishlist(res.data);
    } catch (err) {
      console.log("Wishlist fetch error:", err);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, [token]);

  // ---------------------- CHECK IF ITEM IN WISHLIST ----------------------
  const isWishlisted = (productId) =>
    wishlist.some((w) => Number(w.book?.id) === Number(productId));

  // ---------------------- TOGGLE ----------------------
  const toggleWishlist = async (product) => {
    if (!token) {
      setMessage("Login required 🔐");
      setTimeout(() => setMessage(""), 1500);
      return;
    }

    try {
      // check match by w.book.id
      const exists = wishlist.find(
        (w) => Number(w.book?.id) === Number(product.id)
      );

      // REMOVE
      if (exists) {
        await axios.delete(`/products/wishlist/${exists.id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMessage("Removed from wishlist");
      }

      // ADD
      else {
        await axios.post(
          "/products/wishlist/",
          { book_id: product.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMessage("Product added to wishlist");
      }

      // reload wishlist from backend
      await loadWishlist();
    } catch (err) {
      console.log("Wishlist toggle error:", err);
      setMessage("Something went wrong");
    } finally {
      setTimeout(() => setMessage(""), 1500);
    }
  };

  return (
    <div className="products-container products-page">
      {pageLoading && <Loader />}

      {message && (
        <div className="login-messages">
          <div className="login-alert info">{message}</div>
        </div>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <div className="img-wrapper">
              <img src={product.image} alt={product.title} />
            </div>

            <button
              className="wishlist-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
              }}
            >
              <img
                src={isWishlisted(product.id) ? wishListed : wishlistIcon}
                alt="wishlist"
                style={{ width: 19, height: 19 }}
              />
            </button>

            <div className="product-details">
              <h3>{product.title}</h3>
              <h4>{product.subtitle}</h4>
              <div className="price-row">
                <span className="price">₹{product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
