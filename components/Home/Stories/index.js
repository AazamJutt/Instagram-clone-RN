import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import { USERS } from "../../../data/users";

export default function Stories() {
  return (
    <View styles={{ marginBottom: 30 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style={{ alignItems: "center", marginLeft: 15 }}>
            <Image source={{ uri: story.image }} style={styles.story} />
            <Text style={{ color: "white" }}>
              {story.user.length > 11
                ? story.user.slice(0, 10).toLowerCase() + "..."
                : story.user}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
});
