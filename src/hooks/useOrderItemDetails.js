import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function useCancelItem(orderId, itemId) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId || !itemId) {
      setLoading(false);
      return;
    }

    const fetchItem = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get(
          `/orders/cancel-item/?orderId=${orderId}&itemId=${itemId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setItem(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [orderId, itemId]);
  return { item, loading };
}
