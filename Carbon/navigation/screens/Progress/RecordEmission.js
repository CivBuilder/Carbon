import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { React } from 'react';
import { ScreenNames } from '../Main/ScreenNames';
export default function RecordEmissionScreen({navigation}) {
  
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>  
        <TouchableOpacity onPress={() => {
            navigation.navigate(ScreenNames.FOOD)
        }}>
          <Icon name="cutlery" size={40} color="#201B1B" style={styles.icon} testID="cutlery-icon"/>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => {
            navigation.navigate(ScreenNames.TRANSPORTATION)
        }}>
          <Icon name="car" size={40} color="#201B1B" style={styles.icon} testID="car-icon" />
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => {
            navigation.navigate(ScreenNames.RECYCLING)
        }}>
          <Icon name="recycle" size={40} color="#201B1B" style={styles.icon} testID="recycle-icon" />
        </TouchableOpacity> 
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={40} color="#201B1B" style={styles.icon} testID="close-icon" />
        </TouchableOpacity>
      </View>
          
    </View>
  )
}
const styles = StyleSheet.create({
  centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: '#D8F3DC',
    },

    modalView: {
      backgroundColor: '#D8F3DC',
      alignItems: 'center',
    },
    modal: {
      backgroundColor: '#D8F3DC',
    },
    modalText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  button: {
      borderRadius: 4,
      borderWidth: 2,
      borderColor: 'black',
      padding: 10,
      margin: 10,
      elevation: 2,
      width: 120,
    },

    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    icon: {
      marginHorizontal: 20,
      padding: 20,

    },
  
})