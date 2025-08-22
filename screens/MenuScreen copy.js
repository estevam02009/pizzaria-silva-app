import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView  } from "react-native";

const pizzas = [
  {
    id: "1",
    name: "Margherita",
    description: "Molho de tomate, mussarela e manjericão fresco",
    price: 35.90,
    image: "https://i.pinimg.com/1200x/b3/0c/70/b30c700845f764a442462de34953db96.jpg",
    category: "Tradicionais",
  },
  {
    id: "2",
    name: "Calabresa",
    description: "Molho de tomate, mussarela e calabresa fatiada",
    price: 39.90,
    image: "https://i.pinimg.com/736x/df/6a/b5/df6ab584214cd2040686864149d73cfe.jpg",
    category: "Tradicionais",
  },
  {
    id: "3",
    name: "Quatro Queijos",
    description: "Mussarela, gorgonzola, parmesão e catupiry",
    price: 42.90,
    image: "https://i.pinimg.com/1200x/68/27/ba/6827bacb5881e9b20b7e565e0bd22aea.jpg",
    category: "Especiais",
  },
  {
    id: "4",
    name: "Portuguesa",
    description: "Mussarela, presunto, ovo, cebola e azeitonas",
    price: 44.90,
    image: "https://i.pinimg.com/1200x/a2/6e/aa/a26eaa0564799b2e52b37725aaefcf7b.jpg",
    category: "Especiais",
  },
  {
    id: "5",
    name: "Chocolate com Morango",
    description: "Pizza doce com chocolate derretido e morangos frescos",
    price: 36.90,
    image: "https://i.pinimg.com/1200x/20/d5/b2/20d5b21eec0e6e0cab53ba9639029e80.jpg",
    category: "Doces",
  },
];

const categories = ["Todas", "Tradicionais", "Especiais", "Doces"];

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredPizzas =
    selectedCategory === "Todas"
      ? pizzas
      : pizzas.filter((p) => p.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🍕 Escolha sua Pizza</Text>

      {/* Botões de Categoria */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de Pizzas */}
      <FlatList
        data={filteredPizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f0",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#b22222",
    marginBottom: 15,
    textAlign: "center",
  },
  categories: {
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: "#b22222",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  categoryTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 18,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#b22222",
    marginBottom: 6,
  },
  button: {
    backgroundColor: "#32cd32",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});
