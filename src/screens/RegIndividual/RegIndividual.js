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
import Logo from "../../../assets/images/sqrlogo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Navigation from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import SignInScreen from "../SignInScreen";
import DropDownPicker from "react-native-dropdown-picker";
import Constants from "../../Utils/constants";

const RegIndividual = () => {
  const [FirstName, setFirstName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [LastName, setLastName] = useState("");


  const { height } = useWindowDimensions();

  // Dropdown for Gender Selection
  const [openGender, setOpenGender] = useState(false);
  const [valueGender, setValueGender] = useState(null);


  // Dropdown for MONTH DOB
  const [openMonth, setOpenMonth] = useState(false);
  const [valueMonth, setValueMonth] = useState(null);

  // Dropdown for DAY DOB
  const [openDay, setOpenDay] = useState(false);
  const [valueDay, setValueDay] = useState(null);

  // Dropdown for YEAR DOB
  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);


  const monthOptions = Constants.DOB_MONTH.map((v) => ({
    label: v,
    value: v

  }))

  const genderOptions = Constants.GENDER.map((v) => ({
    label: v,
    value: v
  }))

  const dayOptions = Constants.DOB_DAY.map((v) => ({
    label: v,
    value: v
  }))

  const yearOptions = Constants.DOB_YEAR.map((v) => ({
    label: v,
    value: v
  }))



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
        <Text style={styles.dob}>
          Date of Birth:
        </Text>

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

  dob: {
    alignSelf: 'flex-start',
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',

  },

  h1: {
    fontSize: 32,
    marginBottom: 10,
  },

  h2: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
  },

  register: {
    marginTop: 20,
  }
});


export default RegIndividual;
