import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '../styling/Colors'

const GetStartedButton = ({onPress}) => {
  return (
    <View >
        <Pressable style={styles.button} onPress={onPress} testID="getStartedButton">
          <Text style={styles.buttonText}>Get Started</Text> 
        </Pressable >
   </View>

  )
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 40,
    backgroundColor: Colors.primary.MINT,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    // fontFamily: 'sans-serif',
  },
})

export default GetStartedButton