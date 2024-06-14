import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import Login from './navegacion/Login';
import Register from './navegacion/Register';
import Product from './navegacion/Product';

const Stack = createStackNavigator();

function Stacks() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Registro' }} />
        <Stack.Screen name="Product" component={Product} options={{ title: 'Registrar Producto' }} />
      </Stack.Navigator>
  );
}


export default function Navegacion() {
    return (
      // contenedor
      <NavigationContainer>
        <Stacks/>
      </NavigationContainer>
    );
  }