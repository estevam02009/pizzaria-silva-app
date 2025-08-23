// screens/AdminLoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useAdmin } from "../context/AdminContext";

export default function AdminLoginScreen({ navigation }) {
  const [passwordInput, setPasswordInput] = useState("");
  const { login } = useAdmin();

  const handleLogin = () => {
    if (login(passwordInput)) {
      navigation.navigate("AdminOrders");
    } else {
      Alert.alert("Senha incorreta", "Tente novamente!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Admin</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a senha"
        secureTextEntry
        value={passwordInput}
        onChangeText={setPasswordInput}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
    padding: 10,
    marginBottom: 20,
  },
});
