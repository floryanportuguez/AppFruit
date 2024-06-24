import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Favoritos({ route }) {
    const { favorites } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Favoritos</Text>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.url}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemTitle}>{item.name}</Text>
                            <AntDesign name="heart" size={24} color="red" />
                        </View>
                        <Text>Height: {item.height}</Text>
                        <Text>Eye Color: {item.eye_color}</Text>
                        <Text>Gender: {item.gender}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
        backgroundColor: '#fff'
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    itemContainer: {
        backgroundColor: "#D9D9D9",
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        width: 300,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
