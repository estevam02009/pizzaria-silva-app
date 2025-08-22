import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CartProvider } from "./context/CartContext";
import { ClientProvider } from "./context/ClientContext";

import WelcomeScreen from "./screens/WelcomeScreen";
import MenuScreen from "./screens/MenuScreen";
import CartScreen from "./screens/CartScreen";
import ClientScreen from "./screens/ClientScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ClientProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ title: "Pizzaria Silva" }}
            />
            <Stack.Screen
              name="Menu"
              component={MenuScreen}
              options={{ title: "Cardápio" }}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: "Carrinho" }}
            />
            <Stack.Screen
              name="Client"
              component={ClientScreen}
              options={{ title: "Dados do Cliente" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </ClientProvider>
  );
}
