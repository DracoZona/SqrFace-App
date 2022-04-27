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
        if(user.QrImage) {
          refs.storage.child(user.QrImage).getDownloadURL().then(v => setImage(v)).catch(console.error)
        }
      }
    });
  }, [])

  

  return (
    <ScrollView>
      <View style={styles.root}>
        <View>
          
          <Text>User Credential</Text>
          <Text>Name: {user["Name"]}</Text>
          <Text>Gender: {user["Gender"]}</Text>
          <Text>Birthdate: {user["Birthdate"]}</Text>
          <Text>Primary Mobile No.: {user["Mobile"]}</Text>
          <Text>Email: {user["Email"]}</Text>
          

        </View>

        <View>
          <Text>Vaccination Status</Text>
          <Text>Vaccine Name: {user["Vaccine Name"]}</Text>
          <Text>Booster Name: {user["Booster Name"]}</Text>
          <Text>Date of 1st Dose: {user["Date of 1st Dose"]}</Text>
          <Text>Date of 2nd Dose: {user["Date of 2nd Dose"]}</Text>
          <Text>Date of Booster Shot: {user["Date of Booster Shot"]}</Text>
        </View>

        <View>
          <Text>User's Qr Code</Text>
          <Image style={{width: 300, height: 500}} source={{uri: image}} />
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
