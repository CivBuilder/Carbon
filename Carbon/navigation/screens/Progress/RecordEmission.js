import { StyleSheet, Text, TextInput, View, Pressable, Modal, KeyboardAvoidingView } from 'react-native'
import {React, useState} from 'react'
import EmissionModal from './EmissionModal';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        animationType="fade"
        transparent={true}
        presentationStyle={'overFullScreen'}
        backdropOpacity={50}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Pressable onPress={() => {
                setModalVisible(!modalVisible)
                setFoodVisible(true)}
            }>
              <Icon name="cutlery" size={40} color="#201B1B" style={styles.icon} />
            </Pressable>

            <Pressable onPress={() => {
                setModalVisible(!modalVisible)
                setTransportationVisible(true)
            }}>
              <Icon name="car" size={40} color="#201B1B" style={styles.icon} />
            </Pressable>

            <Pressable onPress={() => {
                setModalVisible(!modalVisible)
                setRecyclingVisible(true)}
            }>
              <Icon name="recycle" size={40} color="#201B1B" style={styles.icon} />
            </Pressable>

            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Icon name="close" size={40} color="#201B1B" style={styles.icon} />
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
        backgroundColor: '#D8F3DC',
      },

      modalView: {
        backgroundColor: '#D8F3DC',
        
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