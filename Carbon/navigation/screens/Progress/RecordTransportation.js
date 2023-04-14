import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../../colors/Colors';
const RecordTransportation = ({ navigation }) => {
  const [milesDriven, setMilesDriven] = useState(0);
  const [publicTransportationUsed, setPublicTransportationUsed] = useState(false);
  const [bikeUsed, setBikeUsed] = useState(false);
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
  async function postTransportation() {
    try {
      const response = await fetch(`${API_URL}userEmissions`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'secret_token': await getToken(),
        },
        body: JSON.stringify({
          diet_emissions: 0,
          transport_emissions: milesDriven,
          total_emissions: milesDriven,
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

      <Text style={styles.label}>How many miles did you drive?</Text>
      <Picker
        selectedValue={milesDriven}
        onValueChange={(value) => setMilesDriven(value)}
        style={styles.picker}
      >
        <Picker.Item label="0 miles" value={0} />
        <Picker.Item label="25 miles" value={25} />
        <Picker.Item label="50 miles" value={50} />
        <Picker.Item label="75 miles" value={75} />
        <Picker.Item label="100 miles" value={100} />
        <Picker.Item label="125 miles" value={125} />
        <Picker.Item label="150 miles" value={150} />
        <Picker.Item label="175 miles" value={175} />
        <Picker.Item label="200 miles" value={200} />
        <Picker.Item label="225 miles" value={225} />
        <Picker.Item label="250 miles" value={250} />
      </Picker>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Did you use public transportation?</Text>
        <Switch
          value={publicTransportationUsed}
          onValueChange={(value) => setPublicTransportationUsed(value)}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Did you bike?</Text>
        <Switch
          value={bikeUsed}
          onValueChange={(value) => setBikeUsed(value)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecordTransportation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary.NON_PHOTO_BLUE,
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





