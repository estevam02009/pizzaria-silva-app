// context/CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState(""); // status do pedido
  const [customer, setCustomer] = useState({ name: "", address: "", phone: "" });

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCart([]);
    setOrderStatus(""); // reseta status ao limpar
    setCustomer({ name: "", address: "", phone: "" });
  };

  const updateOrderStatus = (status) => {
    setOrderStatus(status);
  };

  const setCustomerData = (data) => {
    setCustomer(data);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        orderStatus,
        updateOrderStatus,
        customer,
        setCustomerData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
