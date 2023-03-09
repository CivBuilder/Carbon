import { View, Text , StyleSheet, Image} from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import { TextInput } from 'react-native-paper'
import { KeyboardAvoidingView } from 'react-native-web'


const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo} >
        {/* <Image source={require('/home/janeen/carbon/Carbon/Carbon/assets/carbon-logo.png')}/> */}
      </View>
      <KeyboardAvoidingView behavior= 'height' style={styles.content}>
        <TextInput style={styles.input} placeholder={'Email'}/>
        <TextInput style={styles.input} placeholder={'Password'}/>
        <TextInput style={styles.input} placeholder={'Confirm Password'}/>
      </KeyboardAvoidingView>
      <Button text="Sign Up"/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {},
    logo: {},
    content: {},
})

export default SignUpScreen