import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../../colors/Colors';

const RecordFood = ({ navigation }) => {
  const [consumption, setConsumption] = useState(0);

  const handleSave = async () => {
    // try {
    //   const response = await fetch('https://example.com/users/me', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ red_meat_consumption: consumption }),
    //   });
    //   const data = await response.json();
    //   console.log('Response:', data);
      
    // } catch (error) {
    //   console.error('Error:', error);
    // }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
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
  picker: {
    width: '100%',
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
  }
});

export default RecordFood;