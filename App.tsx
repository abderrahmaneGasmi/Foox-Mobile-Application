import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./components/Home";
import { useState } from "react";
import Foox from "./components/Foox";
import Aurora from "./layouts/Aurora";

export default function App() {
  const [showpage, setShowpage] = useState("Home");
  const changepage = (page: string) => {
    setShowpage(page);
  };
  return (
    <Aurora extrastyle={{ gap: 5, flex: 1 }}>
      <StatusBar style="auto" />
      {showpage === "Home" && <Home changepage={changepage} />}
      {/* {showpage === "Dashboard" && <Dashboard />} */}
      {showpage === "Foox" && <Foox changepage={changepage} />}
    </Aurora>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
