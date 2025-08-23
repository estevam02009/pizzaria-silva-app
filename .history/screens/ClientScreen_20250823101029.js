// screens/ClientScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Linking } from "react-native";
import { useCart } from "../context/CartContext";

export default function ClientScreen({ navigation }) {
  const { cart, clearCart, updateOrderStatus } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const sendOrder = () => {
    if (!name || !address || !phone) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos!");
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderItems = cart
      .map((item) => `${item.quantity}x ${item.name} (R$${item.price})`)
      .join("\n");
      
    updateOrderStatus("pendente");  

    const message = `🍕 *Novo Pedido* 🍕\n\n📌 *Cliente*: ${name}\n📍 *Endereço*: ${address}\n📱 *Telefone*: ${phone}\n\n🛒 *Itens:*\n${orderItems}\n\n💰 *Total*: R$${total.toFixed(2)}`;

    const phoneNumber = "5581999999999"; // coloque aqui o número da pizzaria
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    clearCart();
    navigation.navigate("Menu");

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu endereço"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu telefone"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
      />

      <Button title="Enviar Pedido via WhatsApp" onPress={sendOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
});
