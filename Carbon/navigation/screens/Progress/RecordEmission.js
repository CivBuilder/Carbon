import {View, Text, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { React, useState } from 'react';
import { ScreenNames } from '../Main/ScreenNames';
export default function RecordEmissionScreen({navigation}) {
  
  return (
    <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Pressable onPress={() => {
                navigation.navigate(ScreenNames.FOOD_SCREEN)
            }}>
              <Icon name="cutlery" size={40} color="#201B1B" style={styles.icon} testID="cutlery-icon"/>
            </Pressable>

            <Pressable onPress={() => {
                navigation.navigate(ScreenNames.TRANSPORTATION_SCREEN)
            }}>
              <Icon name="car" size={40} color="#201B1B" style={styles.icon} testID="car-icon" />
            </Pressable>

            <Pressable onPress={() => {
                navigation.navigate(ScreenNames.RECYCLING_SCREEN)
            }}>
              <Icon name="recycle" size={40} color="#201B1B" style={styles.icon} testID="recycle-icon" />
            </Pressable>

            <Pressable
              onPress={() => navigation.goBack()}
            >
              <Icon name="close" size={40} color="#201B1B" style={styles.icon} testID="close-icon" />
            </Pressable>

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