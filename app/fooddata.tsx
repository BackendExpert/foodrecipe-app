import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";

interface Recipe {
    id: number;
    name: string;
    cuisine: string;
}

export default function FoodDataScreen() {
    const { id } = useLocalSearchParams();
    const OneFoodBG = require("../assets/images/OneFood.jpg");
    const [oneFoodData, setOneFoodData] = useState<Recipe | null>(null);

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
                            <Text style={styles.defaultText}>{oneFoodData.name}</Text>
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
    }
});
