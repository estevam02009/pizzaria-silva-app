// CartScreen.js
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calcula o total da compra
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Carrinho</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Seu carrinho está vazio.</Text>
      ) : (
        <>
          {/* Lista de itens do carrinho */}
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.name}>
                  {item.name} x{item.quantity}
                </Text>
                <Text style={styles.price}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.remove}>Remover</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Total */}
          <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

          {/* Botão de finalizar pedido */}
          <TouchableOpacity
            style={styles.checkout}
            onPress={() => {
              clearCart(); // limpa o carrinho e inicia fluxo do pedido
              navigation.navigate("OrderStatus"); // vai para tela de status
            }}
          >
            <Text style={styles.checkoutText}>✅ Finalizar Pedido</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  empty: { fontSize: 16, textAlign: "center", marginTop: 30 },
  item: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  name: { fontSize: 16 },
  price: { fontSize: 16, fontWeight: "bold" },
  remove: { color: "red", fontSize: 14 },
  total: { fontSize: 18, fontWeight: "bold", marginVertical: 15, textAlign: "right" },
  checkout: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
