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
      <h1 className="products-heading">Collections</h1>

      <div className="products-grid">
        {products.map((book) => {
          console.log("IMAGE VALUE:", book.image);

          return (
            <div
              key={book.id}
              className="product-card"
              onClick={() => navigate(`/products/${book.id}`)}
            >
              <img
                src={book.image}                 // ✅ direct URL from backend
                alt={book.title}
                className="product-image"
              />

              <div className="product-info">
                <h3 className="product-title">{book.title}</h3>
                <p className="product-price">₹ {book.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
