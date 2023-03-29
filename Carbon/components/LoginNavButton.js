import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const LoginNavButton = () => {
  return (
    <View>
      <Pressable>
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