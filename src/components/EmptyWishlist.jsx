import { useNavigate } from "react-router-dom";
import "../Wishlist.css";
import wishlistImg from "../assets/icons/empty-wishlist.png";

function EmptyWishlist() {
  const navigate = useNavigate();

  return (
    <div className="wishlistEmpty-container">
      <div className="wishlistEmpty-heading">YOUR WISHLIST IS EMPTY</div>
      <div className="wishlistEmpty-info">
        Save the items you love and move them to your bag whenever you're ready.
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
