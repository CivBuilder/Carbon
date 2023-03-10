import { View, Text, StyleSheet, Pressable, Image} from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native-web'
import EmailInput from '../../components/EmailInput'
import PasswordInput from '../../components/PasswordInput'
import ForgotPasswordNavButton from '../../components/ForgotPasswordNavButton'

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
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      width: 300,
    },
    forgotPassWrapper: {
      alignSelf: 'flex-end',
    },
})

export default LoginScreen