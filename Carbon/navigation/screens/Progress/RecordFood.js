import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import CustomPicker from './CustomPicker';
import {Colors} from '../../../styling/Colors';
import { ScreenNames } from '../Main/ScreenNames';
import calcBeef  from '../../../calculations/food_calculations/calcBeef'
import calcCheese from '../../../calculations/food_calculations/calcCheese'
import calcPork from '../../../calculations/food_calculations/calcPork'
import calcPoultry from '../../../calculations/food_calculations/calcPoultry'
import { validateFoodEntry } from '../../../util/RecordEmissionChecks';

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
    // console.log('total consumption: ', newTotalConsumption, 'lbs')
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
    <ScrollView contentContainerStyle={styles.scrollview}>
    <View style={styles.container}>
      <View style={styles.funfact}>
        <Text style={styles.header}>Did you know?</Text>
        <Text style={styles.label}>{memoizedFunFact}</Text>
      </View>
      <Text style={styles.header}>Log your food intake for today</Text>
      <View style={styles.pickercontainer}>
        {/* <CustomPicker
          label='Red Meat'
          selectedValue={beefConsumption}
          onValueChange={setBeefConsumption}
          items={weights}
          testID='red-meat-picker'
        />
        <CustomPicker
          label='Cheese'
          selectedValue={cheeseConsumption}
          onValueChange={setCheeseConsumption}
          items={filteredWeights}
          testID='cheese-picker'
        />
        <CustomPicker
          label='Pork'
          selectedValue={porkConsumption}
          onValueChange={setPorkConsumption}
          items={weights}
          testID='pork-picker'
        />
        <CustomPicker
          label='Poultry'
          selectedValue={poultryConsumption}
          onValueChange={setPoultryConsumption}
          items={weights}
          testID='poultry-picker'
        /> */}

        <Text style={styles.text_input_label}>Red Meat</Text>
        <TextInput
          placeholder='lbs'
          style={styles.text_input}
          keyboardType="numeric"
          onChangeText={(beef) => setBeefConsumption(beef.length > 0 ? beef : 0)}
        />

        <Text style={styles.text_input_label}>Cheese</Text>
        <TextInput
          placeholder='lbs'
          style={styles.text_input}
          keyboardType="numeric"
          onChangeText={(cheese)=> setCheeseConsumption(cheese.length > 0 ? cheese : 0)}
        />

        <Text style={styles.text_input_label}>Pork</Text>
        <TextInput
          placeholder='lbs'
          style={styles.text_input}
          keyboardType="numeric"
          onChangeText={(pork) => setPorkConsumption(pork.length > 0 ? pork : 0)}
        />

        <Text style={styles.text_input_label}>Poultry</Text>
        <TextInput
          placeholder='lbs'
          style={styles.text_input}
          keyboardType="numeric"
          onChangeText={(poultry) => setPoultryConsumption(poultry.length > 0 ? poultry : 0)}
        />

      {(beefConsumption.length > 0 || cheeseConsumption.length > 0 || porkConsumption.length > 0 || poultryConsumption.length > 0) &&
       (parseFloat(beefConsumption) + parseFloat(cheeseConsumption) + parseFloat(porkConsumption) + parseFloat(poultryConsumption)) > 0 && (
        <View style={{flex:1, justifyContent:'flex-end'}}>
        <TouchableOpacity testID ='save-button' style={styles.button} onPress={() => validateFoodEntry(beefConsumption, porkConsumption, cheeseConsumption, poultryConsumption) ? navigation.navigate(ScreenNames.RECORD_EMISSION, {returningEmissionsEntry : emissionsEntry}) : alert("Each entry must be a number between 0 and 10.")}>
          <Text style={styles.buttonText}>Save & Return</Text>
        </TouchableOpacity>
        </View>
      )}
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
    backgroundColor: Colors.secondary.NYANZA,
  },
  label: {
    fontSize: 16,
    color: Colors.primary.RAISIN_BLACK,
    marginBottom: 10,
    textAlign: 'center',
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
    flex: 1,
    justifyContent:'flex-end',
    backgroundColor: Colors.secondary.DARK_MINT,
    borderRadius: 8,
    padding: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.primary.MINT_CREAM,
    fontWeight: 'bold',
    fontSize: 16,
  },
  funfact: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary.MINT,
    backgroundColor: Colors.secondary.CELADON,
    padding: 12,
    marginHorizontal: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 12,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text_input_label: {
    fontSize:16,
    fontWeight:"500",
    marginBottom:12,
    textAlign: 'center',
  },
  text_input: {
      height: 40,
      width: 12*16,
      borderColor: 'gray',
      borderWidth: 1.5,
      borderRadius: 6,
      padding: 10,
      marginBottom: 24,
      backgroundColor: 'white',
  },
});

export default RecordFood;