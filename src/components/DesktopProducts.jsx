import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import wishlistIcon from "../assets/icons/wishlist.png";
import wishListed from "../assets/icons/wishlisted.png";
import "../styles/desktop/Products.css";

function DesktopProducts({
  products,
  pageLoading,
  message,
  navigate,
  isWishlisted,
  toggleWishlist,

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
  SLIDER_WIDTH,
  pixelToPrice,
  priceToPixel,
}) {
  const currentCategory = categories.find(
    (cat) => cat.slug === selectedCategory,
  );

  const startDrag = (e, type) => {
    e.preventDefault();

    const slider = document.querySelector(".slider-path");
    const rect = slider.getBoundingClientRect();

    const onMove = (moveEvent) => {
      let x = moveEvent.clientX - rect.left;
      x = Math.max(0, Math.min(x, SLIDER_WIDTH));

      const price = pixelToPrice(x);

      if (type === "min" && price < maxPrice) {
        setMinPrice(price);
      }

      if (type === "max" && price > minPrice) {
        setMaxPrice(price);
      }
    };

    const stopMove = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", stopMove);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", stopMove);
  };

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const filter = document.querySelector(".filter-wrapper");
      const offsetTop = filter.offsetTop;

      if (window.scrollY > offsetTop - 80) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div style={{ minHeight: "1500px", marginTop: "80px" }}>
      <main className="desktop-product-base">
        <div className="row-base">
          <div className="breadcrumbs-base">
            <ul className="breadcrumbs-list">
              <li className="breadcrumbs-item">
                <a
                  href="#"
                  itemProp="url"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory("");
                    navigate("/");
                  }}
                >
                  <span itemProp="title">Home</span>
                </a>
              </li>

              {selectedCategory && (
                <li className="breadcrumbs-item">
                  <span
                    className="breadcrumbs-crumb"
                    style={{ fontSize: "14px", margin: "0" }}
                  >
                    {currentCategory?.name || "Loading..."}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="row-base">
          <div className="title-container">
            <h1 className="title-title">
              {currentCategory?.name || "All Products"}
            </h1>
            <span className="title-count"> - {products.length} Items</span>
          </div>
        </div>
        <div className="row-base">
          <div
            className="product-leftContainer column-base"
            style={{ flex: "1 1 0%" }}
          >
            <div className={`filter-wrapper ${isFixed ? "filter-fixed" : ""}`}>
              <section className="filter-scroll">
                <div className="vertical-filters vertical-filters-position">
                  <div className="filters-filters header-container">
                    <span style={{ fontWeight: "700" }}>FILTERS</span>
                    <span
                      className="filter-clear-button"
                      onClick={clearFilters}
                    >
                      Clear All
                    </span>
                  </div>
                </div>
                <div className="filters-filters categories-container">
                  <span className="filters-header">Categories</span>
                  <ul className="categories-list">
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <label className="common-customCheckbox filters-label">
                          <input
                            type="checkbox"
                            checked={selectedCategory === cat.slug}
                            onChange={() => setSelectedCategory(cat.slug)}
                          />
                          {cat.name}
                          <div className="checkbox-indicator"></div>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="filters-filters brand-container">
                  <span className="filters-header">Brand</span>
                  <ul className="brand-list">
                    {brands.map((brand) => (
                      <li key={brand.title}>
                        <label className="common-customCheckbox filters-label">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand.title)}
                            onChange={() => handleBrandChange(brand.title)}
                          />
                          {brand.title}
                          <span className="categories-num">{brand.count}</span>
                          <div className="checkbox-indicator"></div>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="filters-filters">
                  <span className="filters-header">Price</span>
                  <div className="price-sliderContainer">
                    <div className="slider-path" style={{ width: "200px" }}>
                      <div className="slider-pathRail">
                        <div className="slider-pathRailBar"></div>

                        <div
                          className="slider-pathRail-range"
                          style={{
                            left: `${priceToPixel(minPrice)}px`,
                            right: `${SLIDER_WIDTH - priceToPixel(maxPrice)}px`,
                          }}
                        ></div>

                        <div
                          role="button"
                          className="slider-pathRailThumbLeft"
                          style={{ left: `${priceToPixel(minPrice)}px` }}
                          onMouseDown={(e) => startDrag(e, "min")}
                        >
                          <div className="slider-thumbDot"></div>
                        </div>

                        <div
                          role="button"
                          className="slider-pathRailThumbRight"
                          style={{ left: `${priceToPixel(maxPrice)}px` }}
                          onMouseDown={(e) => startDrag(e, "max")}
                        >
                          <div className="slider-thumbDot"></div>
                        </div>
                      </div>

                      <div className="slider-dotContainer">
                        ₹{minPrice} - ₹{maxPrice}+
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="search-right column-base" style={{ flex: "1 1 0%" }}>
            <div id="desktopProducts">
              <div className="row-base">
                <section className="horizontal-filters-base border-hide horizontal-boxShadow"></section>
              </div>
              <div className="products-products row-base">
                <section width="100%">
                  <ul className="results-base">
                    {products.map((product) => (
                      <li key={product.id} className="product-base">
                        <div className="product-thumbShim"></div>

                        <a
                          href="#"
                          target="_blank"
                          style={{ display: "block" }}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/products/${product.id}`);
                          }}
                        >
                          <div className="product-image-base">
                            <div
                              className="product-image-sub"
                              style={{ display: "block" }}
                            >
                              <div
                                style={{
                                  backgroundColor: "rgb(255, 242, 223)",
                                }}
                              >
                                <div style={{ height: "280px", width: "100%" }}>
                                  <img
                                    draggable="false"
                                    src={product.image}
                                    alt={product.title}
                                    className="img-responsive"
                                    style={{ width: "100%", display: "block" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="product-metaData">
                            <h3 className="product-brand">{product.title}</h3>
                            <h4 className="product-title">
                              {product.subtitle}
                            </h4>
                            <div className="product-price">
                              <span>Rs. {product.price}</span>
                            </div>
                          </div>

                          <div className="product-user-actions">
                            <span
                              className={`product-addWishlist product-actionsButton product-wishlist 
      ${isWishlisted(product.id) ? "product-wishlistedActive" : ""}`}
                              style={{ width: "100%", textAlign: "center" }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlist(product);
                              }}
                            >
                              <span className="product-wishlistIcon notWishlisted">
                                <img
                                  src={
                                    isWishlisted(product.id)
                                      ? wishListed
                                      : wishlistIcon
                                  }
                                  alt="wishlist"
                                  width="18"
                                />
                              </span>
                              {isWishlisted(product.id)
                                ? "Wishlisted"
                                : "Wishlist"}
                            </span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
        {showTopBtn && (
          <button
            className="scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        )}
      </main>
      <div className="right-fixedBanner right-right">
        <div className="right-fixedBannerArrow right-fixedBannerArrowArrow"></div>
        <p className="right-fixedBannerText">UPTO ₹200 OFF</p>
      </div>
    </div>
  );
}

export default DesktopProducts;
