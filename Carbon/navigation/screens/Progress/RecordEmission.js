import { StyleSheet, Text, TextInput, View, Pressable, Modal, KeyboardAvoidingView } from 'react-native'
import {React, useState} from 'react'
import EmissionModal from './EmissionModal';

const RecordEmission = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [foodVisible, setFoodVisible] = useState(false);
  const [transportationVisible, setTransportationVisible] = useState(false);
  const [recyclingVisible, setRecyclingVisible] = useState(false);

  
  //TODO: Sanitize and save input to database
  
  const saveFoodLog = (log) => {
    console.log('saving food ' + log);
  }
  const saveTransportationLog = (log) => {
    console.log('saving transportation ' + log);
  }

  const saveRecyclingLog = (log) => {
    console.log('saving recycling ' + log);
  }
  return (
    <KeyboardAvoidingView >
        <Modal style={styles.modal}
        animationType="slide"
        transparent={true}
        backdropOpacity={0}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text style={styles.modalText}>Select the category to log</Text>
            <Pressable onPress={() => {
                setModalVisible(!modalVisible)
                setFoodVisible(true)}
            }>
              <Text style={styles.text}>Food</Text>
            </Pressable>

            <Pressable onPress={() => {
                setModalVisible(!modalVisible)
                setTransportationVisible(true)
            }}>
              <Text style={styles.text}>Transportation</Text>
            </Pressable>

            <Pressable onPress={() => {
                setModalVisible(!modalVisible)
                setRecyclingVisible(true)}
            }>
              <Text style={styles.text}>Recycling</Text>
            </Pressable>

            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.text}>close</Text>
            </Pressable>

          </View>
        </View>
        </Modal>

      <EmissionModal visible={foodVisible}
                     onRequestClose={(log) => {
                      setFoodVisible(!foodVisible)
                      setModalVisible(!modalVisible)
                    }}  
                    title={"How much meat did you consume today?"}
                    saveData={(log) => saveFoodLog(log)}
                    />
      <EmissionModal visible={transportationVisible}
                     onRequestClose={() => {
                      setTransportationVisible(!transportationVisible)
                      setModalVisible(!modalVisible)
                    }}  
                    title={"How many miles did you drive today?"}
                    saveData={(log) => saveTransportationLog(log)}
                    />
      <EmissionModal visible={recyclingVisible}
                     onRequestClose={() => {
                      setRecyclingVisible(!recyclingVisible)
                      setModalVisible(!modalVisible)
                    }}  
                    title={"How much did you recycle today?"}
                    saveData={(log) => saveRecyclingLog(log)}
                    />

        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.text}>Record Emissions</Text>
        </Pressable>
    </KeyboardAvoidingView>
    
  )
}

export default RecordEmission;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        justifyContent: 'flex-end',
        marginBottom: 48 ,
      },

    modalView: {
        width: "100%",
        height: "33%",
        borderTopStartRadius: 12,
        borderTopEndRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#465966',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    modal: {
      backgroundColor: '#465966',
    },  
    text: {
      textAlign: 'center',
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
})