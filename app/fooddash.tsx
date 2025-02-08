import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ImageBackground } from "react-native";

interface Recipe {
    id: number;
    name: string;
}

export default function FoodDashScreen() {
    const image = require("../assets/images/DashBG.jpg");
    const [apidata, setApiData] = useState<Recipe[]>([]);

    useEffect(() => {
        axios
            .get("https://jkrecipeapi.vercel.app/api/alldata")
            .then((res) => setApiData(res.data.Result)) 
            .catch((err) => console.log(err)); 
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    
                </View>
            </ImageBackground>
        </View>
        // <View style={styles.container}>
        //     <FlatList
        //         data={apidata}
        //         keyExtractor={(item) => item.id.toString()}
        //         renderItem={({ item }) => (
        //             <View style={styles.item}>
        //                 <View>
        //                     <Text>{item.name}</Text> 

        //                 </View>

        //             </View>
        //         )}
        //     />
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#f8f8f8",
        borderRadius: 5,
    },
    background: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute", // Position the overlay absolutely within the parent
        top: 0,
        left: 0,
        right: 0,
        bottom: 0, // Full screen
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Optional translucent overlay
    },
});
