import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/products/");
        console.log("PRODUCT RESPONSE:", response.data);
        setProducts(response.data);
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="products-container">
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

          <div className="product-details">
            <h3>{product.title}</h3>
            <p className="subtitle">{product.category}</p>

            <div className="price-row">
              <span className="price">₹{product.price}</span>
              <span className="old-price">₹{product.old_price}</span>
              <span className="discount">{product.discount}% OFF</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Products;
