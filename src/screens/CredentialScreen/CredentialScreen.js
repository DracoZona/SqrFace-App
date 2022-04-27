import { View, Text, StyleSheet, ScrollView, Image, Button } from "react-native";
import React from "react";
import { refs } from '../../../firebase'
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../components/CustomInput";
import { TouchableOpacity } from "react-native-web";




const CredentialScreen = () => {


  const navigation = useNavigation();
  const onStartScreen = () => {
    navigation.navigate("StartScreen")
  }

  const currentUser = 1;
  const [user, setUser] = React.useState({})
  const [image, setImage] = React.useState();

  React.useEffect(() => {
    refs.db.on('value', (snapshot) => {
      const val = snapshot.val()
      const user = val.User[currentUser]
      if (user) {
        setUser(user)
        console.log(user)
        if (user.QrImage) {
          refs.storage.child(user.QrImage).getDownloadURL().then(v => setImage(v)).catch(console.error)
        }
      }
    });
  }, [])



  return (
    <ScrollView>
      <View style={styles.root}>
        <View>


          <Text style={styles.h1}>Person's Information</Text>
          <Text style={styles.textCredentials}>Name: {user["Name"]}</Text>
          <Text style={styles.textCredentials}>Gender: {user["Gender"]}</Text>
          <Text style={styles.textCredentials}>Birthdate: {user["Birthdate"]}</Text>
          <Text style={styles.textCredentials}>Primary Mobile No.: {user["Mobile"]}</Text>
          <Text style={styles.textCredentials}>Email: {user["Email"]}</Text>
        </View>

        <View>
          <Text style={styles.h2}>Vaccination Status</Text>
          <Text style={styles.vaxStatus}>Vaccine Name: {user["Vaccine Name"]}</Text>
          <Text style={styles.vaxStatus}>Booster Name: {user["Booster Name"]}</Text>
          <Text style={styles.vaxStatus}>Date of 1st Dose: {user["Date of 1st Dose"]}</Text>
          <Text style={styles.vaxStatus}>Date of 2nd Dose: {user["Date of 2nd Dose"]}</Text>
          <Text style={styles.vaxStatus}>Date of Booster Shot: {user["Date of Booster Shot"]}</Text>
        </View>

        <View>
          <Text style={styles.h1}>User's Qr Code</Text>
          <Image style={styles.imageX} source={{ uri: image }} />

          <Button
            style={styles.button}
            title="Done"
            onPress={onStartScreen}
          />
        </View>




      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 25,
    alignItems: "center",
    padding: 20,
    minHeight: 500,
    marginBottom: 28,
  },

  h1: {
    alignItems: "center",
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },

  h2: {
    marginTop: 10,
    marginLeft: -55,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },

  vaxStatus: {
    marginLeft: -55,
    fontSize: 18,
    marginBottom: 10,
  },

  textCredentials: {
    fontSize: 18,
    marginBottom: 10,
  },

  imageX: {
    width: 300,
    height: 500,
    marginBottom: 20,
  }
});

export default CredentialScreen;
