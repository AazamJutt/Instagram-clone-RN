import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React from "react";
import AddNewPost from "../../components/NewPost/AddNewPost";

export default function NewPostScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
