import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState("vazio"); // vazio, pendente, em_preparo, saiu_entrega, cancelado, finalizado

  // ----------------------
  // Manipulação do Carrinho
  // ----------------------
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setOrderStatus("pendente"); // assim que adiciona, já inicia como pendente
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    if (cart.length <= 1) {
      setOrderStatus("vazio");
    }
  };

  const clearCart = () => {
    setCart([]);
    setOrderStatus("vazio");
  };

  // ----------------------
  // Status do Pedido
  // ----------------------
  const updateOrderStatus = (status) => {
    // segurança para aceitar apenas status válidos
    const validStatuses = [
      "vazio",
      "pendente",
      "em_preparo",
      "saiu_entrega",
      "cancelado",
      "finalizado",
    ];

    if (validStatuses.includes(status)) {
      setOrderStatus(status);
    } else {
      console.warn("Status inválido:", status);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orderStatus,
        addToCart,
        removeFromCart,
        clearCart,
        updateOrderStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
