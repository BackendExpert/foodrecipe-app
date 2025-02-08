import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";

export default function foodDataScreen (){
    const {id} = useLocalSearchParams()
    const OneFoodBG = require("../assets/images/OneFood.jpg");
    return (
        <View style={styles.container}>
            <ImageBackground source={OneFoodBG} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    <View>
                        <Text style={styles.defualtText}>lo</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    defualtText: {
        color: '#000',
        fontSize: 20
    },
    overlay: {
        position: "absolute", // Position the overlay absolutely within the parent
        top: 0,
        left: 0,
        right: 0,
        bottom: 0, // Full screen
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Optional translucent overlay
    }, 
    background: {
        width: "100%",
        height: "100%",
    }
})