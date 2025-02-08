import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground, Image, FlatList, TouchableOpacity } from "react-native";

interface Ingredient {
    name: string;
    quantity: string;
}

interface Recipe {
    id: number;
    name: string;
    cuisine: string;
    instructions: string;
    ingredients: Ingredient[];
}

export default function FoodDataScreen() {
    const { id } = useLocalSearchParams();
    const OneFoodBG = require("../assets/images/OneFood.jpg");
    const [oneFoodData, setOneFoodData] = useState<Recipe | null>(null);
    const pizzaImg = require("../assets/images/Pizza.jpg");
    const otherfoods = require("../assets/images/OtherFoods.jpg");

    useEffect(() => {
        axios.get(`https://jkrecipeapi.vercel.app/api/onerecipe/${id}`)
            .then(res => {
                setOneFoodData(res.data.Result);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    return (
        <View style={styles.container}>
            <ImageBackground source={OneFoodBG} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    <View style={styles.foodData}>
                        {oneFoodData ? (
                            <View>
                                <Text style={styles.foodTitle}>{oneFoodData.name}</Text>
                                <Text style={{ fontSize: 15, color: 'white' }}>{oneFoodData.cuisine}</Text>
                                <Image
                                    source={oneFoodData.name.toLowerCase().includes("pizza") ? pizzaImg : otherfoods}
                                    style={styles.foodImg}
                                />

                                <View style={styles.foodContent}>
                                    <View>
                                        <Text style={styles.foodSubTitle}>Ingredients</Text>

                                        <FlatList 
                                            data={oneFoodData.ingredients}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) => (
                                                <View style={styles.Ingredients}>
                                                    <Text style={styles.instText}>{item.name}</Text>
                                                    <Text style={styles.instText}>{item.quantity}</Text>
                                                </View>
                                            )}
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.foodSubTitle}>Instructions</Text>
                                        <Text style={styles.instText}>{oneFoodData.instructions}</Text>
                                    </View>

                                </View>
                            </View>
                        ) : (
                            <Text style={styles.defaultText}>No data found</Text>
                        )}


                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    defaultText: {
        color: '#fff',
        fontSize: 20,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    background: {
        width: "100%",
        height: "100%",
    },
    foodData: {
        marginTop: 30,
        marginHorizontal: 20,
    },
    foodTitle: {
        color: 'orange',
        fontSize: 20
    },
    foodImg: {
        width: '100%',
        height: '30%',
        marginTop: 20,
        borderRadius: 20
    },
    foodSubTitle: {
        color: 'orange',
        fontSize: 20,
        marginBottom: 10
    },
    instText: {
        color: 'white',
        fontWeight: 'bold',
        lineHeight: 24,
    },
    foodContent: {
        marginVertical: 20
    },
    Ingredients: {
        backgroundColor: 'rgba(112,112,112, 0.5)",',
        padding: 15,
        borderRadius: 15,
        marginVertical: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
