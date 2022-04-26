import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/images/sqrlogo.png";
import CustomInput from "../../components/CustomInput";
import CustomNumberInput from "../../components/CustomNumberInput"
import DropDownPicker from "react-native-dropdown-picker";
import Constants from "../../utils/constants";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import {auth} from '../../../firebase'
import { useNavigation } from "@react-navigation/native";



const RegEstablishment = () => {
  const { height } = useWindowDimensions();
  const [FirstName, setFirstName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  // Dropdown for Establishment Name
  const [valueEstablishmentName, setEstablishmentName] = useState("");

  // Dropdown for Establishment BusinessPermit
  const [valueBusinessPermit, setBusinessPermit] = useState("");

  // Dropdown for Establishment Type
  const [openEstablishmentType, setOpenEstablishmentType] = useState(false);
  const [valueEstablishmentType, setValueEstablishmentType] = useState(null);

   // Dropdown for Gender Selection
   const [openGender, setOpenGender] = useState(false);
   const [valueGender, setValueGender] = useState(null);

  // Dropdown for Establishment Barangay
  const [openEstablishmentBarangay, setOpenEstablishmentBarangay] =
    useState(false);
  const [valueEstablishmentBarangay, setValueEstablishmentBarangay] =
    useState(null);

  // Dropdown for Establishment Address
  const [valueEstablishmentAddress, setEstablishmentAddress] = useState("");

  // Dropdown for MONTH DOB
  const [openMonth, setOpenMonth] = useState(false);
  const [valueMonth, setValueMonth] = useState(null);

  // Dropdown for DAY DOB
  const [openDay, setOpenDay] = useState(false);
  const [valueDay, setValueDay] = useState(null);

  // Dropdown for YEAR DOB
  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);

  // Dropdown options for Establishments Registration////////////////
  const establishmentTypeOptions = Constants.ESTABLISHMENT_TYPE.map((v) => ({
    label: v,
    value: v,
  }));

  const navigation = useNavigation();
  // Sign up
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(Email, Password)
      .then(userCredentials => {
        const user = userCredentials.user;
      })
      .catch(error => alert(error.message))

    Alert.alert('Registration Success!', 'Your registration has been successfully completed.', [
      {text: 'Understood'}
    ])
    navigation.navigate("StartScreen")
  }

  const establishmentBarangayOptions = Constants.ESTABLISHMENT_BARANGAY.map(
    (v) => ({
      label: v,
      value: v,
    })
  );

  const genderOptions = Constants.GENDER.map((v) => ({
    label: v,
    value: v,
  }));

  const monthOptions = Constants.DOB_MONTH.map((v) => ({
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

  /////////// Progress Buttons //////////
  const onNextStep = () => {
    console.log("called next step");
  };
  /////////////////////////////////////
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
            label="Establishment Information"
            nextBtnTextStyle={styles.btnText}
            nextBtnStyle={styles.nxtBtn}
            onNext={onNextStep}
          >
            <CustomInput
              placeholder="Establishment Name"
              value={valueEstablishmentName}
              setValue={setEstablishmentName}
            />
            <CustomInput
              placeholder="Business Permit"
              value={valueBusinessPermit}
              setValue={setBusinessPermit}
            />
            <Text style={styles.textBold}>Establishment Type:</Text>
            <DropDownPicker
              placeholderStyle={{
                color: "grey",
                fontWeight: "bold",
              }}
              searchable={true}
              placeholder="Establishment Type"
              open={openEstablishmentType}
              value={valueEstablishmentType}
              items={establishmentTypeOptions}
              setOpen={setOpenEstablishmentType}
              setValue={setValueEstablishmentType}
              listMode="SCROLLVIEW"
              style={styles.dropDown}
              closeAfterSelecting={true}
            />
            <Text style={styles.textBold}>Barangay:</Text>

            <DropDownPicker
              placeholderStyle={{
                color: "grey",
                fontWeight: "bold",
              }}
              searchable={true}
              placeholder="Barangay"
              open={openEstablishmentBarangay}
              value={valueEstablishmentBarangay}
              items={establishmentBarangayOptions}
              setOpen={setOpenEstablishmentBarangay}
              setValue={setValueEstablishmentBarangay}
              listMode="SCROLLVIEW"
              style={styles.dropDown}
              closeAfterSelecting={true}
            />

            <CustomInput
              placeholder="Complete Address"
              value={valueEstablishmentAddress}
              setValue={setEstablishmentAddress}
            />

            <Text style={styles.textBold}>
              Please check for the following errors:
            </Text>

            <Text style={styles.note}>
              <Text>- Please enter valid name {"\n"}</Text>
              <Text>- Complete address is required {"\n"}</Text>
              <Text>- Barangay is required</Text>
            </Text>
          </ProgressStep>

          <ProgressStep
            label="Contact Person's info"
            nextBtnTextStyle={styles.btnText}
            nextBtnStyle={styles.nxtBtn}
            previousBtnTextStyle={styles.btnText}
            previousBtnStyle={styles.prevBtn}
          >
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
          </ProgressStep>

          <ProgressStep
            label="Login details"
            nextBtnTextStyle={styles.btnText}
            nextBtnStyle={styles.nxtBtn}
            previousBtnTextStyle={styles.btnText}
            previousBtnStyle={styles.prevBtn}
            onSubmit={handleSignUp}
          >
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

  textBold: {
    alignSelf: "flex-start",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  note: {
    flex: 1,
    padding: 20,
    width: "100%",
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
});

export default RegEstablishment;
