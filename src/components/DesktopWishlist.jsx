export default function DesktopWishlist({
  wishlist,
  removeFromWishlist,
  addToCart,
}) {
  return (
    <div className="wishlist-section">
      <div className="section-title">
        <h5>
          My Wishlist
          <span className="wishlist-count"> {wishlist.length} Items</span>
        </h5>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div key={item.id} className="wishlist-card">

            <div className="wishlist-image-container">
              <img
                draggable="false"
                className="wishlist-img"
                src={item?.book?.image}
                alt={item?.book?.title}
              />

              <button
                className="remove-btn remove-mark"
                onClick={() => removeFromWishlist(item.id)}
              />
            </div>

            <div className="card-content">
              <p className="wishlist-name">{item?.book?.title}</p>
              <p className="wishlist-price">₹{item?.book?.price}</p>

              <div className="wishlist-divider">
                <hr />

                <button
                  className="wishlist-move-btn"
                  onClick={() => addToCart(item?.book)}
                >
                  MOVE TO BAG
                </button>

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
