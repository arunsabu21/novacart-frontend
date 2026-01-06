import React from "react";


export default function MobileWishlist({
  wishlist,
  removeFromWishlist,
  addToCart,
}) {
  return (
    <div style={{ paddingTop: "66px" }}>
      {/* Empty wishlist */}
      {wishlist.length === 0 && (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p>Your wishlist is empty</p>
        </div>
      )}

      {/* Wishlist list */}
      <ul className="mobile-wishlistProducts">
        {wishlist.map((item) => (
          <li key={item.id} className="item">
            <div className="mobile-wishlistProduct">
              <div className="ripple-container">
                <div className="LazyLoad is-visible">
                  <img
                    src={item?.book?.image}
                    alt={item?.book?.title}
                    className="img-responsive"
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      background: "#fff2df",
                    }}
                  />
                </div>

                {/* remove button */}
                <div
                  className="remove-button-container"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <div className="remove-button">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <g fill="none">
                        <path d="M0 0h24v24H0z" opacity="0.05"></path>
                        <path
                          fill="#282C3F"
                          d="M12.967 12L19.3 5.666a.685.685 0 000-.967.686.686 0 00-.967 0L12 11.033 5.666 4.7a.686.686 0 00-.967 0 .685.685 0 000 .967L11.033 12 4.7 18.334a.685.685 0 000 .967.686.686 0 00.967 0L12 12.967l6.334 6.334a.686.686 0 00.967 0 .685.685 0 000-.967L12.967 12z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* title + price */}
                <div className="price-wrap content-wrap text-sm">
                  <h4 className="heading text-sm">
                    {item?.book?.title}
                  </h4>

                  <div className="price-container">
                    <span className="price">₹{item?.book?.price}</span>
                  </div>
                </div>
              </div>

              {/* move to cart */}
              <div className="ripple-container">
                <div
                  className="action-button move-to-bag"
                  onClick={() => addToCart(item?.book?.id)}
                >
                  MOVE TO BAG
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
