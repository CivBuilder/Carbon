import { View, Text , StyleSheet, Image, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import SignUpButton from '../../../components/SignUpButton'
import EmailInput from '../../../components/EmailInput'
import PasswordInput from '../../../components/PasswordInput'
import LoginNavButton from '../../../components/LoginNavButton'


const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo} >
        <Image source={{ uri: 'https://i.ibb.co/s9Kfh8p/carbon-logo.png'}} style={{width: 200, height: 100}} testID="image"/>
      </View>
      <KeyboardAvoidingView behavior= 'height' style={styles.content}>
        <EmailInput testID="emailInput"/>
        <PasswordInput text="Password" testID="passwordInput"/>
        <PasswordInput text="Confirm Password" testID="confirmPasswordInput" />
      </KeyboardAvoidingView>
      <SignUpButton onPress={() => console.log("sign up pressed")} />
      <View style={styles.loginTextWrapper}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <LoginNavButton onPress={() => console.log("login pressed")} />
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
    loginTextWrapper: {
      alignItems: 'center',
    },
    loginText: {
      color: '#74C69D',
      fontFamily: 'sans-serif',
    },
})

export default SignUpScreen