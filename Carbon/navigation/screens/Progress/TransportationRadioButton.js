import { View, Text, StyleSheet } from 'react-native'
import { RadioButton } from 'react-native-paper';
import React from 'react'

const TransportationRadioButton = ({setSelectedValue, selectedValue}) => {
  return (
    <RadioButton.Group onValueChange={value => setSelectedValue(value)} value={selectedValue}>
    <View style={styles.switchContainer}>
      <Text style={styles.radioButtonText}>Car</Text>
      <RadioButton value="Car" testID='Car' />
    </View>
    <View style={styles.switchContainer}>
      <Text style={styles.radioButtonText}>Electric Car</Text>
      <RadioButton value="ElecCar" testID='ElecCar' />
    </View>
    <View style={styles.switchContainer}>
      <Text style={styles.radioButtonText}>Bike</Text>
      <RadioButton value="Bike" testID='Bike'/>
    </View>
    <View style={styles.switchContainer}>
      <Text style={styles.radioButtonText}>Bus</Text>
      <RadioButton value="Bus" testID='Bus'/>
    </View>
    <View style={styles.switchContainer}>
      <Text style={styles.radioButtonText}>Train</Text>
      <RadioButton value="Train" testID='Train'/>
    </View>
    <View style={styles.switchContainer}>
      <Text style={styles.radioButtonText}>Plane</Text>
      <RadioButton value="Plane" testID='Plane'/>
    </View>
  </RadioButton.Group>
  )
}
const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        padding: 5,
      },
      radioButtonText: {
        marginRight: 25,
        width: 60,
      },
});
export default TransportationRadioButton