import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useCart } from "../context/CartContext";

export default function OrderStatusScreen() {
  const { orderStatus, updateOrderStatus } = useCart();

  const steps = [
    { key: "pendente", label: "Pendente" },
    { key: "em_preparo", label: "Em Preparo" },
    { key: "saiu_entrega", label: "Saiu para Entrega" },
    { key: "finalizado", label: "Finalizado" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Acompanhamento do Pedido</Text>

      <View style={styles.timeline}>
        {steps.map((step, index) => {
          const isActive = steps.findIndex((s) => s.key === orderStatus) >= index;

          return (
            <View key={step.key} style={styles.stepContainer}>
              <View
                style={[
                  styles.circle,
                  isActive ? styles.circleActive : styles.circleInactive,
                ]}
              >
                <Text style={styles.circleText}>{index + 1}</Text>
              </View>
              <Text style={styles.label}>{step.label}</Text>
            </View>
          );
        })}
      </View>

      {/* Botões para teste de mudança de status */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => updateOrderStatus("pendente")}
        >
          <Text style={styles.btnText}>🔄 Pendente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => updateOrderStatus("em_preparo")}
        >
          <Text style={styles.btnText}>👨‍🍳 Em Preparo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => updateOrderStatus("saiu_entrega")}
        >
          <Text style={styles.btnText}>🚚 Saiu para Entrega</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => updateOrderStatus("finalizado")}
        >
          <Text style={styles.btnText}>✅ Finalizado</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#c0392b" }]}
          onPress={() => updateOrderStatus("cancelado")}
        >
          <Text style={styles.btnText}>❌ Cancelado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  timeline: { marginBottom: 30 },
  stepContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  circleActive: { backgroundColor: "#27ae60" },
  circleInactive: { backgroundColor: "#bdc3c7" },
  circleText: { color: "#fff", fontWeight: "bold" },
  label: { fontSize: 16 },
  buttons: { marginTop: 20 },
  btn: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
