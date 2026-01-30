import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/mobile/MobileCart.css";
import ConfirmationModal from "../components/ConfirmModal";
import SecurePaymentBanner from "../components/SecurePaymentBanner";
import QtySelector from "../components/QtySelector";
import RemoveItemModal from "../components/RemoveItemModal";
export default function MobileCart({
  cart,
  onQtyChange,
  onRemove,
  cartBulkRemove,
  cartBulkMove,
  totalAmount,
  address,
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
      <div id="mobileCart">
        <div id="mobileContent">
          <div className="page">
            <div className="mobile-base-mobile">
              <div>
                <div
                  className={`mobile-address-block ${
                    !address?.pincode ? "address-error" : ""
                  }`}
                >
                  {address?.pincode ? (
                    <div className="address-base-title">
                      Deliver to:
                      <span className="address-base-highlight">
                        {" "}
                        {address.name}, {address.pincode}
                      </span>
                      <div className="address-base-subText">
                        {address.house_number}, {address.address},{" "}
                        {address.location}, {address.district}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="address-warning">
                        Add delivery address and continue
                      </div>

                      <button className="addressMobile-addButton">
                        Add Address
                      </button>
                    </>
                  )}
                </div>
                <div className="msg-container"></div>
                <div className="bulkActionStrip-mobileContainer">
                  <div className="bulkActionStrip-message">
                    <span className="bulkActionStrip-totalItems">
                      {cart.length} ITEMS READY TO CHECKOUT
                    </span>
                    <span className="bulkActionStrip-totalAmount">
                      (₹ {totalAmount})
                    </span>
                  </div>
                  <div className="bulkActionStrip-mobileButtonContainer">
                    <div
                      onClick={() => {
                        setConfirmAction("REMOVE");
                        setShowConfirm(true);
                      }}
                      className="bulkActionStrip-iconDiv"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <g fillRule="nonzero" stroke="none" strokeWidth="1">
                          <path
                            d="M14.65 2.514h-3.065l-.694-1.64a1.365 1.365 0 00-.536-.619A1.411 1.411 0 009.571 0H6.397a1.41 1.41 0 00-.784.255c-.258.17-.436.377-.536.62l-.694 1.64H1.317c-.092 0-.6.054-.6.601 0 .548.508.655.6.655h.953v9.35c0 .544.155 1.007.466 1.39.31.383.685.575 1.121.575h8.254c.437 0 .81-.198 1.121-.594.311-.397.466-.866.466-1.41v-9.31h.953c.092 0 .6-.108.6-.656 0-.547-.508-.602-.6-.602zM6.249 1.365a.28.28 0 01.169-.108H9.56a.28.28 0 01.17.108l.476 1.15H5.762l.486-1.15zm6.09 12.249c-.119.205-.407.215-.427.215H4.057c-.02 0-.339 0-.436-.215-.097-.215-.081-.388-.081-.532v-9.31h8.889v9.31c0 .144.026.326-.092.532z"
                            transform="translate(-813, -359) translate(813, 359);"
                          ></path>
                          <path
                            d="M6.029 11.426V5.894c0-.047-.096-.367-.56-.367-.462 0-.558.326-.558.367v5.532c0 .045.096.367.559.367.463 0 .559-.322.559-.367zM8.543 11.426V5.894c0-.044-.087-.367-.559-.367-.472 0-.559.322-.559.367v5.532c0 .048.087.367.56.367.47 0 .558-.325.558-.367zM11.057 11.426V5.894c0-.044-.05-.367-.559-.367-.508 0-.558.323-.558.367v5.532c0 .048.05.367.558.367.51 0 .56-.325.56-.367z"
                            transform="translate(-813 -359) translate(813 359)"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div
                      onClick={() => {
                        setConfirmAction("MOVE");
                        setShowConfirm(true);
                      }}
                      className="bulkActionStrip-iconDiv"
                    >
                      <svg width="18" height="18" viewBox="0 0 16 18">
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <path
                            d="M14.868 4.36c.125-3.57-4.54-6.06-7.394-2.843C3.968-2.777-2.68 2.973 1.156 7.251c2.557 2.852 4.657 5.02 6.298 6.503a114.06 114.06 0 004.885-4.982"
                            stroke="#282C3F"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            transform="translate(-231 -269) translate(228 264) translate(4.5 6)"
                          ></path>
                          <path
                            d="M13.783 5.98A4.118 4.118 0 0115 8.912v.049a.54.54 0 01-1.079 0v-.05c0-.816-.318-1.587-.901-2.169a3.047 3.047 0 00-2.169-.903H8.818l1.879 1.888a.538.538 0 01-.76.761l-2.749-2.76A.537.537 0 017 5.317a.537.537 0 01.188-.411l2.737-2.75a.538.538 0 01.76.762L8.852 4.761h2a4.12 4.12 0 012.93 1.219z"
                            fill="#282C3F"
                            transform="translate(-231 -269) translate(228 264) translate(4.5 6)"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="cartItems">
              {cart.map((item) => (
                <div key={item.id} className="itemContainer-base-itemMargin">
                  <div>
                    <div className="item-base-item">
                      <div className="itemContainer-base-item">
                        <div className="itemContainer-base-itemLeft">
                          <div role="link" tabIndex="0" data-href="">
                            <div
                              style={{
                                background: "rgb(223, 250, 243)",
                                height: "148px",
                                width: "111px",
                              }}
                            >
                              <Link to={`/products/${item.product}`}>
                                <img
                                  src={item.product_image}
                                  alt={item.product_title}
                                  className="image-base-imgResponsive"
                                  fetchPriority="high"
                                  loading="eager"
                                  style={{ height: "148px", width: "111px" }}
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="itemContainer-base-itemRight">
                          <div className="itemContainer-base-details">
                            <div>
                              <div className="itemContainer-base-brand">
                                {item.product_title}
                              </div>
                              <Link
                                to={`/products/${item.product}`}
                                className="itemContainer-base-itemLink"
                              >
                                {item.product_subtitle}
                              </Link>
                            </div>
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
                            <div className="itemContainer-base-price">
                              <div className="itemComponents-base-price itemComponents-base-bold">
                                ₹ {item.product_price}
                              </div>
                            </div>
                            <div className="itemDelivery-estimate">
                              <div className="itemDelivery-baseMessage itemDelivery-estimateContainer">
                                <div className="itemDelivery-iconBase">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="8"
                                    viewBox="0 0 10 8"
                                    className="itemDelivery-check"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M9.775.227A.716.716 0 0 0 8.716.24L3.373 6.015a.09.09 0 0 1-.133 0L1.278 3.91a.716.716 0 0 0-1.059-.001.834.834 0 0 0 0 1.127l2.565 2.742c.14.15.33.223.53.223h.004a.71.71 0 0 0 .53-.23l5.939-6.416A.833.833 0 0 0 9.775.227"
                                    ></path>
                                  </svg>
                                </div>
                                <div className="itemDelivery-messageText itemDelivery-baseMessage">
                                  <span>Delivery by</span>
                                  <span style={{ fontWeight: "700"}}> {item.estimated_delivery}</span>
                                </div>
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
            <div className="priceBlock-base-container">
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
                    <span className="priceDetail-base-value">
                      {cart.length}
                    </span>
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
            <SecurePaymentBanner />
            <div className="stickyButton-base-StickyComponent stickyButton-base-extraPaddingTop">
              <div className="stickyButton-base-stickyButton">
                <div className="placeOrder-base-itemSelectedStrip">
                  {cart.length} Item ready to checkout
                </div>
                <div className="stickyButton-base-container">
                  <button
                    onClick={goToCheckout}
                    className="stickyButton-base-placeOrderButton stickyButton-base-fullWidthButton"
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            </div>
          </div>
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
            cartBulkRemove(cart.map((item) => item.id));
          }

          if (confirmAction === "MOVE") {
            cartBulkMove(cart.map((item) => item.id));
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
