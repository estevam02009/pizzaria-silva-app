import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";

export default function OrderStatusScreen() {
  const { orderStatus } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📌 Status do Pedido</Text>
      <Text style={styles.status}>
        {orderStatus ? `Seu pedido está: ${orderStatus}` : "Nenhum pedido ativo"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  status: { fontSize: 18, marginBottom: 20 },
});
