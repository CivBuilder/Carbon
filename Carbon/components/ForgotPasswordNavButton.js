import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const ForgotPasswordNavButton = ({onPress}) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Text style={styles.forgotPasswordNavButton}>Forgot Password?</Text>
      </Pressable>
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