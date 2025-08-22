import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState("vazio"); // novo estado

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      if (prev.length === 0) setOrderStatus("pendente"); // primeiro item adicionado
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const newCart = prev.filter((i) => i.id !== id);
      if (newCart.length === 0) setOrderStatus("vazio"); // carrinho vazio
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setOrderStatus("vazio");
  };

  // Atualizar status do pedido manualmente
  const updateStatus = (status) => {
    setOrderStatus(status);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        orderStatus,
        updateStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
