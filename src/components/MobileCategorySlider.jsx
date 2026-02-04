import { Link } from "react-router-dom";
import "../styles/mobile/MobileCategorySlider.css";

export default function MobileCategorySlider({ categories }) {
  return (
    <div className="category-slider">
      <div className="category-track">

        {categories.map(cat => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.id}`}
            className="category-card"
          >
            <div className="category-img">
              <img src={cat.image} alt={cat.name} />
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}