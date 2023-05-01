import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Colors } from '../styling/Colors'

const UsernameInput = ({testID}) => {
  const [text, onChangeText] = useState('username');
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={'Username'}
        placeholderTextColor="#AFAFAF" 
        testID={testID}
        onChangeText={onChangeText}
        value={text}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: 'white',
        color: 'black',
        borderWidth: 2,
        borderColor: Colors.primary.MINT,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        fontSize: 16,
        // fontFamily: 'sans-serif',
        marginTop: 10,
        paddingLeft: 15,
    },
})

export default UsernameInput
