import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { React, useState } from 'react';
import { ScreenNames } from '../Main/ScreenNames';
import { Colors } from '../../../colors/Colors';

export default function RecordEmissionScreen({navigation}) {
  
  return (
    <View style={styles.centeredView}>
      <View style={styles.titleView}>
        <Text style={styles.title}>
          Choose a category to record today's carbon emissions:
        </Text>
      </View>
      <View style={styles.modalView}>  
        <TouchableOpacity style={styles.categoryTile} onPress={() => {
            navigation.navigate(ScreenNames.FOOD_SCREEN)
        }}>
          <Icon name="cutlery" size={30} color={Colors.secondary.ALMOND} style={styles.icon} testID="cutlery-icon"/>
          <Text style={styles.categoryText}>Diet</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.categoryTile} onPress={() => {
            navigation.navigate(ScreenNames.TRANSPORTATION_SCREEN)
        }}>
          <Icon name="car" size={30} color={Colors.secondary.NON_PHOTO_BLUE} style={styles.icon} testID="car-icon" />
          <Text style={styles.categoryText}>Transportation</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.categoryTile} onPress={() => {
            navigation.navigate(ScreenNames.RECYCLING_SCREEN)
        }}>
          <Icon name="recycle" size={30} color={Colors.secondary.DARK_MINT} style={styles.icon} testID="recycle-icon" />
          <Text style={styles.categoryText}>Recycling</Text>
        </TouchableOpacity> 
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  centeredView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: Colors.primary.MINT_CREAM,
    },
    titleView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: Colors.primary.MINT,
    },
    title: {
      paddingVertical: 10,
      fontSize: 24,
      textAlign: 'center',
      color: Colors.primary.MINT_CREAM,
    },
    modalView: {
      backgroundColor: Colors.primary.MINT_CREAM,
      alignItems: 'center',
      width: '90%',
    },
    categoryTile: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      backgroundColor: Colors.primary.MINT_CREAM,
      margin: 10,
      padding: 20,
      borderColor: Colors.primary.MINT,
      borderWidth: 2,
      borderRadius: 50,
    },
    icon: {
      padding: 10,
      backgroundColor: Colors.secondary.ROSE_TAUPE,
      borderRadius: 10,
    },
    categoryText: {
      fontSize: 20,
      color: Colors.secondary.ROSE_TAUPE,
    },
  
})