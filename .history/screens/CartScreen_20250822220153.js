import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Linking,
  Alert,
} from "react-native";
import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const { cart, removeFromCart, clearCart, orderStatus, updateOrderStatus, customer, setCustomer } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSendWhatsApp = () => {
    if (!customer.name || !customer.address) {
      Alert.alert("Atenção", "Por favor, preencha nome e endereço.");
      return;
    }

    if (cart.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione itens antes de enviar o pedido.");
      return;
    }

    updateOrderStatus("pendente");

    let message = `🛒 *Novo Pedido*\n\n👤 Cliente: ${customer.name}\n🏠 Endereço: ${customer.address}\n\n`;

    cart.forEach((item) => {
      message += `- ${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n💰 Total: R$ ${total.toFixed(2)}\n📌 Status: ${orderStatus}`;

    const phoneNumber = "5584988962609"; // Substitua pelo número da lanchonete
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
    });
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

          <TextInput
            style={styles.input}
            placeholder="Nome do cliente"
            value={customer.name}
            onChangeText={(text) => setCustomer({ ...customer, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço de entrega"
            value={customer.address}
            onChangeText={(text) => setCustomer({ ...customer, address: text })}
          />

          <TouchableOpacity style={styles.button} onPress={handleSendWhatsApp}>
            <Text style={styles.buttonText}>Enviar Pedido via WhatsApp</Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#25d366",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  clear: { backgroundColor: "#e76f51" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  status: { fontSize: 16, marginTop: 20, textAlign: "center", fontWeight: "bold" },
});
