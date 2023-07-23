import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../Constants/Colors";
import { TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
type focusitem = {
  id: number;
  title: string;
  time: number;
  state: string;
};
export default function Foox({
  // change page is when we change between home and focus page
  changepage,
}: {
  changepage: (page: string) => void;
}) {
  const [foucuslist, setFoucuslist] = useState<Array<focusitem>>([
    {
      id: 0,
      title: "Work",
      time: 25,
      state: "finished",
    },
    {
      id: 1,
      title: "Play a game",
      time: 30,
      state: "cancelled",
    },
    {
      id: 2,
      title: "Work",
      time: 25,
      state: "inprogress",
    },
  ]);
  // page showed is to change between list and timer
  const [pageshowed, setPageshowed] = useState("List");
  const [focusselected, setFocusselected] = useState<focusitem | null>(null);

  // this is to change between list and timer
  const showpage = (page: string, id?: number) => {
    if (id !== undefined && id !== null) {
      setFocusselected(foucuslist[id]);
    }
    setPageshowed(page);
  };
  const addnewfocus = (focus: {
    id: number;
    title: string;
    time: number;
    state: string;
  }) => {
    if (focus.title === "") {
      alert("Please enter a title");
      return;
    }
    if (focus.time === 0) {
      alert("Please enter a time");

      return;
    }

    setFoucuslist([...foucuslist, focus]);
  };
  return (
    <>
      {pageshowed === "List" ? (
        <ShowList
          foucuslist={foucuslist}
          changepage={changepage}
          showpage={showpage}
          addnewfocus={addnewfocus}
        />
      ) : focusselected?.title ? (
        <ShowTimer
          showpage={showpage}
          time={focusselected.time}
          state={focusselected.state}
          title={focusselected.title}
        />
      ) : (
        <Text>ASDadsadsdas</Text>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    position: "relative",
    // alignItems: "center",
    zIndex: 8,

    // justifyContent: "center",
  },
  header: {
    flex: 1,
    alignItems: "center",
    gap: 40,
  },
  headertext: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },
  textinput: {
    borderColor: "gray",
    borderWidth: 0,
    borderBottomWidth: 2,
    minWidth: "70%",
    maxWidth: "75%",
    fontSize: 25,
    padding: 5,
    color: "#333",
  },
  focusicon: {
    // width: 50,
    // height: 50,
    backgroundColor: colors.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    padding: 15,
  },
  viewitems: {
    // flex: 1,
    // gap: 30,
    height: 300,
    marginBottom: 100,
  },
  viewitem: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

const FocusItem = ({
  title,
  time,
  state,
  selecttimer,
  id,
}: {
  title: string;
  time: number;
  state: string;
  id: number;
  selecttimer: (page: string, id?: number) => void;
}) => {
  return (
    <View
      style={{
        ...styles.viewitem,
        backgroundColor:
          state === "finished"
            ? colors.green
            : state == "cancelled"
            ? colors.red
            : colors.primary,
      }}
      onTouchEnd={() => {
        selecttimer("Timer", id);
      }}
    >
      <View>
        <Ionicons
          name={
            state === "finished"
              ? "checkmark-outline"
              : state == "cancelled"
              ? "close-outline"
              : "rocket-outline"
          }
          size={50}
          color={"#fff"}
          style={{
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            padding: 5,
          }}
        />
      </View>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>
          {title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons name={"alarm-outline"} size={30} color={"#fff"} />
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            {time}
          </Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          State : {state}
        </Text>
      </View>
      <Ionicons
        name={"caret-forward-outline"}
        size={30}
        color={"#fff"}
        style={{}}
      />
    </View>
  );
};

const ShowList = ({
  foucuslist,
  changepage,
  showpage,
  addnewfocus,
}: {
  foucuslist: {
    id: number;
    title: string;
    time: number;
    state: string;
  }[];
  changepage: (page: string) => void;
  showpage: (page: string, id?: number) => void;
  addnewfocus: (focus: {
    id: number;
    title: string;
    time: number;
    state: string;
  }) => void;
}) => {
  const [newfocus, setNewfocus] = useState({
    id: foucuslist.length,
    title: "",
    time: 0,
    state: "inprogress",
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertext}>Choose what you want to focus on</Text>
        <View
          style={{
            width: "90%",
            flex: 1,
            height: 50,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 18,
            marginTop: 40,
          }}
        >
          <TextInput
            style={styles.textinput}
            placeholder="add new focus"
            value={newfocus.title}
            onChangeText={(text) => {
              setNewfocus({ ...newfocus, title: text });
            }}
          />
          <Ionicons
            name={"golf-outline"}
            size={35}
            color={"#fff"}
            style={styles.focusicon}
            onPress={() => {
              addnewfocus(newfocus);
              setNewfocus({
                id: foucuslist.length + 1,
                title: "",
                time: 0,
                state: "inprogress",
              });
            }}
            //   style={{ marginLeft: 20 }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              backgroundColor:
                newfocus.time == 5 ? colors.secondary : colors.primary,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setNewfocus({ ...newfocus, time: 5 });
            }}
          >
            5{" "}
          </Text>
          <View
            style={{
              backgroundColor:
                newfocus.time === 10 ? colors.secondary : colors.primary,
              padding: 10,
              borderRadius: 10,
            }}
            onTouchEnd={() => {
              setNewfocus({ ...newfocus, time: 10 });
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              10{" "}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              backgroundColor:
                newfocus.time === 15 ? colors.secondary : colors.primary,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setNewfocus({ ...newfocus, time: 15 });
            }}
          >
            15{" "}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              backgroundColor:
                newfocus.time === 20 ? colors.secondary : colors.primary,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setNewfocus({ ...newfocus, time: 20 });
            }}
          >
            20{" "}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              backgroundColor:
                newfocus.time === 25 ? colors.secondary : colors.primary,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setNewfocus({ ...newfocus, time: 25 });
            }}
          >
            25{" "}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              backgroundColor:
                newfocus.time === 30 ? colors.secondary : colors.primary,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setNewfocus({ ...newfocus, time: 30 });
            }}
          >
            30{" "}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              backgroundColor:
                newfocus.time === 35 ? colors.secondary : colors.primary,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setNewfocus({ ...newfocus, time: 35 });
            }}
          >
            35{" "}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              backgroundColor:
                newfocus.time === 40 ? colors.secondary : colors.primary,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setNewfocus({ ...newfocus, time: 40 });
            }}
          >
            40{" "}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              backgroundColor:
                newfocus.time === 45 ? colors.secondary : colors.primary,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setNewfocus({ ...newfocus, time: 45 });
            }}
          >
            45{" "}
          </Text>
        </View>
      </View>
      <ScrollView style={styles.viewitems}>
        {foucuslist.map((item, i) => (
          <FocusItem
            title={item.title}
            time={item.time}
            state={item.state}
            key={i}
            selecttimer={showpage}
            id={item.id}
          />
        ))}
      </ScrollView>
      <View
        style={{
          zIndex: 5,
          backgroundColor: colors.secondary,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          position: "absolute",
          bottom: 30,
          flex: 1,
          gap: 10,
        }}
        onTouchEnd={() => {
          changepage("Home");
        }}
      >
        <Ionicons
          name={"chevron-back-outline"}
          size={30}
          color={"#fff"}
          //   style={{ marginLeft: 20 }}
        />
        <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold" }}>
          Return
        </Text>
      </View>
    </View>
  );
};
const ShowTimer = ({
  showpage,
  state,
  time,
  title,
}: //   gettimer,
{
  showpage: (page: string, id?: number) => void;
  title?: string;
  time?: number;
  state?: string;

  //   gettimer: () =>
  //     | {
  //         id: number;
  //         title: string;
  //         time: number;
  //         state: string;
  //       }
  //     | null
  //     | undefined;
}) => {
  if (!time) return null;
  const [countdown, setCountdown] = useState({
    minutes: time,
    seconds: 0,
  });
  const [pausecount, setPausecount] = useState(false);
  useEffect(() => {
    // Exit early when the countdown reaches 0
    if (time <= 0) return;
    if (countdown.minutes <= 0 && countdown.seconds <= 0) return;
    const intervalId = setInterval(() => {
      if (countdown.seconds > 0) {
        setCountdown({
          minutes: countdown.minutes,
          seconds: countdown.seconds - 1,
        });
      }
      if (countdown.seconds === 0) {
        if (countdown.minutes === 0) {
          clearInterval(intervalId);
        } else {
          setCountdown({
            minutes: countdown.minutes - 1,
            seconds: 59,
          });
        }
      }
    }, 1000);
    if (pausecount) {
      clearInterval(intervalId);
    }
    // Clean up the interval when the component unmounts or countdown reaches 0
    return () => clearInterval(intervalId);
  }, [countdown]);
  const stopcountdown = () => {
    setCountdown({
      minutes: time,
      seconds: 0,
    });
  };
  const pausecountdown = () => {
    setCountdown({
      minutes: countdown.minutes,
      seconds: countdown.seconds,
    });
    setPausecount(!pausecount);
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: colors.primary,
          textAlign: "center",
        }}
      >
        Focusing on :
      </Text>
      <Text
        style={{
          fontSize: 20,
          //   fontWeight: "bold",
          color: colors.primary,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 60,
          //   fontWeight: "bold",
          color: "white",

          textAlign: "center",
          marginTop: 50,
          padding: 10,
          backgroundColor: colors.primary,
          marginHorizontal: 40,
        }}
      >
        {countdown.minutes}:{countdown.seconds}
      </Text>
      <Image
        source={require("../assets/focus2.png")}
        style={{
          width: "80%",
          height: "40%",
          resizeMode: "contain",
          alignSelf: "center",
          marginTop: 40,
        }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          marginTop: 40,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            backgroundColor: colors.primary,
            color: "white",
            padding: 10,
          }}
          onPress={pausecountdown}
        >
          {pausecount ? "Resume" : "Pause"}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            backgroundColor: colors.red,
            color: "white",
            padding: 10,
          }}
        >
          Cancel
        </Text>
      </View>
      <View
        style={{
          zIndex: 5,
          backgroundColor: colors.secondary,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          position: "absolute",
          bottom: 30,
          flex: 1,
          gap: 10,
        }}
        onTouchEnd={() => {
          //   changepage("Home");
          showpage("List");
        }}
      >
        <Ionicons
          name={"chevron-back-outline"}
          size={30}
          color={"#fff"}
          //   style={{ marginLeft: 20 }}
        />
        <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold" }}>
          Return
        </Text>
      </View>
    </View>
  );
};
