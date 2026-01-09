import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

import DesktopProductDetail from "../components/DesktopProductDetail";
import MobileProductDetail from "../components/MobileProductDetail";
import Loader from "../components/Loader";
import MobileToast from "../components/MobileToast";
import "../MobileProductDetail.css";
import "../ProductDetails.css";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  /* ---------------- SCREEN DETECTION ---------------- */
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`/products/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  useEffect(() => {
    async function checkCartStatus() {
      if (!product) return;

      const token = localStorage.getItem("access");

      try {
        const res = await axios.get("/cart/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const exists = res.data.some((item) => item.product === product.id);

        if (exists) {
          setAdded(true); 
        }
      } catch (err) {
        console.error(err);
      }
    }

    checkCartStatus();
  }, [product]);

  useEffect(() => {
    async function checkWishlistStatus() {
      if (!product) return;

      const token = localStorage.getItem("access");

      try {
        const res = await axios.get("/products/wishlist/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const exists = res.data.some((item) => item.book === product.id);

        setWishlisted(exists);
      } catch (err) {
        console.error(err);
      }
    }

    checkWishlistStatus();
  }, [product]);

  /* ---------------- ACTION ENDPOINTS ---------------- */

  const handleWishlist = async () => {
    const token = localStorage.getItem("access");

    try {
      if (!wishlisted) {
        // Add to wishlist
        await axios.post(
          "/products/wishlist/",
          { book_id: product.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setWishlisted(true);
        setToastMessage("Product added to wishlist");
      } else {
        // Remove from wishlist
        await axios.delete(`/products/wishlist/${product.id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWishlisted(false);
        setToastMessage("Product removed from wishlist");
      }

      if (isMobile) {
        setShowToast(false);
        setTimeout(() => setShowToast(true), 10);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add to bag
  const handleAddToBag = async () => {
    if (adding) return; 

    setAdding(true);

    const token = localStorage.getItem("access");

    try {
      await axios.post(
        "/cart/add/",
        { book_id: product.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdded((prevAdded) => {
        if (!prevAdded) {
          setToastMessage("Product added to bag");
          return true;
        } else {
          setToastMessage(
            "This item is already in your bag. We’ve increased the quantity by 1"
          );
          return true;
        }
      });

      if (isMobile) {
        setShowToast(false);
        setTimeout(() => setShowToast(true), 10);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  /* ---------------- UI STATES ---------------- */
  if (loading) return <Loader />;
  if (!product) return <p>Product not found.</p>;

  return isMobile ? (
    <>
      <MobileProductDetail
        product={product}
        onWishlist={handleWishlist}
        wishlisted={wishlisted}
        onAddToBag={handleAddToBag}
        adding={adding}
      />

      <MobileToast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  ) : (
    <DesktopProductDetail product={product} />
  );
}
