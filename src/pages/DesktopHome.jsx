import "../styles/desktop/App.css";
import "../styles/desktop/index.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Loader from "../components/Loader";
import axios from "../api/axios";

import DesktopBanner1 from "../assets/images/desktop-banner1.png";
import DesktopBanner2 from "../assets/images/desktop-banner2.png";
import DesktopBanner3 from "../assets/images/desktop-banner3.png";
import DesktopBanner4 from "../assets/images/desktop-banner4.gif";
import DesktopBanner5 from "../assets/images/banner-mar01.png";
import DesktopBanner6 from "../assets/images/banner-two-mar01.png";
import LoginBanner from "../assets/images/login-banner.png";

function DesktopHome() {
  const location = useLocation();
  const [notify, setNotify] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const message = location.state?.message;

  const sliderSettings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    cssEase: "ease-in-out",
  };

  useEffect(() => {
    if (!message) return;

    setNotify(message);
    window.history.replaceState({}, document.title);

    const timer = setTimeout(() => {
      setNotify("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [message]);

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

  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };
  const categorySlides = chunkArray(categories, 6);

  const secondaryCategories = categories
    ?.filter((cat) => cat.desktop_secondary_image)
    ?.slice(0, 12);

  return (
    <>
      {notify && (
        <div className="notify-container">
          <div className="notify-info notify-content">
            <div className="notify-info-message">{notify}</div>
          </div>
        </div>
      )}

      <div style={{ minHeight: "1500px", marginTop: "86px" }}>
        <main className="desktop-main-index">
          <div className="index-base">
            <div className="indexContainer">
              <div
                className="container-base stretch"
                style={{ paddingBottom: "4px", paddingTop: "0px" }}
              >
                <div>
                  <div className="container-container">
                    <div className="row-base">
                      <div className="column-base" style={{ flex: "1 1 0%" }}>
                        <div
                          className="container-base stretch"
                          style={{ paddingLeft: "50px", paddingRight: "50px" }}
                        >
                          <div>
                            <div className="container-container">
                              <div className="row-base">
                                <div
                                  className="column-base"
                                  style={{ flex: "1 1 0%" }}
                                >
                                  <div className="container-base stretch">
                                    <div style={{ paddingBottom: "7.81%" }}>
                                      <div className="container-container container-aspectContainer">
                                        <div className="row-base">
                                          <div
                                            className="column-base"
                                            style={{ flex: "1 1 0%" }}
                                          >
                                            <a href="#">
                                              <div>
                                                <img
                                                  draggable="false"
                                                  src={DesktopBanner1}
                                                  alt=""
                                                  className="image-image image-hand"
                                                />
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
                </div>
              </div>
            </div>
            <div className="indexContainer">
              <div
                className="container-base stretch"
                style={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <div>
                  <div className="container-container">
                    <div className="row-base">
                      <div className="column-base" style={{ flex: "1 1 0%" }}>
                        <div className="container-base stretch">
                          <div style={{ paddingBottom: "59.37%" }}>
                            <div className="container-container container-aspectContainer">
                              <div className="row-base">
                                <div
                                  className="column-base"
                                  style={{ flex: "1 1 0%" }}
                                >
                                  <a href="#">
                                    <div>
                                      <img
                                        draggable="false"
                                        src={DesktopBanner2}
                                        alt=""
                                        className="image-image image-hand"
                                      />
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
                          <div style={{ paddingBottom: "59.37%" }}>
                            <div className="container-container container-aspectContainer">
                              <div className="row-base">
                                <div
                                  className="column-base"
                                  style={{ flex: "1 1 0%" }}
                                >
                                  <a href="#">
                                    <div>
                                      <img
                                        draggable="false"
                                        src={DesktopBanner3}
                                        alt=""
                                        className="image-image image-hand"
                                      />
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
              <div
                className="container-base stretch"
                style={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <div>
                  <div className="container-container">
                    <div className="row-base">
                      <div className="column-base" style={{ flex: "1 1 0%" }}>
                        <div className="container-base stretch">
                          <div style={{ paddingBottom: "7.2%" }}>
                            <div className="container-container container-aspectContainer">
                              <div className="row-base">
                                <div
                                  className="column-base"
                                  style={{ flex: "1 1 0%" }}
                                >
                                  <a href="#">
                                    <img
                                      draggable="false"
                                      src={DesktopBanner4}
                                      alt=""
                                      className="image-image image-hand"
                                    />
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
              <div
                className="container-base stretch"
                style={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <div>
                  <div className="container-container">
                    <div className="row-base">
                      <div className="column-base" style={{ flex: "1 1 0%" }}>
                        <div className="container-base stretch">
                          <div style={{ paddingBottom: "8.33%" }}>
                            <div className="container-container container-aspectContainer">
                              <div className="row-base">
                                <div
                                  className="column-base"
                                  style={{ flex: "1 1 0%" }}
                                >
                                  <a href="#">
                                    <img
                                      draggable="false"
                                      src={DesktopBanner5}
                                      alt=""
                                      className="image-image image-hand"
                                    />
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
              <div className="stretch">
                <div className="carousel-base">
                  <Slider {...sliderSettings}>
                    {categorySlides.map((slide, slideIndex) => (
                      <div className="carousel-slide" key={slideIndex}>
                        <div
                          className="container-base stretch"
                          style={{ paddingLeft: "50px", paddingRight: "50px" }}
                        >
                          <div className="container-container">
                            <div className="row-base">
                              {slide.map((category) => (
                                <div
                                  key={category.id}
                                  className="column-base"
                                  style={{ flex: "1 1 0%" }}
                                >
                                  <div className="container-base stretch">
                                    <div style={{ paddingBottom: "131.21%" }}>
                                      <div className="container-container container-aspectContainer">
                                        <div className="row-base">
                                          <div
                                            className="column-base"
                                            style={{ flex: "1 1 0%" }}
                                          >
                                            <a
                                              href={`/category/${category.slug}`}
                                            >
                                              <img
                                                draggable="false"
                                                src={
                                                  category.desktop_image ||
                                                  category.desktop_secondary_image
                                                }
                                                alt={category.name}
                                                className="image-image image-hand"
                                              />
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
            <div className="indexContainer">
              <div
                className="container-base stretch"
                style={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <div>
                  <div className="container-container">
                    <div className="row-base">
                      <div className="column-base" style={{ flex: "1 1 0%" }}>
                        <div className="container-base stretch">
                          <div style={{ paddingBottom: "8.33%" }}>
                            <div className="container-container container-aspectContainer">
                              <div className="row-base">
                                <div
                                  className="column-base"
                                  style={{ flex: "1 1 0%" }}
                                >
                                  <a href="#">
                                    <img
                                      draggable="false"
                                      src={DesktopBanner6}
                                      alt=""
                                      className="image-image image-hand"
                                    />
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
            {/* SECONDARY CATEGORY GRID - TWO ROWS */}
            <div className="indexContainer">
              <div
                className="container-base stretch"
                style={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <div>
                  <div className="container-container">
                    {/* ROW 1 */}
                    <div className="row-base">
                      {categories
                        ?.filter((cat) => cat.desktop_secondary_image)
                        ?.slice(0, 6)
                        ?.map((category) => (
                          <div
                            key={category.id}
                            className="column-base"
                            style={{ flex: "1 1 0%" }}
                          >
                            <div className="container-base stretch">
                              <div style={{ paddingBottom: "130.62%" }}>
                                <div className="container-container container-aspectContainer">
                                  <div className="row-base">
                                    <div
                                      className="column-base"
                                      style={{ flex: "1 1 0%" }}
                                    >
                                      <a href={`/category/${category.slug}`}>
                                        <img
                                          draggable="false"
                                          src={category.desktop_secondary_image}
                                          alt={category.name}
                                          className="image-image image-hand"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* ROW 2 */}
                    <div className="row-base">
                      {categories
                        ?.filter((cat) => cat.desktop_secondary_image)
                        ?.slice(6, 12)
                        ?.map((category) => (
                          <div
                            key={category.id}
                            className="column-base"
                            style={{ flex: "1 1 0%" }}
                          >
                            <div className="container-base stretch">
                              <div style={{ paddingBottom: "130.62%" }}>
                                <div className="container-container container-aspectContainer">
                                  <div className="row-base">
                                    <div
                                      className="column-base"
                                      style={{ flex: "1 1 0%" }}
                                    >
                                      <a href={`/category/${category.slug}`}>
                                        <img
                                          draggable="false"
                                          src={category.desktop_secondary_image}
                                          alt={category.name}
                                          className="image-image image-hand"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="indexContainer">
              <div
                className="container-base stretch"
                style={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <div>
                  <div className="container-container">
                    <div className="row-base">
                      <div className="column-base" style={{ flex: "1 1 0%" }}>
                        <div className="container-base stretch">
                          <div style={{ paddingBottom: "18.22%" }}>
                            <div className="container-container container-aspectContainer">
                              <div className="row-base">
                                <div
                                  className="column-base"
                                  style={{ flex: "1 1 0%" }}
                                >
                                  <a href="">
                                    <img
                                      draggable="false"
                                      src={LoginBanner}
                                      alt=""
                                      className="image-image image-hand"
                                    />
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
        </main>
      </div>
    </>
  );
}

export default DesktopHome;
