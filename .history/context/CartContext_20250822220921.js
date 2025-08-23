import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState("pendente");

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const updateOrderStatus = (status) => setOrderStatus(status);

  const startOrderFlow = () => {
    setOrderStatus("pendente");
    setTimeout(() => setOrderStatus("em_preparo"), 2000);
    setTimeout(() => setOrderStatus("saiu_entrega"), 5000);
    setTimeout(() => setOrderStatus("finalizado"), 8000);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, orderStatus, updateOrderStatus, startOrderFlow }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
