import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

const PasswordInput = ({text}) => {
  return (
    <View>
        <TextInput style={styles.input} placeholder={text} secureTextEntry={true} underlineColorAndroid='transparent'/>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        color: '#AFAFAF',
        borderWidth: 2,
        borderColor: '#74C69D',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        fontSize: 16,
        marginTop: 5,
    },
})

export default PasswordInput