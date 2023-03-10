import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

const PasswordInput = ({text}) => {
  return (
    <View>
        <TextInput style={styles.input} placeholder={text} placeholderTextColor="#AFAFAF" secureTextEntry={true} underlineColorAndroid='transparent'/>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: 'white',
        color: '#AFAFAF',
        padding: 0,
        borderWidth: 2,
        borderColor: '#74C69D',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        fontSize: 16,
        fontFamily: 'sans-serif',
        marginTop: 10,
    },
})

export default PasswordInput