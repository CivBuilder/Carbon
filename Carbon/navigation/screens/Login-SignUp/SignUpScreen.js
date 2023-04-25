import { View, Text , StyleSheet, Image, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import SignUpButton from '../../../components/SignUpButton'
import UsernameInput from '../../../components/UsernameInput'
import EmailInput from '../../../components/EmailInput'
import PasswordInput from '../../../components/PasswordInput'
import LoginNavButton from '../../../components/LoginNavButton'
import { Colors } from '../../../styling/Colors'
import { ScreenNames } from '../Main/ScreenNames'
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
        <UsernameInput testID="usernameInput" />
        <EmailInput testID="emailInput" onChangeText={(un) => setUsername(un)}/>
        <PasswordInput text="Password" testID="passwordInput" onChangeText={(pw) => setPassword(pw)}/>
        <PasswordInput text="Confirm Password" testID="confirmPasswordInput" onChangeText={(cf) => setConfirm(cf)}/>
        <SignUpButton onPress={() => handleSignUp()} />
        <View style={styles.loginTextWrapper}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <LoginNavButton onPress={() => {navigation.navigate(ScreenNames.LOGIN)}} />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary.MINT_CREAM,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      width: '80%',
    },
    loginTextWrapper: {
      alignItems: 'center',
    },
    loginText: {
      color: Colors.primary.MINT,
      // fontFamily: 'sans-serif',
    },
})

export default SignUpScreen