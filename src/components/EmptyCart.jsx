import "../Cart.css";
import emptyBag from "../assets/icons/emptybag.png";
import { useNavigate } from "react-router-dom";

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="desktop-base-emptyCart">
      <div className="emptyCart-base-mainContainer">
        <div className="emptyCart-base-subContainer">
          <div
            className="imageBanner-base-container emptyCart-base-emptyBagImage"
            style={{ background: "none", height: "165px", width: "146px" }}
          >
            <img
              src={emptyBag}
              alt="empty bag"
              className="image-base-imageResponsive"
              fetchPriority="auto"
              style={{ height: "165px", width: "146px" }}
            />
          </div>

          <div className="emptyCart-base-emptyText">Hey, it feels so light!</div>

          <div className="emptyCart-base-emptyDesc">
            There is nothing in your bag. Let's add some items.
          </div>

          <div className="emptyCart-base-addFromWishlist">
            <button
              className="button-base-button emptycart-toWishlist"
              onClick={() => navigate("/wishlist")}
            >
              ADD ITEMS FROM WISHLIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;
