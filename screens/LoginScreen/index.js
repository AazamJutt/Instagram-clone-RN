import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import LoginForm from "../../components/Login/LoginForm";

const INSTAGRAM_LOGO =
  "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png";

export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: INSTAGRAM_LOGO, height: 100, width: 100 }} />
      </View>
      {/* LoginForm */}
      <LoginForm navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "white",
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});
