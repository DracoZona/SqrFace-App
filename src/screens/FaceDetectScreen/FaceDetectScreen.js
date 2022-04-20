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
import React, { useState, useEffect } from "react";
import Logo from "../../../assets/images/sqrlogo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomNumberInput from "../../components/CustomNumberInput/CustomNumberInput";
import Navigation from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import SignInScreen from "../SignInScreen";
import DropDownPicker from "react-native-dropdown-picker";
import Constants from "../../utils/constants";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions";

const FaceDetectScreen = () => {

  //Camera Instance

  const [hasCameraPermission, sethasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);


  useEffect(() => {
    (async () => {
      // const cameraStatus = await Camera.requestMicrophonePermissionsAsync();
      const { cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
      sethasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePicture(null)
      setImage(data.uri);
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No Camera Access</Text>;
  }
  //End of Camera Instance



  // User Interface
  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.cameraContainer}>
              <Camera ref={ref => setCamera(ref)}
                style={styles.fixedRatio}
                type={type}
                ratio={'16:3'}
              />

              <Button
                style={styles.buttonStart}
                title="Flip Camera"
                onPress={() => {
                  setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
                }}
              />

              {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
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
  cameraContainer: {
    width: "100%",
    flex: 1,
    flexDirection: 'column',
    marginTop: 150
  },

  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  }
});

export default FaceDetectScreen;
