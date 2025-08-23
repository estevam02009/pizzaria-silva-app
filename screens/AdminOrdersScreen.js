import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useAdmin } from "../context/AdminContext";

export default function AdminOrdersScreen({ navigation }) {
  const { isAdmin } = useAdmin();

  useEffect(() => {
    if (!isAdmin) {
      navigation.navigate("AdminLogin"); // redireciona se não for admin
    }
  }, [isAdmin]);

  if (!isAdmin) return null;

  return (
    <View>
      <Text>Área do Admin</Text>
      {/* Aqui você lista os pedidos, altera status, etc */}
    </View>
  );
}
