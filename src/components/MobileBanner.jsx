import { useEffect, useState } from "react";
import "../styles/mobile/MobileCategorySlider.css";

const banners = [
  "/src/assets/images/BANNER1.png",
  "/src/assets/images/BANNER2.png",
  "/src/assets/images/BANNER3.png",
  "/src/assets/images/BANNER4.png",
  "/src/assets/images/BANNER5.png",
  "/src/assets/images/BANNER6.png",
];

export default function MobileBanner() {
  const [index, setIndex] = useState(0);

  // auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mobile-banner">
      <div
        className="banner-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((img, i) => (
          <img key={i} src={img} alt="banner" />
        ))}
      </div>

      {/* dots */}
      <div className="banner-dots">
        {banners.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}