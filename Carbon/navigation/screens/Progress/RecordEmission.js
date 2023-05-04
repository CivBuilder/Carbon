import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../styling/Colors';
import { React, useCallback, useEffect } from 'react';
import { ScreenNames } from '../Main/ScreenNames';
import { useState } from 'react';
import { API_URL } from '../../../config/Api';
import { getToken } from '../../../util/UserManagement';
import { useToast } from 'react-native-toast-notifications';

export default function RecordEmissionScreen({ navigation, route }) {
  const [showModal, setShowModal] = useState(false);
  const [emissionsLogged, setEmissionsLogged] = useState(false);

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
      // console.log(route.params.returningEmissionsEntry)
      setEmissionsEntry(route.params.returningEmissionsEntry);
    }
  }, [route.params]);

  //Toast hook
  const toast = useToast();
  useEffect(() => {
    if (emissionsLogged) {
      toast.show("Emissions logged successfully!", {
        type: 'success',
      });
      setEmissionsLogged(false)
    }
  }, [emissionsLogged]);


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
        // console.log("Successful Post!");
        navigation.goBack();
        setEmissionsLogged(true);
      }
      //Alert on bad request - should only see on testing 
      else if (response.status === 404) {
        throw new Error(`Client ID Not Found`);
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor: Colors.primary.MINT_CREAM}}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
    <View style={styles.centeredView}>
      <View style={styles.titleView}>
        <Text style={styles.title}>
          Select a category to log your emissions for today.
        </Text>
      </View>
      <View style={styles.modalView} testID='main'>
        <TouchableOpacity style={styles.categoryTile} onPress={() => {
          navigation.navigate(ScreenNames.FOOD, { sentEmissionsEntry: emissionsEntry })
        }}>
          <Icon name="cutlery" size={36} color={Colors.secondary.DARK_MINT} style={styles.icon} testID="cutlery-icon" />
          <Text style={styles.categoryText}>Diet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryTile} onPress={() => {
          navigation.navigate(ScreenNames.TRANSPORTATION, { sentEmissionsEntry: emissionsEntry })
        }}>
          <Icon name="car" size={36} color={Colors.secondary.DARK_MINT} style={styles.icon} testID="car-icon" />
          <Text style={styles.categoryText}>Transportation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryTile} onPress={() => {
            navigation.navigate(ScreenNames.ELECTRICITY, {sentEmissionsEntry : emissionsEntry})
        }}>
          <Ionicons name="home-sharp" size={40} color={Colors.secondary.DARK_MINT} style={styles.icon} testID="electricity-icon" />
          <Text style={styles.categoryText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryTile} onPress={() => {
          navigation.navigate(ScreenNames.RECYCLING, { sentEmissionsEntry: emissionsEntry })
        }}>
          <Icon name="recycle" size={40} color={Colors.secondary.DARK_MINT} style={styles.icon} testID="recycle-icon" />
          <Text style={styles.categoryText}>Recycling</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveView}
          onPress={() => { setShowModal(true) }}
          testID="save-and-exit-icon"
        >
          <Icon name="cloud-upload" size={40} style={styles.saveIcon} />
          <Text style={styles.saveText}>Save Daily Emissions</Text>
        </TouchableOpacity>
      </View>

      {showModal && (
        <Modal
            isVisible={showModal}
            animationType="fade"
            animationInTiming={1000}
            animationOutTiming={1000}
            transparent={true}
            testID='modal-view'
        >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => setShowModal(false)} />
                <View
                    style={{
                        borderRadius: 18,
                        backgroundColor: 'white',
                        padding: 22,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 12,
                    }}
                >
                  <Text style={{ fontSize: 20, textAlign:'center' }}>
                    Are you sure you want to save these as your daily emissions?
                  </Text>

                  <View style={{width:'90%', marginVertical:24}} testID='diet'>
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 12 }}>
                      <Text style={[styles.modal_category_text, { flex: 1 }]}>Diet:</Text>
                      <Text style={[styles.modal_category_value, { flex: 0, textAlign: 'right' }]}>
                        {emissionsEntry.diet_emissions} lbs {`CO\u2082`}
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 12 }}>
                      <Text style={[styles.modal_category_text, { flex: 1 }]}>Transportation:</Text>
                      <Text style={[styles.modal_category_value, { flex: 0, textAlign: 'right' }]}>
                        {emissionsEntry.transport_emissions} lbs {`CO\u2082`}
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 12 }}>
                      <Text style={[styles.modal_category_text, { flex: 1 }]}>Electricity:</Text>
                      <Text style={[styles.modal_category_value, { flex: 0, textAlign: 'right' }]}>
                        {emissionsEntry.home_emissions} lbs {`CO\u2082`}
                      </Text>
                    </View>

                    <View style={{marginTop: 6, height:2, backgroundColor:'gray'}}/>

                    <View style={{height:2, backgroundColor:''}}/>
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 12 }}>
                      <Text style={[styles.modal_category_text, { flex: 1, fontWeight:'600' }]}>Gross Total:</Text>
                      <Text style={[styles.modal_category_value, { flex: 0, textAlign: 'right', fontWeight:'600'}]}>
                        {emissionsEntry.diet_emissions + emissionsEntry.transport_emissions + emissionsEntry.home_emissions} lbs {`CO\u2082`}
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 6 }}>
                      <Text style={[styles.modal_category_text, { flex: 1 }]}>Recycling:</Text>
                      <Text style={[styles.modal_category_value, { flex: 0, textAlign: 'right' }]}>
                        - {emissionsEntry.lifestyle_emissions} lbs {`CO\u2082`}
                      </Text>
                    </View>

                    <View style={{marginTop: 6, height:2, backgroundColor:'gray'}}/>

                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 12 }}>
                      <Text style={[styles.modal_category_text, { flex: 1, fontWeight:'600' }]}>Net Total:</Text>
                      <Text style={[styles.modal_category_value, { flex: 0, textAlign: 'right', fontWeight:'600'}]}>
                        {emissionsEntry.diet_emissions + emissionsEntry.transport_emissions + emissionsEntry.home_emissions - emissionsEntry.lifestyle_emissions} lbs {`CO\u2082`}
                      </Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 6}}>
                      <TouchableOpacity testID='no-button' style={{borderRadius:12, borderWidth:2, borderColor:'#db2525', paddingVertical:6, width:120, marginRight: 24}} onPress={() => setShowModal(false)}>
                          <Text style={{ fontSize: 20, textAlign:'center', color: '#db2525' }}>No</Text>
                      </TouchableOpacity>
                      <TouchableOpacity testID='yes-button' style={{ borderRadius:12, backgroundColor: '#74C69D', paddingVertical:6, width:120, marginLeft: 24,}} onPress={() => { postResults(); setShowModal(false) }}>
                          <Text style={{ fontSize: 20, textAlign:'center', color: Colors.primary.MINT_CREAM }}>Yes</Text>
                      </TouchableOpacity>
                  </View>
                </View>
            </View>
        </Modal>
      )}
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.primary.MINT_CREAM,
    padding:12,
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    backgroundColor: Colors.secondary.NON_PHOTO_BLUE,
    borderRadius: 12,
    marginBottom:12,
  },
  title: {
    paddingVertical: 10,
    fontSize: 24,
    textAlign: 'center',
    color: Colors.primary.RAISIN_BLACK,
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
    // elevation: 5,
    // shadowColor: '#000', // Set the shadow color
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
  modal_category_text: {
    fontSize: 18,
    color: Colors.primary.RAISIN_BLACK,
  },
  modal_category_value: {
    fontSize: 18,
    color: Colors.primary.RAISIN_BLACK,
  },
})