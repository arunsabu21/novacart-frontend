import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function AutoSuggest() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false); 
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `/products/search/suggestions/?q=${encodeURIComponent(query)}`,
        );

        setResults(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecent(data);
  }, []);

  const saveRecent = (item) => {
    const prev = JSON.parse(localStorage.getItem("recentSearches")) || [];

    const filtered = prev.filter((i) => i.name !== item.name);
    const updated = [
      {
        name: item.name,
        type: item.type,
        image: item.image || "",
        slug: item.slug || "",
      },
      ...filtered,
    ].slice(0, 6);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setRecent(updated);
  };

  return (
    <div className="layout">
      <div className="mobile-nav-container">
        <div className="mobile-nav-back" onClick={() => navigate(-1)}>
          <svg className="header-icon menu-icon" viewBox="0 0 24 24">
            <path
              fill="#3E4152"
              fillRule="evenodd"
              d="M20.25 11.25H5.555l6.977-6.976a.748.748 0 000-1.056.749.749 0 00-1.056 0L3.262 11.43A.745.745 0 003 12a.745.745 0 00.262.57l8.214 8.212a.75.75 0 001.056 0 .748.748 0 000-1.056L5.555 12.75H20.25a.75.75 0 000-1.5"
            />
          </svg>
        </div>
      </div>

      <div style={{ paddingTop: "56px" }}>
        <div id="reactPage">
          <div className="searchPage-mobile">
            <div className="searchPage-content">
              <div className="search-box">
                <div className="search-wrap">
                  <input
                    type="text"
                    className="search-control search-box-input"
                    placeholder="Search for brands & products"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                  <div className="ripple-container query-search-button query-action">
                    <span>
                      <svg
                        className="searchIcon"
                        stroke="#20bd99"
                        strokeWidth="1px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#20bd99"
                          fillRule="evenodd"
                          d="M3.438 9.754a6.415 6.415 0 016.408-6.409 6.415 6.415 0 016.409 6.409 6.416 6.416 0 01-6.409 6.408 6.416 6.416 0 01-6.408-6.408M21.816 20.87l-5.974-6.02a7.839 7.839 0 001.88-5.097c0-4.343-3.534-7.875-7.876-7.875-4.342 0-7.875 3.532-7.875 7.875 0 4.342 3.533 7.875 7.875 7.875a7.837 7.837 0 004.946-1.753l5.983 6.029a.73.73 0 001.037.004.733.733 0 00.004-1.038"
                        ></path>
                      </svg>
                    </span>
                    <div className="ripple"></div>
                  </div>
                </div>

                <div className="searchPage-results-content">
                  {!query.trim() && recent.length > 0 && (
                    <div className="recent-searches-ctn">
                      <div className="recent-header header">
                        RECENT SEARCHES
                      </div>

                      <div className="recent-scroller">
                        {recent.map((item, i) => (
                          <div
                            key={i}
                            className="recent-search-item"
                            onClick={() => {
                              if (item.type === "category") {
                                navigate(`/products?category=${item.slug}`);
                              } else {
                                navigate(
                                  `/products?brand=${encodeURIComponent(item.name)}`,
                                );
                              }
                            }}
                          >
                            <figure>
                              <div
                                className="lazyLoad"
                                style={{
                                  height: "64px",
                                  width: "100%",
                                  background: "rgb(229, 241, 255)",
                                }}
                              >
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt="recent"
                                    className="img-responsive"
                                    style={{ width: "100%" }}
                                  />
                                ) : null}
                              </div>
                            </figure>

                            <div className="name">{item.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {loading && (
                    <div style={{ padding: "10px", textAlign: "center" }}>
                      Loading...
                    </div>
                  )}

                  
                  {!loading &&
                    results.map((item) => (
                      <div
                        key={`${item.type}-${item.name}`}
                        className="search-results clearfix"
                        onClick={() => {
                          saveRecent(item);
                          if (item.type === "category") {
                            navigate(`/products?category=${item.slug}`);
                          } else {
                            navigate(
                              `/products?brand=${encodeURIComponent(item.name)}`,
                            );
                          }
                        }}
                      >
                        <div className="search-result-name-ctn">
                          <span className="result-name left-left">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="#b4b6bb"
                              className="small-searchIcon"
                            >
                              <g fill="none" fillRule="evenodd">
                                <path
                                  fill="#b4b6bb"
                                  d="M3.438 9.754a6.415 6.415 0 016.408-6.409 6.415 6.415 0 016.409 6.409 6.416 6.416 0 01-6.409 6.408 6.416 6.416 0 01-6.408-6.408M21.816 20.87l-5.974-6.02a7.839 7.839 0 001.88-5.097c0-4.343-3.534-7.875-7.876-7.875-4.342 0-7.875 3.532-7.875 7.875 0 4.342 3.533 7.875 7.875 7.875a7.837 7.837 0 004.946-1.753l5.983 6.029a.73.73 0 001.037.004.733.733 0 00.004-1.038"
                                ></path>
                                <path d="M0 0h24v24H0z" opacity="0.05"></path>
                              </g>
                            </svg>
                            <span>
                              <b>{item.name}</b>
                            </span>
                          </span>
                          <span className="result-count left-left">
                            {item.count}
                          </span>
                        </div>
                        <span className="search-result-copy">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="#b4b6bb"
                            className="back-button"
                          >
                            <path
                              fill="#b4b6bb"
                              fillRule="evenodd"
                              d="M20.25 11.25H5.555l6.977-6.976a.748.748 0 000-1.056.749.749 0 00-1.056 0L3.262 11.43A.745.745 0 003 12a.745.745 0 00.262.57l8.214 8.212a.75.75 0 001.056 0 .748.748 0 000-1.056L5.555 12.75H20.25a.75.75 0 000-1.5"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    ))}

                  {!loading && query && results.length === 0 && (
                    <div style={{ padding: "10px" }}>No Results Found!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutoSuggest;
