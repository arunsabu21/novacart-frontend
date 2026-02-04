import "../styles/mobile/MobileCategorySlider.css";
import { Link } from "react-router-dom";

export default function CategoryCardSlider({ categories, imageKey }) {
  return (
    <div className="cat-scroll">
      {categories.map((cat) =>
        cat[imageKey] ? (
          <Link
            key={cat.id}
            to={`/products?category=${cat.id}`} 
            className="cat-item"
          >
            <img src={cat[imageKey]} alt={cat.name} />
          </Link>
        ) : null
      )}
    </div>
  );
}