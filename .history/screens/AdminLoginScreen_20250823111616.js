import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useAdmin } from "../context/AdminContext";

export default function AdminLoginScreen({ navigation }) {
    const [password, setPassword] = useState("");
    const { loginAdmin } = useAdmin();

    const handleLogin = () => {
        const success = loginAdmin(password);
        if (success) {
            navigation.navigate("AdminOrders"); // rota protegida
        } else {
            Alert.alert("Erro", "Senha incorreta!");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Admin</Text>
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Entrar" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 20 },
});
