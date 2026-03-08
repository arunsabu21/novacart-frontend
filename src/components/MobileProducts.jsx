import { useState } from "react";
import Loader from "../components/Loader";
import "../styles/mobile/MobileProducts.css";
import SortMobilePopup from "../components/SortMobilePopup";
import FilterMobilePopup from "../components/FilterMobilePopup";
import notFound from "../assets/icons/not-found.png";

function MobileProducts({
  products,
  pageLoading,
  message,
  navigate,
  isWishlisted,
  toggleWishlist,
  animatingId,
  productsLoading,
  productsCount,
  setSortBy,
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
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  // 🔥 First Load Only
  if (pageLoading) return <Loader />;

  return (
    <div className="layout">
      <div style={{ paddingTop: "56px" }}>
        <div id="reactPage">
          <div className="searchResults">
            {/* MESSAGE */}
            {message && (
              <div
                id="messageMainDiv"
                className="messageMainContainer messageTopLevel messageShow"
              >
                <div className="messageContent messageInfo">
                  <div
                    className="messageText"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    {message}
                  </div>
                </div>
              </div>
            )}

            {/* SORT POPUP */}
            {showSort && (
              <SortMobilePopup
                setShowSort={setShowSort}
                setSortBy={setSortBy}
              />
            )}

            {showFilter && (
              <FilterMobilePopup
                setShowFilter={setShowFilter}
                categories={categories}
                brands={brands}
                selectedBrand={selectedBrands}
                selectedCategory={selectedCategory}
                handleBrandChange={handleBrandChange}
                setSelectedCategory={setSelectedCategory}
                clearFilters={clearFilters}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                priceMinLimit={priceMinLimit}
                priceMaxLimit={priceMaxLimit}
                pixelToPrice={pixelToPrice}
                priceToPixel={priceToPixel}
              />
            )}

            {/* BANNER */}
            {!productsLoading && products.length > 0 && (
            <div className="banner-label">
              <div className="banner-text-item">
                <div style={{ fontWeight: "700" }}>UPTO 100 OFF</div>
                <div>SAVE</div>
              </div>
            </div>
            )}
            {/* PRODUCTS / SKELETON */}
            <div>
              <ul className="list">
                {/* Skeleton Loading */}
                {productsLoading &&
                  [...Array(productsCount || 6)].map((_, i) => (
                    <li key={i} className="item skelton-item">
                      <div
                        className="skeleton-loader"
                        style={{
                          height: "240px",
                          margin: "8px",
                        }}
                      ></div>
                    </li>
                  ))}
                {!productsLoading &&
                  products.map((product, index) => (
                    <li
                      key={product.id}
                      className={`item
                      ${index < 2 ? "top-border" : ""}
                      ${index % 2 === 0 ? "itemBorderRight" : ""}
                    `}
                    >
                      <div className="searchProduct">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/products/${product.id}`);
                          }}
                        >
                          <div className="ripple-container">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="img-responsive"
                              style={{ width: "100%" }}
                            />

                            <div className="content-wrap">
                              <div className="text-md price-wrap text-sm">
                                <h3 className="prod-title text-md">
                                  {product.title}
                                </h3>

                                <h4 className="description text-sm">
                                  {product.subtitle}
                                </h4>

                                <div className="price-container">
                                  <span className="price">
                                    ₹
                                    <span className="price-value">
                                      {product.price}
                                    </span>
                                  </span>
                                </div>
                              </div>

                              {/* ❤️ Wishlist */}
                              <div
                                className="wishlist-icon-container"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  toggleWishlist(product);
                                }}
                              >
                                <div
                                  className={`wishlist-anim ${
                                    animatingId === product.id ? "active" : ""
                                  }`}
                                >
                                  <span className="bubble b1"></span>
                                  <span className="bubble b2"></span>
                                  <span className="bubble b3"></span>
                                  <span className="bubble b4"></span>
                                  <span className="bubble b5"></span>

                                  {isWishlisted(product.id) ? (
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                    >
                                      <g fill="#FF3F6C">
                                        <path d="M11.02835,19.276575 L10.972,19.276575 C10.6304,19.276575 10.2965,19.137625 10.05605,18.895075 L2.71865,11.513925 C1.53495,10.323225 0.88325,8.735275 0.88325,7.042675 C0.88325,5.350075 1.53495,3.762475 2.71865,2.571775 C3.9034,1.379675 5.48435,0.723425 7.1703,0.723425 C8.5759,0.723425 9.90905,1.179825 11,2.022625 C12.0913,1.179825 13.4241,0.723425 14.8297,0.723425 C16.516,0.723425 18.09695,1.379675 19.2817,2.572125 C20.46505,3.762475 21.11675,5.350075 21.11675,7.042675 C21.11675,8.735625 20.46505,10.323225 19.2817,11.513925 L11.94325,18.895775 C11.6993,19.141475 11.3745,19.276575 11.02835,19.276575 Z" />
                                      </g>
                                    </svg>
                                  ) : (
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                    >
                                      <g
                                        stroke="none"
                                        strokeWidth="1"
                                        fill="none"
                                        fillRule="evenodd"
                                      >
                                        <g fill="#3E4152">
                                          <path d="M8.1703,4.473425 C6.9537,4.473425 5.8134,4.946625 4.95975,5.805525 C4.10435,6.666175 3.63325,7.815575 3.63325,9.042675 C3.63325,10.269775 4.10435,11.419525 4.95975,12.280175 L12,19.362425 L19.0406,12.279825 C19.89565,11.419525 20.36675,10.270125 20.36675,9.042675 C20.36675,7.815575 19.89565,6.665825 19.0406,5.805875 C19.0406,5.805875 19.0406,5.805525 19.04025,5.805525 C18.1866,4.946625 17.0463,4.473425 15.8297,4.473425 C14.6138,4.473425 13.4742,4.946275 12.62055,5.804475 C12.29225,6.134525 11.70845,6.134875 11.3798,5.804475 C10.5258,4.946275 9.3862,4.473425 8.1703,4.473425 L8.1703,4.473425 Z M12.02835,21.276575 L11.972,21.276575 C11.6304,21.276575 11.2965,21.137625 11.05605,20.895075 L3.71865,13.513925 C2.53495,12.323225 1.88325,10.735275 1.88325,9.042675 C1.88325,7.350075 2.53495,5.762475 3.71865,4.571775 C4.9034,3.379675 6.48435,2.723425 8.1703,2.723425 C9.5759,2.723425 10.90905,3.179825 12,4.022625 C13.0913,3.179825 14.4241,2.723425 15.8297,2.723425 C17.516,2.723425 19.09695,3.379675 20.2817,4.572125 C21.46505,5.762475 22.11675,7.350075 22.11675,9.042675 C22.11675,10.735625 21.46505,12.323225 20.2817,13.513925 L12.94325,20.895775 C12.6993,21.141475 12.3745,21.276575 12.02835,21.276575 L12.02835,21.276575 Z"></path>
                                        </g>
                                      </g>
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </li>
                  ))}

                  {!productsLoading && products.length === 0 && (
                    <div className="emptyState">
                      <img src={notFound} alt="Not Found" className="emptyImage" />
                      <div className="emptyTitle">
                        No Products Found
                      </div>
                      <div className="emptySubtitle">
                        Try adjusting filters or price range
                      </div>
                    </div>
                  )}
              </ul>
            </div>

            {/* SORT + FILTER BAR */}
            <div className="grid stickyBar stickyBarDiv">
              <div className="stickyColumns">
                <div className="ripple-container">
                  <button
                    className="stickyButton flat columnButton"
                    onClick={() => setShowSort(true)}
                  >
                    SORT
                  </button>
                </div>
              </div>

              <div className="stickyDivider"></div>

              <div className="stickyColumns">
                <div className="ripple-container">
                  <button
                    className="stickyButton flat columnButton"
                    onClick={() => setShowFilter(true)}
                  >
                    FILTER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileProducts;
