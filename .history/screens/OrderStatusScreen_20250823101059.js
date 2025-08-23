// screens/OrderStatusScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";

export default function OrderStatusScreen() {
  const { orderStatus, updateOrderStatus } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📌 Status do Pedido</Text>
      <Text style={styles.status}>Atual: {orderStatus || "Nenhum pedido ativo"}</Text>

      <View style={styles.buttons}>
        <Button title="Pendente" onPress={() => updateOrderStatus("pendente")} />
        <Button title="Em preparo" onPress={() => updateOrderStatus("em preparo")} />
        <Button title="A caminho" onPress={() => updateOrderStatus("a caminho")} />
        <Button title="Finalizado" onPress={() => updateOrderStatus("finalizado")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  status: { fontSize: 18, marginBottom: 20 },
  buttons: { gap: 10, width: "80%" },
});
