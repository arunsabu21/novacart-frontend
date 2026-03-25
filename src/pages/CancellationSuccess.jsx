import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCancelItem from "../hooks/useOrderItemDetails";
import SideBar from "../components/SidebarSidebar";
import Loader from "../components/Loader";
import "../styles/desktop/Cancellation.css";
import checkIcon from "../assets/icons/check.png";
import refundIcon from "../assets/icons/deadline.png";

export default function CancellationSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("orderId");
  const itemId = searchParams.get("itemId");

  const { item, loading } = useCancelItem(orderId, itemId);

  if (loading) return <Loader />;
  return (
    <div className="mobile-mobile" style={{ marginTop: "-2px" }}>
      <div className="application-base full-height">
        <div className="page-page">
          <SideBar />
          <div className="pageMainComponent page-pageStyle">
            <div>
              <div className="cancel-success-outer">
                <div className="cancel-success-successBlock">
                  {item?.payment_method === "Cash on Delivery" ? (
                    <img
                      src={checkIcon}
                      alt="success"
                      className="cancel-success-icon"
                    />
                  ) : (
                    <img
                      src={refundIcon}
                      alt="refund"
                      className="cancel-success-icon"
                    />
                  )}
                  <p className="cancel-success-text">
                    {item?.payment_method === "Cash on Delivery"
                      ? "Order Cancelled"
                      : "Refund Requested"}
                  </p>
                </div>
                <div className="cancelledItemsShow">
                  <p className="cancelledItemsText">1 Item Cancelled</p>
                  <div style={{ marginTop: "12px" }}>
                    <div className="cancel-item-list">
                      <div role="link" tabIndex="0">
                        <div className="orderItemList-imageDetails">
                          <div
                            className="orderItem-thumbnail"
                            role="link"
                            tabIndex="0"
                          >
                            <div
                              style={{
                                background: "rgb(229, 241, 255)",
                                height: "44px",
                                width: "33.5px",
                                borderRadius: "2px",
                              }}
                            >
                              <div
                                className="lazyLoad"
                                style={{ height: "44px", width: "33.5px" }}
                              >
                                <img
                                  src={item?.product_image}
                                  alt="cancel item"
                                  className="image-imgResponsiveNew"
                                  style={{ width: "100%" }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="orderItem-details">
                            <div className="orderItem-bold">
                              <span className="Text-Text">
                                {item?.product_title}
                              </span>
                            </div>
                            <div className="orderItem-normal">
                              <span className="Text-Text">
                                {item?.product_subtitle}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cancelInfoBlock">
                  <div className="cancelInfoBlock-block">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      color="#03A685"
                      className="cancelInfoBlock-icon"
                    >
                      <path
                        d="M16.78 9.7a.75.75 0 00-1.06-1.06l-5.14 5.13-2.3-2.3a.75.75 0 10-1.06 1.06l2.83 2.83a.75.75 0 001.06 0l5.67-5.66z"
                        fill="#03A685"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.476 2 2 6.476 2 12s4.476 10 10 10 10-4.476 10-10S17.524 2 12 2zM3.5 12c0-4.696 3.804-8.5 8.5-8.5s8.5 3.804 8.5 8.5-3.804 8.5-8.5 8.5A8.498 8.498 0 013.5 12z"
                        fill="#03A685"
                      ></path>
                    </svg>
                    <div className="cancelInfoBlock-right">
                      <div className="refundDetails">REFUND DETAILS</div>
                      <p className="infoInfo">
                        {item?.payment_method === "Cash on Delivery"
                          ? "A refund is not applicable on this order as it is a Pay on delivery order"
                          : "Refund will be credited to your original payment method within 5-7 business days"}
                      </p>
                    </div>
                  </div>
                  <div className="cancelInfoBlock-block">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      color="#03A685"
                      className="cancelInfoBlock-icon"
                    >
                      <path
                        d="M16.78 9.7a.75.75 0 00-1.06-1.06l-5.14 5.13-2.3-2.3a.75.75 0 10-1.06 1.06l2.83 2.83a.75.75 0 001.06 0l5.67-5.66z"
                        fill="#03A685"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.476 2 2 6.476 2 12s4.476 10 10 10 10-4.476 10-10S17.524 2 12 2zM3.5 12c0-4.696 3.804-8.5 8.5-8.5s8.5 3.804 8.5 8.5-3.804 8.5-8.5 8.5A8.498 8.498 0 013.5 12z"
                        fill="#03A685"
                      ></path>
                    </svg>
                    <div className="cancelInfoBlock-right">
                      <div className="refundDetails">PLEASE NOTE</div>
                      <p className="infoInfo">
                        You will receive an email/sms confirming the
                        cancellation of order shortly.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="cancel-success-bottom">
                  <button onClick={() => navigate("/my/orders")} className="cancel-success-bottom-done">DONE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
