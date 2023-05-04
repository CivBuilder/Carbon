import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors } from '../../../styling/Colors';
import { ScreenNames } from '../Main/ScreenNames';
import { saveGoalToDatabase, getPreviousMonthEmissions } from '../../../util/Goals';
import { useToast } from 'react-native-toast-notifications';

const margin = 10;
const NonBreakingSpace = () => <Text>{'\u00A0'}</Text>;

async function getEmissionsFromDb() {
  const emissions = await getPreviousMonthEmissions();
  return emissions;
}

export default function GoalSetter({ navigation }) {
  const [goal, setGoal] = useState(0);
  const [previousMonthEmissions, setPreviousMonthEmissions] = useState(0);
  const [originalEmissions, setOriginalEmissions] = useState(0);
  const [goalSet, setGoalSet] = useState(false);

  const toast = useToast();

  useEffect(() => {
    async function fetchLastMonthEmissions() {
      const emissions = await getEmissionsFromDb();
      setPreviousMonthEmissions(emissions);
      setOriginalEmissions(emissions);
    }
    fetchLastMonthEmissions();
  }, []);

  useEffect(() => {
    const factor = goal / 100;
    const newEmissions = originalEmissions * factor;
    setPreviousMonthEmissions(newEmissions.toFixed(1));
  }, [goal, originalEmissions]);

  useEffect(() => {
    if (goalSet) {
      toast.show('Your goal has been set!', {
        type: 'success',
      });
    }
  }, [goalSet]);

  const handleValueChange = (value) => {
    const roundedValue = Math.round(value);
    setGoal(roundedValue);
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
        <Text style={styles.sliderSubText}>{`That's ${previousMonthEmissions} lbs of CO\u2082 compared to last month.`}</Text>
        <NonBreakingSpace />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {
          saveGoalToDatabase(goal);
          setGoalSet(true);
          navigation.goBack();
        }}>
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