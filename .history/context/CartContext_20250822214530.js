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
    setOrderFlow(); // 🚀 inicia o fluxo assim que limpar o carrinho (compra finalizada)
  };

  // ----------------------
  // Status do Pedido
  // ----------------------
  const updateOrderStatus = (status) => {
    setOrderStatus(status)
  }

  // 🚀 Fluxo automático do pedido
  const startOrderFlow = () => {
    setOrderStatus("pendente");

    setTimeout(() => setOrderStatus("em_preparo"), 4000); // 4s depois
    setTimeout(() => setOrderStatus("saiu_entrega"), 8000); // 8s depois
    setTimeout(() => setOrderStatus("finalizado"), 12000); // 12s depois
  };

  //   if (validStatuses.includes(status)) {
  //     setOrderStatus(status);
  //   } else {
  //     console.warn("Status inválido:", status);
  //   }
  // };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        orderStatus,
        updateOrderStatus,
        startOrderFlow, // disponibiliza a função
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
