import axios from "axios";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground, Image, ScrollView, FlatList } from "react-native";


interface ingredients {
    name: string,
    quantity: string,
}

interface Recipe {
    id: number;
    name: string;
    cuisine: string;
    instructions: string;
    ingredients: ingredients[];
}

export default function FoodDataScreen() {
    const {id} = useLocalSearchParams()
    const oneFoodBG = require("../assets/images/OneFood.jpg");
    const pizzaImg = require("../assets/images/Pizza.jpg");
    const otherfoods = require("../assets/images/OtherFoods.jpg");
    const [oneFood, SetoneFood] = useState<Recipe | null>(null);

    useEffect(() => {
        axios.get(`https://jkrecipeapi.vercel.app/api/onerecipe/${id}`)
        .then(res => SetoneFood(res.data.Result))
        .catch(err => console.log(err)) 
    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground source={oneFoodBG} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    <ScrollView contentContainerStyle={styles.foodContent}>
                        <View style={styles.headerFood}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.HeaderTitle}>{oneFood ? oneFood.name : ""}</Text>
                                <Text style={styles.subHeader}>{oneFood ? oneFood.cuisine : ''}</Text>
                            </View>
                        </View>
                        <View>
                            {oneFood && oneFood.name ? (
                                <Image style={styles.FoodImg} source={oneFood.name.toLowerCase().includes("pizza") ? pizzaImg : otherfoods} />
                            ) : (
                                <Text>Loading...</Text>
                            )}
                        </View>
                            {oneFood ? (
                                <FlatList
                                    data={oneFood.ingredients}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.ingredientItem}>
                                            <Text style={styles.ingredientText}>{item.name} </Text>
                                            <Text style={styles.ingredientText}>{item.quantity}</Text>
                                        </View>
                                    )}
                                />
                            ) : (
                                <Text>Loading ingredients...</Text>
                            )}
                        
                        <View>
                            <Text style={styles.titleText}>Instructions</Text>
                            <Text style={styles.insText}>{oneFood ? oneFood.instructions : ''}</Text>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    defultText: {
        color: '#fff',
        fontSize: 20
    },
    background: {
        width: '100%',
        height: '100%'
    },
    overlay: {
        position: "absolute", 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0, 
        backgroundColor: "rgba(0, 0, 0, 0.6)", 
    },
    foodContent:{
        marginHorizontal: 20,
        flexGrow: 1,
        paddingBottom: 20,
    },
    headerFood: {
        paddingTop: 30,
        paddingLeft: 20,
        flexDirection: 'row'
    },
    backImage: {
        width: 50,
        height: 50
    },
    HeaderTitle: {
        color: 'orange',
        fontSize: 25
    },
    subHeader: {
        color: 'white',
        fontSize: 15
    },
    FoodImg: {
        width: '100%',
        height: 200,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10
    },
    ingredientItem: {
        backgroundColor: "rgba(112,112,112, 0.6)",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ingredientText: {
        color: 'white'
    },
    titleText: {
        color: 'orange',
        fontSize: 20
    },
    insText: {
        color: 'white',
        fontSize: 15,
        lineHeight: 24
    }
    
})