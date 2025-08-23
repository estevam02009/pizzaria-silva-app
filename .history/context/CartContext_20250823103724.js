// context/CartContext.js
import React, { createContext, useContext, useState } from "react";
import * as Notifications from "expo-notifications";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [customerState, setCustomerState] = useState({
    name: "",
    address: "",
    phone: "",
  });

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
    setOrderStatus("");
    setCustomerState({ name: "", address: "", phone: "" });
  };

  const updateOrderStatus = async (status) => {
    setOrderStatus(status);

    // 🔔 dispara notificação local
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📢 Atualização do Pedido",
        body: `Seu pedido agora está: ${status}`,
      },
      trigger: null, // dispara imediatamente
    });
  };

  // ✅ Aqui fica setCustomer (igual você chamou na tela)
  const setCustomer = (data) => {
    setCustomerState(data);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        orderStatus,
        updateOrderStatus,
        customer: customerState,
        setCustomer, // ✅ agora funciona
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
