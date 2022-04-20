import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
    TouchableOpacity,
    Button,
  } from "react-native";
import React from 'react'

const FaceDetectScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Face Detect</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    root: {
      alignItems: "center",
      padding: 20,
      minHeight: 500,
      marginBottom: 28,
    }
});


export default FaceDetectScreen
