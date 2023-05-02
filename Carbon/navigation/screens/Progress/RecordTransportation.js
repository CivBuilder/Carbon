import React, { useEffect, useState, useMemo } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Platform, SafeAreaView } from 'react-native';
import {Colors} from '../../../styling/Colors';
import { ScreenNames } from '../Main/ScreenNames';
import { RadioButton } from 'react-native-paper';
import calcCar from '../../../calculations/travel_calculations/calcCar';
import calcElecCar from '../../../calculations/travel_calculations/calcElecCar';
import calcPlane from '../../../calculations/travel_calculations/calcPlane';
import calcPublic from '../../../calculations/travel_calculations/calcPublic';
import calcBike from '../../../calculations/travel_calculations/calcBike';
import { validateTransportationScreen, getTransportationError } from '../../../util/RecordEmissionChecks';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../../styling/RecordEmissionsCSS';

const RecordTransportation = ({ navigation, route }) => {
  const [emissionsEntry, setEmissionsEntry] = useState({});
  const [milesTraveled, setMilesTraveled] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [funFact, setFunFact] = useState('');
  const funFacts = [
    "Transportation accounts for the largest share of greenhouse gas emissions in the United States.",
    "The average car emits about 4.6 metric tons of carbon dioxide per year.",
    "Air travel produces about 2% of global carbon emissions.",
    "Walking, biking, or taking public transit can significantly reduce individual carbon footprints compared to driving a car.",
    "Shipping and trucking are responsible for transporting the vast majority of goods worldwide, and their emissions are a significant contributor to overall transportation-related emissions."
  ];

  function getRandomFunFact() {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
  }

  //memoize the fun fact so it doesn't change when the state variable changes
  const memoizedFunFact = useMemo(() => funFact, [funFact]);

  //get the correct value for the transportation emissions
  function calcMilesTraveled () {
    let transport_emissions = 0;
      if(selectedValue === "Car") {
        transport_emissions = calcCar(milesTraveled, 0);
      } 
      else if(selectedValue === "ElecCar") {
        transport_emissions = calcElecCar(milesTraveled);
      }
      else if(selectedValue === "Bike") {
        transport_emissions = calcBike(milesTraveled);
      } 
      else if(selectedValue === "Plane") {
        transport_emissions = calcPlane(milesTraveled);
      } 
      else if(selectedValue === "Bus") {
        transport_emissions = calcPublic(milesTraveled, "bus");
      }
      else if(selectedValue === "Train") {
        transport_emissions = calcPublic(milesTraveled, "train");
      }
    return transport_emissions;
  }

  //set the fun fact when the component mounts
  useEffect(() => {
    setFunFact(getRandomFunFact());
  }, []);

  //Update our parameter to send back when the consumption state variable changes 
  useEffect(() => {
    // console.log(milesTraveled)
    if(milesTraveled !== null && selectedValue !== null) {
      let transporation_emission = calcMilesTraveled();
      // console.log("transport_emissions: " + transporation_emission);
      setEmissionsEntry({
        ...route.params.sentEmissionsEntry,
        transport_emissions: transporation_emission
    })
  }
  }, [milesTraveled, selectedValue])

  const [buttonIndex, setButtonIndex] = useState(-1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.funfact}>
            <Text style={styles.header}>Did you know?</Text>
            <Text style={styles.label} testID='fun-fact'>{memoizedFunFact}</Text>
          </View>
          <Text style={styles.header}>Log your travel for today</Text>
          <View style={styles.pickercontainer}>
            <Text style={styles.text_input_label}>How many miles did you travel today?</Text>
            <TextInput
              placeholder='miles'
              style={styles.text_input}
              keyboardType="decimal-pad"
              clearButtonMode='always' //iOS only
              onChangeText={(miles) => setMilesTraveled(miles.length > 0 ? miles : 0)}
              testID='miles-traveled'
            />

            <View style={{width:'100%',marginBottom: 24, alignItems: 'center'}}>
              <Text style={styles.header}>What was your mode of transportation?</Text>
              {/*Run this if platform is Android*/}
              {Platform.OS === 'android' ? (
                <RadioButton.Group onValueChange={value =>setSelectedValue(value)} value={selectedValue}>
                  <View>
                    <View style={styles.switchContainer}>
                      <RadioButton value="Car" testID='Car' color={Colors.secondary.DARK_MINT}/>
                      <MaterialIcons name="directions-car" size={36} color={Colors.primary.RAISIN_BLACK} style={{marginHorizontal: 12}}/>
                      <Text style={styles.radioButtonText}>Car</Text>
                    </View>

                    <View style={styles.switchContainer}>
                      <RadioButton value="ElecCar" testID='ElecCar' color={Colors.secondary.DARK_MINT} />
                      <MaterialIcons name="electric-car" size={36} color={Colors.primary.RAISIN_BLACK} style={{marginHorizontal: 12}}/>
                      <Text style={styles.radioButtonText}>Electric Car</Text>
                    </View>

                    <View style={styles.switchContainer}>
                      <RadioButton value="Bike" testID='Bike' color={Colors.secondary.DARK_MINT} />
                      <MaterialIcons name="pedal-bike" size={36} color={Colors.primary.RAISIN_BLACK} style={{marginHorizontal: 12}}/>
                      <Text style={styles.radioButtonText}>Bike</Text>
                    </View>

                    <View style={styles.switchContainer}>
                      <RadioButton value="Bus" testID='Bus' color={Colors.secondary.DARK_MINT} />
                      <MaterialIcons name="directions-bus" size={36} color={Colors.primary.RAISIN_BLACK} style={{marginHorizontal: 12}}/>
                      <Text style={styles.radioButtonText}>Bus</Text>
                    </View>

                    <View style={styles.switchContainer}>
                      <RadioButton value="Train" testID='Train' color={Colors.secondary.DARK_MINT} />
                      <MaterialIcons name="train" size={36} color={Colors.primary.RAISIN_BLACK} style={{marginHorizontal: 12}}/>
                      <Text style={styles.radioButtonText}>Train</Text>
                    </View>

                    <View style={styles.switchContainer}>
                      <RadioButton value="Plane" testID='Plane' color={Colors.secondary.DARK_MINT} />
                      <MaterialIcons name="airplanemode-active" size={36} color={Colors.primary.RAISIN_BLACK} style={{marginHorizontal: 12}}/>
                      <Text style={styles.radioButtonText}>Plane</Text>
                    </View>
                  </View>
                </RadioButton.Group>
              ) :

              /*Run this if platform is iOS*/
              (
                <View>
                  <TouchableOpacity
                    style={buttonIndex === 0 ? styles.selectorContainer_iOS_selected : styles.selectorContainer_iOS}
                    onPress={() => { setButtonIndex(0); setSelectedValue("Car"); }}
                  >
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <MaterialIcons name="directions-car" size={36} color={Colors.primary.RAISIN_BLACK} style={{marginRight: 12}}/>
                      <Text style={styles.radioButtonText_iOS}>Car</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={buttonIndex === 1 ? styles.selectorContainer_iOS_selected : styles.selectorContainer_iOS}
                    onPress={() => { setButtonIndex(1); setSelectedValue("ElecCar"); }}
                  >
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                      <MaterialIcons name="electric-car" size={36} color={Colors.primary.RAISIN_BLACK} style={{marginRight: 12}}/>
                      <Text style={styles.radioButtonText_iOS}>Electric Car</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={buttonIndex === 2 ? styles.selectorContainer_iOS_selected : styles.selectorContainer_iOS}
                    onPress={() => { setButtonIndex(2); setSelectedValue("Bike"); }}
                  >
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <MaterialIcons name="pedal-bike" size={36} color={Colors.primary.RAISIN_BLACK} style={{marginRight: 12}}/>
                      <Text style={styles.radioButtonText_iOS}>Bike</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={buttonIndex === 3 ? styles.selectorContainer_iOS_selected : styles.selectorContainer_iOS}
                    onPress={() => { setButtonIndex(3); setSelectedValue("Bus"); }}
                  >
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <MaterialIcons name="directions-bus" size={36} color={Colors.primary.RAISIN_BLACK} style={{marginRight: 12}}/>
                      <Text style={styles.radioButtonText_iOS}>Bus</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={buttonIndex === 4 ? styles.selectorContainer_iOS_selected : styles.selectorContainer_iOS}
                    onPress={() => { setButtonIndex(4); setSelectedValue("Train"); }}
                  >
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <MaterialIcons name="train" size={36} color={Colors.primary.RAISIN_BLACK} style={{marginRight: 12}}/>
                      <Text style={styles.radioButtonText_iOS}>Train</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={buttonIndex === 5 ? styles.selectorContainer_iOS_selected : styles.selectorContainer_iOS}
                      onPress={() => { setButtonIndex(5); setSelectedValue("Plane"); }}
                  >
                      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                        <MaterialIcons name="airplanemode-active" size={36} color={Colors.primary.RAISIN_BLACK} style={{marginRight: 12}}/>
                        <Text style={styles.radioButtonText_iOS}>Plane</Text>
                      </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {(milesTraveled.length > 0) && (parseFloat(milesTraveled)) > 0  && selectedValue !== null && (
            <View style={{flex: 1, justifyContent:'flex-end', marginBottom: 20,}}>
              <TouchableOpacity testID='save-button' style={styles.button} onPress={() => validateTransportationScreen(milesTraveled, selectedValue) ? navigation.navigate(ScreenNames.RECORD_EMISSION, { returningEmissionsEntry: emissionsEntry }) : getTransportationError(milesTraveled, selectedValue)}>
                <Text style={styles.buttonText}>Save & Return</Text>
              </TouchableOpacity>
            </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecordTransportation;



