import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../../colors/Colors';
const RecordTransportation = ({ navigation }) => {
  const [milesDriven, setMilesDriven] = useState(0);
  const [publicTransportationUsed, setPublicTransportationUsed] = useState(false);
  const [bikeUsed, setBikeUsed] = useState(false);

  const handleSave = () => {
    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
});





