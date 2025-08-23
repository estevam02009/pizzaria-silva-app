import * as React, { useEffect } from "react";
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CartProvider } from "./context/CartContext";
import { ClientProvider } from "./context/ClientContext";

import WelcomeScreen from "./screens/WelcomeScreen";
import MenuScreen from "./screens/MenuScreen";
import CartScreen from "./screens/CartScreen";
import ClientScreen from "./screens/ClientScreen";
import OrderStatusScreen from "./screens/OrderStatusScreen";
import AdminOrdersScreen from "./screens/AdminOrdersScreen";
import HomeScreen from "./screens/HomeScreen";
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  return (
    <ClientProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{ headerShown: true }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Escolha o Perfil" }}
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
            <Stack.Screen
              name="OrderStatus"
              component={OrderStatusScreen}
              options={{ title: "Status do Pedido" }}
            />

            {/* Rota do Admin */}
            <Stack.Screen
              name="Admin"
              component={AdminOrdersScreen}
              options={{ title: "Gerenciar Pedidos" }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </ClientProvider>
  );
}
