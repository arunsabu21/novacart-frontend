import bagIcon from "../assets/icons/desktopbag.png";
import rightArrow from "../assets/icons/right-arrow.png";
import wishIcon from "../assets/icons/wishlist.png";
import fillIcon from "../assets/icons/wishlisted.png";

import { useNavigate } from "react-router-dom";

export default function DesktopProductDetail({
  product,
  onAddToBag,
  adding,
  added,
  onWishlist,
  wishlisted,
}) {
  const navigate = useNavigate();
  if (!product) return null;

  return (
    <main className="pdp-container">
      <section className="pdp-left">
        <div className="pdp-image-box">
          <img src={product.image} alt={product.title} />
        </div>
      </section>

      <section className="pdp-right">
        <h1 className="pdp-brand">{product.title}</h1>
        <h2 className="pdp-title">{product.subtitle}</h2>

        <div className="pdp-rating">
          ⭐ 4.4 <span>| 12k Ratings</span>
        </div>

        <div className="divider"></div>

        <div className="pdp-price-row">
          <span className="pdp-price">₹{product.price}</span>
          <span className="pdp-mrp">₹799</span>
          <span className="pdp-discount">(25% OFF)</span>
        </div>

        <p className="pdp-tax">inclusive of all taxes</p>

        <div className="pdp-actions">
          {/* ADD TO BAG */}
          <button
            className="btn-add"
            disabled={adding}
            onClick={() => {
              if (added) {
                navigate("/cart");
              } else {
                onAddToBag();
              }
            }}
          >
            {adding ? (
              <>ADDING...</>
            ) : added ? (
              <>
                <span>GO TO BAG</span>
                <img
                  src={rightArrow}
                  alt="go to bag"
                  className="btn-icon right-icon"
                />
              </>
            ) : (
              <>
                <img src={bagIcon} alt="bag" className="btn-icon" />
                ADD TO BAG
              </>
            )}
          </button>

          {/* WISHLIST */}
          <button
            className={`btn-wishlist ${wishlisted ? "wishlisted" : ""}`}
            onClick={onWishlist}
          >
            <img
              src={wishlisted ? fillIcon : wishIcon}
              alt="wishlist"
              className="btn-icon"
            />
            {wishlisted ? "WISHLISTED" : "WISHLIST"}
          </button>
        </div>
        <div className="divider"></div>
        <div className="pdp-desc-main">
          <h2>Product Details</h2>
          <p>{product.description}</p>
        </div>
        <div className="divider"></div>
        <div className="pdp-desc-main">
          <h2>Author</h2>
          <p>{product.author}</p>
        </div>
        <div className="divider"></div>
        <div className="pdp-desc-main">
          <h2>Published Year</h2>
          <p>{product.published_year}</p>
        </div>
      </section>
    </main>
  );
}
