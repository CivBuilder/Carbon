import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import CustomPicker from './CustomPicker';
import {Colors} from '../../../styling/Colors';
import { ScreenNames } from '../Main/ScreenNames';

import homeElec from '../../../calculations/home_calculations/homeElec';
const RecordElectricity = ({ navigation, route }) => {
  const [electricityUsage, setElectricityUsage] = useState(0);
  const [kwhUsage, setKwhUsage] = useState(0);
  const [emissionsEntry, setEmissionsEntry] = useState();
  const [funFact, setFunFact] = useState('');
  const funFacts = [
    "The average U.S. household emits about 8.8 metric tons of CO2 per year from electricity use alone, which is roughly equivalent to driving a car for 23,000 miles.",
    "Unplugging electronics when they're not in use can significantly reduce CO2 emissions from home electricity use. In fact, 'phantom load' from electronics that are plugged in but not in use can account for up to 10% of a household's energy use.",
    "Running a ceiling fan in the summer can help reduce the need for air conditioning, which in turn can reduce CO2 emissions from electricity use. For every degree you raise your thermostat during the summer, you can save about 3% on your cooling costs.",
    "LED light bulbs use about 75% less energy than traditional incandescent bulbs, which can translate to significant CO2 emission reductions from home electricity use over time.",
    "Using a clothesline to dry clothes instead of a clothes dryer can save a significant amount of energy and reduce CO2 emissions from home electricity use. In fact, according to the Department of Energy, using a clothesline for just six months out of the year can save up to 700 pounds of CO2 emissions annually."
  ];
  //weights used in the picker
  const kwh = Array.from({length: 100}, (_, i) => ({ label: `${i+1} kWh`, value: i+1 }));

  function getRandomFunFact() {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
  }
  
  //set the fun fact when the component mounts
  useEffect(() => {
    setFunFact(getRandomFunFact());
  }, []);

  //memoize the fun fact so it doesn't change when the state variable changes
  const memoizedFunFact = useMemo(() => funFact, [funFact]);

  // Call setKwhUsage when the electricityUsage state variables change
  useEffect(() => {
    //asking for usage in kWh, but we need to convert to MWh for the calculation
    const calcElectricity = homeElec(electricityUsage / 1000);
    setKwhUsage(calcElectricity);
    
}, [electricityUsage]);

  //Update our parameter to send back when the kwhUsage state variable changes 
  useEffect( () => {
    //need to check if route is undefined for testing purposes
    if(electricityUsage !== 0 && route !== undefined) {
      setEmissionsEntry({
        ...route.params.sentEmissionsEntry,
        home_emissions:kwhUsage
    })
    }
  }, [kwhUsage])

  return (
    <ScrollView contentContainerStyle={styles.scrollview}>
    <View style={styles.container}>
      <View style={styles.funfact}>
        <Text style={styles.header}>Did you know?</Text>
        <Text style={styles.label}>{memoizedFunFact}</Text>
      </View>
      <Text style={styles.header}>Log your home electricity usage for today</Text>
      <View style={styles.pickercontainer}>
        <CustomPicker
          label='Electricity Usage (kWh)'
          selectedValue={electricityUsage}
          onValueChange={setElectricityUsage}
          items={kwh}
          testID='electricity-picker'
        />
        <TouchableOpacity testID ='save-button' style={styles.button} onPress={() => navigation.navigate(ScreenNames.RECORD_EMISSION, {returningEmissionsEntry : emissionsEntry})}>
          <Text style={styles.buttonText}>Save & Return</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.secondary.ALMOND,
  },
  label: {
    fontSize: 16,
    color: Colors.primary.RAISIN_BLACK,
    marginBottom: 10,
  },
  pickercontainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  picker: {
    marginBottom: 5,
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
  
});

export default RecordElectricity;