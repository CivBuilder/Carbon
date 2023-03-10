import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const LoginButton = () => {
  return (
    <View>
      <Pressable style={styles.button}>
        Login
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
    marginTop: 20,
    marginBottom: 30,
  },
})

export default LoginButton