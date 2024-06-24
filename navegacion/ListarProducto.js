import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { db } from '../AccesoFirebase'; 
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function ListarProducto() {
    const nav = useNavigation();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        async function fetchDataProduct() {
            try {
                const productosList = [];
                const querySnapshot = await getDocs(collection(db, "Product"));
                querySnapshot.forEach(doc => {
                    productosList.push({ id: doc.id, ...doc.data() });
                });
                setProductos(productosList);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchDataProduct();
    }, []);

    const handleDelete = async (id) => {
        try {
            alert("Seguro de eliminar la fruta")
            await deleteDoc(doc(db, "Product", id));
            setProductos(prevProducts => prevProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error eliminando el documento: ", error);
            alert("Error", "Hubo un problema al eliminar el producto.");
        }
    };
    
    

    const handleEdit = (id) => {
        nav.navigate("EditarProducto", { id });
    };

    const renderProduct = ({ item }) => (
        <View key={item.id} style={styles.button}>
            <Text style={styles.buttonText}>Código: {item.codigo}</Text>
            <Text style={styles.buttonText}>Nombre: {item.nombre}</Text>
            <Text style={styles.buttonText}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.buttonText}>Fecha de caducidad: {item.fecha}</Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => handleEdit(item.id)}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/logo-se.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.logoContainer}>
                    <Image style={styles.LogoFruit} source={require('../assets/logo_fruit-sf.png')} />
                </View>
                <View style={styles.formContainer}>
                    <FlatList
                        data={productos}
                        renderItem={renderProduct}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    LogoFruit: {
        width: 150,
        height: 150,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#871F1F',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        width: '80%',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionButton: {
        borderRadius: 5,
        padding: 5,
        width: '45%',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#FFD700',
    },
    deleteButton: {
        backgroundColor: '#FF0000',
    },
});
