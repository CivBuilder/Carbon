import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../../colors/Colors';
import { ScreenNames } from '../Main/ScreenNames';
import calcPaper  from '../../../calculations/recycling_calculations/calcPaper'
import calcPlastic from '../../../calculations/recycling_calculations/calcPlastic'
import calcMetal from '../../../calculations/recycling_calculations/calcMetal'
import calcGlass from '../../../calculations/recycling_calculations/calcGlass'

const RecordRecycling = ({ navigation, route }) => {
  const [emissionsEntry, setEmissionsEntry] = useState();
  const [recycledAmount, setRecycledAmount] = useState(null);
  const [paperAmount, setPaperAmount] = useState(0);
  const [plasticAmount, setPlasticAmount] = useState(0);
  const [glassAmount, setGlassAmount] = useState(0);
  const [metalAmount, setMetalAmount] = useState(0);
  const [funFact, setFunFact] = useState('');

  const funFacts = [
    "Recycling one ton of paper saves 17 trees, 7,000 gallons of water, and 463 gallons of oil.",
    "Americans throw away enough aluminum to rebuild the entire commercial air fleet every three months.",
    "Recycling plastic saves twice as much energy as burning it in an incinerator.",
    "In 2018, the US generated 292.4 million tons of municipal solid waste, of which only 69 million tons were recycled.",
    "Recycling electronics helps to conserve natural resources and reduces greenhouse gas emissions caused by the manufacturing of new electronics."
  ];
  const weights = [
    { label: '0 lbs', value: 0 },
    { label: '0.25 lbs', value: 0.25 },
    { label: '0.5 lbs', value: 0.5 },
    { label: '0.75 lbs', value: 0.75 },
    { label: '1 lbs', value: 1 },
    { label: '1.25 lbs', value: 1.25 },
    { label: '1.5 lbs', value: 1.5 },
    { label: '1.75 lbs', value: 1.75 },
    { label: '2 lbs', value: 2 },
    { label: '2.25 lbs', value: 2.25 },
    { label: '2.5 lbs', value: 2.5 },
    { label: '2.75 lbs', value: 2.75 },
    { label: '3 lbs', value: 3 },
    { label: '3.25 lbs', value: 3.25 },
    { label: '3.5 lbs', value: 3.5 },
    { label: '3.75 lbs', value: 3.75 },
    { label: '4 lbs', value: 4 },
    { label: '4.25 lbs', value: 4.25 },
    { label: '4.5 lbs', value: 4.5 },
    { label: '4.75 lbs', value: 4.75 },
    { label: '5 lbs', value: 5 },
    { label: '6 lbs', value: 6 },
    { label: '7 lbs', value: 7 },
    { label: '8 lbs', value: 8 },
    { label: '9 lbs', value: 9 },
    { label: '10 lbs', value: 10 },
    { label: '11 lbs', value: 11 },
    { label: '12 lbs', value: 12 },
    { label: '13 lbs', value: 13 },
    { label: '14 lbs', value: 14 },
    { label: '15 lbs', value: 15 },
    { label: '16 lbs', value: 16 },
    { label: '17 lbs', value: 17 },
    { label: '18 lbs', value: 18 },
    { label: '19 lbs', value: 19 },
    { label: '20 lbs', value: 20 },
    { label: '21 lbs', value: 21 },
    { label: '22 lbs', value: 22 },
    { label: '23 lbs', value: 23 },
    { label: '24 lbs', value: 24 },
    { label: '25 lbs', value: 25 },
  ];

  function getRandomFunFact() {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
  }
  function calcRecycled() {
    const paper = calcPaper(paperAmount);
    const plastic = calcPlastic(plasticAmount);
    const glass = calcGlass(glassAmount);
    const metal = calcMetal(metalAmount);
    return paper + plastic + glass + metal;
  }
  //set the fun fact when the component mounts
  useEffect(() => {
    setFunFact(getRandomFunFact());
  }, []);

  //memoize the fun fact so it doesn't change when the state variable changes
  const memoizedFunFact = useMemo(() => funFact, [funFact]);

  //update the total recycled when the state variables change
  useEffect(() => {
    const newTotalRecycled = calcRecycled();
    console.log('total recycled: ', newTotalRecycled, 'lbs')
    setRecycledAmount(newTotalRecycled);
  }, [paperAmount, plasticAmount, glassAmount, metalAmount]);

  //Update our parameter to send back when the consumption state variable changes 
  useEffect(() => {
    if(recycledAmount !== null)
    setEmissionsEntry({
        ...route.params.sentEmissionsEntry,
        lifestyle_emissions : recycledAmount
    })
  }, [recycledAmount])
  
  return (
    <View style={styles.container}>
      <View style={styles.funfact}>
        <Text style={styles.header}>Did you know?</Text>
        <Text style={styles.label}>{memoizedFunFact}</Text>
      </View>
      <Text style={styles.header}>Log the amount of each material you recycled today</Text>
        <Text style={styles.pickerHeader} >Paper</Text>
        <Picker
          selectedValue={paperAmount}
          onValueChange={(value) => setPaperAmount(value)}
          style={styles.picker}
        >
          {weights.map((weight) => (
            <Picker.Item
              key={weight.value}
              label={weight.label}
              value={weight.value}
            />
          ))}
        </Picker>
        <Text style={styles.pickerHeader}>Plastic</Text>
        <Picker
          selectedValue={plasticAmount}
          onValueChange={(value) => setPlasticAmount(value)}
          style={styles.picker}
        >
          {weights.map((weight) => (
            <Picker.Item
              key={weight.value}
              label={weight.label}
              value={weight.value}
            />
          ))}
        </Picker>
        <Text style={styles.pickerHeader}>Glass</Text>
        <Picker
          selectedValue={glassAmount}
          onValueChange={(value) => setGlassAmount(value)}
          style={styles.picker}
        >
          {weights.map((weight) => (
            <Picker.Item
              key={weight.value}
              label={weight.label}
              value={weight.value}
            />
          ))}
        </Picker>
        <Text style={styles.pickerHeader}>Metal</Text>
        <Picker
          selectedValue={metalAmount}
          onValueChange={(value) => setMetalAmount(value)}
          style={styles.picker}
        >
          {weights.map((weight) => (
            <Picker.Item
              key={weight.value}
              label={weight.label}
              value={weight.value}
            />
          ))}
        </Picker>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(ScreenNames.RECORD_EMISSION, {returningEmissionsEntry : emissionsEntry})}>
        <Text style={styles.buttonText}>Save & Return</Text>
      </TouchableOpacity>      
    </View>
  );
};

export default RecordRecycling;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.primary.MINT,
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
      borderWidth: 2,
      borderColor: Colors.primary.MINT_CREAM,
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
      backgroundColor: Colors.primary.MINT_CREAM,
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
    pickerHeader: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
