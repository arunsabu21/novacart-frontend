import "../styles/mobile/MobileHome.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MobileBottomBar from "../components/MobileBottomBar";
import MobileCategorySlider from "../components/MobileCategorySlider";
import MobileBanner from "../components/MobileBanner";
import SecureBanner from "../components/SecureBanner";
import CategoryTitle from "../components/CategoryTitle";
import CategoryCardSlider from "../components/CategoryCardSlider";
import Loader from "../components/Loader";
import axios from "../api/axios";

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

        <MobileCategorySlider categories={categories} />
        <MobileBanner />
        <SecureBanner />
        <CategoryTitle />
        <CategoryCardSlider categories={categories} imageKey="mobile_secondary_image"/>
        <MobileBottomBar />
      </div>
    </div>
  );
}

export default MobileHome;
