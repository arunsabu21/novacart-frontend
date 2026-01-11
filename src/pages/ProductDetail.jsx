import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

import MobileProductDetail from "../components/MobileProductDetail";
import DesktopProductDetail from "../components/DesktopProductDetail";
import DesktopNotify from "../components/DesktopNotify";
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

  const [showDesktopNotify, setShowDesktopNotify] = useState(false);

  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);

  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [wishlistActionLoading, setWishlistActionLoading] = useState(false);
  const [isRepeatAdd, setIsRepeatAdd] = useState(false);

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

  /* ---------------- CHECK CART ---------------- */
  useEffect(() => {
    async function checkCartStatus() {
      if (!product) return;

      const token = localStorage.getItem("access");

      try {
        const res = await axios.get("/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const exists = res.data.some((item) => item.product === product.id);

        if (exists) setAdded(true);
      } catch (err) {
        console.error(err);
      }
    }
    checkCartStatus();
  }, [product]);

  /* ---------------- CHECK WISHLIST ---------------- */
  useEffect(() => {
    async function checkWishlistStatus() {
      if (!product) return;

      const token = localStorage.getItem("access");

      try {
        const res = await axios.get("/products/wishlist/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const exists = res.data.some(
          (item) => Number(item.book?.id) === Number(product.id)
        );

        setWishlisted(exists);
      } catch (err) {
        console.error(err);
      } finally {
        setWishlistLoading(false);
      }
    }
    checkWishlistStatus();
  }, [product]);

  /* ---------------- WISHLIST ACTION ---------------- */
  const handleWishlist = async () => {
    if (wishlistActionLoading) return;

    setWishlistActionLoading(true);
    const token = localStorage.getItem("access");

    try {
      if (!wishlisted) {
        await axios.post(
          "/products/wishlist/",
          { book_id: product.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWishlisted(true);

        if (isMobile) {
          setToastMessage("Product added to wishlist");
          setShowToast(true);
        }
      } else {
        await axios.delete(`/products/wishlist/${product.id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlisted(false);

        if (isMobile) {
          setToastMessage("Product removed from wishlist");
          setShowToast(true);
        }
      }

    } catch (err) {
      console.error(err);
    } finally {
      setWishlistActionLoading(false);
    }
  };

  /* ---------------- ADD TO BAG ---------------- */
  const handleAddToBag = async () => {
    if (adding) return;

    setAdding(true);
    const token = localStorage.getItem("access");

    try {
      await axios.post(
        "/cart/add/",
        { book_id: product.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!added) {
        setToastMessage("Product added to bag");
      } else {
        setToastMessage(
          "You already have this product in your bag. We’ve increased the quantity by 1"
        );
      }

      setAdded(true);

      if (isMobile) {
        setShowToast(true);
      } else {
        setShowDesktopNotify(true);
        setTimeout(() => setShowDesktopNotify(false), 2500);
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

  return (
    <>
      {isMobile ? (
        <>
          <MobileProductDetail
            product={product}
            onWishlist={handleWishlist}
            wishlisted={wishlisted}
            wishlistLoading={wishlistLoading || wishlistActionLoading}
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
        <>
          <DesktopProductDetail
            product={product}
            onWishlist={handleWishlist}
            wishlisted={wishlisted}
            onAddToBag={handleAddToBag}
            adding={adding}
            added={added}
          />

          {showDesktopNotify && (
            <DesktopNotify
              type="info"
              message={toastMessage}
              thumbnail={
                toastMessage ===
                "You already have this product in your bag. We’ve increased the quantity by 1"
                  ? null
                  : product.image
              }
            />
          )}
        </>
      )}
    </>
  );
}
