import "../styles/mobile/MobileCartV2.css";

export default function RemoveItemModal({
  open,
  item,
  onRemove,
  onMove,
  onCancel,
}) {
  if (!open || !item) return null;

  return (
    <div role="dialog" className="modal-base-container">
      <div className="modal-mobileModal bulkAction-confirmMobileModal removeItemModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 16 16"
          className="removeItem-cancelIcon"
          onClick={onCancel}
        >
          <path
            fill="#000"
            fillRule="evenodd"
            d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z"
          ></path>
        </svg>
        <div className="removeItemContent">
          {/* IMAGE */}
          <div className="removeItemImage">
            <div
              style={{
                background: "rgb(244, 255, 249)",
                height: "64px",
                width: "48px",
              }}
            >
              <img
                src={item.product_image}
                alt={item.product_title}
                className="image-base-imgResponsive"
                style={{ width: "48px", height: "64px" }}
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="removeItem-textContainer">
            <div className="removeItem-title">Remove item from bag?</div>
            <div className="removeItem-subtitle">
              Are you sure you want to move this item from bag?
            </div>
          </div>

          {/* ACTIONS */}
          <div className="bulk-baseActions">
            <div className="bulk-baseAction">
              <button className="bulkAction-ActionButton" onClick={onRemove}>
                REMOVE
              </button>
            </div>

            <div className="bulk-baseAction">
              <button
                className="bulkAction-ActionButton bulkTint"
                onClick={onMove}
              >
                MOVE TO WISHLIST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
