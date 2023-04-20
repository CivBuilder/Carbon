import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../../styling/Colors';
import { ScreenNames } from '../Main/ScreenNames';
import { RadioButton } from 'react-native-paper';
import calcCar from '../../../calculations/travel_calculations/calcCar';
import calcElecCar from '../../../calculations/travel_calculations/calcElecCar';
import calcPlane from '../../../calculations/travel_calculations/calcPlane';
import calcPublic from '../../../calculations/travel_calculations/calcPublic';
import calcBike from '../../../calculations/travel_calculations/calcBike';
const RecordTransportation = ({ navigation, route }) => {
  
  const [emissionsEntry, setEmissionsEntry] = useState({});
  const [milesTraveled, setmilesTraveled] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [funFact, setFunFact] = useState('');
  const funFacts = [
    "Transportation accounts for the largest share of greenhouse gas emissions in the United States.",
    "The average car emits about 4.6 metric tons of carbon dioxide per year.",
    "Air travel produces about 2% of global carbon emissions.",
    "Walking, biking, or taking public transit can significantly reduce individual carbon footprints compared to driving a car.",
    "Shipping and trucking are responsible for transporting the vast majority of goods worldwide, and their emissions are a significant contributor to overall transportation-related emissions."
  ];
  const miles = [
    { "label": "1 mile", "value": 1 },
    { "label": "2 miles", "value": 2 },
    { "label": "3 miles", "value": 3 },
    { "label": "4 miles", "value": 4 },
    { "label": "5 miles", "value": 5 },
    { "label": "10 miles", "value": 10 },
    { "label": "15 miles", "value": 15 },
    { "label": "20 miles", "value": 20 },
    { "label": "25 miles", "value": 25 },  
    { "label": "30 miles", "value": 30 },  
    { "label": "35 miles", "value": 35 },  
    { "label": "40 miles", "value": 40 },  
    { "label": "45 miles", "value": 45 },  
    { "label": "50 miles", "value": 50 },  
    { "label": "60 miles", "value": 60 },  
    { "label": "70 miles", "value": 70 },  
    { "label": "80 miles", "value": 80 },  
    { "label": "90 miles", "value": 90 },  
    { "label": "100 miles", "value": 100 },  
    { "label": "125 miles", "value": 125 },  
    { "label": "150 miles", "value": 150 },  
    { "label": "175 miles", "value": 175 },  
    { "label": "200 miles", "value": 200 },  
    { "label": "250 miles", "value": 250 },  
    { "label": "300 miles", "value": 300 },  
    { "label": "400 miles", "value": 400 },  
    { "label": "500 miles", "value": 500 },  
    { "label": "600 miles", "value": 600 },  
    { "label": "700 miles", "value": 700 },  
    { "label": "800 miles", "value": 800 },  
    { "label": "900 miles", "value": 900 },  
    { "label": "1000 miles", "value": 1000 },
    { "label": "2000 miles", "value": 2000 },
    { "label": "3000 miles", "value": 3000 },
    { "label": "4000 miles", "value": 4000 }
  ]

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
        transpor_emissions = calcBike(milesTraveled);
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
    if(milesTraveled !== null && selectedValue !== null) {
      let transporation_emission = calcMilesTraveled();
      console.log("transport_emissions: " + transporation_emission);
      setEmissionsEntry({
        ...route.params.sentEmissionsEntry,
        transport_emissions: transporation_emission
    })
  }
  }, [milesTraveled, selectedValue])

  return (
    <View style={styles.container}>
      <View style={styles.funfact}>
        <Text style={styles.header}>Did you know?</Text>
        <Text style={styles.label} testID='fun-fact'>{memoizedFunFact}</Text>
      </View>

      <Text style={styles.header}>Log your travel for today</Text>
      <Picker
        selectedValue={milesTraveled}
        onValueChange={(value) => setmilesTraveled(value)}
        style={styles.picker}
        testID='miles-traveled'
      >
        {miles.map((mile) => (
            <Picker.Item
              key={mile.value}
              label={mile.label}
              value={mile.value}
              testID={`miles-${mile.value}`}
            />
          ))}
      </Picker>
      <Text style={styles.header}>What was your mode of transportation?</Text>
      <RadioButton.Group onValueChange={value => setSelectedValue(value)} value={selectedValue}>
        <View style={styles.switchContainer}>
          <Text style={styles.radioButtonText}>Car</Text>
          <RadioButton value="Car" />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.radioButtonText}>Electric Car</Text>
          <RadioButton value="ElecCar" />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.radioButtonText}>Bike</Text>
          <RadioButton value="Bike" />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.radioButtonText}>Bus</Text>
          <RadioButton value="Bus" />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.radioButtonText}>Train</Text>
          <RadioButton value="Train" />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.radioButtonText}>Plane</Text>
          <RadioButton value="Plane" />
        </View>
      </RadioButton.Group>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(ScreenNames.RECORD_EMISSION, {returningEmissionsEntry : emissionsEntry})}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecordTransportation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.secondary.NON_PHOTO_BLUE,
  },
  label: {
    fontSize: 16,
    color: Colors.primary.RAISIN_BLACK,
    marginBottom: 10,
  },
  picker: {
    width: '50%',
    marginBottom: 20,
    color: Colors.primary.RAISIN_BLACK,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    padding: 5,
  },
  button: {
    backgroundColor: Colors.secondary.DARK_MINT,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    margin: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.primary.MINT_CREAM,
    fontWeight: 'bold',
    fontSize: 16,
  },
  funfact: {
    backgroundColor: Colors.primary.MINT,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioButtonText: {
    marginRight: 25,
    width: 60,
  },
  
});





