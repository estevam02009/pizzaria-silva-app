import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useCart } from "../context/CartContext";

export default function ClientScreen({ navigation }) {
  const { setCustomer } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSaveClient = () => {
    if (!name || !address || !phone) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos!");
      return;
    }

    // Salva os dados do cliente no contexto
    setCustomer({ name, address, phone });

    // Navega para o Cardápio
    navigation.navigate("Menu");
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

      <Button title="Salvar e Continuar" onPress={handleSaveClient} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
});
