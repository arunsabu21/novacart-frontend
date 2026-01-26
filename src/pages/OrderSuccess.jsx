import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Loader from "../components/Loader";
import MobileOrderSuccess from "../components/MobileOrderSuccess";
import DesktopOrderSuccess from "../components/DesktopOrderSuccess";

export default function OrderSuccess() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* RESPONSIVE */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* FETCH LATEST ORDER */

  useEffect(() => {
    let interval;

    async function fetchOrder() {
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get("/orders/latest/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ If no order or no items → redirect
        if (!res.data || !res.data.items?.length) {
          navigate("/");
          return;
        }

        setOrder(res.data);
        setLoading(false);
        clearInterval(interval);
      } catch (err) {
        navigate("/");
      }
    }

    fetchOrder();
    interval = setInterval(fetchOrder, 2000);

    return () => clearInterval(interval);
  }, [navigate]);

  if (loading) {
    return (
      <div className="layout">
        <Loader />
      </div>
    );
  }

  if (!order) {
    return <p>Order not found</p>;
  }

  return isMobile ? (
    <MobileOrderSuccess order={order} />
  ) : (
    <DesktopOrderSuccess order={order} />
  );
}
