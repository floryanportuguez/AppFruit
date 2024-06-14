import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Text, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { firebase } from '../firebase';

function Product({ navigation }) {
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const addProduct = () => {
    firebase.firestore().collection('Product').add({
      productName,
      productCode,
      quantity,
      expiryDate
    }).then(() => {
      Alert.alert(
        'Éxito',
        'El producto se ha guardado exitosamente. ¿Deseas agregar más productos?',
        [
          {
            text: 'No',
            onPress: () => navigation.navigate('Login'),
            style: 'cancel',
          },
          {
            text: 'Sí',
            onPress: () => {
              setProductName('');
              setProductCode('');
              setQuantity('');
              setExpiryDate('');
            },
          },
        ],
        { cancelable: false }
      );
    }).catch((error) => {
      alert('Error al agregar producto: ', error.message);
    });
  };

  return (
    <ImageBackground source={require('../assets/img_fondo.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nombre Producto"
          value={productName}
          onChangeText={setProductName}
          placeholderTextColor="#837B7B"
        />
        <TextInput
          style={styles.input}
          placeholder="Código Producto"
          value={productCode}
          onChangeText={setProductCode}
          placeholderTextColor="#837B7B"
        />
        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          value={quantity}
          onChangeText={setQuantity}
          placeholderTextColor="#837B7B"
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha caducidad"
          value={expiryDate}
          onChangeText={setExpiryDate}
          placeholderTextColor="#837B7B"
        />
        <TouchableOpacity style={styles.button} onPress={addProduct}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: wp('5%'),
    backgroundColor: 'rgba(217, 217, 217, 0.8)',
    margin: wp('5%'),
    borderRadius: 10,
  },
  input: {
    height: hp('6%'),
    borderColor: '#837B7B',
    borderWidth: 1,
    marginBottom: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    color: '#000',
  },
  button: {
    backgroundColor: '#871F1F',
    paddingVertical: hp('1.5%'),
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: hp('2%'),
  },
});

export default Product;
