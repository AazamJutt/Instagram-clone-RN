import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import firebase from "firebase/compat";

export default function Header() {
  const handleSignOut = async () => {
    try {
      await firebase
        .auth()
        .signOut()
        .then(() => console.log("Signed out successfully"));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Image
          style={styles.logo}
          source={require("../../../assets/header.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadBadgeText}>11</Text>
        </View>
        <Image
          style={{ height: 30, width: 30 }}
          source={require("../../../assets/dm.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  unreadBadge: {
    backgroundColor: "#FF3250",
    position: "absolute",
    left: 17,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "600",
  },
});
