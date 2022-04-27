import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import database from "@react-native-firebase/database"


const CredentialScreen = () => {


  return (
    <ScrollView>
      <View style={styles.root}>
        <View>
          <Text>User Credential</Text>
          <Text>Name:</Text>
          <Text>Gender:</Text>
          <Text>Birthdate:</Text>
          <Text>Primary Mobile No.:</Text>
          <Text>Email:</Text>
          

        </View>

        <View>
          <Text>Vaccination Status</Text>
          <Text>Vaccine Name:</Text>
          <Text>Booster Name:</Text>
          <Text>Date of 1st Dose:</Text>
          <Text>Date of 2nd Dose:</Text>
          <Text>Date of Booster Shot:</Text>
        </View>

        <View>
          <Text>User's Qr Code</Text>
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
