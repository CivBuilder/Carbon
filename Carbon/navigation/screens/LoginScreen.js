import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import { TextInput } from 'react-native-paper'
import { KeyboardAvoidingView } from 'react-native-web'

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo} >
        <Image source={{ uri: 'https://i.ibb.co/s9Kfh8p/carbon-logo.png'}} style={{width: 317, height: 192}}/>
      </View>
      <View style={styles.content}>
        <View style={styles.inputWrapper}>
            <TextInput style={styles.input} label={'Email'} placeholder={'Email'} underlineColorAndroid='transparent'/>
        </View>
        <View style={styles.inputWrapper}>
         <TextInput style={styles.input} placeholder={'Password'} underlineColorAndroid='transparent'/>
        </View>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPassWrapper}>Forgot Password?</Text>
      </TouchableOpacity>
      <Button text="Login"/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#F7FCF8',
      alignItems: 'center',
    },
    logo: {
      // height: '100%',
      // width: '100%',
      
    },
    content: {
      flexDirection: 'column',
    },
    inputWrapper: {
        // backgroundColor: '#FFFFFF',
        // borderWidth: 1,
        // overflow: 'hidden',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // borderRadius: 20,
        // borderColor: '#74C69D',
        // margin: 5,
    },
    input: {
      backgroundColor: 'white',
      padding: 0,
      borderRadius: 20,
      borderWidth: 2,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderColor: '#74C69D',
      marginTop: 5,
    },
    forgotPassWrapper: {
    },
})

export default LoginScreen