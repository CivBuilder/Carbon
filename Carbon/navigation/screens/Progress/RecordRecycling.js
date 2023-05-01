import React, { useEffect, useState, useMemo } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { ScreenNames } from '../Main/ScreenNames';
import calcPaper  from '../../../calculations/recycling_calculations/calcPaper'
import calcPlastic from '../../../calculations/recycling_calculations/calcPlastic'
import calcMetal from '../../../calculations/recycling_calculations/calcMetal'
import calcGlass from '../../../calculations/recycling_calculations/calcGlass'
import { validateRecyclingEntry } from '../../../util/RecordEmissionChecks';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../../styling/RecordEmissionsCSS';


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
    // console.log('total recycled: ', newTotalRecycled, 'lbs')
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.funfact}>
          <Text style={styles.header}>Did you know?</Text>
          <Text style={styles.label}>{memoizedFunFact}</Text>
        </View>
        <Text style={styles.header}>Log each material you recycled today</Text>
        <View style={styles.pickercontainer}>
          <View style={{flexDirection:'row', alignItems:'center', marginBottom:6 }}>
            <Ionicons name="document-outline" size={32} color="black" style={{marginRight:6}}/>
            <Text style={styles.text_input_label}>Paper</Text>
          </View>
          <TextInput
            placeholder='lbs'
            clearButtonMode='always' //iOS only
            style={styles.text_input}
            keyboardType="decimal-pad"
            onChangeText={(paper) => setPaperAmount(paper.length > 0 ? paper : 0)}
            testID='paper-input'
          />

          <View style={{flexDirection:'row', alignItems:'center', marginBottom:6 }}>
            <MaterialCommunityIcons name="bottle-soda-classic-outline" size={36} color="black" style={{marginRight:6}}/>
            <Text style={styles.text_input_label}>Plastic</Text>
          </View>
          <TextInput
            placeholder='lbs'
            clearButtonMode='always' //iOS only
            style={styles.text_input}
            keyboardType="decimal-pad"
            onChangeText={(plastic) => setPlasticAmount(plastic.length > 0 ? plastic : 0)}
            testID='plastic-input'
          />

          <View style={{flexDirection:'row', alignItems:'center', marginBottom:6 }}>
            <MaterialCommunityIcons name="bottle-wine-outline" size={36} color="black" style={{marginRight:6}}/>
            <Text style={styles.text_input_label}>Glass</Text>
          </View>
          <TextInput
            placeholder='lbs'
            clearButtonMode='always' //iOS only
            style={styles.text_input}
            keyboardType="decimal-pad"
            onChangeText={(glass) => setGlassAmount(glass.length > 0 ? glass : 0)}
            testID='glass-input'
          />

          <View style={{flexDirection:'row', alignItems:'center', marginBottom:6 }}>
            <MaterialCommunityIcons name="nail" size={32} color="black" style={{marginRight:6}}/>
            <Text style={styles.text_input_label}>Metal</Text>
          </View>
          <TextInput
            placeholder='lbs'
            clearButtonMode='always' //iOS only
            style={styles.text_input}
            keyboardType="decimal-pad"
            onChangeText={(metal) => setMetalAmount(metal.length > 0 ? metal : 0)}
            testID='metal-input'
          />

        {(paperAmount.length > 0 || plasticAmount.length > 0 || glassAmount.length > 0 || metalAmount.length > 0) &&
        (parseFloat(paperAmount) + parseFloat(plasticAmount) + parseFloat(glassAmount) + parseFloat(metalAmount)) > 0 && (
          <TouchableOpacity testID='save-button' style={styles.button} onPress={() => validateRecyclingEntry(paperAmount, plasticAmount, glassAmount, metalAmount) ? navigation.navigate(ScreenNames.RECORD_EMISSION, {returningEmissionsEntry : emissionsEntry}) : alert("Each entry must be a number between 0 and 50.")}>
            <Text style={styles.buttonText}>Save & Return</Text>
          </TouchableOpacity>
        )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecordRecycling;