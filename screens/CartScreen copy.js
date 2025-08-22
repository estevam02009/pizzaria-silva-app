import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Image,
  LayoutAnimation,
  UIManager,
  Platform,
  Alert,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useClient } from "../context/ClientContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Habilita LayoutAnimation no Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const WHATSAPP_NUMBER = "5584988962609";

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart, clearCart } = useCart();
  const { client } = useClient();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleRemove = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    removeFromCart(id);
  };

  const handleClear = () => {
    if (cart.length === 0) return;
    Alert.alert("Esvaziar carrinho", "Tem certeza?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Esvaziar",
        style: "destructive",
        onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          clearCart();
        },
      },
    ]);
  };

  const enviarWhatsApp = () => {
    if (!client.name || !client.phone || !client.address) {
      alert("Por favor, cadastre seus dados antes de finalizar o pedido!");
      navigation.navigate("Client");
      return;
    }
    if (cart.length === 0) {
      alert("O carrinho está vazio!");
      return;
    }

    let mensagem = `🍕 Pedido de ${client.name}\n📞 ${client.phone}\n📍 ${client.address}\n\nItens:\n`;
    cart.forEach((item) => {
      mensagem += `- ${item.quantity || 1}x ${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });
    mensagem += `\n💰 Total: R$ ${total.toFixed(2)}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
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
        onPress={() => handleRemove(item.id)}
        activeOpacity={0.8}
      >
        <Icon name="trash-can-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Meu Carrinho</Text>

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
              activeOpacity={0.85}
            >
              <Text style={styles.checkoutText}>Finalizar Pedido</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearButton} onPress={handleClear} activeOpacity={0.85}>
              <Text style={styles.clearText}>Esvaziar Carrinho</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#e63946",
  },
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
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "right",
    color: "#333",
  },
  footer: { borderTopWidth: 1, borderTopColor: "#ddd", paddingTop: 10 },
  checkoutButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  clearButton: {
    backgroundColor: "gray",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  clearText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});
