import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React, {useState} from 'react'

const PasswordInput = ({text, testID, onChangeText, value}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  return (
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={text}
          placeholderTextColor="#AFAFAF"
          secureTextEntry={!isPasswordVisible}
          testID={testID}
          onChangeText={onChangeText}
          value={value}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#AFAFAF" />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#74C69D',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
    padding: 0,
    fontSize: 16,
    // fontFamily: 'sans-serif',
    paddingLeft: 15,
  },
  iconContainer: {
    paddingRight: 10,
  },
})

export default PasswordInput