import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Linking,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const {
    cart,
    removeFromCart,
    clearCart,
    orderStatus,
    updateOrderStatus,
    customer,
    setCustomer,
  } = useCart();

  const [modalVisible, setModalVisible] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSendWhatsApp = () => {
    if (!customer.name || !customer.address || !customer.phone) {
      Alert.alert("Atenção", "Por favor, preencha nome, endereço e telefone.");
      return;
    }

    if (cart.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione itens antes de enviar o pedido.");
      return;
    }

    setModalVisible(true); // abre modal de confirmação
  };

  const confirmOrder = () => {
    updateOrderStatus("pendente");

    let message = `🛒 *Novo Pedido*\n\n👤 Cliente: ${customer.name}\n🏠 Endereço: ${customer.address}\n📱 Telefone: ${customer.phone}\n\n`;

    cart.forEach((item) => {
      message += `- ${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n💰 Total: R$ ${total.toFixed(2)}\n📌 Status: ${orderStatus}`;

    const phoneNumber = "5584988962609";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
    });

    setModalVisible(false);
    clearCart();
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
        <View style={styles.qtyContainer}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => updateItemQuantity(item.id, item.quantity - 1)}
          >
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => updateItemQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Text style={styles.remove}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  const updateItemQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    cart.splice(0, cart.length, ...updatedCart);
    setCustomer({ ...customer }); // força renderização
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
            renderItem={renderItem}
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
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            keyboardType="phone-pad"
            value={customer.phone}
            onChangeText={(text) => setCustomer({ ...customer, phone: text })}
          />

          <TouchableOpacity style={styles.button} onPress={handleSendWhatsApp}>
            <Text style={styles.buttonText}>Verificar Pedido</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.clear]} onPress={clearCart}>
            <Text style={styles.buttonText}>Limpar Carrinho</Text>
          </TouchableOpacity>

          <Text style={styles.status}>📌 Status do pedido: {orderStatus}</Text>
        </>
      )}

      {/* Modal de confirmação */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirme seu pedido</Text>
            <ScrollView style={{ maxHeight: 250 }}>
              {cart.map((item) => (
                <Text key={item.id} style={styles.modalItem}>
                  {item.name} x{item.quantity} - R$ {(item.price * item.quantity).toFixed(2)}
                </Text>
              ))}
            </ScrollView>
            <Text style={styles.modalTotal}>Total: R$ {total.toFixed(2)}</Text>

            <TouchableOpacity style={styles.modalButton} onPress={confirmOrder}>
              <Text style={styles.modalButtonText}>✅ Confirmar Pedido</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#e74c3c" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>❌ Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  empty: { fontSize: 16, color: "gray", textAlign: "center" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  image: { width: 60, height: 60, borderRadius: 8 },
  itemText: { fontSize: 16, fontWeight: "600" },
  itemPrice: { fontSize: 14, color: "#555", marginVertical: 5 },
  qtyContainer: { flexDirection: "row", alignItems: "center" },
  qtyButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 6,
  },
  qtyText: { marginHorizontal: 8, fontWeight: "bold", fontSize: 16 },
  remove: { color: "red", fontWeight: "bold", marginLeft: 10 },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  modalItem: { fontSize: 16, marginVertical: 3 },
  modalTotal: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  modalButton: {
    backgroundColor: "#27ae60",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
