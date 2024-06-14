import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navegacion from './Navegacion'; 
import { createCollections } from './firebase';

import Login from './navegacion/Login'; 
import Register from './navegacion/Register'; 
import Product from './navegacion/Product'; 


export default function App() {
  useEffect(() => {
    createCollections();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navegacion />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
