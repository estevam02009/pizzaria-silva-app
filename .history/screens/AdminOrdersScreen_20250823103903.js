import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";

export default function AdminOrdersScreen() {
    const { updateOrderStatus } = useCart();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📢 Controle de Pedidos</Text>
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
    buttons: { gap: 10, width: "80%", marginTop: 20 },
});
