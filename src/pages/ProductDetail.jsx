import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}/`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToWishlist = async () => {
    try {
      setWishlistLoading(true);
      setMessage("");

      const token = localStorage.getItem("access");

      await axios.post(
        "/products/wishlist/",
        { book_id: product.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Added to wishlist ❤️");
    } catch (err) {
      console.log(err);
      setMessage("Already in wishlist or error");
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

  return (
    <div style={styles.container}>
      {/* Image */}
      <div>
        <img
          src={product.image}
          alt={product.title}
          style={styles.image}
        />
      </div>

      {/* Details */}
      <div style={styles.details}>
        <h1>{product.title}</h1>

        <p style={styles.author}>by {product.author}</p>

        <p style={styles.price}>₹ {product.price}</p>

        <p style={styles.description}>{product.description}</p>

        <p>
          <strong>Published Year:</strong> {product.published_year}
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        {/* Buttons */}
        <div style={styles.buttonRow}>
          <button style={styles.cartButton}>Add to Cart</button>

          <button
            style={styles.wishlistButton}
            onClick={addToWishlist}
            disabled={wishlistLoading}
          >
            {wishlistLoading ? "Adding..." : "♡ Add to Wishlist"}
          </button>
        </div>

        {/* Message */}
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "60px auto",
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    alignItems: "center",
  },

  image: {
    width: "100%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    border: "1px solid #d4d5d9",
  },

  details: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  author: {
    fontStyle: "italic",
    color: "#555",
  },

  price: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#4F46E5",
  },

  description: {
    lineHeight: "1.6",
  },

  buttonRow: {
    display: "flex",
    gap: "16px",
    marginTop: "20px",
  },

  cartButton: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#4F46E5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  wishlistButton: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "transparent",
    color: "#4F46E5",
    border: "2px solid #4F46E5",
    borderRadius: "8px",
    cursor: "pointer",
  },

  message: {
    marginTop: "10px",
    fontWeight: "500",
    color: "green",
  },
};

export default ProductDetail;
