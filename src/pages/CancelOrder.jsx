import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "../api/axios";
import useCancelItem from "../hooks/useOrderItemDetails";
import SideBar from "../components/SidebarSidebar";
import Loader from "../components/Loader";
import "../styles/desktop/Cancellation.css";

export default function CancelOrder() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const itemId = searchParams.get("itemId");
  const { item, loading } = useCancelItem(orderId, itemId);
  const [reason, setReason] = useState("");
  const [warning, setWarning] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isOnline = item?.payment_method === "Online Payment";
  const navigate = useNavigate();

  const handleCancel = async (e) => {
    e.preventDefault();
    if (!reason) {
      setWarning("Please select a reason");
      return;
    }
    setSubmitting(true);

    try {
      const token = localStorage.getItem("access");
      const response = await axios.post(
        "/orders/cancel-item/",
        {
          orderId,
          itemId,
          reason,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("SUCCESS:", response.data);
      navigate(`/cancel/success?orderId=${orderId}&itemId=${itemId}`);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const reasons = [
    "Ordered by mistake",
    "Found a better price elsewhere",
    "Delivery time is too long",
    "Wrong item selected",
    "No longer needed",
  ];

  if (loading || submitting) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!item) {
    return <div>No Item Found</div>;
  }
  return (
    <div className="mobile-mobile" style={{ marginTop: "-2px" }}>
      <div className="application-base full-height">
        <div className="page-page">
          <SideBar />
          <div className="pageMainComponent page-pageStyle">
            <div className="cancellation-form-container">
              <div>
                <div className="cancel-item-card" style={{ marginTop: "0" }}>
                  <div className="cancel-itemBoxWrapper">
                    <div className="cancel-box">
                      <div
                        className="cancel-cancel-box"
                        style={{ minWidth: "100%" }}
                      >
                        <div className="cancel-item-list cancelRadius">
                          <div role="link" tabIndex="0">
                            <div className="orderItemList-imageDetails">
                              <div
                                className="orderItem-thumbnail"
                                role="link"
                                tabIndex="0"
                              >
                                <div
                                  style={{
                                    background: "rgb(255, 242, 223)",
                                    height: "85px",
                                    width: "64px",
                                    borderRadius: "2px",
                                  }}
                                >
                                  <div
                                    className="lazyLoad"
                                    style={{ height: "85px", width: "64px" }}
                                  >
                                    <img
                                      src={item?.product_image}
                                      alt={item?.product_title}
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
                                <div className="orderItem-size">
                                  <span className="Text-Text"></span>
                                </div>
                                <div className="cancelItemTop">
                                  <span className="cancelItem-price">
                                    <div>
                                      <span>₹</span>
                                      <span>{item?.price_at_purchase}</span>
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="eligible">
                    <span className="eligible-icon">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        color="#03A685"
                        className="eligible-returnIcon"
                      >
                        <path
                          fill="#03A685"
                          d="M10.78 11.28a.75.75 0 010 1.06l-1.22 1.22h3.53a2.41 2.41 0 002.41-2.41 2.4 2.4 0 00-2.4-2.4h-1.96a.75.75 0 010-1.5h1.96a3.9 3.9 0 013.9 3.9 3.91 3.91 0 01-3.91 3.91H9.56l1.22 1.22a.75.75 0 01-1.06 1.06l-2.5-2.5a.746.746 0 01-.035-1.023.748.748 0 01.038-.041L9.72 11.28a.75.75 0 011.06 0z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z"
                          fill="#03A685"
                        />
                      </svg>
                    </span>
                    <p
                      className="eligible-text"
                      style={{
                        color: "#282c3f",
                        margin: "0",
                        fontSize: "14px",
                        lineHeight: "18px",
                      }}
                    >
                      Eligible for cancellation
                    </p>
                  </div>
                </div>
                <form onSubmit={handleCancel} className="reasonForm">
                  <div className="reason-card">
                    <p
                      style={{
                        color: "#282c3f",
                        margin: "0",
                        fontSize: "18px",
                        lineHeight: "26px",
                        fontWeight: "700",
                      }}
                    >
                      Reason for cancellation
                    </p>
                    <p
                      style={{
                        color: "#282c3f",
                        margin: "0",
                        fontSize: "14px",
                        lineHeight: "20px",
                      }}
                    >
                      Please tell us correct reason for cancellation. This
                      information is only used to improve our service
                    </p>
                    <hr />
                    <p
                      style={{
                        color: "#686b77",
                        marginBottom: "12px",
                        margin: "0",
                        fontSize: "16px",
                        lineHeight: "24px",
                        fontWeight: "700",
                      }}
                    >
                      Select Reason
                    </p>
                    {reasons.map((r, index) => {
                      const isSelected = reason === r;

                      return (
                        <label
                          key={index}
                          className="cancel-radio-wrapper cancel-radio"
                        >
                          <input
                            type="radio"
                            name="reason"
                            value={r}
                            checked={isSelected}
                            onChange={(e) => {
                              setReason(e.target.value);
                              setWarning("");
                            }}
                            className="cancelOption"
                          />

                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            color
                          >
                            <circle cx="12" cy="12" r="10" fill="#FFF"></circle>
                            <path
                              d="M12.01 22c-.56 0-1.13-.05-1.7-.14-4.13-.68-7.49-4.04-8.17-8.17-.54-3.26.48-6.45 2.79-8.76 2.31-2.31 5.5-3.32 8.76-2.79 4.13.68 7.5 4.04 8.17 8.17.53 3.26-.48 6.45-2.79 8.76A9.878 9.878 0 0112.01 22zm-1.45-1.62c2.77.46 5.49-.41 7.46-2.37 1.96-1.96 2.83-4.68 2.37-7.46-.58-3.51-3.43-6.36-6.94-6.94-2.78-.45-5.5.42-7.46 2.38s-2.83 4.68-2.37 7.46c.58 3.5 3.43 6.36 6.94 6.93z"
                              fill="#282C3F"
                            ></path>
                            {isSelected && (
                              <circle
                                cx="12"
                                cy="12"
                                r="5"
                                fill="#03A685"
                              ></circle>
                            )}
                          </svg>

                          <p className="radio-label">{r}</p>
                        </label>
                      );
                    })}
                    {warning && (
                      <div className="cancel-error-container">{warning}</div>
                    )}
                    <hr />
                  </div>
                  <div className="cta-footerContainer">
                    <div className="cta-card cta-ctaWrapper">
                      <div className="cta-ctaInfoSection">
                        <div
                          className="cta-ctaHeader"
                          style={{ color: "rgb(147, 149, 158)" }}
                        >
                          Refund Details
                        </div>

                        <div className="cta-ctaText">
                          ₹ {isOnline ? item?.price_at_purchase : 0}
                        </div>
                      </div>

                      <button
                        className="cta-ctaAction cta-ctaActionWithIcon"
                        disabled={submitting}
                        type="submit"
                      >
                        <span>
                          {isOnline ? "CANCEL & REFUND" : "CANCEL ORDER"}
                        </span>
                        <span className="cta-arrow"></span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
