import { Text, View, StyleSheet } from "react-native";

export default function FoodDashScreen (){
    return (
        <View style={styles.container}>
            <Text>
                Hi all
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})