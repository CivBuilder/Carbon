import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const LoginNavButton = ({onPress}) => {
  return (
    <View>
      <Pressable onPress={onPress} testID="loginNavButton">
        <Text style={styles.loginNavButton}>Login</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    loginNavButton: {
      color: '#74C69D',
      fontFamily: 'sans-serif',
      textDecorationLine: 'underline',
      fontWeight: 'bold',
    },
})

export default LoginNavButton