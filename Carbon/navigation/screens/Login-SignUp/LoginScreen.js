import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import EmailInput from '../../../components/EmailInput'
import PasswordInput from '../../../components/PasswordInput'
import LoginButton from '../../../components/LoginButton'
import SignUpNavButton from '../../../components/SignUpNavButton'
import { useState } from 'react'
import { TextInput, Button } from 'react-native';
import { login } from '../../../util/LoginManager'
import { ScreenNames } from '../Main/ScreenNames'

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  async function handleLogin() {
    await login(username, password);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo} >
        <Image source={require('../../../assets/Carbon_Logo.png')} style={{width: 300, height: 100}} testID="logo" />
      </View>
      <View style={styles.content}>
        <KeyboardAvoidingView behavior= 'height'>
          <EmailInput testID="emailInput" onChangeText={un => setUsername(un)}/>
          <PasswordInput text="Password" testID="passwordInput" onChangeText={pw => setPassword(pw)} />
        </KeyboardAvoidingView>
      </View>
      <LoginButton onPress={() => {handleLogin()}}/>
      <View style={styles.signUpTextWrapper}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <SignUpNavButton onPress={() => {navigation.navigate(ScreenNames.SIGNUP);}}/>
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