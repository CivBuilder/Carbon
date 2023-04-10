import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const RecordFood = ({ navigation }) => {
  const [consumption, setConsumption] = useState(0);

  const handleSave = async () => {
    try {
      const response = await fetch('https://example.com/users/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ red_meat_consumption: consumption }),
      });
      const data = await response.json();
      console.log('Response:', data);
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>How much red meat did you consume today?</Text>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={() => setConsumption(0)}>
          <Text style={styles.buttonText}>0lb</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setConsumption(0.25)}>
          <Text style={styles.buttonText}>0.25lb</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setConsumption(0.5)}>
          <Text style={styles.buttonText}>0.5lb</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setConsumption(0.75)}>
          <Text style={styles.buttonText}>0.75lb</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setConsumption(1)}>
          <Text style={styles.buttonText}>1lb</Text>
        </Pressable>
      </View>
      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  button: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecordFood;