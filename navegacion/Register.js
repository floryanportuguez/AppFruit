
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { firebase } from '../firebase';

function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    firebase.firestore().collection('User').add({
      name,
      email,
      password
    }).then(() => {
      alert('User registered!');
      navigation.navigate('Login');
    });
  };

  return (
    <ImageBackground source={require('../assets/img_fondo.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#837B7B"
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#837B7B"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#837B7B"
        />
        <TextInput
          style={styles.input}
          placeholder="Comprobar contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#837B7B"
        />
        <TouchableOpacity style={styles.button} onPress={registerUser}>
          <Text style={styles.buttonText}>Registrarse</Text>
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

export default RegisterScreen;
