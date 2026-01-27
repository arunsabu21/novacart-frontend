import "../styles/mobile/MobilePayment.css";
import Loader from "../components/Loader";
import PlacingOrderLoader from "../components/PlacingOrderLoader";
import StripeCheckout from "../components/StripeCheckout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function MobilePayment({
  loading,
  startCardPayment,
  amount,
  placeCODOrder,
  clientSecret,
  setMessage,
}) {
  const navigate = useNavigate();
  const [openAccordion, setOpenAccordion] = useState(null);
  const [showPlacingLoader, setShowPlacingLoader] = useState(false);
  return (
    <>
      {showPlacingLoader && <PlacingOrderLoader show={showPlacingLoader} />}
      <div className="layout">
        <div id="mobilePayment">
          <div className="paymentMobile-baseContainer">
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
            <div className="paymentMobile-baseLayout">
              <div>
                <div>
                  <div id="recommendation">
                    <div className="paymentMobile-recommendationTitle">
                      Recommended Payment Options
                    </div>
                    <div className="recommendationMain-container">
                      <div className="paymentSubOption-baseRow">
                        <div
                          className="paymentBase-radioButton paymentBase-radioContainer radioButton-base-selected"
                          id="rec_cod"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            className="radioButton-base-radioIcon paymentBase-baseIcon"
                          >
                            <g fillRule="evenodd">
                              <path d="M8 14.933A6.941 6.941 0 0 1 1.067 8 6.941 6.941 0 0 1 8 1.067 6.941 6.941 0 0 1 14.933 8 6.941 6.941 0 0 1 8 14.933M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8"></path>
                              <path d="M8 3.429a4.571 4.571 0 1 0 0 9.143 4.571 4.571 0 0 0 0-9.143"></path>
                            </g>
                          </svg>
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
                        </div>
                        <div className="codInfoText">
                          You can pay via Cash/UPI on delivery.
                        </div>
                        <button
                          className="actionButton-base-actionButton codBase-actionButton codBase-actionButtonInline"
                          disabled={loading || showPlacingLoader}
                          onClick={async (e) => {
                            e.preventDefault();

                            setShowPlacingLoader(true); // ✅ show overlay

                            try {
                              await placeCODOrder(); // ✅ wait for backend
                              navigate("/order-success", {
                                state: { fromPayment: true },
                              });
                              
                            } catch {
                              setShowPlacingLoader(false); // ❌ hide loader on error
                            }
                          }}
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="paymentMobile-onlineHeading">
                  ONLINE PAYMENT OPTIONS
                </div>
                <div>
                  <div className="paymentMobile-paymentStripe">
                    <div className="paymentMobile-accordionBase-tab">
                      <div
                        className="paymentMobile-baseTab"
                        id="card"
                        onClick={() => {
                          setOpenAccordion((prev) =>
                            prev === "CARD" ? null : "CARD",
                          );

                          // 🔥 create payment intent ONLY ONCE
                          if (!clientSecret && !loading) {
                            startCardPayment();
                          }
                        }}
                      >
                        <div>
                          <span className="paymentMobile-baseTabContainer">
                            <div className="paymentMobile-base-cardPayment">
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

                            <p className="paymentMobile-tabText">
                              <span style={{ fontWeight: "700" }}>
                                Credit/Debit Card
                              </span>
                              <span className="stripeText">(Stripe)</span>
                            </p>
                          </span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="7"
                            height="12"
                            viewBox="0 0 7 12"
                            className="accordionIcon"
                            style={{
                              transform:
                                openAccordion === "CARD"
                                  ? "rotate(90deg)"
                                  : "rotate(0deg)",
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.797 5.529a.824.824 0 0 0-.042-.036
                 L1.19.193a.724.724 0 0 0-.986 0
                 .643.643 0 0 0 0 .94L5.316 6
                 .203 10.868a.643.643 0 0 0 0
                 .938.724.724 0 0 0 .986 0
                 l5.566-5.299a.644.644 0 0 0
                 .041-.978"
                            />
                          </svg>
                        </div>
                      </div>
                      {/* 🔥 STRIPE CONTENT */}
                      {openAccordion === "CARD" && (
                        <div className="stripeAccordion-baseContent">
                          {clientSecret ? (
                            <StripeCheckout
                              key={clientSecret}
                              clientSecret={clientSecret}
                              amount={amount}
                              setMessage={setMessage}
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
                      )}
                    </div>
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
