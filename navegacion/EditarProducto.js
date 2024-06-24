import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { updateDoc, doc, getDoc } from 'firebase/firestore'; 
import { db } from '../AccesoFirebase';

export default function EditarProducto({ route }) {
    const { id } = route.params;
    const Navigation = useNavigation(); 

    const [estado, setEstado] = useState({
        nombre: "",
        codigo: "",
        cantidad: "",
        fecha: "",
    });

    // Obtener los datos de la fruta seleccionada
    useEffect(() => {
        async function fetchProduct() {
            const docRef = doc(db, "Product", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setEstado(docSnap.data());
            }
        }

        fetchProduct();
    }, [id]);

    const handleChangeText = (value, name) => {
        setEstado({ ...estado, [name]: value });
    };

    const handleEditar = async () => {
        try {
            await updateDoc(doc(db, "Product", id), { ...estado });
            alert("Producto actualizado con éxito");
            Navigation.goBack();
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/logo-se.png")}
                style={styles.Background}
            >
                <Image
                    source={require("../assets/logo_fruit-sf.png")}
                    style={{
                        margin: 20,
                        width: 200,
                        height: 200,
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                />
            </ImageBackground>

            <View style={styles.tarjeta}>
                <Text style={styles.titulo}>Editar Producto</Text>
                <TextInput
                    style={styles.txtInput}
                    placeholder="Nombre Producto"
                    value={estado.nombre}
                    onChangeText={(value) => {
                        handleChangeText(value, "nombre");
                    }}
                />
                <TextInput
                    style={styles.txtInput}
                    placeholder="Código Producto"
                    keyboardType="email-address"
                    value={estado.codigo}
                    onChangeText={(value) => {
                        handleChangeText(value, "codigo");
                    }}
                />
                <TextInput
                    style={styles.txtInput}
                    placeholder="Cantidad"
                    keyboardType="numeric"
                    value={estado.cantidad}
                    onChangeText={(value) => {
                        handleChangeText(value, "cantidad");
                    }}
                />
                <TextInput
                    style={styles.txtInput}
                    placeholder="Fecha Caducidad"
                    keyboardType="ascii-capable"
                    value={estado.fecha}
                    onChangeText={(value) => {
                        handleChangeText(value, "fecha");
                    }}
                />

                <TouchableOpacity onPress={handleEditar}>
                    <Text style={styles.btnLoginText}>Guardar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tarjeta: {
        backgroundColor: "#D9D9D9",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 25,
        padding: 20,
        marginTop: -60,
        marginBottom: 60,
    },
    titulo: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
        marginTop: 20,
    },
    Background: {
        flex: 1,
        resizeMode: "cover",
        borderBottomLeftRadius: 20,
        borderBottomStartRadius: 20,
        zIndex: -1,
        resizeMode: "contain"
    },
    txtInput: {
        backgroundColor: "#FFF",
        marginRight: "auto",
        marginLeft: "auto",
        width: "95%",
        borderRadius: 10,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        marginBottom: 15,
    },
    btnLoginText: {
        backgroundColor: "#871F1F",
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        width: 200,
        height: 40,
        borderRadius: 10,
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 20,
        marginBottom: 20,
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
    },
});
