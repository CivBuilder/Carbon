import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors } from '../../../colors/Colors';
import { ScreenNames } from '../Main/ScreenNames';
import { API_URL } from '../../../config/Api';
import { getToken } from '../../../util/LoginManager';

const margin = 10;
const NonBreakingSpace = () => <Text>{'\u00A0'}</Text>;
const API_GOAL_URL = API_URL + 'goal';

export default function GoalSetter({ navigation }) {
  const [goal, setGoal] = useState(0);

  const handleValueChange = (value) => {
    const roundedValue = Math.round(value);
    setGoal(roundedValue);
  };

  const saveGoalToDatabase = async () => {
    await fetch(API_GOAL_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'secrettoken': await getToken(),
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
        {/* TODO: add in pounds cut per month once Miguel's chart PR is in */}
        {/* <Text style={styles.sliderSubText}>That's X pounds of CO2 compared to last month.</Text> */}
        <NonBreakingSpace />
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
  sliderSubText: {
    fontSize: 17,
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
