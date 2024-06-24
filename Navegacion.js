import React from "react";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./navegacion/Login";
import Crear from "./navegacion/CrearCuenta";
import Producto from "./navegacion/Producto";
import Home from "./navegacion/home";
import ListarProducto from "./navegacion/ListarProducto";
import Aprender from "./navegacion/Aprender"; 
import EditarProducto from "./navegacion/EditarProducto";
import Favoritos from "./navegacion/Favoritos";

const StackNav = createStackNavigator();

function Stacks(){
    return(
    <StackNav.Navigator initialRouteName="login">
        <StackNav.Screen name="login" component={Login}/>
        <StackNav.Screen name="crear" component={Crear}/>
        <StackNav.Screen name="producto" component={Producto}/>
        <StackNav.Screen name="home" component={Home}/>
        <StackNav.Screen name="ListarProducto" component={ListarProducto}/>
        <StackNav.Screen name="Aprender" component={Aprender}/>
        <StackNav.Screen name="EditarProducto" component={EditarProducto}/>
        <StackNav.Screen name="Favoritos" component={Favoritos}/>
     
    </StackNav.Navigator>
    )
}


export default function Navegacion(){
    return(
        <NavigationContainer>
            <Stacks/>
        </NavigationContainer>
    );
}