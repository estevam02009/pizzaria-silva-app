
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pinimg.com/736x/6f/20/ca/6f20ca7817f4b58331777c4f6f63ab41.jpg' }}
        style={styles.logo}
      />
      <Text style={styles.title}>🎉 Bem-vindo a Pizzaria Silva!</Text>
      <Text style={styles.subtitle}>As melhores pizzas, do nosso forno para você 😋</Text>
      <TouchableOpacity 
        style={styles.button}
            onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.buttonText}>Fazer Pedido</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b22222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: '#ffcc00',
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#ffebcd',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffcc00',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
