import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import { useCart } from "../context/CartContext";

const { width } = Dimensions.get("window");

const categorias = [
  {
    id: "1",
    title: "Tradicionais",
    data: [
      {
        id: "1",
        name: "Margherita",
        description: "Molho de tomate, mussarela e manjericão fresco",
        price: 35.9,
        image:
          "https://i.pinimg.com/1200x/b3/0c/70/b30c700845f764a442462de34953db96.jpg",
      },
      {
        id: "2",
        name: "Calabresa",
        description: "Molho de tomate, mussarela e calabresa fatiada",
        price: 39.9,
        image:
          "https://i.pinimg.com/736x/df/6a/b5/df6ab584214cd2040686864149d73cfe.jpg",
      },
      {
        id: "3",
        name: "Quatro Queijos",
        description: "Mussarela, gorgonzola, parmesão e catupiry",
        price: 42.9,
        image:
          "https://i.pinimg.com/1200x/68/27/ba/6827bacb5881e9b20b7e565e0bd22aea.jpg",
      },
    ],
  },
  {
    id: "2",
    title: "Especiais",
    data: [
      {
        id: "4",
        name: "Portuguesa",
        description: "Mussarela, presunto, ovo, cebola e azeitonas",
        price: 42.9,
        image:
          "https://i.pinimg.com/1200x/a2/6e/aa/a26eaa0564799b2e52b37725aaefcf7b.jpg",
      },
    ],
  },
  {
    id: "3",
    title: "Doces",
    data: [
      {
        id: "5",
        name: "Chocolate",
        description: "Chocolate derretido e granulado",
        price: 32.9,
        image:
          "https://i.pinimg.com/1200x/20/d5/b2/20d5b21eec0e6e0cab53ba9639029e80.jpg",
      },
    ],
  },
];

export default function MenuScreen({ navigation }) {
  const { addToCart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Média");
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const tamanhos = [
    { label: "Pequena", multiplier: 1 },
    { label: "Média", multiplier: 1.5 },
    { label: "Grande", multiplier: 2 },
  ];

  const destaques = [
    {
      id: "1",
      image:
        "https://i.pinimg.com/1200x/b3/0c/70/b30c700845f764a442462de34953db96.jpg",
    },
    {
      id: "2",
      image:
        "https://i.pinimg.com/736x/df/6a/b5/df6ab584214cd2040686864149d73cfe.jpg",
    },
    {
      id: "3",
      image:
        "https://i.pinimg.com/1200x/68/27/ba/6827bacb5881e9b20b7e565e0bd22aea.jpg",
    },
  ];

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize("Média");
    setQuantity(1);
    setModalVisible(true);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart({
        ...selectedProduct,
        quantity,
        size: selectedSize,
        price:
          selectedProduct.price *
          tamanhos.find((t) => t.label === selectedSize).multiplier,
      });
      setModalVisible(false);
    }
  };

  // Auto scroll do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % destaques.length;
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollTo({
        x: nextIndex * (width - 40),
        animated: true,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>
        R${" "}
        {(item.price * tamanhos.find((t) => t.label === "Média").multiplier).toFixed(
          2
        )}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Botão fixo do carrinho */}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>🛒</Text>
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        {/* Carrossel */}
        <ScrollView
          horizontal
          pagingEnabled
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / (width - 40));
            setCurrentIndex(index);
          }}
        >
          {destaques.map((item) => (
            <Image
              key={item.id}
              source={{ uri: item.image }}
              style={styles.carouselImage}
            />
          ))}
        </ScrollView>

        {/* Indicadores */}
        <View style={styles.dotsContainer}>
          {destaques.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>

        {/* Categorias */}
        {categorias.map((categoria) => (
          <View key={categoria.id}>
            <Text style={styles.categoryTitle}>{categoria.title}</Text>
            <FlatList
              data={categoria.data}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))}
      </ScrollView>

      {/* Modal */}
      {selectedProduct && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedProduct.image }}
                style={styles.modalImage}
              />
              <Text style={styles.modalName}>{selectedProduct.name}</Text>
              <Text style={styles.modalDescription}>
                {selectedProduct.description}
              </Text>

              <Text style={{ marginTop: 10 }}>Escolha o tamanho:</Text>
              <View style={styles.sizesContainer}>
                {tamanhos.map((t) => (
                  <TouchableOpacity
                    key={t.label}
                    style={[
                      styles.sizeButton,
                      selectedSize === t.label && styles.selectedSize,
                    ]}
                    onPress={() => setSelectedSize(t.label)}
                  >
                    <Text
                      style={{
                        color: selectedSize === t.label ? "#fff" : "#333",
                      }}
                    >
                      {t.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={{ marginTop: 10 }}>Quantidade:</Text>
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <TouchableOpacity
                  onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                  style={styles.qtyButton}
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 20 }}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => setQuantity(quantity + 1)}
                  style={styles.qtyButton}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                <Text style={{ color: "#fff" }}>
                  Adicionar R${" "}
                  {(
                    selectedProduct.price *
                    tamanhos.find((t) => t.label === selectedSize).multiplier *
                    quantity
                  ).toFixed(2)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{ marginTop: 10 }}
              >
                <Text style={{ color: "red", textAlign: "center" }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "#fff" },
  categoryTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  card: {
    backgroundColor: "#fefefe",
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    width: 140,
    alignItems: "center",
  },
  image: { width: 120, height: 100, borderRadius: 10 },
  name: { fontWeight: "bold", marginTop: 5 },
  price: { color: "#b22222", marginTop: 5 },
  cartButton: {
    position: "absolute",
    top: 20,
    right: 10,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 25,
    zIndex: 10,
  },
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
  modalImage: { width: 200, height: 150, borderRadius: 12 },
  modalName: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  modalDescription: { fontSize: 14, color: "#555", marginTop: 5, textAlign: "center" },
  sizesContainer: { flexDirection: "row", marginTop: 10 },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedSize: { backgroundColor: "#b22222", borderColor: "#b22222" },
  qtyButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderColor: "#333",
  },
  addButton: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  carouselImage: { width: width - 40, height: 160, borderRadius: 15, marginRight: 12 },
  dotsContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#ccc", marginHorizontal: 4 },
  activeDot: { backgroundColor: "#b22222" },
});
