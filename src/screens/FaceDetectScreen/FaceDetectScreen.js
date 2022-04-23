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
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
// import ReactNativeBlobUtil from 'react-native-blob-util'


const FaceDetectScreen = () => {
  //Camera Instance

  const [hasCameraPermission, sethasCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      // const cameraStatus = await Camera.requestMicrophonePermissionsAsync();
      const { cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
      sethasCameraPermission(cameraStatus.status === "granted");
      const imagePermission =
        await ImagePicker.getMediaLibraryPermissionsAsync();
      console.log(imagePermission.status);

      setGalleryPermission(imagePermission.status === "granted");

      if (
        imagePermission.status !== "granted" &&
        cameraPermission.status !== "granted"
      ) {
        alert("Permission for media access needed.");
      }
    })();
  }, []);


  const ReactNativeBlobUtil = require('react-native-blob-util').default
  
  sendImg = () => {
    ReactNativeBlobUtil.fetch(
      "POST",
      "http://127.0.0.1:5000/upload_file",
      {
        sendimage: JSON.stringify({
          path: expoSnapped,
          mode: "add",
          autorename: true,
          mute: false,
        }),
        "Content-Type": "application/json",
      },
      base64ImageString
    )
      .then((res) => {
        console.log(res.text());
      })
      .catch((err) => {
        // error handling ..
      });
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImageUri(data.uri);
      expoSnapped = data.uri;
      sendImg();
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No Camera Access</Text>;
  }
  //End of Camera Instance

  // User Interface
  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.cameraContainer}>
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.fixedRatio}
            type={type}
            ratio={"16:3"}
          />

          <Button
            style={styles.buttonStart}
            title="Flip Camera"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
          <Button title={"Take Picture"} onPress={takePicture} />
          {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
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
    flexDirection: "column",
    marginTop: 150,
  },

  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});

export default FaceDetectScreen;
