import axios from "axios";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";

interface Recipe {
    id: number;
    name: string;
    cuisine: string;
}

export default function FoodDataScreen() {
    const {id} = useLocalSearchParams()
    const oneFoodBG = require("../assets/images/OneFood.jpg");
    const [oneFood, SetoneFood] = useState<Recipe[]>([]);

    useEffect(() => {
        axios.get(`https://jkrecipeapi.vercel.app/api/onerecipe/${id}`)
        .then(res => SetoneFood(res.data.Result))
        .catch(err => console.log(err)) 
    }, [])
    
    return (
        <View style={styles.container}>
            <ImageBackground source={oneFoodBG} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    
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
        color: '#000',
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
})