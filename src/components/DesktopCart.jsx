import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QtySelector from "../components/QtySelector";
import ConfirmationModal from "../components/ConfirmModal";
import RemoveItemModal from "../components/RemoveItemModal";
export default function DesktopCart({
  cart,
  onQtyChange,
  onRemove,
  cartBulkRemove,
  cartBulkMove,
  totalItems,
  totalAmount,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const [showItemRemove, setShowItemRemove] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const navigate = useNavigate();

  function goToCheckout() {
    navigate("/checkout");
  }

  return (
    <div className="layout">
      <div className="desktopBase-cartLayout">
        <div className="itemBlockDesktop-LeftSide">
          <div className="desktopAddress-baseContainer">
            <div className="desktopAddress-baseTitle">
              Deliver to:
              <span className="desktopAddressHighLight"> 686520</span>
            </div>
          </div>
          <div className="bulkAction-containerDesktop">
            <div className="bulkActionStrip-message">
              <span className="bulkActionStrip-totalItems">
                {cart.length} Items ready to checkout
              </span>
            </div>
            <div className="bulkAction-desktopActionBase bulkAction-desktopButton">
              <div className="bulkAction-baseAction bulkAction-baseActions">
                <button
                  onClick={() => {
                    setConfirmAction("REMOVE");
                    setShowConfirm(true);
                  }}
                  className="bulkAction-desktopBaseActionBtn bulkAction-desktopBaseActionBtn-remove"
                >
                  REMOVE
                </button>
              </div>
              <div className="bulkAction-baseAction bulkAction-baseActions">
                <button
                  onClick={() => {
                    setConfirmAction("MOVE");
                    setShowConfirm(true);
                  }}
                  className="bulkAction-desktopBaseActionBtn bulkAction-desktopBaseActionBtn-remove"
                >
                  MOVE TO WISHLIST
                </button>
              </div>
            </div>
          </div>
          <div id="cartItems">
            {cart.map((item) => (
              <div key={item.id} className="desktopItems-marginBase">
                <div className="desktopItem-base-item">
                  <div className="desktopItem-baseContainer">
                    {/* IMAGE */}
                    <div className="desktopItem-baseContainerLeft">
                      <div
                        style={{
                          background: "rgb(229, 241, 255)",
                          height: "148px",
                          width: "111px",
                        }}
                      >
                        <img
                          src={item.product_image}
                          alt={item.product_title}
                          className="image-base-imgResponsive"
                          style={{ height: "148px", width: "111px" }}
                        />
                      </div>
                    </div>

                    {/* DETAILS */}
                    <div className="desktopItem-baseContainerRight">
                      <div className="desktopItem-baseDetails">
                        <div>
                          <div className="desktopItem-base-title">
                            {item.product_title}
                          </div>
                          <a href="#" className="desktopItem-baseDetailsLink">
                            {item.product_subtitle}
                          </a>
                        </div>

                        {/* QTY */}
                        <QtySelector
                          quantity={item.quantity}
                          stock={item.stock}
                          onSelect={(newQty) => {
                            const diff = newQty - item.quantity;
                            if (diff > 0) {
                              for (let i = 0; i < diff; i++) {
                                onQtyChange(item.id, "increase");
                              }
                            } else if (diff < 0) {
                              for (let i = 0; i < Math.abs(diff); i++) {
                                onQtyChange(item.id, "decrease");
                              }
                            }
                          }}
                        />

                        {/* PRICE */}
                        <div className="itemContainer-base-price">
                          <div className="itemComponents-base-price itemComponents-base-bold">
                            ₹ {item.product_price}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        setActiveItem(item);
                        setShowItemRemove(true);
                      }}
                      role="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        className="itemContainer-base-closeIcon"
                        style={{ cursor: "pointer" }}
                      >
                        <path
                          fill="#000"
                          fillRule="evenodd"
                          d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a href="/wishlist">
            <div className="addToWishlist-base-mainBlock">
              <div className="addToWishlist-base-wishlistBlock addToWishlist-base-wishlistBlockWithoutTray">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  className="addToWishlist-base-wishlistIcon"
                >
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M10.993 14.62a.067.067 0 0 1-.103.058l-4.571-2.77a.638.638 0 0 0-.64 0l-4.57 2.77a.067.067 0 0 1-.102-.058V1.133A.13.13 0 0 1 1.139 1H3.5V3.5c0 .298.18.543.486.543s.515-.245.515-.543V1h6.36a.13.13 0 0 1 .133.133V14.62zM11.307 0H.693A.687.687 0 0 0 0 .68v14.719A.61.61 0 0 0 .617 16a.63.63 0 0 0 .315-.086l4.996-3.026a.14.14 0 0 1 .144 0l4.996 3.026a.628.628 0 0 0 .315.086.61.61 0 0 0 .617-.602V.679C12 .306 11.69 0 11.307 0z"
                  ></path>
                </svg>
                <div className="addToWishlist-base-wishlistText">
                  Add More From Wishlist
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="itemBlockDesktop-RightSide">
          <div className="desktop-base-priceBlock">
            <div className="priceBlock-base-priceHeader">
              PRICE DETAILS ({cart.length} Items)
            </div>
            <div className="priceBlock-base-priceBreakUpContainer">
              <div className="priceBreakUp-base-orderSummary">
                <div className="priceDetail-base-row">
                  <span>Total MRP</span>
                  <span className="priceDetail-base-value">
                    ₹ {totalAmount}
                  </span>
                </div>
                <div className="priceDetail-base-row">
                  <span>Total Items</span>
                  <span className="priceDetail-base-value">{cart.length}</span>
                </div>
                <div className="priceDetail-base-row">
                  <span>Delivery Charges</span>
                  <span className="priceDetail-base-value tint">FREE</span>
                </div>
                <div className="priceDetail-base-total">
                  <span>Amount Payable</span>
                  <span className="priceDetail-base-value">
                    ₹ {totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={goToCheckout} className="placeOrder-button">PLACE ORDER</button>
        </div>
      </div>
      <ConfirmationModal
        open={showConfirm}
        title={
          confirmAction === "REMOVE"
            ? "Remove all items?"
            : "Move items to wishlist?"
        }
        message={
          confirmAction === "REMOVE"
            ? "Items will be removed from your bag."
            : "Items will be moved to your wishlist."
        }
        confirmText={confirmAction === "REMOVE" ? "REMOVE" : "MOVE"}
        cancelText="CANCEL"
        onConfirm={() => {
          if (confirmAction === "REMOVE") {
            cartBulkRemove(cart.map((i) => i.id));
          }
          if (confirmAction === "MOVE") {
            cartBulkMove(cart.map((i) => i.id));
          }
          setShowConfirm(false);
          setConfirmAction(null);
        }}
        onCancel={() => {
          setShowConfirm(false);
          setConfirmAction(null);
        }}
      />

      <RemoveItemModal
        open={showItemRemove}
        item={activeItem}
        onRemove={() => {
          onRemove(activeItem.id);
          setShowItemRemove(false);
          setActiveItem(null);
        }}
        onMove={() => {
          cartBulkMove([activeItem.id]);
          setShowItemRemove(false);
          setActiveItem(null);
        }}
        onCancel={() => {
          setShowItemRemove(false);
          setActiveItem(null);
        }}
      />
    </div>
  );
}
