import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const SignUpNavButton = () => {
  return (
    <View>
      <Pressable>
        <Text style={styles.signUpNavButton}>Sign Up</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    signUpNavButton: {
      color: '#74C69D',
      fontFamily: 'sans-serif',
      textDecorationLine: 'underline',
      fontWeight: 'bold',
    },
})

export default SignUpNavButton