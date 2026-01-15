import { useState } from "react";
import "../MobileCartV2.css";

export default function QtySelector({ quantity, stock, max = 10, onSelect }) {
  const [open, setOpen] = useState(false);
  const maxQty = Math.min(stock, max);

  return (
    <>
      <div
        className="itemComponents-base-quantity"
        onClick={() => setOpen(true)}
      >
        <span>Qty {quantity}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="3"
          viewBox="0 0 6 3"
          className="itemComponents-base-dropDown"
        >
          <path fillRule="evenodd" d="M0 0h6L3 3z" />
        </svg>
      </div>

      {open && (
        <div className="qty-overlay" onClick={() => setOpen(false)}>
          <div className="qty-modal" onClick={(e) => e.stopPropagation()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 16 16"
              className="removeItem-cancelIcon"
              onClick={() => setOpen(false)}
            >
              <path
                fill="#000"
                fillRule="evenodd"
                d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z"
              />
            </svg>

            <div className="qty-title">Select Quantity</div>

            <div className="qty-options">
              {Array.from({ length: maxQty }, (_, i) => i + 1).map((q) => (
                <button
                  key={q}
                  className={`qty-circle ${q === quantity ? "active" : ""}`}
                  onClick={() => {
                    onSelect(q);
                    setOpen(false);
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
