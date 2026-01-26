import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessIcon from "../assets/icons/check.png";
import DeliveryImage from "../assets/images/fast-shipping.png";
import OrderBox from "../assets/images/delivery-status.png";
export default function DesktopOrderSuccess({ order }) {
  const navigate = useNavigate();
  return (
    <div className="layout">
      <div className="desktop-base-orderSuccess">
        <div className="desktop-base-orderCard">
          <div className="desktop-base-orderCardBox">
            <div className="desktop-base-orderCardBoxOverFlow">
              <div className="desktop-baseConfirmationCard-container">
                <div className="desktop-baseConfirmationCard card-statusContainer desktopCardContainer">
                  <img
                    src={SuccessIcon}
                    alt="success"
                    className="confirmTick"
                  />
                  <div className="desktopCardContainerHeading">
                    Order Confirmed
                  </div>
                  <div className="desktopCardContainer-info">
                    Your order is confirmed. You will receive an order
                    confirmation email/SMS shortly with the expected delivery
                    date for your items.
                  </div>
                </div>
                <div className="desktop-baseConfirmationCard">
                  <div className="desktopCardContainer-delivery">
                    <div className="desktopCardContainer-deliveryInfo">
                      Delivering to:
                      <div className="desktopCardContainer-deliveryHeader">
                        <div className="deliverName">{order.address?.name}</div>
                        <div> | {order.address?.mobile}</div>
                      </div>
                      <div className="deliverAddress">
                        {order.address?.house_number},{order.address?.address}, {order.address?.district}, {order.address?.state} - {order.address?.pincode}
                      </div>
                      <a href="#" className="desktopOrder-detailsButton">
                        ORDER DETAILS
                      </a>
                    </div>
                    <img
                      src={DeliveryImage}
                      alt="delivery"
                      className="deliverShipImage"
                    />
                  </div>
                  <div className="deliverFooter">
                    <div>You can Track/View/Modify order from orders page.</div>
                  </div>
                </div>
                <div
                  className="desktop-baseConfirmationCard"
                  style={{ width: "40%", position: "relative" }}
                >
                  <div className="cardHeading">
                    <span>Track you order easily</span>
                  </div>
                  <div
                    className="orderBoxImage"
                    style={{
                      background: "none",
                      height: "97px",
                      width: "134px",
                    }}
                  >
                    <img
                      src={OrderBox}
                      alt=""
                      className="image-base-imgResponsive orderBoxImage "
                      style={{ width: "80px", height: "80px"}}
                    />
                  </div>
                  <div className="orderBoxDesc">
                    View delivery status, items, and updates anytime from your orders page.
                  </div>
                  <div className="orders-pageLink">View</div>
                </div>
                <div className="ordersButton-baseContainer ordersButton-desktopBased">
                  <button onClick={() => navigate("/products")} className="button-base-buttonConfirm button-secondary button-secondary-base">
                    CONTINUE SHOPPING
                  </button>
                  <button className="button-base-buttonConfirm button-secondary-base mainButton-width">
                    VIEW ORDER
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
