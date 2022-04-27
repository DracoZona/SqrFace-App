import { View, Text, StyleSheet, ScrollView, Image,  } from "react-native";
import React from "react";
import { refs } from '../../../firebase'




const CredentialScreen = () => {
  const currentUser = 1;
  const [user, setUser] = React.useState({})
  const [image, setImage] = React.useState();

  React.useEffect( () => {
    refs.db.on('value', (snapshot) => {
      const val = snapshot.val()
      const user = val.User[currentUser]
      if(user){
        setUser(user)
        console.log(user)
        if(user.Image) {
          refs.storage.child(user.Image).getDownloadURL().then(v => setImage(v)).catch(console.error)
        }
      }
    });
  }, [])

  

  return (
    <ScrollView>
      <View style={styles.root}>
        <View>
          <Image style={{width: 100, height: 100}} source={{uri: image}} />
          <Text>User Credential</Text>
          <Text>Name:{user["Name"]}</Text>
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
