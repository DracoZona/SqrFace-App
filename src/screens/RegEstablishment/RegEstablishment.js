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
import React, { useState } from "react";
import Logo from "../../../assets/images/sqrlogo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import SignInScreen from "../SignInScreen";
import DropDownPicker from "react-native-dropdown-picker";
import Constants from "../../utils/constants";

const RegEstablishment = () => {
  const { height } = useWindowDimensions();

  // Dropdown for Establishment Name
  const [valueEstablishmentName, setEstablishmentName] = useState("");

  // Dropdown for Establishment BusinessPermit
  const [valueBusinessPermit, setBusinessPermit] = useState("");

  // Dropdown for Establishment Type
  const [openEstablishmentType, setOpenEstablishmentType] = useState(false);
  const [valueEstablishmentType, setValueEstablishmentType] = useState(null);

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

  //Dropdown for DAY DOB
  // const [openDay, setOpenDay] = useState(false);
  // const [valueDay, setValueDay] = useState(null);

  // Dropdown options for Establishments Registration////////////////
  const establishmentTypeOptions = Constants.ESTABLISHMENT_TYPE.map((v) => ({
    label: v,
    value: v,
  }));

  const establishmentBarangayOptions = Constants.ESTABLISHMENT_BARANGAY.map(
    (v) => ({
      label: v,
      value: v,
    })
  );

  // Next page Button
  const onNextPagePressed = () => {
    console.warn("Next Page");

    // navigation.navigate('SecondScreen') // DEBUGGING U CAN DELETE THIS
  };

  ////////////////////////////////////////////////
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


        <CustomButton text="Next" onPress={onNextPagePressed} type="NEXT" />

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
});

export default RegEstablishment;
