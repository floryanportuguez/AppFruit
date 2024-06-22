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

const StackNav = createStackNavigator();

function Stacks(){
    return(
    <StackNav.Navigator initialRouteName="login">
        <StackNav.Screen name="login" component={Login}/>
        <StackNav.Screen name="crear" component={Crear}/>
        <StackNav.Screen name="producto" component={Producto}/>
        <StackNav.Screen name="home" component={Home}/>
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