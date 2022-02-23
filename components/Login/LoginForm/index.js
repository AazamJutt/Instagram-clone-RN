import {
  Alert,
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
import {firebase} from "../../../firebase";

export default function LoginForm({ navigation }) {
  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An Email is required"),
    password: Yup.string()
      .required()
      .min(8, "Your password must have at least 8 charachters"),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("🔥 firebase login successful ✅", email, password);
    } catch (error) {
      console.log(error.message);
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
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
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
                placeholder="Phone , username or email"
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
            <TouchableOpacity
              style={{ alignItems: "flex-end", marginBottom: 30 }}
            >
              <Text style={{ color: "#6BB0F5" }}>Forgot Password?</Text>
            </TouchableOpacity>
            <Pressable
              onPress={handleSubmit}
              style={[styles.button, !isValid ? styles.disabledButton : null]}
              titleSize={20}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
                <Text style={{ color: "#6BB0F5" }}> Sign Up</Text>
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
