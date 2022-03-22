import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import SignInScreen from "./src/screens/SignInScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <SignInScreen />
      <Text>Test</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});
