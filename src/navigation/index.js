import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import SignInScreen from '../screens/SignInScreen';
import SecondScreen from '../screens/SecondScreen';
import RegistrationMenu from '../screens/RegistrationMenu';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="RegistrationMenu" component={RegistrationMenu} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SecondScreen" component={SecondScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation