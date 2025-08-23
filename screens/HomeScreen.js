import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🍔 Bem-vindo ao App Delivery</Text>

            <View style={styles.buttons}>
                <Button
                    title="Entrar como Cliente"
                    onPress={() => navigation.navigate("Cliente")}
                />
                <Button
                    title="Entrar como Admin"
                    onPress={() => navigation.navigate("Admin")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 40,
    },
    buttons: {
        width: "80%",
        gap: 20,
    },
});
