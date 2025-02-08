import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";

export default function foodDataScreen (){
    const {id} = useLocalSearchParams()
    return (
        <View style={styles.container}>
            <Text style={styles.defualtText}>Food Data : {id}</Text>
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
    }    
})