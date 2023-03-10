import { View, Text, StyleSheet, Pressable, Image} from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native-web'
import EmailInput from '../../components/EmailInput'
import PasswordInput from '../../components/PasswordInput'

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo} >
        <Image source={{ uri: 'https://i.ibb.co/s9Kfh8p/carbon-logo.png'}} style={{width: 200, height: 100}}/>
      </View>
      <KeyboardAvoidingView behavior= 'height' style={styles.content}>
        {/* Email and Password inputs go here */}
      </KeyboardAvoidingView>
      <Pressable>
        {/* Forgot Password button goes here */}
      </Pressable>
      {/* Login button goes here */}
      {/* Sign up nav goes here */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7FCF8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
    },
    content: {
    },
})

export default LoginScreen