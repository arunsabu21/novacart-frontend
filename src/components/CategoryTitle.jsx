import "../styles/mobile/MobileCategorySlider.css";
import categoryBanner from "../assets/images/category-banner.png";

function CategoryTitle() {
  return (
    <div className="category-banner">
      <img src={categoryBanner} alt="Title" />
    </div>
  );
}

export default CategoryTitle;