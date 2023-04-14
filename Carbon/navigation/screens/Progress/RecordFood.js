import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../../colors/Colors';
import { API_URL } from '../../../config/Api';
import { getToken } from '../../../util/LoginManager';

const RecordFood = ({ navigation }) => {
  const [consumption, setConsumption] = useState(0);
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
  async function postFood() {
    try {
      const response = await fetch(`${API_URL}userEmissions`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'secret_token': await getToken(),
        },
        body: JSON.stringify({
          diet_emissions: consumption,
          transport_emissions: 0,
          total_emissions: consumption,
          lifestyle_emissions: 0,
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
      <View style={styles.pickercontainer}>
        <Text style={styles.label}>How much red meat did you consume today?</Text>
        <Picker
            selectedValue={consumption}
            onValueChange={(value) => setConsumption(value)}
            style={styles.picker}
        >
            <Picker.Item label="0 lbs" value={0} />
            <Picker.Item label="0.25 lbs" value={0.25} />
            <Picker.Item label="0.5 lbs" value={0.5} />
            <Picker.Item label="0.75 lbs" value={0.75} />
            <Picker.Item label="1 lb" value={1} />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={postFood}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary.ALMOND,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary.RAISIN_BLACK,
    marginBottom: 10,
  },
  pickercontainer: {
    flex: 1/3,
    width: '100%',
  },
  picker: {
    marginBottom: 20,
    color: Colors.primary.RAISIN_BLACK,
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
    borderRadius: 8,
    padding: 10,
    flex: 1/3,
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

export default RecordFood;