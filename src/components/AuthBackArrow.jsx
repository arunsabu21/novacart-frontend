import { useNavigate } from "react-router-dom";

function AuthBackArrow() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: "fixed",
        top: "14px",
        left: "14px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        zIndex: 9999,
      }}
      aria-label="Go back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="20" y1="12" x2="6" y2="12" />

        <polyline points="12 18 6 12 12 6" />
      </svg>
    </button>
  );
}

export default AuthBackArrow;
