import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground, Image, FlatList } from "react-native";

interface Ingredients {
    name: string;
    quantity: string;
}

interface Recipe {
    id: number;
    name: string;
    cuisine: string;
    instructions: string;
    ingredients: Ingredients[];
}

export default function FoodDataScreen() {
    const { id } = useLocalSearchParams();
    const oneFoodBG = require("../assets/images/OneFood.jpg");
    const pizzaImg = require("../assets/images/Pizza.jpg");
    const otherFoods = require("../assets/images/OtherFoods.jpg");
    const [oneFood, setOneFood] = useState<Recipe | null>(null);

    useEffect(() => {
        axios
            .get(`https://jkrecipeapi.vercel.app/api/onerecipe/${id}`)
            .then((res) => setOneFood(res.data.Result))
            .catch((err) => console.log(err));
    }, [id]); // Added dependency

    return (
        <View style={styles.container}>
            <ImageBackground source={oneFoodBG} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    <FlatList
                        data={oneFood ? oneFood.ingredients : []}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.foodContent} // Added to manage spacing
                        ListHeaderComponent={
                            <View>
                                <View style={styles.headerFood}>
                                    <Text style={styles.HeaderTitle}>{oneFood ? oneFood.name : ""}</Text>
                                    <Text style={styles.subHeader}>{oneFood ? oneFood.cuisine : ""}</Text>
                                </View>
                                {oneFood && oneFood.name ? (
                                    <Image style={styles.FoodImg} source={oneFood.name.toLowerCase().includes("pizza") ? pizzaImg : otherFoods} />
                                ) : (
                                    <Text style={styles.loadingText}>Loading Image...</Text>
                                )}
                            </View>
                        }
                        renderItem={({ item }) => (
                            <View style={styles.ingredientItem}>
                                <Text style={styles.ingredientText}>{item.name}</Text>
                                <Text style={styles.ingredientText}>{item.quantity}</Text>
                            </View>
                        )}
                        ListFooterComponent={
                            <View>
                                <Text style={styles.titleText}>Instructions</Text>
                                <Text style={styles.insText}>{oneFood ? oneFood.instructions : ""}</Text>

                                <View>
                                    <Text style={styles.titleText}>Cooking Time and Servings</Text>
                                </View>
                            </View>
                        }
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
    background: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    foodContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    headerFood: {
        paddingTop: 30,
        paddingLeft: 20,
    },
    HeaderTitle: {
        color: "orange",
        fontSize: 25,
    },
    subHeader: {
        color: "white",
        fontSize: 15,
    },
    FoodImg: {
        width: "100%",
        height: 200,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
    },
    ingredientItem: {
        backgroundColor: "rgba(112,112,112, 0.6)",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    ingredientText: {
        color: "white",
    },
    titleText: {
        color: "orange",
        fontSize: 20,
    },
    insText: {
        color: "white",
        fontSize: 15,
        lineHeight: 24,
    },
    loadingText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        marginVertical: 10,
    },
});

