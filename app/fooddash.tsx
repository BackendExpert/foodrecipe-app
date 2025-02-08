import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ImageBackground, Image, TouchableOpacity, TextInput } from "react-native";

interface Recipe {
    id: number;
    name: string;
    cuisine: string;
}

export default function FoodDashScreen() {
    const image = require("../assets/images/DashBG.jpg");
    const pizzaImg = require("../assets/images/Pizza.jpg");
    const otherfoods = require("../assets/images/OtherFoods.jpg");

    const [apidata, setApiData] = useState<Recipe[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    
    useEffect(() => {
        axios
            .get("https://jkrecipeapi.vercel.app/api/alldata")
            .then((res) => setApiData(res.data.Result)) 
            .catch((err) => console.log(err)); 
    }, []);

    // const filteredData = apidata.filter(item =>
    //     item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    //     searchQuery.length >= 1
    // );

    const filteredData = searchQuery.length >= 2 
    ? apidata.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) 
    : apidata; 

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    <View style={styles.dashHeader}>
                        <Text style={styles.dashHeaderText}>Food Recipes</Text>
                    </View>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search recipes..."
                        placeholderTextColor="white"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <View style={styles.foodrecipes}>
                    <FlatList
                        data={filteredData} 
                        keyExtractor={(item) => item.id.toString()} 
                        renderItem={({ item }) => {
                            if (item.name.toLowerCase().includes("pizza")) {
                                return (
                                    <Link href={{ pathname: "/fooddata", params: { id: item.id } }} asChild>

                                            <TouchableOpacity style={styles.item}>
                                                <Image source={pizzaImg} style={styles.itemImg}/>
                                                <View>
                                                    <Text style={styles.foodRecipeText}>{item.name}</Text> 
                                                    <View style={styles.recipeData}>
                                                        <Text style={styles.otherItemText}>{item.cuisine}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                    </Link>
                                );
                            }
                            else{
                                return (
                                    <Link href={'/fooddash'}>

                                            <TouchableOpacity style={styles.item}>
                                                <Image source={otherfoods} style={styles.itemImg}/>
                                                <View>
                                                    <Text style={styles.foodRecipeText}>{item.name}</Text> 
                                                    <View style={styles.recipeData}>
                                                        <Text style={styles.otherItemText}>{item.cuisine}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                    </Link>
                                );
                            }
                        }}
                    />
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
    foodrecipes: {
        marginTop: 40,
        marginBottom: 160,
        marginHorizontal: 10
    },
    otherItemText:{
        color: 'white'
    },
    item: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    recipeData: {
        paddingLeft: 20
    },
    itemImg:{
        width: 60,
        height: 60,
        borderRadius: 10
    },
    itemData: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    arrowImg: {
        width: 20,
        height: 20,
    },
    foodRecipeText: {
        color: 'orange', 
        paddingLeft: 20, 
        fontSize: 20
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
    dashHeader: {
        paddingTop: 25
    },
    dashHeaderText: {
        color: 'orange',
        textAlign: 'center',
        fontSize: 15
    },
    searchInput: {
        marginTop: 20,
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(103, 102, 102, 0.7)',
        color: 'white',
    }
});
