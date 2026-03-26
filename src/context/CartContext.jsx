import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const isLoggedIn = !!localStorage.getItem("access");

  const fetchCart = async () => {
    if (!isLoggedIn) return;

    try {
      const res = await axios.get("/cart/");
      setCartCount(res.data.length);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isLoggedIn]);

  return (
    <CartContext Provider value={{ cartCount, fetchCart }}>
      {children}
    </CartContext>
  );
}

export const useCart = () => useContext(CartContext);
