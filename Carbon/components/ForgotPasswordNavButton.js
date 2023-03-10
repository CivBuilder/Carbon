import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const ForgotPasswordNavButton = () => {
  return (
    <View>
      <Pressable style={styles.forgotPasswordNavButton}>Forgot Password?</Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    forgotPasswordNavButton: {
      color: '#74C69D',
      fontFamily: 'sans-serif',
    },
  })

export default ForgotPasswordNavButton