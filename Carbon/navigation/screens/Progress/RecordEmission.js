import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { React, useCallback, useEffect } from 'react';
import { ScreenNames } from '../Main/ScreenNames';
import { useState } from 'react';
import {API_URL} from '../../../config/Api';
import { getToken } from '../../../util/LoginManager';
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


  async function postResults() { 
    try{
      let e = emissionsEntry; 
      emissionsEntry.total_emissions = e.diet_emissions + e.home_emissions + e.lifestyle_emissions + e.transport_emissions

      if(emissionsEntry.total_emissions === 0 ) throw new Error(`Please Upload at least one Emission Category`);

      const response = await fetch(`${API_URL}userEmissions`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'secrettoken': await getToken(),
        },
        body : JSON.stringify(emissionsEntry)
      });
      if(response.status === 200) {
        console.log("Successful Post!");
        navigation.goBack();
      }
      else if(response.status === 400){
        throw new Error(`You can only upload results once a day :(`);
      }
      else if(response.status === 404){
        throw new Error(`Client ID Not Found`);
      }
    } catch(err) {
      alert(err.message)
    }
  }


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
          onPress={() => {postResults()}}
        >
          <Icon name="cloud-upload" size={40} color="#201B1B" style={styles.icon} testID="save-and-exit-icon" />
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