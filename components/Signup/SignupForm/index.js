import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import { firebase, db } from "../../../firebase";

export default function SignupForm({ navigation }) {
  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An Email is required"),
    username: Yup.string().required().min(2, "A username is required"),
    password: Yup.string()
      .required()
      .min(8, "Your password must have at least 8 charachters"),
  });

  const getRandomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignup = async (email, password, username) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("🔥 firebase user created successful ✅", email, password);
      db.collection("users")
        .doc(authUser.user.email)
        .set({
          owner_uid: authUser.user.uid,
          username: username,
          email: authUser.user.email,
          profile_picture: await getRandomProfilePicture(),
        });
    } catch (error) {
      Alert.alert(
        "🔥 My Lord !!!",
        error.message + "\n\n What would you like to do next? 👀",
        [
          {
            text: "OK",
            onPress: () => console.log("OK"),
            style: "cancel",
          },
          {
            text: "Sign Up",
            onPress: () => navigation.push("SignupScreen"),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          onSignup(values.email, values.password, values.username);
        }}
        validationSchema={loginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "gray"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderColor="#444"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.username.length || values.username.length >= 8
                      ? "gray"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderColor="#444"
                placeholder="Username"
                autoCapitalize="none"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("email")}
                value={values.username}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 8
                      ? "gray"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                textContentType="password"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <Pressable
              onPress={handleSubmit}
              style={[styles.button, !isValid ? styles.disabledButton : null]}
              titleSize={20}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: "#6BB0F5" }}> Log in</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    borderColor: "gray",
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#0096F5",
    alignItems: "center",
    minHeight: 42,
    marginTop: 15,
    borderRadius: 4,
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#9ACAF7",
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 17,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
});
