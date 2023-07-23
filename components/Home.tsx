import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Aurora from "../layouts/Aurora";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../Constants/Colors";

export default function Home({
  changepage,
}: {
  changepage: (page: string) => void;
}) {
  return (
    <View style={style.container}>
      <Image source={require("../assets/Fox.png")} style={style.homeimage} />
      <Text
        style={{ fontSize: 50, fontWeight: "bold", color: colors.secondary }}
      >
        Welcome to Foox
      </Text>
      <Text style={{ fontSize: 20, color: colors.secondary }}>
        Choose what you focus on
      </Text>
      <View
        style={{
          zIndex: 5,
          backgroundColor: colors.primary,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 30,
          flex: 1,
          gap: 10,
        }}
        onTouchEnd={() => {
          changepage("Foox");
        }}
      >
        <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold" }}>
          Get Started
        </Text>
        <Ionicons
          name={"chevron-forward-outline"}
          size={30}
          color={"#fff"}
          //   style={{ marginLeft: 20 }}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  circle: {
    width: 390,
    height: 300,
    position: "absolute",
    left: -120,
    top: -20,
    zIndex: 5,
  },
  circle2: {
    width: 150,
    height: 150,
    position: "absolute",
    right: -80,
    bottom: -20,
    zIndex: 5,
  },
  circle3: {
    width: 350,
    height: 350,
    position: "absolute",
    left: -120,
    zIndex: 5,

    top: "50%",
  },
  circle4: {
    width: 650,
    height: 650,
    position: "absolute",
    right: -320,
    top: "10%",
    zIndex: 5,
  },
  homeimage: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    position: "relative",
    left: -30,
  },
});
