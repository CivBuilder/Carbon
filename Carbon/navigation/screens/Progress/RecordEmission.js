import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../styling/Colors';
import { React, useCallback, useEffect } from 'react';
import { ScreenNames } from '../Main/ScreenNames';
import { useState } from 'react';
import { API_URL } from '../../../config/Api';
import { getToken } from '../../../util/UserManagement';
export default function RecordEmissionScreen({ navigation, route }) {

  //Default value for the final submission that we post to the server
  const [emissionsEntry, setEmissionsEntry] = useState({
    transport_emissions: 0,
    total_emissions: 0,
    lifestyle_emissions: 0,
    diet_emissions: 0,
    home_emissions: 0
  });

  //When we get a "returningEmissionsEntry", which is returned by the category screens, we update our own
  //EmissionsEntry state variable to reflect the new update. Originally passing the stateSetter was planned
  //But we get warnings about possible bugs, so we're passing by value and not changing state.
  useEffect(() => {
    if (route.params?.returningEmissionsEntry && route.params !== undefined) {
      console.log(route.params.returningEmissionsEntry)
      setEmissionsEntry(route.params.returningEmissionsEntry);
    }
  }, [route.params]);


  //Posts the results, on a successfull post it will leave the screen
  async function postResults() {
    try {
      //for conciseness, emissionsEntry total is just the sum of the others
      let e = emissionsEntry;
      emissionsEntry.total_emissions = e.diet_emissions + e.home_emissions + e.transport_emissions

      //Check if at least one emission was entered
      if (emissionsEntry.total_emissions === 0 && e.lifestyle_emissions === 0) throw new Error(`Please Upload at least one Emission Category`);

      //post emission to server
      const response = await fetch(`${API_URL}userEmissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'secrettoken': await getToken(),
        },
        body: JSON.stringify(emissionsEntry)
      });
      //exit screen on successful request
      if (response.status === 200) {
        console.log("Successful Post!");
        navigation.goBack();
      }
      //Alert on bad request - should only see on testing 
      else if (response.status === 404) {
        throw new Error(`Client ID Not Found`);
      }
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
    <View style={styles.centeredView}>
      <View style={styles.titleView}>
        <Text style={styles.title}>
          Select a category to log your emissions for today
        </Text>
      </View>
      <View style={styles.modalView} testID='modal-view'>
        <TouchableOpacity style={styles.categoryTile} onPress={() => {
          navigation.navigate(ScreenNames.FOOD, { sentEmissionsEntry: emissionsEntry })
        }}>
          <Icon name="cutlery" size={40} color={Colors.secondary.DARK_MINT} style={styles.icon} testID="cutlery-icon" />
          <Text style={styles.categoryText}>Diet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryTile} onPress={() => {
          navigation.navigate(ScreenNames.TRANSPORTATION, { sentEmissionsEntry: emissionsEntry })
        }}>
          <Icon name="car" size={40} color={Colors.secondary.DARK_MINT} style={styles.icon} testID="car-icon" />
          <Text style={styles.categoryText}>Transportation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryTile} onPress={() => {
            navigation.navigate(ScreenNames.ELECTRICITY, {sentEmissionsEntry : emissionsEntry})
        }}>
          <Icon name="plug" size={40} color={Colors.secondary.DARK_MINT} style={styles.icon} testID="electricity-icon" />
          <Text style={styles.categoryText}>Electricity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryTile} onPress={() => {
          navigation.navigate(ScreenNames.RECYCLING, { sentEmissionsEntry: emissionsEntry })
        }}>
          <Icon name="recycle" size={40} color={Colors.secondary.DARK_MINT} style={styles.icon} testID="recycle-icon" />
          <Text style={styles.categoryText}>Recycling</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveView}
          onPress={() => { postResults() }}
          testID="save-and-exit-icon"
        >
          <Icon name="cloud-upload" size={40} style={styles.saveIcon} />
          <Text style={styles.saveText}>Save Daily Emissions</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
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
    // backgroundColor: Colors.primary.MINT_CREAM,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginHorizontal: 20,
  },
  saveView: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: Colors.primary.MINT_CREAM,
    margin: 20,
    padding: 10,
    borderColor: Colors.categories.DIET,
    borderWidth: 2,
    borderRadius: 50,
  },
  saveIcon: {
    marginHorizontal: 20,
    // padding: 10,
    // backgroundColor: Colors.secondary.NON_PHOTO_BLUE,
    color: Colors.categories.DIET,
  },
  saveText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.categories.DIET,
  },
  categoryText: {
    fontSize: 20,
    color: Colors.primary.MINT,
  },
})