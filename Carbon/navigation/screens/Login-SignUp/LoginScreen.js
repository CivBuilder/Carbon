import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import EmailInput from '../../../components/EmailInput'
import PasswordInput from '../../../components/PasswordInput'
import ForgotPasswordNavButton from '../../../components/ForgotPasswordNavButton'
import LoginButton from '../../../components/LoginButton'
import SignUpNavButton from '../../../components/SignUpNavButton'

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo} >
        <Image source={{ uri: 'https://i.ibb.co/s9Kfh8p/carbon-logo.png'}} style={{width: 200, height: 100}}/>
      </View>
      <View style={styles.content}>
        <KeyboardAvoidingView behavior= 'height'>
          <EmailInput />
          <PasswordInput text="Password"/>
        </KeyboardAvoidingView>
        <View style={styles.forgotPassWrapper}>
          <ForgotPasswordNavButton />
        </View>
      </View>
      <LoginButton />
      <View style={styles.signUpTextWrapper}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <SignUpNavButton />
      </View>
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
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      width: 300,
    },
    forgotPassWrapper: {
      alignSelf: 'flex-end',
    },
    signUpTextWrapper: {
      alignItems: 'center',
    },
    signUpText: {
      color: '#74C69D',
      fontFamily: 'sans-serif',
    },
})

export default LoginScreen