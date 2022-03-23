import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Button
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/images/Logo_1.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Navigation from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";

const StartScreen = () => {


  const { height } = useWindowDimensions();

  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <Text style={styles.h1}>Login as</Text>
        <TouchableOpacity style={styles.buttonStart}>
          <Text style={styles.buttonStartText}>Individual</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStart}>
          <Text style={styles.buttonStartText}>Establishment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style= {styles.register}
        >
          <Text>Don't have an account? Register.</Text>
        </TouchableOpacity>
  
        
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
    marginTop: 40,
    width: "70%",
    maxWidth: 400,
    maxHeight: 400,
  },

  buttonStart: {
    width: '80%',
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 3,
  },

  buttonStartText: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  h1: {
    fontSize: 32,
    marginTop: 50,
  },

  register: {
    marginTop: 20,
  }
});


export default StartScreen;
