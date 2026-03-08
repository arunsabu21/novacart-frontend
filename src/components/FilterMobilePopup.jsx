import "../styles/mobile/MobileProducts.css";
import { useState } from "react";

function FilterMobilePopup({
  setShowFilter,
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
  pixelToPrice,
  priceToPixel,
}) {
  const [activeFilter, setActiveFilter] = useState("categories");

  const SLIDER_WIDTH = 226;

  const startDrag = (e, type) => {
    const move = (event) => {
      const clientX = event.touches?.[0]?.clientX || event.clientX;

      const slider = document.querySelector(".slider");
      if (!slider) return;
      const sliderLeft = slider.getBoundingClientRect().left;
      let px = clientX - sliderLeft;

      if (px < 0) px = 0;
      if (px > SLIDER_WIDTH) px = SLIDER_WIDTH;

      const price = pixelToPrice(px);

      if (type === "min") {
        if (price < maxPrice) setMinPrice(price);
      } else {
        if (price > minPrice) setMaxPrice(price);
      }
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", stop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", stop);
  };

  return (
    <div className="searchFilters">
      {/* HEADER */}
      <div className="grid filterTitle">
        <div className="col-1-2">
          <div className="filterBlock">
            <span className="filterLabel">FILTERS</span>
          </div>
        </div>

        <div className="col-1-2">
          <button
            style={{ color: "#20bd99" }}
            className="stickyButton primary filters-clear btn-adj"
            onClick={clearFilters}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="sort-popup">
        <div className="overlay">
          <div className="drawer bottom"></div>
        </div>
      </div>

      <div className="grid filters-content">
        {/* LEFT SIDE */}
        <div className="col-1-3 filters">
          <ul className="pane">
            <div className="ripple-container">
              <li
                className={
                  activeFilter === "categories" ? "selectedFilter" : ""
                }
                onClick={() => setActiveFilter("categories")}
              >
                <label>Categories</label>
              </li>

              <div className="ripple"></div>
            </div>

            <div className="ripple-container">
              <li
                className={activeFilter === "price" ? "selectedFilter" : ""}
                onClick={() => setActiveFilter("price")}
              >
                <label>Price</label>
              </li>

              <div className="ripple"></div>
            </div>

            <div className="ripple-container">
              <li
                className={activeFilter === "brand" ? "selectedFilter" : ""}
                onClick={() => setActiveFilter("brand")}
              >
                <label>Brand</label>
              </li>

              <div className="ripple"></div>
            </div>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="col-2-3"
          style={{ height: "100%", paddingRight: "12px" }}
        >
          {/* CATEGORY PANEL */}
          {activeFilter === "categories" && (
            <div className="filterOptions">
              <div className="filterOptionHead">Categories</div>

              {categories.map((cat) => (
                <li key={cat.slug} className="normalValueContainer">
                  <label className="customCheckboxV2">
                    <input
                      type="checkbox"
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                    />

                    <div className="filterValue">{cat.name}</div>
                  </label>
                </li>
              ))}
            </div>
          )}

          {activeFilter === "price" && (
            <div className="filterOptions price-filter">
              <div className="price-info">
                <div className="price-info-title normal">
                  Selected Price Range
                </div>

                <div className="price-info-range bold">
                  ₹{minPrice} - ₹{maxPrice}
                </div>
              </div>

              <div className="container">
                <div
                  style={{
                    marginLeft: "32px",
                    marginRight: "32px",
                    position: "absolute",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="histogram"
                    style={{ width: "17px", height: "54px" }}
                  ></div>
                  <div
                    className="histogram"
                    style={{ width: "17px", height: "64px" }}
                  ></div>
                  <div
                    className="histogram"
                    style={{ width: "17px", height: "64px" }}
                  ></div>
                  <div
                    className="histogram"
                    style={{ width: "17px", height: "64px" }}
                  ></div>
                  <div
                    className="histogram"
                    style={{ width: "17px", height: "59px" }}
                  ></div>
                  <div
                    className="histogram"
                    style={{ width: "17px", height: "54px" }}
                  ></div>
                  <div
                    className="histogram"
                    style={{ width: "17px", height: "34px" }}
                  ></div>
                  <div
                    className="histogram"
                    style={{ width: "17px", height: "24px" }}
                  ></div>
                  <div
                    className="histogram"
                    style={{ width: "17px", height: "24px" }}
                  ></div>
                  <div
                    className="histogram"
                    style={{ width: "17px", height: "14px" }}
                  ></div>
                </div>

                <div className="slider" style={{ top: "48px", width: "226px" }}>
                  {/* Track */}
                  <div
                    className="track"
                    style={{
                      width: "198px",
                      left: "12px",
                      top: "16px",
                    }}
                  ></div>

                  {/* Active Range */}
                  <div
                    className="train"
                    style={{
                      top: "16px",
                      left: `${priceToPixel(minPrice)}px`,
                      right: `${SLIDER_WIDTH - priceToPixel(maxPrice)}px`,
                    }}
                  ></div>

                  {/* Min Thumb */}
                  <div
                    style={{
                      position: "absolute",
                      left: `${priceToPixel(minPrice)}px`,
                      backgroundColor: "white",
                      border: "1px solid #20bd99",
                      borderRadius: "100%",
                      width: "24px",
                      height: "24px",
                      top: "4px",
                      cursor: "pointer",
                    }}
                    onMouseDown={(e) => startDrag(e, "min")}
                    onTouchStart={(e) => startDrag(e, "min")}
                  ></div>

                  {/* Max Thumb */}
                  <div
                    style={{
                      position: "absolute",
                      left: `${priceToPixel(maxPrice)}px`,
                      backgroundColor: "white",
                      border: "1px solid #20bd99",
                      borderRadius: "100%",
                      width: "24px",
                      height: "24px",
                      top: "4px",
                      cursor: "pointer",
                    }}
                    onMouseDown={(e) => startDrag(e, "max")}
                    onTouchStart={(e) => startDrag(e, "max")}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* BRAND PANEL */}
          {activeFilter === "brand" && (
            <div className="filterOptions">
              <div>
                <div className="filterOptionHead">Brands</div>

                {brands.map((brand) => (
                  <li key={brand.title} className="normalValueContainer">
                    <label className="customCheckboxV2">
                      <input
                        type="checkbox"
                        checked={selectedBrands?.includes(brand.title)}
                        onChange={() => handleBrandChange(brand.title)}
                      />

                      <div className="filterValue">{brand.title}</div>
                    </label>
                  </li>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="grid filterFooter">
          <div className="col-1-2">
            <div className="ripple-container">
              <button
                className="stickyButton filtButton"
                onClick={() => setShowFilter(false)}
              >
                CLOSE
              </button>

              <div className="ripple"></div>
            </div>
          </div>

          <div className="buttonDivider"></div>

          <div className="col-1-2">
            <div className="ripple-container">
              <button
                className="stickyButton filtButton btn-adj"
                style={{ color: "#20bd99" }}
                onClick={() => setShowFilter(false)}
              >
                Apply
              </button>

              <div className="ripple"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterMobilePopup;
