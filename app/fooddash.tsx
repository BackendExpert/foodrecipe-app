import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

interface Recipe {
    id: number;
    name: string;
}

export default function FoodDashScreen() {
    const [apidata, setApiData] = useState<Recipe[]>([]);

    useEffect(() => {
        axios
            .get("https://jkrecipeapi.vercel.app/api/alldata")
            .then((res) => setApiData(res.data.Result)) 
            .catch((err) => console.log(err)); 
    }, []);

    return (
        <View style={styles.container}>
            <Text>Dashboard</Text>
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
        padding: 10,
        backgroundColor: "#000"
    },
    item: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#f8f8f8",
        borderRadius: 5,
    },
});
