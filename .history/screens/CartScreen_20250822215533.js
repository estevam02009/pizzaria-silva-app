import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const { cart, removeFromCart, clearCart, orderStatus, updateOrderStatus } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinishOrder = () => {
    if (cart.length === 0) return;
    updateOrderStatus("pendente"); // 🔥 muda o status para pendente
    alert("Pedido enviado! Status: pendente");
    // se quiser limpar o carrinho depois do envio:
    // clearCart();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Seu carrinho está vazio</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>
                  {item.name} (x{item.quantity}) - R$ {(item.price * item.quantity).toFixed(2)}
                </Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.remove}>Remover</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.button} onPress={handleFinishOrder}>
            <Text style={styles.buttonText}>Finalizar Pedido</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.clear]} onPress={clearCart}>
            <Text style={styles.buttonText}>Limpar Carrinho</Text>
          </TouchableOpacity>

          <Text style={styles.status}>📌 Status do pedido: {orderStatus}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  empty: { fontSize: 16, color: "gray", textAlign: "center" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: { fontSize: 16 },
  remove: { color: "red", fontWeight: "bold" },
  total: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },
  button: {
    backgroundColor: "#2a9d8f",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  clear: { backgroundColor: "#e76f51" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  status: { fontSize: 16, marginTop: 20, textAlign: "center", fontWeight: "bold" },
});
