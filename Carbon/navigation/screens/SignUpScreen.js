import { View, Text , StyleSheet, Image} from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import { TextInput } from 'react-native-paper'
import { KeyboardAvoidingView } from 'react-native-web'
import EmailInput from '../../components/EmailInput'
import PasswordInput from '../../components/PasswordInput'


const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo} >
        <Image source={{ uri: 'https://i.ibb.co/s9Kfh8p/carbon-logo.png'}} style={{width: 317, height: 192}}/>
      </View>
      <KeyboardAvoidingView behavior= 'height' style={styles.content}>
        <EmailInput />
        <PasswordInput text="Password"/>
        <PasswordInput text="Confirm Password"/>
      </KeyboardAvoidingView>
      <Button text="Sign Up"/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // flexDirection: 'column',
      backgroundColor: '#F7FCF8',
      alignItems: 'center',
    },
    logo: {
      width: 317,
      height: 192,
    },
    content: {},
})

export default SignUpScreen