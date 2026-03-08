import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

import MobileProducts from "../components/MobileProducts";
import DesktopProducts from "../components/DesktopProducts";
import Loader from "../components/Loader";

function Products() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const token = localStorage.getItem("access");

  // ---------------- STATE ----------------
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(6);
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [animatingId, setAnimatingId] = useState(null);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(slug || "");
  const [sortBy, setSortBy] = useState("");

  // ---------------- PRICE STATE ----------------
  const SLIDER_WIDTH = 200;

  const [priceMinLimit, setPriceMinLimit] = useState(0);
  const [priceMaxLimit, setPriceMaxLimit] = useState(0);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // ---------------- CONVERSION FUNCTIONS ----------------
  const pixelToPrice = (px) => {
    if (!priceMaxLimit) return 0;

    return Math.round(
      priceMinLimit + (px / SLIDER_WIDTH) * (priceMaxLimit - priceMinLimit),
    );
  };

  const priceToPixel = (price) => {
    if (!priceMaxLimit) return 0;

    return (
      ((price - priceMinLimit) / (priceMaxLimit - priceMinLimit)) * SLIDER_WIDTH
    );
  };

  // ---------------- SCREEN DETECTION ----------------
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---------------- SYNC SLUG ----------------
  useEffect(() => {
    if (slug) setSelectedCategory(slug);
  }, [slug]);

  // ---------------- FETCH CATEGORIES ----------------
  useEffect(() => {
    axios
      .get("/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ---------------- FETCH BRANDS ----------------
  useEffect(() => {
    if (!selectedCategory) return;

    axios
      .get(`/products/brands/?category=${selectedCategory}`)
      .then((res) => setBrands(res.data))
      .catch((err) => console.log(err));
  }, [selectedCategory]);

  // ---------------- FETCH PRICE RANGE ----------------
  useEffect(() => {
    const fetchPriceRange = async () => {
      try {
        const res = await axios.get(
          `/products/price-range/?category=${selectedCategory || ""}`,
        );

        const min = Math.floor(res.data.min_price || 0);
        const max = Math.ceil(res.data.max_price || 0);

        setPriceMinLimit(min);
        setPriceMaxLimit(max);

        setMinPrice(min);
        setMaxPrice(max);
      } catch (err) {
        console.log("Price range error:", err);
      }
    };

    fetchPriceRange();
  }, [selectedCategory]);

  // ---------------- HANDLE BRAND CHECKBOX ----------------
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
    const fetchProducts = async () => {
      
      if (isMobile) {
        setProductsLoading(true);
      } else {
        setActionLoading(true);
      }

      try {
        const params = new URLSearchParams();

        if (selectedCategory) params.append("category", selectedCategory);

        selectedBrands.forEach((brand) => params.append("brand", brand));

        params.append("min_price", minPrice);
        params.append("max_price", maxPrice);

        if (sortBy) params.append("sort", sortBy);
        const res = await axios.get(`/products/?${params.toString()}`);

        setProducts(res.data);
        setProductsCount(res.data.length);
      } catch (err) {
        console.log("Products fetch error:", err);
      } finally {
        setActionLoading(false);
        setProductsLoading(false);
      }
    };

    if (priceMaxLimit !== 0) {
      fetchProducts();
    }
  }, [selectedCategory, selectedBrands, minPrice, maxPrice, priceMaxLimit, sortBy, isMobile]);

  // ---------------- WISHLIST ----------------
  const loadWishlist = async () => {
    if (!token) return;

    try {
      const res = await axios.get("/products/wishlist/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, [token]);

  const isWishlisted = (productId) =>
    wishlist.some((w) => Number(w.book?.id) === Number(productId));

  const toggleWishlist = async (product) => {
    if (!token) {
      setMessage("Login required");
      setTimeout(() => setMessage(""), 1500);
      return;
    }

    if (!isMobile) {
      setActionLoading(true);
    }

    try {
      const exists = wishlist.find(
        (w) => Number(w.book?.id) === Number(product.id),
      );

      if (!exists) {
        setAnimatingId(product.id);
        setTimeout(() => setAnimatingId(null), 600);
      }

      if (exists) {
        await axios.delete(`/products/wishlist/${exists.id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Removed from wishlist");
      } else {
        await axios.post(
          "/products/wishlist/",
          { book_id: product.id },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setMessage("Product added to wishlist");
      }

      await loadWishlist();
    } catch (err) {
      setMessage("Something went wrong");
    } finally {
      if (!isMobile) {
        setActionLoading(false);
      }
      setTimeout(() => setMessage(""), 1500);
    }
  };

  // ---------------- CLEAR FILTERS ----------------
  const clearFilters = () => {
    setActionLoading(true);
    setSelectedBrands([]);
    setSelectedCategory("");
  };

  // ---------------- COMMON PROPS ----------------
  const commonProps = {
    products,
    message,
    navigate,
    isWishlisted,
    toggleWishlist,
    animatingId,
    productsLoading,
    productsCount,

    categories,
    brands,
    selectedBrands,
    selectedCategory,
    handleBrandChange,
    setSelectedCategory,
    clearFilters,

    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    priceMinLimit,
    priceMaxLimit,
    SLIDER_WIDTH,
    pixelToPrice,
    priceToPixel,
    pageLoading: false,
    sortBy,
    setSortBy,
  };

  return (
    <>
      {actionLoading && <Loader />}

      {isMobile ? (
        <MobileProducts {...commonProps} />
      ) : (
        <DesktopProducts {...commonProps} />
      )}
    </>
  );
}

export default Products;
