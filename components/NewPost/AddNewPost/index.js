import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import FormikPostUploader from "../FormikPostUploader";

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={{
          uri: "https://img.icons8.com/ios-filled/50/ffffff/back.png",
        }}
        style={{ width: 25, height: 25 }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>NEW POST</Text>
    <Text></Text>
  </View>
);

export default function AddNewPost({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FormikPostUploader navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 10,
  },

  headerText: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
    marginRight: 25,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
