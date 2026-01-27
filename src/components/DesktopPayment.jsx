import Loader from "../components/Loader";
import PlacingOrderLoader from "../components/PlacingOrderLoader";
import StripeCheckout from "../components/StripeCheckout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/desktop/Payment.css";
export default function DesktopPayment({
  loading,
  startCardPayment,
  amount,
  displayAmount,
  placeCODOrder,
  clientSecret,
  totalItems,
  setMessage,
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recommended");
  const [openAccordion, setOpenAccordion] = useState("cod");
  const [showPlacingLoader, setShowPlacingLoader] = useState(false);

  return (
    <>
      {showPlacingLoader && <PlacingOrderLoader show={showPlacingLoader} />}
      <div className="layout">
        <div className="paymentDesktop-base-paymentLayout">
          <div className="paymentDesktop-base-left">
            <div>
              <div className="safePayment-container">
                <svg
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="4"
                  stroke="#000000"
                  fill="none"
                  width="18"
                  height="18"
                  className="safePayment-secureIcon"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M31.74,7.19,13.36,14.85a1,1,0,0,0-.62.93V32.11h0A22.89,22.89,0,0,0,23.93,51.78l8.18,4.86,8.06-4.85a22.87,22.87,0,0,0,11.09-19.6V14.84a1,1,0,0,0-.65-.94L32.48,7.18A1,1,0,0,0,31.74,7.19Z"></path>
                    <polyline points="22.01 33.5 29.44 39.12 42.56 20.69"></polyline>
                  </g>
                </svg>
                <div className="safePayment-baseTitle">Secure Payment</div>
                <div className="safePayment-infoContainer">
                  <p>
                    All transactions are secured with trusted encryption to
                    protect your data and ensure a safe, reliable payment
                    experience.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div
                className="paymentMobile-recommendationTitle"
                style={{ fontSize: "16px" }}
              >
                Choose Payment Mode
              </div>
              <div className="tabBar-base-tabBar paymentDesktop-base-paymentOptionsBlock">
                <div className="tabBar-base-tabsBlock">
                  <div
                    className={`tabBar-base-tab ${
                      activeTab === "recommended" ? "tabBar-base-selected" : ""
                    }`}
                    onClick={() => {
                      setActiveTab("recommended");
                      setOpenAccordion("cod");
                    }}
                  >
                    <span className="tabBar-base-tabLabel">
                      <span className="paymentOptions-base-tabDisplayContainer">
                        <div className="paymentOptions-base-tabDisplayIcon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                          >
                            <path
                              fill="none"
                              fillRule="evenodd"
                              stroke="#000"
                              d="M6.918 11.185L4.05 12.993l-.278-4.327-2.57-2.33L5.086 4.71 6.39 1.499l2.652 3.318 3.368.299-2.228 3.706.765 3.432-4.03-1.069z"
                            ></path>
                          </svg>
                        </div>
                        <p className="paymentOptions-base-tabText">
                          <span style={{ fontWeight: "700" }}>Recommended</span>
                        </p>
                      </span>
                    </span>
                  </div>
                  <div
                    id="cod"
                    className={`tabBar-base-tab ${
                      activeTab === "cod" ? "tabBar-base-selected" : ""
                    }`}
                    onClick={() => {
                      setActiveTab("cod");
                      setOpenAccordion("cod");
                    }}
                  >
                    <span style={{ fontWeight: "700" }}>
                      <span className="paymentOptions-base-tabDisplayContainer">
                        <div className="paymentOptions-base-tabDisplayIcon">
                          <svg
                            viewBox="0 0 64 64"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            strokeWidth="3"
                            stroke="#000000"
                            fill="none"
                          >
                            <g strokeWidth="0"></g>
                            <g strokeLinecap="round" strokeLinejoin="round"></g>
                            <g>
                              <rect
                                x="7.18"
                                y="16.7"
                                width="50.86"
                                height="29.87"
                              ></rect>
                              <path d="M17.22,16.55a10,10,0,0,1-10,10.05"></path>
                              <path d="M17.51,46.57a10.05,10.05,0,0,0-10-10"></path>
                              <path d="M48.16,16.55A10.05,10.05,0,0,0,58.21,26.6"></path>
                              <path d="M48,46.57a10.05,10.05,0,0,1,10-10"></path>
                              <path
                                d="M28.47,22.3H31c2.49,0,5.23.81,5.23,4.6,0,4.11-3.48,5.68-7.18,5.26a.21.21,0,0,0-.17.36L36.74,41"
                                strokeLinecap="round"
                              ></path>
                              <line
                                x1="39.24"
                                y1="22.3"
                                x2="30.45"
                                y2="22.3"
                                strokeLinecap="round"
                              ></line>
                              <line
                                x1="28.59"
                                y1="27.03"
                                x2="39.3"
                                y2="27.03"
                                strokeLinecap="round"
                              ></line>
                            </g>
                          </svg>
                        </div>
                        <div className="paymentOptions-base-tabText">
                          <span style={{ fontWeight: "700" }}>
                            Cash On Delivery (Cash/UPI)
                          </span>
                        </div>
                      </span>
                    </span>
                  </div>
                  <div
                    id="stripe"
                    className={`tabBar-base-tab ${
                      activeTab === "stripe" ? "tabBar-base-selected" : ""
                    }`}
                    onClick={() => {
                      setActiveTab("stripe");
                      setOpenAccordion("stripe");
                      if (!clientSecret && !loading) {
                        startCardPayment();
                      }
                    }}
                  >
                    <span style={{ fontWeight: "700" }}>
                      <span className="paymentOptions-base-tabDisplayContainer">
                        <div className="paymentOptions-base-tabDisplayIcon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="12"
                            viewBox="0 0 20 14"
                          >
                            <g
                              fill="none"
                              fillRule="evenodd"
                              transform="translate(1 1)"
                            >
                              <rect
                                width="18"
                                height="12"
                                stroke="#000"
                                rx="1"
                              />
                              <path fill="#000" d="M0 3h18v2H0z" />
                              <rect
                                width="7"
                                height="1"
                                x="2"
                                y="8"
                                fill="#000"
                                rx=".5"
                              />
                            </g>
                          </svg>
                        </div>
                        <div className="paymentOptions-base-tabText">
                          <span style={{ fontWeight: "700" }}>
                            Credit/Debit Card
                          </span>
                        </div>
                      </span>
                    </span>
                  </div>
                </div>
                {openAccordion === "cod" && (
                  <div className="tabBar-base-contentBlock">
                    <div>
                      <div id="recommendation">
                        <div className="tabBar-base-contentBlockHeader">
                          Recommended Payment Options
                        </div>
                        <div className="tabBar-base-contentBlock-container">
                          <div className="desktopBase-paymentRow desktopBase-paymentRow-widthAdj">
                            <div className="radioButton-baseLabel">
                              <div className="PaymentOption-baseRow PaymentOption-baseRowSpace">
                                <span style={{ fontWeight: "700" }}>
                                  Cash on Delivery (Cash/UPI)
                                </span>
                                <div className="codOption-baseIcon">
                                  <svg
                                    viewBox="0 0 64 64"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    strokeWidth="3"
                                    stroke="#000000"
                                    fill="none"
                                  >
                                    <g strokeWidth="0"></g>
                                    <g
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></g>
                                    <g>
                                      <rect
                                        x="7.18"
                                        y="16.7"
                                        width="50.86"
                                        height="29.87"
                                      ></rect>
                                      <path d="M17.22,16.55a10,10,0,0,1-10,10.05"></path>
                                      <path d="M17.51,46.57a10.05,10.05,0,0,0-10-10"></path>
                                      <path d="M48.16,16.55A10.05,10.05,0,0,0,58.21,26.6"></path>
                                      <path d="M48,46.57a10.05,10.05,0,0,1,10-10"></path>
                                      <path
                                        d="M28.47,22.3H31c2.49,0,5.23.81,5.23,4.6,0,4.11-3.48,5.68-7.18,5.26a.21.21,0,0,0-.17.36L36.74,41"
                                        strokeLinecap="round"
                                      ></path>
                                      <line
                                        x1="39.24"
                                        y1="22.3"
                                        x2="30.45"
                                        y2="22.3"
                                        strokeLinecap="round"
                                      ></line>
                                      <line
                                        x1="28.59"
                                        y1="27.03"
                                        x2="39.3"
                                        y2="27.03"
                                        strokeLinecap="round"
                                      ></line>
                                    </g>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div
                              className="codInfoText"
                              style={{ marginLeft: "14px" }}
                            >
                              For this option, there is a fee of ₹ 10. You can
                              Pay online to avoid this.
                            </div>
                            <button
                              disabled={loading || showPlacingLoader}
                              onClick={async (e) => {
                                e.preventDefault();

                                setShowPlacingLoader(true); // ✅ show overlay

                                try {
                                  await placeCODOrder(); // ✅ wait for backend
                                  navigate("/order-success"); // ✅ navigate ONLY after success
                                } catch {
                                  setShowPlacingLoader(false); // ❌ hide loader on error
                                }
                              }}
                              className="actionButton-base-actionButton codBase-actionButton"
                            >
                              Place Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {openAccordion === "stripe" && (
                  <div className="tabBar-base-contentBlock">
                    <div className="tabBar-base-contentBlock-container">
                      <span style={{ fontWeight: "700" }}>
                        CREDIT/DEBIT CARD
                      </span>
                      {clientSecret ? (
                        <StripeCheckout
                          clientSecret={clientSecret}
                          amount={amount}
                          setMessage={setMessage}
                          startCardPayment={startCardPayment}
                          onSuccess={async () => {
                            setShowPlacingLoader(true); // 🔥 SAME AS COD

                            // give webhook + DB a moment to finish
                            await new Promise((r) => setTimeout(r, 1200));

                            navigate("/order-success", {
                              state: { fromPayment: true },
                            });
                          }}
                          onError={(msg) => {
                            console.log(msg);
                            setShowPlacingLoader(false);
                          }}
                        />
                      ) : (
                        <Loader />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="paymentDesktop-base-right">
            <div className="checkoutBase-priceBlock">
              <div className="paymentDesktop-priceHeader">
                PRICE DETAILS ({totalItems} Items)
              </div>
              <div className="paymentDesktop-priceDetailBase">
                <div className="priceBreakUp-base-orderSummary">
                  <div className="priceDetail-base-row">
                    <span>Total MRP</span>
                    <span className="priceDetail-base-value">
                      ₹{displayAmount}
                    </span>
                  </div>
                  <div className="priceDetail-base-row">
                    <span>Total Items</span>
                    <span className="priceDetail-base-value">{totalItems}</span>
                  </div>
                  <div className="priceDetail-base-row">
                    <span>Delivery Charge</span>
                    <span className="priceDetail-base-value tint">FREE</span>
                  </div>
                  <div className="priceDetail-base-total">
                    <span>Amount Payable</span>
                    <span className="priceDetail-base-value">
                      ₹{displayAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
