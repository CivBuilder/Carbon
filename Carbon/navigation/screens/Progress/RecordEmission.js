import {View, Text, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import EmissionModal from './EmissionModal';

import  { React, useState } from 'react';

export default function RecordEmissionScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [foodVisible, setFoodVisible] = useState(false);
  const [transportationVisible, setTransportationVisible] = useState(false);
  const [recyclingVisible, setRecyclingVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Pressable onPress={() => {
                setModalVisible(!modalVisible)
                setFoodVisible(true)}
            }>
              <Icon name="cutlery" size={40} color="#201B1B" style={styles.icon} testID="cutlery-icon"/>
            </Pressable>

            <Pressable onPress={() => {
                setModalVisible(!modalVisible)
                setTransportationVisible(true)
            }}>
              <Icon name="car" size={40} color="#201B1B" style={styles.icon} testID="car-icon" />
            </Pressable>

            <Pressable onPress={() => {
                setModalVisible(!modalVisible)
                setRecyclingVisible(true)}
            }>
              <Icon name="recycle" size={40} color="#201B1B" style={styles.icon} testID="recycle-icon" />
            </Pressable>

            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Icon name="close" size={40} color="#201B1B" style={styles.icon} testID="close-icon" />
            </Pressable>

          </View>
          <EmissionModal visible={foodVisible}
                     onRequestClose={() => {
                      setFoodVisible(!foodVisible)
                      setModalVisible(!modalVisible)
                    }}  
                    title={"How much meat did you consume today?"}
                    // saveData={(log) => saveFoodLog(log)}
                    testID="food-modal"
                    />
      <EmissionModal visible={transportationVisible}
                     onRequestClose={() => {
                      setTransportationVisible(!transportationVisible)
                      setModalVisible(!modalVisible)
                    }}  
                    title={"How many miles did you drive today?"}
                    // saveData={(log) => saveTransportationLog(log)}
                    testID="transportation-modal"
                    />
      <EmissionModal visible={recyclingVisible}
                     onRequestClose={() => {
                      setRecyclingVisible(!recyclingVisible)
                      setModalVisible(!modalVisible)
                    }}  
                    title={"How much did you recycle today?"}
                    // saveData={(log) => saveRecyclingLog(log)}
                    testID="recycle-modal"
                    />
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      justifyContent: 'flex-end',
      marginBottom: 48 ,
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