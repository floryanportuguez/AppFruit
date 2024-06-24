import React, { useState, useEffect } from 'react';
import { StatusBar, Image, StyleSheet, Text, View, ActivityIndicator, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';

export default function Aprender() {
    const navigation = useNavigation();

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [favorites, setFavorites] = useState([]);

    const getCharacters = async () => {
        try {
            const response = await fetch('https://swapi.dev/api/people');
            const json = await response.json();
            setData(json.results);
            setFilteredData(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCharacters();
    }, []);

    const handleSearch = (text) => {
        setSearch(text);
        const newData = data.filter(item => {
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setFilteredData(newData);
    };

    const handleToggleFavorite = (item) => {
        const isFavorite = favorites.some(fav => fav.url === item.url);
        if (isFavorite) {
            setFavorites(favorites.filter(fav => fav.url !== item.url));
        } else {
            setFavorites([...favorites, item]);
        }
    };

    const navigateToFavorites = () => {
        navigation.navigate('Favoritos', { favorites });
    };

    return (
        <ImageBackground
            source={require("../assets/logo-se.png")}
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../assets/logo_fruit-sf.png")}
                        style={styles.logo}
                    />
                </View>
                <Text style={styles.titulo}>Frutas</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Buscar por nombre"
                        onChangeText={handleSearch}
                        value={search}
                    />
                    <TouchableOpacity style={styles.button} onPress={navigateToFavorites}>
                        <Text style={styles.buttonText}>Favoritos</Text>
                    </TouchableOpacity>
                </View>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#00ff00" />
                ) : (
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.url}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => handleToggleFavorite(item)}>
                                    <AntDesign
                                        name={favorites.some(fav => fav.url === item.url) ? 'heart' : 'hearto'}
                                        size={24}
                                        color={favorites.some(fav => fav.url === item.url) ? 'red' : 'black'}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.itemTitle}>{item.name}</Text>
                                <Text>Height: {item.height}</Text>
                                <Text>Eye Color: {item.eye_color}</Text>
                                <Text>Gender: {item.gender}</Text>
                            </View>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                )}
                <StatusBar style="auto" />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logoContainer: {
        marginBottom: 20,
    },
    logo: {
        width: 200,
        height: 200,
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: 150,
    },
    button: {
        marginLeft: 10,
        backgroundColor: '#871F1F',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#D9D9D9',
        fontWeight: 'bold',
    },
    itemContainer: {
        backgroundColor: "#D9D9D9",
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        width: 200,
        height: 200,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
});
