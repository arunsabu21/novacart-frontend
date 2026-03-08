import "../styles/mobile/MobileProducts.css";
function SortMobilePopup({ setShowSort, setSortBy }) {
  return (
    <div className="Sort">
      <div className="sort-popup">
        <div className="overlay active" onClick={() => setShowSort(false)}>
          <div className="drawer bottom active" onClick={(e) => e.stopPropagation()}>
            <div className="popup-content bottom">
              <ul className="list">
                <li className="sortBy">Sort By</li>
                <span>
                  <li>
                    <div className="ripple-container">
                      <button onClick={() => {
                        setSortBy("-price");
                        setShowSort(false);
                      }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="SortModalIcon"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path d="M0 0h24v24H0z" opacity="0.05"></path>
                            <path
                              d="M4 6.215h4.962v2.43H4.505L4.13 9.858h4.764a3.05 3.05 0 01-.827 1.539 2.99 2.99 0 01-2.022.895l-1.361-.003a.304.304 0 00-.214.519l6.717 6.779 1.697-.004-6.107-6.16a4.193 4.193 0 002.14-1.167 4.256 4.256 0 001.198-2.398h2.474l.376-1.215h-2.799v-2.43h3.496V5H4v1.215zm12.389 10.028h1.337l-1.337 1.354v-1.354zm-.818 3.309c.23.09.488.04.663-.127l3.312-3.326a.567.567 0 000-.828.627.627 0 00-.574-.152H16.39v-5.043a.571.571 0 00-.58-.585.587.587 0 00-.587.597v8.935c0 .237.12.439.35.529z"
                              fill="#282C3F"
                            ></path>
                          </g>
                        </svg>
                        <span className="sortValues">Price: High to Low</span>
                      </button>
                      <div className="ripple"></div>
                    </div>
                  </li>
                  <li>
                    <div className="ripple-container">
                      <button onClick={() => {
                        setSortBy("price");
                        setShowSort(false);
                      }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="SortModalIcon"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path d="M0 0h24v24H0z" opacity="0.05"></path>
                            <path
                              d="M4 6.136h4.637v2.272H4.472l-.351 1.135h4.45a2.855 2.855 0 01-.772 1.44c-.51.514-1.177.81-1.888.836H5.91l-1.272-.002c-.25-.001-.377.305-.2.484l6.276 6.338 1.586-.002-5.706-5.76a3.92 3.92 0 002-1.092 3.984 3.984 0 001.119-2.242h2.311l.352-1.135H9.76V6.136h3.267V5H4v1.136zm12.626.733l1.249 1.265h-1.25V6.869zm-1.09-1.333v8.35c0 .3.232.557.548.557a.534.534 0 00.542-.547V9.184h2.414a.586.586 0 00.537-.143.53.53 0 00-.001-.773L16.48 5.161a.585.585 0 00-.62-.12.508.508 0 00-.326.495z"
                              fill="#282C3F"
                            ></path>
                          </g>
                        </svg>
                        <span className="sortValues">Price: Low to High</span>
                      </button>
                      <div className="ripple"></div>
                    </div>
                  </li>
                </span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortMobilePopup;
