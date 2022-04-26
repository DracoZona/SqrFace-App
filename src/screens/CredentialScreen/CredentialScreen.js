import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

const CredentialScreen = () => {
  return (
    <ScrollView>
      <View style={styles.root}>
        <View>
          <Text>User Credential</Text>
        </View>

        <View>
          <Text>Vaccination Status</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    minHeight: 500,
    marginBottom: 528,
  },
});

export default CredentialScreen;
