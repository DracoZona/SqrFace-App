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

const RegIndividual = () => {

  //basic information data
  const [FirstName, setFirstName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  //address data
  // const [Province, setProvince] = useState("");
  // const [Municipality, setMunicipality] = useState("");
  // const [Barangay, setBarangay] = useState("");
  const [Zipcode, setZipcode] = useState("");
  const [Purok, setPurok] = useState("");

  const { height } = useWindowDimensions();

  // Dropdown for Gender Selection
  const [openGender, setOpenGender] = useState(false);
  const [valueGender, setValueGender] = useState(null);

  // Dropdown for Province Selection
  const [openProvince, setOpenProvince] = useState(false);
  const [valueProvince, setValueProvince] = useState(null);

  // Dropdown for Barangay Selection
  const [openBarangay, setOpenBarangay] = useState(false);
  const [valueBarangay, setValueBarangay] = useState(null);

  // Dropdown for Barangay Selection
  const [openMunicipality, setOpenMunicipality] = useState(false);
  const [valueMunicipality, setValueMunicipality] = useState(null);

  // Dropdown for MONTH DOB
  const [openMonth, setOpenMonth] = useState(false);
  const [valueMonth, setValueMonth] = useState(null);

  // Dropdown for DAY DOB
  const [openDay, setOpenDay] = useState(false);
  const [valueDay, setValueDay] = useState(null);

  // Dropdown for YEAR DOB
  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);


  //Third Paged of Progress Steps
  const [VaccineStatus, setVaccineStatus] = useState("");
  const [VaccineName, setVaccineName] = useState("");
  const [BoosterName, setBoosterName] = useState("");

  // Dropdown for First Dose Date
  const [openFirstDoseDate, setOpenFisrtDoseDate] = useState(false);
  const [valueFirstDoseDate, setValueFirstDoseDate] = useState(null);

  // Dropdown for Second Dose Date
  const [openSecondDoseDate, setOpenSecondDoseDate] = useState(false);
  const [valueSecondDate, setOpenValueDoseDate] = useState(null);


  // Retrieval of Data from utils/Constants
  const monthOptions = Constants.DOB_MONTH.map((v) => ({
    label: v,
    value: v,
  }));

  const genderOptions = Constants.GENDER.map((v) => ({
    label: v,
    value: v,
  }));

  const dayOptions = Constants.DOB_DAY.map((v) => ({
    label: v,
    value: v,
  }));

  const yearOptions = Constants.DOB_YEAR.map((v) => ({
    label: v,
    value: v,
  }));

  const barangayOptions = Constants.ESTABLISHMENT_BARANGAY.map((v) => ({
    label: v,
    value: v,
  }));

  const provinceOptions = Constants.PROVINCE.map((v) => ({
    label: v,
    value: v,
  }));

  const municipalityOptions = Constants.MUNICIPALITY_DAVAO_DEL_SUR.map((v) => ({
    label: v,
    value: v,
  }));

  // End of Retrieval of Data from utils/Constants


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
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <Text style={styles.h1}>Registration Form</Text>
        <Text style={styles.h2}>Please fill up the form.</Text>
        <ProgressSteps>
          <ProgressStep
            label="Personal Information"
            nextBtnTextStyle={styles.btnText}
            nextBtnStyle={styles.nxtBtn}
          >
            <Text style={styles.h3}>Basic Information</Text>
            <CustomInput
              placeholder="First Name"
              value={FirstName}
              setValue={setFirstName}
            />
            <CustomInput
              placeholder="Middle Name"
              value={MiddleName}
              setValue={setMiddleName}
            />
            <CustomInput
              placeholder="Last Name"
              value={LastName}
              setValue={setLastName}
            />

            <DropDownPicker
              placeholderStyle={{
                color: "grey",
                fontWeight: "bold",
              }}
              placeholder="Select Gender"
              open={openGender}
              value={valueGender}
              items={genderOptions}
              setOpen={setOpenGender}
              setValue={setValueGender}
              listMode="SCROLLVIEW"
              style={styles.dropDown}
              closeAfterSelecting={true}
            />
            <Text style={styles.dob}>Date of Birth:</Text>

            <DropDownPicker
              placeholderStyle={{
                color: "grey",
                fontWeight: "bold",
              }}
              searchable={true}
              placeholder="Select Month"
              open={openMonth}
              value={valueMonth}
              items={monthOptions}
              setOpen={setOpenMonth}
              setValue={setValueMonth}
              listMode="SCROLLVIEW"
              style={styles.dropDown}
              closeAfterSelecting={true}
            />

            <DropDownPicker
              placeholderStyle={{
                color: "grey",
                fontWeight: "bold",
              }}
              searchable={true}
              placeholder="Select Day"
              open={openDay}
              value={valueDay}
              items={dayOptions}
              setOpen={setOpenDay}
              setValue={setValueDay}
              listMode="SCROLLVIEW"
              style={styles.dropDown}
              closeAfterSelecting={true}
            />

            <DropDownPicker
              placeholderStyle={{
                color: "grey",
                fontWeight: "bold",
              }}
              searchable={true}
              placeholder="Select Year"
              open={openYear}
              value={valueYear}
              items={yearOptions}
              setOpen={setOpenYear}
              setValue={setValueYear}
              listMode="SCROLLVIEW"
              style={styles.dropDown}
              closeAfterSelecting={true}
            />

            <CustomNumberInput
              placeholder="Phone Number"
              value={PhoneNumber}
              setValue={setPhoneNumber}
            />

            <Text style={styles.h3}>Complete Address</Text>

            <DropDownPicker
              placeholderStyle={{
                color: "grey",
                fontWeight: "bold",
              }}
              placeholder="Select Province"
              searchable={true}
              open={openProvince}
              value={valueProvince}
              items={provinceOptions}
              setOpen={setOpenProvince}
              setValue={setValueProvince}
              listMode="SCROLLVIEW"
              style={styles.dropDown}
              closeAfterSelecting={true}

            />

            <DropDownPicker
              placeholderStyle={{
                color: "grey",
                fontWeight: "bold",
              }}
              placeholder="Select Municipality"
              searchable={true}
              open={openMunicipality}
              value={valueMunicipality}
              items={municipalityOptions}
              setOpen={setOpenMunicipality}
              setValue={setValueMunicipality}
              listMode="SCROLLVIEW"
              style={styles.dropDown}
              closeAfterSelecting={true}
            />

            <DropDownPicker
              placeholderStyle={{
                color: "grey",
                fontWeight: "bold",
              }}
              placeholder="Select Barangay"
              searchable={true}
              open={openBarangay}
              value={valueBarangay}
              items={barangayOptions}
              setOpen={setOpenBarangay}
              setValue={setValueBarangay}
              listMode="SCROLLVIEW"
              style={styles.dropDown}
              closeAfterSelecting={true}
            />
            <CustomInput
              placeholder="Purok or Street"
              value={Purok}
              setValue={setPurok}
            />
            <CustomNumberInput
              placeholder="Zipcode"
              value={Zipcode}
              setValue={setZipcode}
            />

            <Text style={styles.h3}>Account Information</Text>
            <CustomInput
              placeholder="Email"
              value={Email}
              setValue={setEmail}
            />
            <CustomInput
              placeholder="Password"
              secureTextEntry={true}
              value={Password}
              setValue={setPassword}
            />
          </ProgressStep>
          <ProgressStep
            label="Facial Recognition Enrollment"
            nextBtnTextStyle={styles.btnText}
            nextBtnStyle={styles.nxtBtn}
            previousBtnTextStyle={styles.btnText}
            previousBtnStyle={styles.prevBtn}
          >
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

              <Button
                style={styles.buttonStart}
                title="Enroll Cute Face"
                onPress={() => {
                  takePicture()
                }}
              />

              {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
            </View>

          </ProgressStep>

          <ProgressStep
            label="Vaccination Information"
            nextBtnTextStyle={styles.btnText}
            nextBtnStyle={styles.nxtBtn}
            previousBtnTextStyle={styles.btnText}
            previousBtnStyle={styles.prevBtn}
          >

            <Text style={styles.h3}>Vaccine Status:</Text>
            <CustomInput
              placeholder="Vaccine Status"
              value={VaccineStatus}
              setValue={setVaccineStatus}
            />


          </ProgressStep>
        </ProgressSteps>
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
  logo: {
    marginTop: 40,
    width: "70%",
    maxWidth: 400,
    maxHeight: 400,
  },
  dropDown: {
    marginTop: 10,
    zIndex: 100,
  },

  buttonStart: {
    width: "80%",
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 150,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 3,
  },

  buttonStartText: {
    fontSize: 24,
    fontWeight: "bold",
  },

  dob: {
    alignSelf: "flex-start",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },

  h1: {
    fontSize: 32,
    marginBottom: 10,
  },

  h2: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 20,
  },

  h3: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: 20,
  },

  register: {
    marginTop: 20,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  nxtBtn: {
    alignItems: "flex-end",
    marginRight: -50,
    marginVertical: -20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 40,
    elevation: 3,
    backgroundColor: "#3f6499",
    padding: 15,
  },
  prevBtn: {
    alignItems: "flex-start",
    marginLeft: -50,
    marginVertical: -20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 40,
    elevation: 3,
    backgroundColor: "#3f6499",
    padding: 15,
  },

  cameraContainer: {
    width: "100%",
    flex: 1,
    flexDirection: 'column'
  },

  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  }
});

export default RegIndividual;
