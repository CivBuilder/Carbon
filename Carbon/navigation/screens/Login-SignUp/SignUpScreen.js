import { View, Text , StyleSheet, Image, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import SignUpButton from '../../../components/SignUpButton'
import EmailInput from '../../../components/EmailInput'
import PasswordInput from '../../../components/PasswordInput'
import LoginNavButton from '../../../components/LoginNavButton'
import { useState } from 'react'
import { signup } from '../../../util/LoginManager'


const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  async function handleSignUp() {
    await signup(username, password, confirm)
    navigation.goBack();
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.logo} >
        <Image source={{ uri: 'https://i.ibb.co/s9Kfh8p/carbon-logo.png'}} style={{width: 200, height: 100}} testID="image"/>
      </View>
      <KeyboardAvoidingView behavior= 'height' style={styles.content}>
        <EmailInput testID="emailInput" onChangeText={(un) => setUsername(un)}/>
        <PasswordInput text="Password" testID="passwordInput" onChangeText={(pw) => setPassword(pw)}/>
        <PasswordInput text="Confirm Password" testID="confirmPasswordInput" onChangeText={(cf) => setConfirm(cf)}/>
      </KeyboardAvoidingView>
      <SignUpButton onPress={() => handleSignUp()} />
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