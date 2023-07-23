import React from "react";
import {
  Image,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

export default function Aurora({
  children,
  extrastyle,
}: {
  children: React.ReactNode;
  extrastyle?: any;
}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ ...style.container, ...extrastyle }}>
        {/* <View style={style.circle}></View> */}
        {children}

        {/* <View style={style.circle}></View> */}
        <Image
          source={require("../assets/yellowcircle.png")}
          style={style.circle}
        />
        <Image
          source={require("../assets/greencircle.png")}
          style={style.circle2}
        />
        <Image
          source={require("../assets/bluecircle.png")}
          style={style.circle3}
        />
        <Image
          source={require("../assets/purpelcircle.png")}
          style={style.circle4}
        />
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F0FF",

    position: "relative",
  },
  circle: {
    width: 390,
    height: 300,
    position: "absolute",
    left: -120,
    top: -20,
    zIndex: -1,
  },
  circle2: {
    width: 350,
    height: 250,
    position: "absolute",
    right: -150,
    bottom: -20,
    zIndex: -1,
  },
  circle3: {
    width: 350,
    height: 350,
    position: "absolute",
    left: -120,
    zIndex: -1,

    top: "50%",
  },
  circle4: {
    width: 650,
    height: 650,
    position: "absolute",
    right: -320,
    top: "10%",
    zIndex: -1,
  },
  homeimage: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    position: "relative",
    left: -30,
  },
});
