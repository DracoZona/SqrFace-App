import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert
} from "react-native";
import React, { useEffect,useState } from "react";
import Logo from "../../../assets/images/Logo_1.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Navigation from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";


const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();

  const navigation = useNavigation();


  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user =>{
  //     if(user){
  //       console.log(user)
  //       // navigation.navigate('FaceDetectScreen')
  //     }
  //   })
  //   return unsubscribe

  // }, [])

  const onSignInPressed = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with:', user.email);
      navigation.navigate('FaceDetectScreen')
    })
    .catch(error => alert(error.message))
 }

  const onSignUpPressed = () => {
    console.warn("Sign Up");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <Text style={styles.h1}>Establishment Login</Text>
        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />

        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        <CustomButton text="Sign In" onPress={onSignInPressed} />
        <CustomButton
          text="No account yet? Create One"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "100%",
    maxWidth: 400,
    maxHeight: 400,
  },

  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 10,
  }
});

export default SignInScreen;
