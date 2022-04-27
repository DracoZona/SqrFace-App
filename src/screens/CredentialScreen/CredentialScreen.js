import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { db } from '../../../firebase'
import * as firebasedb from "firebase/database";




const CredentialScreen = () => {

  const [name, setName] = React.useState();

  React.useEffect( () => {
    console.log(firebasedb.default)
    const reference = firebasedb.ref(db, 'User/Name');
    firebasedb.onValue(reference, (snapshot) => {
      setName(snapshot.val())
    });
  })

  

  return (
    <ScrollView>
      <View style={styles.root}>
        <View>
          <Text>User Credential</Text>
          <Text>Name:{name}</Text>
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
