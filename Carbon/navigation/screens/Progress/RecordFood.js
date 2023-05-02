import React, { useEffect, useState, useMemo } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { ScreenNames } from '../Main/ScreenNames';
import calcBeef  from '../../../calculations/food_calculations/calcBeef'
import calcCheese from '../../../calculations/food_calculations/calcCheese'
import calcPork from '../../../calculations/food_calculations/calcPork'
import calcPoultry from '../../../calculations/food_calculations/calcPoultry'
import { validateFoodEntry } from '../../../util/RecordEmissionChecks';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../../styling/RecordEmissionsCSS';

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false}>
        <View style={styles.funfact}>
          <Text style={styles.header}>Did you know?</Text>
          <Text style={styles.label}>{memoizedFunFact}</Text>
        </View>
        <Text style={styles.header}>Log your food intake for today</Text>
        <View style={styles.pickercontainer}>
          <View style={styles.label_container}>
            <FontAwesome5 name="hamburger" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Red Meat</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always' //iOS only
            onChangeText={(beef) => setBeefConsumption(beef.length > 0 ? beef : 0)}
            testID='red-meat-input'
          />

          <View style={styles.label_container}>
            <FontAwesome5 name="cheese" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Cheese</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always' //iOS only
            onChangeText={(cheese)=> setCheeseConsumption(cheese.length > 0 ? cheese : 0)}
            testID='cheese-input'
          />

          <View style={styles.label_container}>
            <FontAwesome5 name="bacon" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Pork</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always' //iOS only
            onChangeText={(pork) => setPorkConsumption(pork.length > 0 ? pork : 0)}
            testID='pork-input'
          />

          <View style={styles.label_container}>
            <MaterialCommunityIcons name="egg" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Poultry</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always' //iOS only
            onChangeText={(poultry) => setPoultryConsumption(poultry.length > 0 ? poultry : 0)}
            testID='poultry-input'
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecordFood;