import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Header from "../Header";
import { Divider } from "react-native-elements";

const bottomTabIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/fluency-systems-filled/100/ffffff/home.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/100/ffffff/home.png",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/70/ffffff/search--v1.png",
    inactive: "https://img.icons8.com/ios-filled/50/ffffff/search--v1.png",
  },
  {
    name: "Post",
    active: "https://img.icons8.com/ios-glyphs/30/ffffff/plus--v1.png",
    inactive: "https://img.icons8.com/material-outlined/30/ffffff/plus--v2.png",
  },
  {
    name: "Like",
    active: "https://img.icons8.com/ios-glyphs/30/ffffff/like--v1.png",
    inactive: "https://img.icons8.com/ios-glyphs/30/ffffff/like--v2.png",
  },
  {
    name: "Profile",
    active: "https://unavatar.now.sh/github/1stevengrant",
    inactive: "https://unavatar.now.sh/github/1stevengrant",
  },
];

export default function BottomTabs({ navigation }) {
  const [activeTab, setActiveTab] = useState("Home");

  function handleTabChange(icon){
    setActiveTab(icon.name);
    if(icon.name==='Post'){
      navigation.push('NewPostScreen')
    }
  }

  const Icon = ({ imageStyle, icon }) => (
    <TouchableOpacity onPress={() => handleTabChange(icon)}>
      <Image
        style={[
          imageStyle,
          icon.name === "Profile" ? styles.profileIcon : null,
          icon.name === activeTab ? { borderWidth: 3 } : null,
        ]}
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
      />
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
      <Divider width={1} orientation="vertical" />
      <View style={styles.footerContainer}>
        {bottomTabIcons.map((icon, index) => (
          <Icon key={index} imageStyle={styles.footerIcon} icon={icon} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    paddingTop: 10,
    position: "absolute",
    bottom: 0,
    zIndex: 999,
    width: "100%",
  },
  footerIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  profileIcon: {
    borderRadius: 50,
    borderColor: "#fff",
  },
});
