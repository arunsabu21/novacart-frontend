import Loader from "../components/Loader";
import DesktopAddressForm from "../components/DesktopAddressForm";

export default function DesktopCheckout({
  cartItems = [],
  addresses = [],
  selectedAddress,
  onAddressSaved,
  onPlaceOrder,
  loading,
}) {
  function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  /* ---------- TOTALS ---------- */
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalMRP = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product_price,
    0,
  );

  const deliveryCharge = 0;
  const amountPayable = totalMRP + deliveryCharge;

  if (loading) {
    return (
      <div className="layout">
        <Loader />
      </div>
    );
  }

  /* ---------- NO ADDRESS ---------- */
  if (addresses.length === 0) {
    return (
      <div className="layout">
        <div className="checkoutDesktop-baseLayout">
          <div className="checkoutDesktop-baseLeft">
            <div className="checkoutDesktop-titleContainer">
              <div className="checkoutDesktop-title">Add Delivery Address</div>
            </div>

            <DesktopAddressForm onSave={onAddressSaved} />
          </div>

          <div className="checkoutDesktop-dividerCenter"></div>

          <div className="checkoutDesktop-baseRight">
            <div className="checkoutBase-priceBlock checkout-priceBlock">
            <div className="checkoutDesktop-titleDefault">
              PRICE DETAILS ({totalItems} Items)
            </div>
            <div className="priceBlock-base-priceBreakUpContainer">
              <div className="priceBreakUp-base-orderSummary">
                <div className="priceDetail-base-row">
                  <span>Total MRP </span>
                  <span className="priceDetail-base-value">
                    <span>₹{totalMRP}</span>
                  </span>
                </div>
                <div className="priceDetail-base-row">
                  <span>Total Items </span>
                  <span className="priceDetail-base-value">
                    <span>{totalItems}</span>
                  </span>
                </div>
                <div className="priceDetail-base-row">
                  <span>Delivery Charges</span>
                  <span className="priceDetail-base-value tint">FREE</span>
                </div>
                <div className="priceDetail-base-total">
                  <span>Amount Payable</span>
                  <span className="priceDetail-base-value">
                    ₹{amountPayable}
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- ADDRESS FALLBACK ---------- */
  const selectedAddressObj = selectedAddress || addresses[0];

  /* ---------- NORMAL DESKTOP ---------- */
  return (
    <div className="layout">
      <div className="checkoutDesktop-baseLayout">
        {/* LEFT */}
        <div className="checkoutDesktop-baseLeft">
          <div>
            <div className="checkoutDesktop-titleContainer">
              <div className="checkoutDesktop-title">
                Select Delivery Address
              </div>
            </div>

            <div className="checkoutDesktop-titleDefault">DEFAULT ADDRESS</div>

            <div className="checkoutDesktop-addressBox">
              <div className="checkoutDesktop-inner">
                <div className="addressTitle-startPosition">
                  <div className="addressBlock-addressName">
                    {selectedAddressObj.name}
                  </div>
                  <div className="addressBock-addressType">
                    {selectedAddressObj.address_type}
                  </div>
                </div>

                <div className="addressBlock-addressField addressBlock-addressDetailBase">
                  {selectedAddressObj.house_number},{" "}
                  {selectedAddressObj.address}
                  <span>
                    {selectedAddressObj.district}, {selectedAddressObj.state}
                  </span>
                  <span>{selectedAddressObj.pincode}</span>
                </div>

                <div className="addressBlock-mobileNum">
                  <span>Mobile: </span>
                  <span>{selectedAddressObj.mobile}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER */}
        <div className="checkoutDesktop-dividerCenter"></div>

        {/* RIGHT */}

        <div className="checkoutDesktop-baseRight">
          <div className="checkoutItems-baseContainer">
            <div className="checkoutItems-baseTitle">DELIVERY ESTIMATES</div>

            <div className="checkoutItemsList">
              {cartItems.map((item) => (
                <div key={item.id} className="checkoutItems-innerCont">
                  <img
                    src={item.product_image}
                    alt={item.product_title}
                    className="checkoutItem-image"
                  />

                  <div className="checkoutItems-deliveryInfo">
                    <span>Estimated delivery by </span>
                    <span style={{ fontWeight: "700" }}>
                      {formatDate(item.estimated_delivery)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="checkoutBase-priceBlock checkout-priceBlock">
            <div className="checkoutDesktop-titleDefault">
              PRICE DETAILS ({totalItems} Items)
            </div>
            <div className="priceBlock-base-priceBreakUpContainer">
              <div className="priceBreakUp-base-orderSummary">
                <div className="priceDetail-base-row">
                  <span>Total MRP </span>
                  <span className="priceDetail-base-value">
                    <span>₹{totalMRP}</span>
                  </span>
                </div>
                <div className="priceDetail-base-row">
                  <span>Total Items </span>
                  <span className="priceDetail-base-value">
                    <span>{totalItems}</span>
                  </span>
                </div>
                <div className="priceDetail-base-row">
                  <span>Delivery Charges</span>
                  <span className="priceDetail-base-value tint">FREE</span>
                </div>
                <div className="priceDetail-base-total">
                  <span>Amount Payable</span>
                  <span className="priceDetail-base-value">
                    ₹{amountPayable}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="checkoutButton-desktopLay">
            <button className="placeOrder-button" onClick={onPlaceOrder}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
