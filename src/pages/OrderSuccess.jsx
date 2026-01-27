import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Loader from "../components/Loader";
import MobileOrderSuccess from "../components/MobileOrderSuccess";
import DesktopOrderSuccess from "../components/DesktopOrderSuccess";

export default function OrderSuccess() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.fromPayment) {
      navigate("/");
    }
  }, [location, navigate]);

  /* RESPONSIVE */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* FETCH LATEST ORDER (SAFE POLLING) */
  useEffect(() => {
    let attempts = 0;
    const MAX_ATTEMPTS = 6; // ~12 seconds

    const interval = setInterval(async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get("/orders/latest/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.items?.length) {
          setOrder(res.data);
          setLoading(false);
          clearInterval(interval);
        } else {
          attempts++;
          if (attempts >= MAX_ATTEMPTS) {
            clearInterval(interval);
            navigate("/");
          }
        }
      } catch {
        attempts++;
        if (attempts >= MAX_ATTEMPTS) {
          clearInterval(interval);
          navigate("/");
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [navigate]);

  if (loading) {
    return (
      <div className="layout">
        <Loader />
      </div>
    );
  }

  return isMobile ? (
    <MobileOrderSuccess order={order} />
  ) : (
    <DesktopOrderSuccess order={order} />
  );
}