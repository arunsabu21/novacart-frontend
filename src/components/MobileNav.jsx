import { useNavigate, useLocation } from "react-router-dom";

export default function MobileNav({ count = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();

  const titles = {
    "/products": "Products",
    "/wishlist": "Wishlist",
    "/cart": "Shopping Bag",
    "/profile": "Profile",
  };

  const pageTitle = titles[location.pathname] || "NovaCart";

  const showCount =
    location.pathname === "/wishlist" || location.pathname === "/cart";

  return (
    <div className="mobile-nav-container">
      <div className="mobile-nav-back">
        <div onClick={() => navigate(-1)}>
          <svg className="header-icon menu-icon" viewBox="0 0 24 24">
            <path
              fill="#3E4152"
              fillRule="evenodd"
              d="M20.25 11.25H5.555l6.977-6.976a.748.748 0 000-1.056.749.749 0 00-1.056 0L3.262 11.43A.745.745 0 003 12a.745.745 0 00.262.57l8.214 8.212a.75.75 0 001.056 0 .748.748 0 000-1.056L5.555 12.75H20.25a.75.75 0 000-1.5"
            ></path>
          </svg>
        </div>
      </div>

      <div className="mobile-nav-back header-title" style={{ top: "11px" }}>
        <h1 className="header-heading text-ellipse">{pageTitle}</h1>
        <br />
        {showCount && (
          <span className="header-sub-heading text-ellipse">{count} items</span>
        )}
      </div>
      <div className="header-actions pull-right">
        {location.pathname !== "/wishlist" && (
        <div className="header-icon" style={{ display: "inline-block" }} onClick={() => navigate("/wishlist")}>
          <svg viewBox="0 0 24 24">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g fill="#3E4152">
                <path
                  d="M8.1703,4.473425 C6.9537,4.473425 5.8134,
              4.946625 4.95975,5.805525 C4.10435,6.666175 3.63325,
              7.815575 3.63325,9.042675 C3.63325,10.269775 4.10435,11.419525 4.95975,
              12.280175 L12,19.362425 L19.0406,12.279825 C19.89565,11.419525 20.36675,10.270125 20.36675,9.042675 C20.36675,7.815575 19.89565,6.665825 19.0406,5.805875 C19.0406,5.805875 19.0406,5.805525 19.04025,5.805525 C18.1866,4.946625 17.0463,4.473425 15.8297,4.473425 C14.6138,4.473425 13.4742,4.946275 12.62055,5.804475 C12.29225,6.134525 11.70845,6.134875 11.3798,5.804475 C10.5258,4.946275 9.3862,4.473425 8.1703,4.473425 L8.1703,4.473425 Z M12.02835,21.276575 L11.972,21.276575 C11.6304,21.276575 11.2965,21.137625 11.05605,20.895075 L3.71865,13.513925 C2.53495,12.323225 1.88325,10.735275 1.88325,9.042675 C1.88325,7.350075 2.53495,5.762475 3.71865,4.571775 C4.9034,3.379675 6.48435,2.723425 8.1703,2.723425 C9.5759,2.723425 10.90905,3.179825 12,4.022625 C13.0913,3.179825 14.4241,2.723425 15.8297,2.723425 C17.516,2.723425 19.09695,3.379675 20.2817,4.572125 C21.46505,5.762475 22.11675,7.350075 22.11675,9.042675 C22.11675,10.735625 21.46505,12.323225 20.2817,13.513925 L12.94325,20.895775 C12.6993,21.141475 12.3745,21.276575 12.02835,21.276575 L12.02835,21.276575 Z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        )}
        <a href="/cart" className="header-icon">
          <svg viewBox="0 0 24 24">
            <path
              fill="#3E4152"
              fillRule="evenodd"
              d="M4.012 20.718L5.246 7.314H7.27v1.763a.733.733 0 101.466 0V7.314h6.528v1.763a.733.733 0 001.466 0V7.314h2.024l1.234 13.404H4.012zM12 3.282c1.56 0 2.865 1.1 3.187 2.565H8.813A3.268 3.268 0 0112 3.282zm8.15 3.228a.733.733 0 00-.73-.663h-2.747A4.734 4.734 0 0012 1.816a4.734 4.734 0 00-4.673 4.03H4.58a.733.733 0 00-.73.664L2.475 21.38a.734.734 0 00.73.804h17.59a.733.733 0 00.73-.803L20.15 6.51z"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
