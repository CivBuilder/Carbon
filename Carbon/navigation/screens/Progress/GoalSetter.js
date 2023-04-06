import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Slider } from 'react-native';
import { Colors } from '../../../colors/Colors';
import { ScreenNames } from '../Main/ScreenNames';
import { API_URL } from '../../../config/Api';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 10;

export default function GoalSetter({ navigation }) {
  const [goal, setGoal] = useState(0);

  const handleValueChange = (value) => {
    const roundedValue = Math.round(value);
    setGoal(roundedValue);
  };

  const saveGoalToDatabase = () => {
    fetch(API_URL + 'goal', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ goal: goal })
    })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <View style={styles.sliderTextContainer}>
          <Text style={styles.sliderText}>This month, I will lower my emissions by:</Text>
          <Text style={styles.sliderPercentage} testID="sliderPercentage">{goal}%</Text>
        </View>
        {/* Change to not deprecated slider */}
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          step={1}
          onValueChange={handleValueChange}
          testID="slider"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => { saveGoalToDatabase(); navigation.navigate(ScreenNames.PROGRESS); }}>
          <View style={styles.button} testID="set-goal-button">
            <Text style={styles.buttonText}>Set Goal</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: margin,
  },
  container: {
    margin: margin,
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary.RAISIN_BLACK,
    textAlign: 'center',
  },
  sliderPercentage: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.primary.MINT,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.primary.MINT,
    height: 40,
    width: 105,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  buttonText: {
    color: Colors.primary.MINT_CREAM,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
