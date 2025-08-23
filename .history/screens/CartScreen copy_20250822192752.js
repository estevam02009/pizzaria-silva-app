import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useClient } from "../context/ClientContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Número da pizzaria no formato internacional
const WHATSAPP_NUMBER = "5584988962609";

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart, clearCart, orderStatus, updateStatus } = useCart();
  const { client } = useClient();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const statusColors = {
    pendente: "#f39c12",
    preparo: "#3498db",
    entrega: "#8e44ad",
    finalizado: "#2ecc71",
    cancelado: "#e74c3c",
    vazio: "#95a5a6",
  };

  const enviarWhatsApp = () => {
    if (!client.name || !client.phone || !client.address) {
      Alert.alert(
        "Cadastro necessário",
        "Por favor, cadastre seus dados antes de finalizar o pedido!",
        [{ text: "OK", onPress: () => navigation.navigate("Client") }]
      );
      return;
    }

    if (cart.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione itens antes de enviar o pedido!");
      return;
    }

    let mensagem = `🍕 Pedido de ${client.name}\n📞 ${client.phone}\n📍 ${client.address}\n\nItens:\n`;
    cart.forEach((item) => {
      mensagem += `- ${item.quantity || 1}x ${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });
    mensagem += `\n💰 Total: R$ ${total.toFixed(2)}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
    updateStatus("preparo"); // atualiza status para em preparo
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>
          {item.quantity || 1}x {item.name}
        </Text>
        <Text style={styles.price}>
          R$ {(item.price * (item.quantity || 1)).toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Icon name="trash-can-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Status do pedido */}
      <Text style={[styles.statusText, { color: statusColors[orderStatus] }]}>
        Status do Pedido: {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
      </Text>

      {cart.length === 0 ? (
        <View style={styles.emptyBox}>
          <Icon name="cart-outline" size={64} color="gray" />
          <Text style={styles.empty}>Seu carrinho está vazio</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderItem}
            style={{ marginBottom: 20 }}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={enviarWhatsApp}
            >
              <Text style={styles.checkoutText}>Enviar Pedido</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
              <Text style={styles.clearText}>Esvaziar Carrinho</Text>
            </TouchableOpacity>

            {/* Botões de teste de status */}
            <View style={styles.statusButtons}>
              <TouchableOpacity onPress={() => updateStatus("preparo")} style={[styles.statusBtn, { backgroundColor: "#3498db" }]}>
                <Text style={styles.statusBtnText}>Em preparo</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateStatus("entrega")} style={[styles.statusBtn, { backgroundColor: "#8e44ad" }]}>
                <Text style={styles.statusBtnText}>Saiu p/ entrega</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateStatus("finalizado")} style={[styles.statusBtn, { backgroundColor: "#2ecc71" }]}>
                <Text style={styles.statusBtnText}>Finalizado</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateStatus("cancelado")} style={[styles.statusBtn, { backgroundColor: "#e74c3c" }]}>
                <Text style={styles.statusBtnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  statusText: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  emptyBox: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { fontSize: 16, textAlign: "center", marginTop: 10, color: "gray" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fefefe",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "600", color: "#333" },
  price: { fontSize: 14, color: "#555" },
  removeButton: { backgroundColor: "#e63946", padding: 8, borderRadius: 8 },
  total: { fontSize: 20, fontWeight: "bold", marginVertical: 10, textAlign: "right", color: "#333" },
  footer: { borderTopWidth: 1, borderTopColor: "#ddd", paddingTop: 10 },
  checkoutButton: { backgroundColor: "green", padding: 15, borderRadius: 12, alignItems: "center", marginBottom: 10 },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  clearButton: { backgroundColor: "gray", padding: 12, borderRadius: 12, alignItems: "center", marginBottom: 10 },
  clearText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  statusButtons: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 10 },
  statusBtn: { padding: 10, borderRadius: 8, marginVertical: 4, width: "48%", alignItems: "center" },
  statusBtnText: { color: "#fff", fontWeight: "bold" },
});
