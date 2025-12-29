import { useNavigate } from "react-router-dom";
import "../Wishlist.css";
import wishlistImg from "../assets/icons/add-to-favorites.png";

function EmptyWishlist() {
  const navigate = useNavigate();

  return (
    <div className="wishlistEmpty-container">
      <div className="wishlistEmpty-heading">YOUR WISHLIST IS EMPTY</div>
      <div className="wishlistEmpty-info">
        Add items that you like to your wishlist. Review them anytime and easily
        move them to bag.
      </div>
      <div className="wishlistEmpty-image">
        <img src={wishlistImg} alt="empty wishlist" />
      </div>
      <button
        className="wishlistEmpty-button"
        onClick={() => navigate("/products")}
      >
        CONTINUE SHOPPING
      </button>
    </div>
  );
}

export default EmptyWishlist;
