import "../styles/desktop/OrderSuccess.css";
import ScooterImg from "../assets/images/fast-shipping.png";
import orderBox from "../assets/images/delivery-status.png";

export default function MobileOrderDetails({ order }) {
  if (!order) return null;

  const firstItem = order.items[0];

  return (
    <div className="orderDetails-mobile">
      <div id="mobileSuccess">
        {/* ADDRESS CARD */}
        <div className="orderDetails-addressCard">
          <div className="orderDetails-addressRow">
            {/* LEFT */}
            <div className="address-left">
              <p className="label">Delivering to:</p>

              {/* You are NOT sending address yet from backend */}
              <p className="name">{order.address?.name} | {order.address?.mobile}</p>
              <p className="address">
                {order.address?.address},
                {order.address?.district},
                {order.address?.state} - {order.address?.pincode}
              </p>

              <button className="orderDetails-btn">ORDER DETAILS</button>
            </div>

            {/* RIGHT */}
            <div className="address-right">
              <img src={ScooterImg} alt="Delivery" />
            </div>
          </div>

          {/* INFO STRIP */}
          <div className="orderItems-infoStrip">
            You can Track / View / Modify order from orders page
          </div>
        </div>

        {/* TAG YOUR PURCHASE */}
        <div className="purchaseProduct-container">
          <div className="purchaseProduct-title">Tag your purchase</div>

          <div className="purchaseProduct-card">
            <div
              style={{
                width: "46px",
                height: "57px",
                background: "#e3fff9",
              }}
            >
              {firstItem.product_image && (
                <img
                  src={firstItem.product_image}
                  alt={firstItem.product_title}
                  className="purchaseProduct-image"
                />
              )}
            </div>

            <div className="purchaseProduct-info">
              <div className="purchaseProduct-name">
                {firstItem.product_title}
              </div>

              <div className="purchaseProduct-qty">
                Qty: {firstItem.quantity}
              </div>

              <div className="purchaseProduct-delivery">
                Arriving by {order.estimated_delivery}
              </div>
            </div>
          </div>
        </div>

        {/* TRACK ORDER CARD */}
        <div className="orderInfo-card">
          <div className="orderInfo-left">
            <div className="orderInfo-title">Track your order</div>

            <div className="orderInfo-text">
              View delivery status, items, and updates anytime from your orders
              page.
            </div>

            <button className="orderInfo-link">View</button>
          </div>

          <div className="orderInfo-right">
            <img src={orderBox} alt="Track order" />
          </div>
        </div>
      </div>
    </div>
  );
}