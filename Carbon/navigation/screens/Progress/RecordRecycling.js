import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../../colors/Colors';
import {API_URL} from '../../../config/Api';
import { getToken } from '../../../util/LoginManager';

const RecordRecycling = ({ navigation }) => {
  const [recycledAmount, setRecycledAmount] = useState(0);
  const [reusableBags, setReusableBags] = useState(false);
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
  async function postRecycling() {
    try {
      const response = await fetch(`${API_URL}userEmissions`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'secrettoken': await getToken(),
        },
        body: JSON.stringify({
          diet_emissions: 0,
          transport_emissions: 0,
          total_emissions: recycledAmount,
          lifestyle_emissions: recycledAmount,
          home_emissions: 0,
        })
      })
      .then(navigation.goBack());
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.funfact}>
        <Text style={styles.header}>Did you know?</Text>
        <Text style={styles.label}>{getRandomFunFact()}</Text>
      </View>
      <Text style={styles.label}>How many pounds did you recycle today?</Text>
      <Picker
        selectedValue={recycledAmount}
        onValueChange={(value) => setRecycledAmount(value)}
        style={styles.picker}
      >
        <Picker.Item label="0 lbs" value={0} />
        <Picker.Item label="0.25 lbs" value={0.25} />
        <Picker.Item label="0.5 lbs" value={0.5} />
        <Picker.Item label="0.75 lbs" value={0.75} />
        <Picker.Item label="1 lb" value={1} />
      </Picker>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Did you use reusable bags?</Text>
        <Switch
          value={reusableBags}
          onValueChange={(value) => setReusableBags(value)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={postRecycling}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>      
    </View>
  );
};

export default RecordRecycling;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary.MINT,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary.RAISIN_BLACK,
        marginBottom: 10,
    },
    picker: {
      width: '100%',
      marginBottom: 20,
      color: Colors.primary.RAISIN_BLACK,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 10,
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
      borderRadius: 8,
      padding: 10,
      flex: 2/3,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 60,
      width: '90%',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    }
  });
