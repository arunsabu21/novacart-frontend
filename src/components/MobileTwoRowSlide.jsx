import { Link } from "react-router-dom";
import "../styles/mobile/MobileCategorySlider.css";

export default function TwoRowSlider({ categories }) {
  return (
    <div className="cat-wrapper">
      <div className="twoRow-slider">
        <div className="twoRow-track">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.slug ? `/category/${cat.slug}` : `/products?category=${cat.id}`}
              className="twoRow-card"
            >
              <div>
                <img src={cat.mobile_image || cat.image} alt={cat.name} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
