import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { React, useCallback, useEffect } from 'react';
import { ScreenNames } from '../Main/ScreenNames';
import { useState } from 'react';
export default function RecordEmissionScreen({navigation, route}) {
  
  //Default value for the final submission that we post to the server
  const [emissionsEntry, setEmissionsEntry] = useState({
        transport_emissions : null, 
        total_emissions : null,
        lifestyle_emissions : null, 
        diet_emissions : null, 
        home_emissions : null
  });

  //When we get a "returningEmissionsEntry", which is returned by the category screens, we update our own
  //EmissionsEntry state variable to reflect the new update. Originally passing the stateSetter was planned
  //But we get warnings about possible bugs, so we're passing by value and not changing state.
  useEffect(() => { 
    if(route.params?.returningEmissionsEntry){
      console.log(route.params.returningEmissionsEntry)
      setEmissionsEntry(route.params.returningEmissionsEntry);
    }
  }, [route.params]);


  // async function postRecycling() {
  //   try {
  //     const response = await fetch(`${API_URL}userEmissions`, {
  //       method: 'POST',
  //       headers:{
  //         'Content-Type': 'application/json',
  //         'secrettoken': await getToken(),
  //       },
  //       body: JSON.stringify({
  //         diet_emissions: 0,
  //         transport_emissions: 0,
  //         total_emissions: recycledAmount,
  //         lifestyle_emissions: recycledAmount,
  //         home_emissions: 0,
  //       })
  //     })
  //     .then(navigation.goBack());
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>  
        <TouchableOpacity onPress={() => {
            navigation.navigate(ScreenNames.FOOD, {sentEmissionsEntry : emissionsEntry})
        }}>
          <Icon name="cutlery" size={40} color="#201B1B" style={styles.icon} testID="cutlery-icon"/>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => {
            navigation.navigate(ScreenNames.TRANSPORTATION, {sentEmissionsEntry : emissionsEntry})
        }}>
          <Icon name="car" size={40} color="#201B1B" style={styles.icon} testID="car-icon" />
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => {
            navigation.navigate(ScreenNames.RECYCLING, {sentEmissionsEntry : emissionsEntry})
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