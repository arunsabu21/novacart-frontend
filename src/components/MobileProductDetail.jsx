import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OutlineWishIcon from "../assets/icons/m-outline-wish.png";
import FilledWishIcon from "../assets/icons/m-filled-wish.png";
import BagIcon from "../assets/icons/white-bag.png";
import TruckIcon from "../assets/icons/delivery-truck.png";

export default function MobileProductDetail({
  product,
  onWishlist,
  onAddToBag,
  wishlisted,
}) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToBag = async () => {
    setAdding(true);
    await onAddToBag();
    setAdding(false);
    setAdded(true);
  };

  return (
    <div className="m-pdp">
      <div className="m-pdp-image-wrap">
        <img src={product.image} alt={product.title} className="m-pdp-image" />
      </div>

      <div className="m-pdp-info">
        <h1 className="m-pdp-title">{product.title}</h1>
        <h2 className="m-pdp-sub">{product.subtitle}</h2>
        <div className="m-pdp-price">₹ {product.price}</div>
        <div className="m-pdp-desc-box">
          <h3 className="m-pdp-desc-title">Product Details</h3>
          <p className="m-pdp-desc-text">{product.description}</p>
          <h3 className="m-pdp-desc-title">Author</h3>
          <p className="m-pdp-desc-text">{product.author}</p>
          <h3 className="m-pdp-desc-title">Published</h3>
          <p className="m-pdp-desc-text">{product.published_year}</p>
        </div>

        <div className="m-pdp-desc-box">
          <div className="delivery-row">
            <img src={TruckIcon} alt="Delivery" className="delivery-icon" />

            <div className="delivery-text">
              <h3 className="m-pdp-desc-title">Free Delivery</h3>
              <p className="m-pdp-desc-text">
                Free delivery available for this product
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="m-pdp-actions">
        <button className="m-wishlist" onClick={onWishlist}>
          <img
            src={wishlisted ? FilledWishIcon : OutlineWishIcon}
            alt="Wishlist"
          />
        </button>

        <button
          className={`m-add-to-bag ${added ? "added" : ""}`}
          onClick={added ? () => navigate("/cart") : handleAddToBag}
          disabled={adding}
        >
          <img src={BagIcon} alt="Bag" className="bag-icon" />

          <span className="btn-text">
            {adding ? "ADDING..." : added ? "GO TO BAG" : "ADD TO BAG"}
          </span>
        </button>
      </div>
    </div>
  );
}
