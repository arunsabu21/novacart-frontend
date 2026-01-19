import "../MobileCheckout.css";
import Loader from "../components/Loader";
import AddressForm from "../components/AddressForm";
import { useNavigate } from "react-router-dom";

export default function MobileCheckout({
  cartItems,
  addresses,
  selectedAddress,
  onContinue,
  loading,
  onAddressSaved,
  setShowAddressForm,
  
}) {
  const navigate = useNavigate();
  /* ---------- HELPERS ---------- */
  function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="layout">
        <div id="mobileCheckout">
          <div className="checkoutMobile-baseContainer">
            <div className="checkoutMobile-baseMobile">
              <Loader />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!addresses || addresses.length === 0) {
    return (
      <div className="layout">
        <div id="mobileCheckout">
          <div className="checkoutMobile-baseContainer">
            <div className="checkoutMobile-baseMobile">
              <AddressForm onSave={onAddressSaved} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectedAddressObj = selectedAddress;

  return (
    <div className="layout">
      <div id="mobileCheckout">
        <div className="checkoutMobile-baseContainer">
          <div className="checkoutMobile-baseMobile">
            {/* ---------- ADDRESS BLOCK ---------- */}
            <div className="addressBlock-defaultAddr">
              {selectedAddressObj ? (
                <div>
                  <div className="addressBlock-addressTitle">
                    <div className="addressTitle-startPosition">
                      <div className="addressBlock-addressName">
                        {selectedAddressObj.name}
                        {selectedAddressObj.is_default && (
                          <span className="addressBlock-defaultTag">
                            (Default)
                          </span>
                        )}
                      </div>
                      <div className="addressBock-addressType">HOME</div>
                    </div>

                    {/* <button
                      className="addressBlock-addressChange"
                      
                    >
                      Change
                    </button> */}
                  </div>

                  <div className="addressBlock-addressDetailBase">
                    <div className="addressBlock-addressField">
                      {selectedAddressObj.house_number},{" "}
                      {selectedAddressObj.address}
                    </div>
                    <div>{selectedAddressObj.town}</div>
                    <div>
                      {selectedAddressObj.district}, {selectedAddressObj.state}{" "}
                      {selectedAddressObj.pincode}
                    </div>
                    <div className="addressBlock-mobileNum">
                      <span>Mobile: </span>
                      <span>{selectedAddressObj.mobile}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-address">
                  <p>No address selected</p>
                </div>
              )}
            </div>

            {/* ---------- ITEMS ---------- */}
            <div className="checkoutItems-baseContainer">
              <div className="checkoutItems-baseTitle">
                ITEMS IN THIS ORDER ({cartItems.length})
              </div>

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

            {/* ---------- CONTINUE ---------- */}
            <div className="mobileCheckout-stickyButton">
              <div className="mobileCheckout-stickyButton-base">
                <div className="stickyButton-base">
                  <button
                    className="stickyButton-placeOrder stickyButton-placeOrderFullW"
                    disabled={loading || !selectedAddress}
                  >
                    {loading ? <Loader /> : "CONTINUE"}
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
