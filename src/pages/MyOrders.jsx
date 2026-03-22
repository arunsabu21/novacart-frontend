import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import SideBar from "../components/SidebarSidebar";
import Loader from "../components/Loader";
import "../styles/desktop/Orders.css";

const ORDER_STATUS_CONFIG = {
  CONFIRMED: {
    color: "rgb(31, 132, 90)",
    bg: "rgb(31, 132, 90)",
    message: (order) =>
      `Arriving by ${new Date(order.estimated_delivery).toLocaleDateString(
        "en-US",
        {
          weekday: "short",
          day: "numeric",
          month: "short",
        },
      )}`,
    actions: ["Cancel", "Track"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
      >
        <path
          fill="#FFFFFF"
          fillRule="nonzero"
          d="M19.173 7.059l-7.232-4a.469.469 0 0 0-.454 0l-7.232 4A.503.503 0 0 0 4 7.5v9c0 .185.098.355.255.441l7.232 4a.469.469 0 0 0 .454 0l7.232-4a.503.503 0 0 0 .256-.441v-9a.503.503 0 0 0-.256-.441zm-7.459-2.992L17.922 7.5 15.33 8.933 9.123 5.5l2.591-1.433zm-.482 15.6L4.964 16.2V8.334l6.268 3.466v7.866zm.482-8.734L5.507 7.5l2.591-1.433L14.305 9.5l-2.59 1.433zm6.75 5.267l-6.268 3.466V11.8l6.268-3.466V16.2z"
        ></path>
      </svg>
    ),
  },

  CANCELLED: {
    color: "rgb(40, 44, 63)",
    bg: "rgb(212, 213, 217)",
    message: (order, item) =>
      `on ${new Date(item.cancelled_at).toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })} as per your request`,
    actions: [],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#282C3F"
          fillRule="nonzero"
          d="M15.854 8.146a.495.495 0 0 0-.703 0L12 11.296l-3.15-3.15a.495.495 0 0 0-.704 0 .495.495 0 0 0 0 .703L11.297 12l-3.15 3.15a.5.5 0 1 0 .35.85.485.485 0 0 0 .349-.146l3.15-3.15 3.151 3.15a.5.5 0 0 0 .35.147.479.479 0 0 0 .35-.147.495.495 0 0 0 0-.703L12.702 12l3.15-3.15a.495.495 0 0 0 0-.704z"
        ></path>
      </svg>
    ),
  },

  REFUND_REQUESTED: {
    color: "rgb(40, 44, 63)",
    bg: "rgb(212, 213, 217)",
    message: () => "Refund will be credited within 5-7 business days",
    actions: [],
  },

  REFUNDED: {
    color: "rgb(40, 44, 63)",
    bg: "rgb(212, 213, 217)",
    message: (order, item) => {
      const amount = item.price_at_purchase * item.quantity;

      return (
        <>
          Refund of{" "}
          <span style={{ color: "rgb(31, 132, 90)", fontWeight: "600" }}>
            ₹{amount}
          </span>{" "}
          completed successfully
        </>
      );
    },
    actions: [],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#282C3F"
          fillRule="nonzero"
          d="M15.854 8.146a.495.495 0 0 0-.703 0L12 11.296l-3.15-3.15a.495.495 0 0 0-.704 0 .495.495 0 0 0 0 .703L11.297 12l-3.15 3.15a.5.5 0 1 0 .35.85.485.485 0 0 0 .349-.146l3.15-3.15 3.151 3.15a.5.5 0 0 0 .35.147.479.479 0 0 0 .35-.147.495.495 0 0 0 0-.703L12.702 12l3.15-3.15a.495.495 0 0 0 0-.704z"
        ></path>
      </svg>
    ),
  },

  PENDING: {
    color: "rgb(40, 44, 63)",
    bg: "rgb(212, 213, 217)",
    message: () => "Cancelled as per your request",
    actions: [],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#282C3F"
          fillRule="nonzero"
          d="M15.854 8.146a.495.495 0 0 0-.703 0L12 11.296l-3.15-3.15a.495.495 0 0 0-.704 0 .495.495 0 0 0 0 .703L11.297 12l-3.15 3.15a.5.5 0 1 0 .35.85.485.485 0 0 0 .349-.146l3.15-3.15 3.151 3.15a.5.5 0 0 0 .35.147.479.479 0 0 0 .35-.147.495.495 0 0 0 0-.703L12.702 12l3.15-3.15a.495.495 0 0 0 0-.704z"
        ></path>
      </svg>
    ),
  },
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const navigate = useNavigate();

  const start = totalOrders ? (page - 1) * 5 + 1 : 0;
  const end = totalOrders ? Math.min(page * 5, totalOrders) : 0;

  const changePage = async (url) => {
    if (!url) return;

    const pageNumber = new URL(url).searchParams.get("page");

    setSearchParams({
      ...(search && { search }),
      page: pageNumber,
    });

    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (err) {
      console.log(err);
    }
  };

  const STATUS_LABELS = {
    REFUND_REQUESTED: "Refund Requested",
    REFUNDED: "Cancelled",
    CANCELLED: "Cancelled",
    CONFIRMED: "Confirmed",
    PENDING: "Pending",
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchOrders = async () => {
        try {
          const token = localStorage.getItem("access");

          const response = await axios.get(
            `/orders/my/?page=${page}${search ? `&search=${search}` : ""}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          setOrders(response.data.results);
          console.log(response.data.results);
          setNextPage(response.data.next);
          setPrevPage(response.data.previous);
          setTotalOrders(response.data.count);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }, 400);

    return () => clearTimeout(delay);
  }, [search, page]);

  if (loading) return <Loader />;
  return (
    <div className="mobile-mobile" style={{ marginTop: "-2px" }}>
      <div className="application-base full-height">
        <div className="page-page">
          <SideBar />
          <div className="pageMainComponent">
            <div className="ordersBannerInfo">
              <div className="orderBannerHeader">
                <span className="orderBannerTitle">YOUR ORDERS</span>
              </div>
            </div>
            <div className="order-searchBox order-searchBoxShow ordersSearch-mobileSticky">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="searchBox-base">
                  <div className="searchBox-Label">
                    <div className="searchBox-Header">All Orders</div>
                    <div className="searchBox-Sub">from anytime</div>
                  </div>
                  <div className="search-searchContainer">
                    <button
                      type="submit"
                      className="transparent-button searchIcon-location"
                    >
                      <span
                        className="svgImages-svg svgImages-search search-searchIcon"
                        style={{
                          height: "15px",
                          width: "15px",
                          cursor: "pointer",
                        }}
                      ></span>
                    </button>
                    <input
                      id="search-orders"
                      className="search-searchBox"
                      type="search"
                      autoComplete="off"
                      placeholder="Search in orders"
                      value={search}
                      onChange={(e) =>
                        setSearchParams(
                          e.target.value ? { search: e.target.value } : {},
                        )
                      }
                    />
                  </div>
                  <div className="search-wrapper">
                    <button type="button" className="search-filterButton">
                      <div className="searchText-wrapper">
                        <span
                          className="svgImages-svg svgImages-filter"
                          style={{ height: "16px", width: "16px" }}
                        ></span>
                        <span style={{ color: "#3e4152", marginLeft: "3px" }}>
                          {" "}
                          FILTER
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="orderPage-listBackground">
              {orders.flatMap((order) => {
                return order.items?.map((item) => {
                  const currentStatus =
                    item.status || order.status;
                  const statusConfig = ORDER_STATUS_CONFIG[currentStatus] || {};

                  return (
                    <div key={item.id}>
                      <div className="orderItem-itemView">
                        <div className="orderItem-itemStatus">
                          <div className="itemStatus-itemStatus">
                            <div className="itemStatus-moreInfoContainer">
                              <div className="itemStatus-iconBg">
                                <div
                                  className="itemStatus-bgForIcon"
                                  style={{ background: statusConfig.bg }}
                                >
                                  <div className="itemStatus-iconStatus">
                                    {statusConfig.icon}
                                  </div>
                                </div>
                              </div>

                              <div className="orderItem-orderDetails">
                                <div className="orderItem-itemStatusTitle">
                                  <span
                                    className="Text-Text"
                                    style={{
                                      fontWeight: "700",
                                      color: statusConfig.color,
                                    }}
                                  >
                                    {STATUS_LABELS[currentStatus] || [
                                      currentStatus,
                                    ]}
                                  </span>
                                </div>

                                <div className="orderConfirm-status">
                                  {statusConfig.message?.(order, item)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="orderedItem-ListView">
                          <div
                            role="link"
                            tabIndex="0"
                            onClick={() =>
                              navigate(
                                `/my/item/details?orderId=${order.id}&itemId=${item.id}`,
                              )
                            }
                          >
                            <div className="orderItemList-imageDetails">
                              <div
                                className="orderItem-thumbnail"
                                role="link"
                                tabIndex="0"
                              >
                                <div
                                  style={{
                                    background: "rgb(224 242 241)",
                                    height: "70px",
                                    width: "53px",
                                    borderRadius: "2px",
                                  }}
                                >
                                  <div
                                    className="lazyLoad"
                                    style={{ height: "70px", width: "53px" }}
                                  >
                                    <img
                                      src={item.product_image}
                                      alt="img"
                                      className="image-imgResponsiveNew"
                                      style={{
                                        width: "100%",
                                        borderRadius: "2px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="orderItem-details orderItem-contentJustify">
                                <div className="orderItem-bold">
                                  <span className="Text-Text">
                                    {item.product_title}
                                  </span>
                                </div>

                                <div className="orderItem-normal">
                                  <span className="Text-Text">
                                    {item.product_subtitle}
                                  </span>
                                </div>

                                <div className="orderItem-size">
                                  <span className="Text-Text"></span>
                                </div>
                              </div>

                              <div className="orderItem-arrowIcon">
                                <span
                                  className="svgImages-svg svgImages-next"
                                  style={{ width: "15px", height: "15px" }}
                                ></span>
                              </div>
                            </div>
                          </div>

                          {currentStatus === "CONFIRMED" &&
                            statusConfig.actions?.length > 0 && (
                              <div className="orderItem-actions">
                                {statusConfig.actions.map((action) => (
                                  <div
                                    key={action}
                                    className="orderItem-button"
                                    role="presentation"
                                    onClick={() =>
                                      navigate(
                                        `/cancel?orderId=${order.id}&itemId=${item.id}`,
                                      )
                                    }
                                    style={{
                                      height: "32px",
                                      marginLeft: "4px",
                                      marginRight: "4px",
                                    }}
                                  >
                                    <p
                                      className="orderItem-buttonTextWrapper"
                                      style={{
                                        color: "#282c3f",
                                        margin: "0",
                                        fontSize: "12px",
                                        fontWeight: "700",
                                        lineHeight: "16px",
                                      }}
                                    >
                                      {action}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  );
                });
              })}
            </div>
            <div className="order-pagination">
              <span>
                Showing {start}-{end} of {totalOrders}
              </span>
              {prevPage && (
                <span
                  className="pagination-link"
                  onClick={() => changePage(prevPage)}
                >
                  &lt; Prev
                </span>
              )}

              {nextPage && (
                <span
                  className="pagination-link"
                  onClick={() => changePage(nextPage)}
                >
                  Next &gt;
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
