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
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#3E4152"
          fillRule="evenodd"
          d="M20.25 11.25H5.555l6.977-6.976a.748.748 0 000-1.056.749.749 0 00-1.056 0L3.262 11.43A.745.745 0 003 12a.745.745 0 00.262.57l8.214 8.212a.75.75 0 001.056 0 .748.748 0 000-1.056L5.555 12.75H20.25a.75.75 0 000-1.5"
        ></path>
      </svg>
    </button>
  );
}

export default AuthBackArrow;
