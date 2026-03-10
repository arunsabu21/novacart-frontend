import { useRef, useState } from "react";
import "../styles/mobile/MobileCategorySlider.css";

import banner1 from "../assets/images/mobile-banner01.png";
import banner2 from "../assets/images/mobile-banner02.png";
import banner3 from "../assets/images/mobile-banner03.png";
import banner4 from "../assets/images/mobile-banner04.png";
import banner5 from "../assets/images/mobile-banner05.png";
import banner6 from "../assets/images/mobile-banner06.png";

const banners = [
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
];

export default function MobileBanner() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  const scrollToSlide = (i) => {
    const width = trackRef.current.offsetWidth;

    trackRef.current.scrollTo({
      left: width * i,
      behavior: "smooth",
    });

    setIndex(i);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    const slideWidth = track.offsetWidth;
    const newIndex = Math.round(track.scrollLeft / slideWidth);

    setIndex(newIndex);
  };

  return (
    <div className="mobile-banner">
      <div
        className="banner-track"
        ref={trackRef}
        onScroll={handleScroll}
      >
        {banners.map((img, i) => (
          <img key={i} src={img} alt="banner" />
        ))}
      </div>

      <div className="banner-dots">
        {banners.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => scrollToSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}