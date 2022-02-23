import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import Stories from "../../components/Home/Stories";
import Post from "../../components/Home/Post";
import BottomTabs from "../../components/Home/BottomTabs";
import { POSTS } from "../../data/posts";
import { db } from "../../firebase";

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collectionGroup("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Stories />
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      <BottomTabs navigation={navigation} />
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
