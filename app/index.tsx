import { Text, View, StyleSheet, ImageBackground } from "react-native";

export default function Index() {
  // Local image reference
  const image = require("../assets/images/WelcomeImg.jpg");

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <Text style={styles.text}>Welcome to TasteBite</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
