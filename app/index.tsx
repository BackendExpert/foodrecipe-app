import { Link } from "expo-router";
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";

export default function Index() {
  // Local image reference
  const image = require("../assets/images/WelcomeImg.jpg");
  const logoNew = require("../assets/images/LogoNew.png");
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.headerpart}>
            <Text style={styles.headerTest}>Free Food Recipes</Text>
          </View>
          <View>
            
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyTitle}>Lets Cook with</Text>
            <Image source={logoNew} style={styles.logoStyle}/>
            <Text style={styles.bodyText}>The Food Recipe App</Text>
          </View>
          <View style={styles.footer}>
            {/* TouchableOpacity for Start Cooking */}
            <TouchableOpacity>
              <Link href="/fooddash" style={styles.footerBtn}>
                <Text style={styles.footbtnText}>Start Cooking</Text>
              </Link>
            </TouchableOpacity>
            <Text style={styles.footercontent}>v1.0.0-10 Feb 2025</Text>            
            <Text style={styles.footercontent}>
              Developed using <Link href={'https://rapidapi.com/jehankandy/api/jkrecipeapi2'} style={{ color: "orange"}}>JKRecipeAPI</Link>
            </Text>
          </View>
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  logoStyle: {
    width: '100%',
    height: '35%'
  },
  container: {
    flex: 1,
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
  headerpart: {
    paddingTop: 40,    
  },
  headerTest: {
    color: "gray",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 400,
    borderRadius: 10,
  },

  bodyText: {
    color: "#fff",
    marginTop: -10,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  bodyTitle: {
    color: "#fff",
    marginTop: -10,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  footer: {
    marginHorizontal: 60,
    marginTop: -20,
  },
  footerBtn: {
    backgroundColor: 'orange',
    padding: 20,
    borderRadius: 10,
    marginBottom: 12
  },
  footbtnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  footercontent: {
    color: 'white',
    fontSize: 10,
    textAlign: "center"
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
