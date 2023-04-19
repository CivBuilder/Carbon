import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import React from 'react'
import { Colors } from '../../../colors/Colors'
import LoginNavButton from '../../../components/LoginNavButton'
import GetStartedButton from '../../../components/GetStartedButton'

const GetStartedScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/get-started-background.png')} style={styles.background}>
        <View style={styles.logo} >
          <Image source={{ uri: 'https://i.ibb.co/s9Kfh8p/carbon-logo.png'}} style={{width: 200, height: 100}}/>
        </View>
        <View style={styles.content}>
          <Text style={styles.helloText}>Hello!</Text>
          <Text style={styles.body}>
            Take the first step to lowering your carbon emissions and a more eco-friendly lifestyle
          </Text>
          <GetStartedButton />
          <Text style={styles.loginText}>Already have an account?</Text>
          <LoginNavButton />
        </View>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helloText: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 32,
    color: Colors.secondary.DARK_MINT,
  },
  body: {
    fontFamily: 'sans-serif',
    fontSize: 18,
    color: Colors.secondary.DARK_MINT,
    textAlign: 'center',
  },
  loginText: {
    fontFamily: 'sans-serif',
    color: Colors.primary.MINT,
    
  },
})

export default GetStartedScreen