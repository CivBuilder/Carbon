import { View, Text , StyleSheet, Image} from 'react-native'
import React from 'react'
import SignUpButton from '../../components/SignUpButton'
import { TextInput } from 'react-native-paper'
import { KeyboardAvoidingView } from 'react-native-web'
import EmailInput from '../../components/EmailInput'
import PasswordInput from '../../components/PasswordInput'
// import { useFonts } from 'expo-font';
import LoginNavButton from '../../components/LoginNavButton'


const SignUpScreen = () => {
  // const [loaded] = useFonts({
  //   Nunito: require('./assets/fonts/Nunito/Nunito-VariableFont_wght.ttf'),
  // });
  return (
    <View style={styles.container}>
      <View style={styles.logo} >
        <Image source={{ uri: 'https://i.ibb.co/s9Kfh8p/carbon-logo.png'}} style={{width: 200, height: 100}}/>
      </View>
      <KeyboardAvoidingView behavior= 'height' style={styles.content}>
        <EmailInput />
        <PasswordInput text="Password"/>
        <PasswordInput text="Confirm Password"/>
      </KeyboardAvoidingView>
      <SignUpButton text="Sign Up"/>
      <View style={styles.loginTextWrapper}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <LoginNavButton />
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
    content: {},
    loginTextWrapper: {
      alignItems: 'center',
    },
    loginText: {
      color: '#74C69D',
      fontFamily: 'sans-serif',
    },
})

export default SignUpScreen