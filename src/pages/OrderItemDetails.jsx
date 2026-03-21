import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import useCancelItem from "../hooks/useOrderItemDetails";
import Loader from "../components/Loader";
import SideBar from "../components/SidebarSidebar";
import "../styles/desktop/ItemDetails.css";

export default function MyItemDetails() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const itemId = searchParams.get("itemId");
  const { item, loading } = useCancelItem(orderId, itemId);
  const navigate = useNavigate();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });

  const formattedDelivery = item?.estimated_delivery
    ? new Date(item.estimated_delivery).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      })
    : "";

  const placedDate = item?.created_at ? formatDate(item.created_at) : "";
  const deliveryAddress = item?.address;

  const isCancelled = item?.status === "CANCELLED";
  const isRefund = item?.status === "REFUND_REQUESTED" || item?.status === "REFUNDED";
  const isConfirmed = item?.status === "CONFIRMED";

  if (loading) return <Loader />;
  if (!item) return <div>No Item found</div>;
  return (
    <div style={{ marginTop: "-2px" }}>
      <div className="application-base full-height">
        <div className="page-page">
          <SideBar />
          <div className="pageMainComponent">
            <div className="perItemDetails-view">
              <div className="perItemDetails-wrapper">
                <div className="perItemDetails-itemInfoPerItem">
                  <div role="presentation" className="perItemDetails-thumbnail">
                    <div
                      style={{
                        background: "rgb(255 248 225)",
                        height: "149px",
                        width: "111px",
                        borderRadius: "2px",
                      }}
                    >
                      <div
                        className="lazyLoad"
                        style={{ height: "149px", width: "111px" }}
                      >
                        <img
                          src={item.product_image}
                          alt={item.product_title}
                          className="image-imgResponsiveNew"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="itemPerProduct-title">
                    <p className="text-classic">{item.product_title}</p>
                  </div>
                  <div className="itemPerProduct-subtitle">
                    <p className="text-classic">{item.product_subtitle}</p>
                  </div>
                  <div className="itemPerProduct-sizeQ">
                    <p className="text-classic"></p>
                  </div>
                </div>
                {isCancelled ? (
                  <div className="ItemPer-statusBlock">
                    <div className="statusBlock-cardWrapper">
                      <div className="statusBlock-cardContainer">
                        <div className="statusBlock-cardIcon-container">
                          <div className="statusBlock-cardIconBG">
                            <span
                              className="svgImages-svg svgImages-cross"
                              style={{ width: "18px", height: "18px" }}
                            ></span>
                          </div>
                        </div>
                        <div className="statusBlock-TextContainer">
                          <div className="statusBlock-Text">Cancelled</div>
                          <div className="statusBlock-TextSub">
                            {" "}
                            as per your request
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : isRefund ? (
                  <div className="ItemPer-statusBlock">
                    <div className="statusBlock-cardWrapper">
                      <div className="statusBlock-cardContainer">
                        <div className="statusBlock-cardIcon-container">
                          <div className="statusBlock-cardIconBG" style={{backgroundColor: "#E6F9F2"}}>
                            <span
                              className="svgImages-svg svgImages-refund"
                              style={{ width: "24px", height: "24px" }}
                            ></span>
                          </div>
                        </div>
                        <div className="statusBlock-TextContainer">
                          <div className="statusBlock-Text">Refund Initiated</div>
                          <div className="statusBlock-TextSub">
                            {" "}
                            Amount will be credited soon
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="itemTracker">
                    <div className="itemTracker-trackerContainer">
                      <div className="itemTracker-inActiveState">
                        <div className="tracker-bullet">
                          <div className="trackerBullet-num"></div>
                        </div>
                        <div className="trackerText-container">
                          <div className="trackerText-inner">
                            <div className="Tracker-row">
                              <div className="trackHead">
                                <span>Arriving</span>
                              </div>
                            </div>
                            <div className="tracker-subText">
                              <span> {formattedDelivery}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="itemTracker-activeState">
                        <div className="tracker-bullet">
                          <div className="trackerBullet-num">
                            <span
                              className="icon-icon icon-tick"
                              style={{
                                fontSize: "13px",
                                fontWeight: "800",
                                color: "rgb(3, 166, 133)",
                              }}
                            >
                              &#x2713;
                            </span>
                          </div>
                        </div>
                        <div className="trackerText-container">
                          <div className="trackerText-inner">
                            <div className="Tracker-row">
                              <div className="trackHead">
                                <span>Placed</span>
                              </div>
                            </div>
                            <div>
                              <span className="trackerImp-text">
                                Order Placed
                              </span>
                              <span className="tracker-subText">
                                on {placedDate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="itemTracker-inActiveState">
                        <div className="tracker-bullet">
                          <div className="trackerBullet-num"></div>
                        </div>
                        <div className="trackerText-container">
                          <div className="trackerText-inner">
                            <div className="Tracker-row">
                              <div className="trackHead">
                                <span>Processing</span>
                              </div>
                            </div>
                            <div className="tracker-subText">
                              <span> {placedDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isConfirmed && (
                  <div className="itemPerAction-buttons">
                    <div
                      className="itemPerIcon-button"
                      role="presentation"
                      onClick={() =>
                        navigate(
                          `/cancel?orderId=${orderId}&itemId=${itemId}`,
                        )
                      }
                      style={{
                        flex: "1 1 auto",
                        borderRadius: "2px 0px 0px 2px",
                      }}
                    >
                      <div className="itemPerIcon-wrapper">
                        <div className="itemPerIcon-icon">
                          <span
                            className="svgImages-svg svgImages-cancelClose"
                            style={{ width: "24px", height: "24px" }}
                          ></span>
                        </div>
                      </div>
                      <div className="itemPerIcon-text">Cancel</div>
                    </div>
                    <div className="itemDivider"></div>
                    <div
                      className="itemPerIcon-button"
                      role="presentation"
                      style={{
                        flex: "1 1 auto",
                        borderRadius: "2px 0px 0px 2px",
                      }}
                    >
                      <div className="itemPerIcon-wrapper">
                        <div className="itemPerIcon-icon">
                          <span
                            className="svgImages-svg svgImages-track"
                            style={{ width: "24px", height: "24px" }}
                          ></span>
                        </div>
                      </div>
                      <div className="itemPerIcon-textTrack">Track</div>
                    </div>
                  </div>
                )}
                <div className="setWidth"></div>
                <div className="perItem-deliveryInfo">
                  <div className="infoPanel" style={{ paddingTop: "19px" }}>
                    <div className="infoPanel-default">
                      <span
                        className="Text-Text"
                        style={{
                          marginRight: "8px",
                          color: "rgb(40, 44, 63)",
                          fontWeight: "700",
                          fontSize: "18px",
                        }}
                      >
                        Delivery Address
                      </span>
                    </div>
                    <div className="infoPanel-default"></div>
                    <div className="infoPanel-default">
                      <div>
                        <div className="Address-deliveryInfo">
                          <div className="Address-nameNumber">
                            <p className="text-classic">
                              {deliveryAddress?.name}
                            </p>
                            <div className="Address-verticalDivider"></div>
                            <p className="text-classic">
                              {deliveryAddress?.mobile}
                            </p>
                          </div>
                          <p className="Address-addressStyle text-classic">
                            {deliveryAddress?.house_number},{" "}
                            {deliveryAddress?.address}, {deliveryAddress?.town},{" "}
                            {deliveryAddress?.district} -{" "}
                            {deliveryAddress?.pincode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="setWidth">
                  <div className="PriceDetails-price">
                    <div className="PriceDetails-itemPrice">
                      <p>Total Order Price</p>
                      <div>
                        <p>₹ {item.price_at_purchase}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ background: "white", padding: "0px 4.44% 16px" }}
                  >
                    <div className="paidType-container">
                      <div className="paidType-wrapper">
                        <span
                          className="svgImages-svg svgImages-cod"
                          style={{ height: "28px", width: "28px" }}
                        ></span>
                        <p
                          style={{
                            margin: "0",
                            color: "#282c3f",
                            marginLeft: "10px",
                          }}
                        >
                          {" "}
                          {item.payment_method}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="infoPanel" style={{ paddingTop: "19px" }}>
                    <div className="infoPanel-default">
                      <span
                        className="Text-Text"
                        style={{
                          marginRight: "8px",
                          color: "rgb(40, 44, 63)",
                          fontWeight: "700",
                          fontSize: "18px",
                        }}
                      >
                        Updates sent to
                      </span>
                    </div>
                    <div className="infoPanel-default"></div>
                    <div className="infoPanel-default">
                      <div className="updates-user">
                        <div className="updates-user-mobile">
                          <span
                            className="svgImages-svg svgImages-phone"
                            style={{ width: "18px", height: "18px" }}
                          ></span>
                          <span
                            className="Text-Text"
                            style={{
                              marginLeft: "7px",
                              color: "rgb(105, 110, 121)",
                            }}
                          >
                            {deliveryAddress.mobile}
                          </span>
                        </div>
                        <div className="updates-user-email">
                          <span
                            className="svgImages-svg svgImages-email"
                            style={{ width: "18px", height: "18px" }}
                          ></span>
                          <span
                            className="Text-Text"
                            style={{
                              marginLeft: "7px",
                              paddingBottom: "4px",
                              color: "rgb(105, 110, 121)",
                            }}
                          >
                            {item.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span
                    className="Text-Text"
                    style={{
                      display: "block",
                      width: "100%",
                      fontSize: "14px",
                      backgroundColor: "white",
                      marginTop: "12px",
                      padding: "19px 4.44%",
                      color: "rgb(105, 110, 121)",
                    }}
                  >
                    Order ID # {item.id}
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
