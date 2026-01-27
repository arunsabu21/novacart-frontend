import "../styles/mobile/MobileCartV2.css";
export default function ConfirmationModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Remove",
  cancelText = "Move to wishlist",
}) {
  if (!open) return null;

  return (
    <div role="dialog" className="modal-base-container">
      <div className="bulkAction-confirmMobileModal modal-mobileModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 16 16"
          className="modal-base-cancelIcon"
          onClick={onCancel}
        >
          <path
            fill="#000"
            fillRule="evenodd"
            d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z"
          ></path>
        </svg>
        <div>
          <div>
            <div className="bulkAction-confirmationTitle">{title}</div>
            <div className="bulkAction-confirmationMessage">{message}</div>
          </div>
          <div className="bulk-baseActions">
            <div className="bulk-baseAction bulkAction-cancelButton">
              <button onClick={onConfirm} className="bulkAction-ActionButton">
                {confirmText}
              </button>
            </div>
            <div className="bulk-baseAction bulkAction-cancelButton">
              <button
                onClick={onCancel}
                className="bulkAction-ActionButton bulkTint"
              >
                {cancelText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
