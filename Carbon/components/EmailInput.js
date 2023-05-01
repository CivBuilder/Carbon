import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react';

const EmailInput = ({testID}) => {
  const [text, onChangeText] = useState('email');
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={'Email'}
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
        borderColor: '#74C69D',
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

export default EmailInput