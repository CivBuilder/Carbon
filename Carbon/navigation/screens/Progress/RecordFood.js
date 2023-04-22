import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../../colors/Colors';
import { ScreenNames } from '../Main/ScreenNames';
import calcBeef  from '../../../calculations/food_calculations/calcBeef'
import calcCheese from '../../../calculations/food_calculations/calcCheese'
import calcPork from '../../../calculations/food_calculations/calcPork'
import calcPoultry from '../../../calculations/food_calculations/calcPoultry'

const RecordFood = ({ navigation, route }) => {
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [beefConsumption, setBeefConsumption] = useState(0);
  const [cheeseConsumption, setCheeseConsumption] = useState(0);
  const [porkConsumption, setPorkConsumption] = useState(0);
  const [poultryConsumption, setPoultryConsumption] = useState(0);
  const [emissionsEntry, setEmissionsEntry] = useState();
  const [funFact, setFunFact] = useState('');
  const funFacts = [
    "The average American diet generates approximately 2.5 metric tons of carbon dioxide emissions per year.",
    "A meat-based diet generates 2.5 times more carbon emissions than a vegetarian diet.",
    "The production of cheese generates more carbon emissions per kilogram than the production of chicken or pork.",
    "The transportation of food accounts for only 11% of the food system's emissions, while the production of food accounts for 83% of emissions.",
    "Eating locally sourced, seasonal produce can reduce carbon emissions from transportation and refrigeration."
  ];
  //weights used in the picker
  const weights = [
    { label: '0 lbs', value: 0 },
    { label: '0.25 lbs', value: 0.25 },
    { label: '0.5 lbs', value: 0.5 },
    { label: '0.75 lbs', value: 0.75 },
    { label: '1 lbs', value: 1 },
    { label: '1.25 lbs', value: 1.25 },
    { label: '1.5 lbs', value: 1.5 },
    { label: '1.75 lbs', value: 1.75 },
    { label: '2 lbs', value: 2 }
  ];
  //filtering weights because no one is going to eat more than 1lb of cheese
  const filteredWeights = weights.filter(weight => weight.value <= 1);

  function getRandomFunFact() {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
  }
  //Calculate the total amount of emissions from the food consumption
  function calcConsumption() { 
    const beef = calcBeef(beefConsumption)
    const cheese = calcCheese(cheeseConsumption)
    const pork = calcPork(porkConsumption)
    const poultry = calcPoultry(poultryConsumption)
    return beef + cheese + pork + poultry
  }
  //set the fun fact when the component mounts
  useEffect(() => {
    setFunFact(getRandomFunFact());
  }, []);

  //memoize the fun fact so it doesn't change when the state variable changes
  const memoizedFunFact = useMemo(() => funFact, [funFact]);

  // Call setTotalConsumption when the consumption state variables change
  useEffect(() => {
    const newTotalConsumption = calcConsumption();
    console.log('total consumption: ', newTotalConsumption, 'lbs')
    setTotalConsumption(newTotalConsumption);
  }, [beefConsumption, cheeseConsumption, porkConsumption, poultryConsumption]);

  //Update our parameter to send back when the consumption state variable changes 
  useEffect( () => {
    //need to check if route is undefined for testing purposes
    if(totalConsumption !== 0 && route !== undefined) {
      setEmissionsEntry({
        ...route.params.sentEmissionsEntry,
        diet_emissions:totalConsumption
    })
    }
  }, [totalConsumption])

  return (
    <View style={styles.container}>
      <View style={styles.funfact}>
        <Text style={styles.header}>Did you know?</Text>
        <Text style={styles.label}>{memoizedFunFact}</Text>
      </View>
      <Text style={styles.header}>Log your food intake for today</Text>
      <View style={styles.pickercontainer}>
      <View style={styles.pickerRow}>
        <Text style={styles.pickerLabel}>Red Meat</Text>
        <Picker
          selectedValue={beefConsumption}
          onValueChange={(value) => setBeefConsumption(value)}
          style={styles.picker}
          testID='red-meat-picker'
        >
          {weights.map((weight) => (
            <Picker.Item
              key={weight.value}
              label={weight.label}
              value={weight.value}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerRow}>
        <Text style={styles.pickerLabel}>Cheese</Text>
        <Picker
          selectedValue={cheeseConsumption}
          onValueChange={(value) => setCheeseConsumption(value)}
          style={styles.picker}
          testID='cheese-picker'
        >
         {filteredWeights.map((weight) => (
            <Picker.Item
              key={weight.value}
              label={weight.label}
              value={weight.value}
              
            />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerRow}>
        <Text style={styles.pickerLabel}>Pork</Text>
        <Picker
          selectedValue={porkConsumption}
          onValueChange={(value) => setPorkConsumption(value)}
          style={styles.picker}
          testID='pork-picker'
        >
          {weights.map((weight) => (
            <Picker.Item
              key={weight.value}
              label={weight.label}
              value={weight.value}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerRow}>
        <Text style={styles.pickerLabel}>Poultry</Text>
        <Picker
          selectedValue={poultryConsumption}
          onValueChange={(value) => setPoultryConsumption(value)}
          style={styles.picker}
          testID='poultry-picker'
        >
          {weights.map((weight) => (
            <Picker.Item
              key={weight.value}
              label={weight.label}
              value={weight.value}
            />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(ScreenNames.RECORD_EMISSION, {returningEmissionsEntry : emissionsEntry})}>
        <Text style={styles.buttonText}>Save & Return</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  pickerLabel: {
    fontWeight: 'bold',
    color: Colors.primary.RAISIN_BLACK,
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 5,
  },
  pickerRow: {
    display: 'flex',
    borderWidth: 2,
    backgroundColor: Colors.primary.MINT_CREAM,
    borderColor: Colors.primary.MINT,
    borderRadius: 8,
    margin: 5,
    width: '50%',
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

export default RecordFood;