import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


const FaceDetectScreen = () => {

  //Camera Instance
  const [hasCameraPermission, sethasCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageUri, setImageUri] = useState(null);
  const [take, setTake] = useState(-1);

  const [rect, setRect] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const [camerarect, setcameraRect] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const navigation = useNavigation();


  useEffect(() => {
    (async () => {
      // const cameraStatus = await Camera.requestMicrophonePermissionsAsync();
      const { cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
      sethasCameraPermission(cameraStatus.status === "granted");
      const imagePermission =
        await ImagePicker.getMediaLibraryPermissionsAsync();
      // console.log(imagePermission.status);

      setGalleryPermission(imagePermission.status === "granted");

      if (
        imagePermission.status !== "granted" &&
        cameraPermission.status !== "granted"
      ) {
        alert("Permission for media access needed.");
      }
    })();
  }, []);

  const sendImg = async (image) => {
    const data = new FormData();
    data.append("image", {
      uri: image,
      name: "facedetect.jpg",
      type: "image/jpg",
    });
    data.append("test", "test");
    const res = await axios({
      method: "POST",
      url: "http://192.168.1.12:5000/face_detect",
      data,
      headers: { "Content-Type": "multipart/form-data" },
      transformRequest: () => {
        return data;
      },
    });
    const temp = res.data.map((v) => parseInt(v, 10));
    //console.log(temp);

    const factorx = camerarect.w / temp[5]
    const factory = camerarect.h / temp[6]
    const x = temp[0] * factorx - 100
    const y = temp[1] * factory
    const w = temp[3] * factorx
    const h = temp[4] * factory
    //console.log(temp);
    setRect({ x, y, w, h });
    // console.log(res.data);
    console.log(res.data[2])


    if (res.data[2] == "kenneth"){
      setTake(-1)
      navigation.navigate('CredentialScreen', {xvalue: 1})
    } else if (res.data[2] == "jasper"){
      setTake(-1)
      navigation.navigate('CredentialScreen', {xvalue: 0})
    }

  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({
        quality: 0.1,
        skipProcessing: true
      });
      // console.log(data.uri);
      setImageUri(data.uri);
      sendImg(data.uri);

    }
  };

  const delayedPic = () => {
    takePicture()
    setTimeout(() => {
      setTake(prev => {
        if (prev >= 0) return prev + 1
        return prev;
      })
    }, 1000);
  }
  const onCredentialScreen = () => {
    navigation.navigate('CredentialScreen', {xvalue: 0})
  };

  useEffect(() => {
    if (take >= 0) {
      delayedPic()
    }
  }, [take])

  if (hasCameraPermission === false) {
    return <Text>No Camera Access</Text>;
  }
  //End of Camera Instance

  // User Interface
  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.cameraContainer}>
          <View
            style={{
              borderWidth: 4,
              borderColor: "green",
              position: "absolute",
              top: rect.y,
              left: rect.x,
              width: rect.w,
              height: rect.h,
              zIndex: 100
            }}
          />
          <View onLayout={event => {
            const { x, y, width, height } = event.nativeEvent.layout
            setcameraRect({ x, y, w: width, h: height })
          }}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={"16:3"}


            />
          </View>

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
          <Button
            style={styles.buttonStart}
            title={take === -1 ? "Scan" : "Stop"}
            onPress={() => {
              setTake(prev =>
                prev === -1 ? 0 : -1
              );
            }}
          />
          {/* <Button title={"Take Picture"} onPress={takePicture} /> */}
          {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
          {/* <Button title="next" onPress={onCredentialScreen} /> */}
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
    marginBottom: 28,
  },
  cameraContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    marginTop: 150,
    position: "relative",
  },

  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});

export default FaceDetectScreen;
