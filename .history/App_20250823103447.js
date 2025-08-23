import * as React from "react";
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

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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
            <Stack.Screen
              name="OrderStatus"
              component={OrderStatusScreen}
              options={{ title: "Status do Pedido" }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </ClientProvider>
  );
}
