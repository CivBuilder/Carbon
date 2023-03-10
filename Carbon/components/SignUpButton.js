import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const SignUpButton = () => {
  return (
    <View >
        <Pressable style={styles.button}>
            Sign Up 
        </Pressable >
   </View>

  )
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#74C69D',
    color: 'white',
    fontFamily: 'sans-serif',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
})

export default SignUpButton