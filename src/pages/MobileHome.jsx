import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MobileBottomBar from "../components/MobileBottomBar";
import MobileCategorySlider from "../components/MobileCategorySlider";
import MobileBanner from "../components/MobileBanner";
import SecureBanner from "../components/SecureBanner";
import CategoryCardSlider from "../components/CategoryCardSlider";
import TwoRowSlider from "../components/MobileTwoRowSlide";
import Loader from "../components/Loader";
import axios from "../api/axios";
import couponBanner from "../assets/images/mob-coupon-banner.png";
import saleBanner from "../assets/images/sale-banner.png";
import catTitle from "../assets/images/design.png";
import offerBanner from "../assets/images/mobile-offer.png";
import exploreBanner from "../assets/images/explore.png";
import sponsorBanner01 from "../assets/images/sponser-ban01.png";
import sponsorBanner02 from "../assets/images/sponsor-ban02.png";
import sponsorBanner03 from "../assets/images/sponsor-ban03.png";

function MobileHome() {
  const location = useLocation();

  const [notify, setNotify] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const message = location.state?.message;

  // EFFECT 1: login message
  useEffect(() => {
    if (!message) return;

    setNotify(message);
    window.history.replaceState({}, document.title);

    const timer = setTimeout(() => {
      setNotify("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [message]);

  // EFFECT 2: fetch categories
  useEffect(() => {
    axios
      .get("/categories/")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log("categories error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ paddingTop: "56px" }}>
      <div id="reactPage">
        {notify && (
          <div className="login-messages">
            <div className="login-alert info">{notify}</div>
          </div>
        )}


        <div className="searchBarContainer">
          <div className="searchBar">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="searchBarIcon"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  fill="#686B77"
                  d="M3.438 9.754a6.415 6.415 0 016.408-6.409 6.415 6.415 0 016.409 6.409 6.416 6.416 0 01-6.409 6.408 6.416 6.416 0 01-6.408-6.408M21.816 20.87l-5.974-6.02a7.839 7.839 0 001.88-5.097c0-4.343-3.534-7.875-7.876-7.875-4.342 0-7.875 3.532-7.875 7.875 0 4.342 3.533 7.875 7.875 7.875a7.837 7.837 0 004.946-1.753l5.983 6.029a.73.73 0 001.037.004.733.733 0 00.004-1.038"
                ></path>
                <path d="M0 0h24v24H0z" opacity="0.05"></path>
              </g>
            </svg>
          </div>
        </div>
        <div style={{ marginTop: "53px" }}>
          <main className="desktop-main-index">
            <div className="index-base">
               <MobileCategorySlider categories={categories} />
              <div className="indexContainer">
                <div className="container-base stretch">
                  <div>
                    <div className="container-container">
                      <div className="row-base">
                        <div className="column-base" style={{ flex: "1 1 0%" }}>
                          <div className="container-base stretch">
                            <div style={{ paddingBottom: "33.37%" }}>
                              <div className="container-container container-aspectContainer">
                                <div className="row-base">
                                  <div className="column-base" style={{ flex: "1 1 0%" }}>
                                    <a href="#">
                                      <div>
                                        <img draggable="false" src={saleBanner} alt="" className="image-image image-hand" />
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="indexContainer">
                <div className="container-base stretch">
                  <div>
                    <div className="container-container">
                      <div className="row-base">
                        <div className="column-base" style={{ flex: "1 1 0%" }}>
                          <div className="container-base stretch">
                            <div style={{ paddingBottom: "13.37%" }}>
                              <div className="container-container container-aspectContainer">
                                <div className="row-base">
                                  <div className="column-base" style={{ flex: "1 1 0%" }}>
                                    <a href="#">
                                      <div>
                                        <img draggable="false" src={couponBanner} alt="" className="image-image image-hand" />
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="indexContainer">
                <div className="container-base stretch" style={{paddingBottom: "0px", paddingTop: "2px"}}>
                  <div>
                    <div className="container-container">
                      <div className="row-base">
                        <div className="column-base" style={{flex: "1 1 0%"}}>
                          <div className="container-base stretch">
                            <div>
                              <div className="container-container">
                                <div style={{ paddingBottom: "71.81%" }}>
                                  <div className="container-container container-aspectContainer">
                                    <div className="row-base">
                                      <div className="column-base" style={{ flex: "1 1 0%" }}>
                                        <a href="#">
                                          <div>
                                            <MobileBanner />
                                          </div>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="indexContainer">
                <div className="container-base stretch" style={{paddingBottom: "0px", paddingTop: "2px"}}>
                  <div>
                    <div className="container-container">
                      <div className="row-base">
                        <div className="column-base" style={{flex: "1 1 0%"}}>
                          <div className="container-base stretch">
                            <div>
                              <div className="container-container">
                                <div style={{ paddingBottom: "5.81%" }}>
                                  <div className="container-container container-aspectContainer">
                                    <div className="row-base">
                                      <div className="column-base" style={{ flex: "1 1 0%" }}>
                                        <a href="#">
                                          <div>
                                            <div style={{backgroundColor: "rgb(244, 150, 52)", justifyContent: "flex-start", height: "50px"}}></div>
                                          </div>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="indexContainer">
                <div className="container-base stretch">
                  <div>
                    <div className="container-container">
                      <div className="row-base">
                        <div className="column-base" style={{ flex: "1 1 0%" }}>
                          <div className="container-base stretch">
                            <div style={{paddingBottom: "30.37%"}}>
                              <div className="container-container container-aspectContainer">
                                <div className="row-base">
                                  <div className="column-base" style={{ flex: "1 1 0%" }}>
                                    <a href="#">
                                      <div>
                                        <img src={sponsorBanner01} alt="sponsor" className="image-image image-hand" />
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="column-base" style={{ flex: "1 1 0%" }}>
                          <div className="container-base stretch">
                            <div style={{paddingBottom: "30.37%"}}>
                              <div className="container-container container-aspectContainer">
                                <div className="row-base">
                                  <div className="column-base" style={{ flex: "1 1 0%" }}>
                                    <a href="#">
                                      <div>
                                        <img src={sponsorBanner02} alt="sponsor" className="image-image image-hand" />
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="column-base" style={{ flex: "1 1 0%" }}>
                          <div className="container-base stretch">
                            <div style={{paddingBottom: "30.37%"}}>
                              <div className="container-container container-aspectContainer">
                                <div className="row-base">
                                  <div className="column-base" style={{ flex: "1 1 0%" }}>
                                    <a href="#">
                                      <div>
                                        <img src={sponsorBanner03} alt="sponsor" className="image-image image-hand"/>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="indexContainer">
                <div className="container-base stretch">
                  <div>
                    <div className="container-container">
                      <div className="row-base">
                        <div className="column-base" style={{flex: "1 1 0%"}}>
                          <div className="container-base stretch">
                            <div>
                              <div className="container-container">
                                <div style={{ paddingBottom: "5.81%" }}>
                                  <div className="container-container container-aspectContainer">
                                    <div className="row-base">
                                      <div className="column-base" style={{ flex: "1 1 0%" }}>
                                        <a href="#">
                                          <div>
                                            <div style={{backgroundColor: "rgb(244, 150, 52)", justifyContent: "flex-start", height: "50px"}}></div>
                                          </div>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="indexContainer">
                <div className="container-base stretch">
                  <div>
                    <div className="container-container">
                      <div className="row-base">
                        <div className="column-base" style={{ flex: "1 1 0%" }}>
                          <div className="container-base stretch">
                            <div style={{ paddingBottom: "15.37%" }}>
                              <div className="container-container container-aspectContainer">
                                <div className="row-base">
                                  <div className="column-base" style={{ flex: "1 1 0%" }}>
                                    <a href="#">
                                      <div>
                                        <img draggable="false" src={catTitle} alt="" className="image-image image-hand" />
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="indexContainer">
                <div className="container-base stretch" style={{ paddingLeft: "3px", paddingRight: "3px" }}>
                  <div>
                    <div className="container-container">
                      <div className="row-base">
                        <div className="column-base" style={{ flex: "1 1 0%" }}>
                          <div className="container-base stretch">
                            <div style={{ paddingBottom: "58.33%" }}>
                              <div className="container-container container-aspectContainer">
                                <div className="row-base">
                                  <div className="column-base" style={{ flex: "1 1 0%" }}>
                                    <CategoryCardSlider categories={categories} imageKey="mobile_secondary_image"/>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="indexContainer">
                <div className="container-base stretch">
                  <div>
                    <div className="container-container">
                      <div className="row-base">
                        <div className="column-base" style={{ flex: "1 1 0%" }}>
                          <div className="container-base stretch">
                            <div style={{ paddingBottom: "15.37%" }}>
                              <div className="container-container container-aspectContainer">
                                <div className="row-base">
                                  <div className="column-base" style={{ flex: "1 1 0%" }}>
                                    <a href="#">
                                      <div>
                                        <img draggable="false" src={offerBanner} alt="" className="image-image image-hand" style={{verticalAlign: "top"}}/>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <TwoRowSlider categories={categories} imageKey="mobile_image"/>
              <div className="indexContainer">
                <div className="container-base stretch">
                  <div>
                    <div className="container-container">
                      <div className="row-base">
                        <div className="column-base" style={{ flex: "1 1 0%" }}>
                          <div className="container-base stretch">
                            <div style={{ paddingBottom: "22.37%" }}>
                              <div className="container-container container-aspectContainer">
                                <div className="row-base">
                                  <div className="column-base" style={{ flex: "1 1 0%" }}>
                                    <a href="#">
                                      <div>
                                        <img draggable="false" src={exploreBanner} alt="" className="image-image image-hand" style={{verticalAlign: "top"}}/>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <MobileBottomBar />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default MobileHome;
