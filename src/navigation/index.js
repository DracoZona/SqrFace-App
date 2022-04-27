import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import SignInScreen from '../screens/SignInScreen';
import SecondScreen from '../screens/SecondScreen';
import RegistrationMenu from '../screens/RegistrationMenu';
import RegIndividual from '../screens/RegIndividual';
import RegEstablishment from '../screens/RegEstablishment';
import FaceDetectScreen from '../screens/FaceDetectScreen';
import CredentialScreen from '../screens/CredentialScreen';
import LoginIndividual from '../screens/LoginIndividual';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='StartScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="FaceDetectScreen" component={FaceDetectScreen} />
        <Stack.Screen name="CredentialScreen" component={CredentialScreen} />
        <Stack.Screen name="RegistrationMenu" component={RegistrationMenu} />
        <Stack.Screen name="RegIndividual" component={RegIndividual} />
        <Stack.Screen name="RegEstablishment" component={RegEstablishment} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
        <Stack.Screen name="LoginIndividual" component={LoginIndividual} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation