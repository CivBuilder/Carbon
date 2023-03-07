import { StyleSheet, Text, TextInput, View, Pressable, Modal } from 'react-native'
import {React, useState} from 'react'

const CategoryPlusButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [foodVisible, setFoodVisible] = useState(false);
  const [transportationVisible, setTransportationVisible] = useState(false);
  const [recyclingVisible, setRecyclingVisible] = useState(false);
  const [foodLog, setFoodLog] = useState('');
  const [transportationLog, setTransportationLog] = useState('');
  const [recyclingLog, setRecyclingLog] = useState('');
  
  //TODO: Sanitize and save input to database
  const saveUserData = () => {
    return
  }


  return (
    <View>
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
            <Pressable onPress={() => setFoodVisible(true)}>
              <Text style={styles.text}>Food</Text>
            </Pressable>

            <Pressable onPress={() => setTransportationVisible(true)}>
              <Text style={styles.text}>Transportation</Text>
            </Pressable>

            <Pressable onPress={() => setRecyclingVisible(true)}>
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

        <Modal style={styles.modal}
        animationType="slide"
        transparent={true}
        backdropOpacity={0}
        visible={foodVisible}
        onRequestClose={() => {
          setFoodVisible(!foodVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>How much meat did you consume today?</Text>
            <TextInput onChangeText={text => setFoodLog(text)}/>
            <Pressable
              style={[styles.button]}
              onPress={() => saveUserData(foodLog)}>
              <Text style={styles.text}>save</Text>
            </Pressable> 

            <Pressable
              style={[styles.button]}
              onPress={() => setFoodVisible(!foodVisible)}
            >
            <Text style={styles.text}>close</Text>
            </Pressable>
            
          </View>
        </View>
        </Modal>

        <Modal style={styles.modal}
        animationType="slide"
        transparent={true}
        backdropOpacity={0}
        visible={transportationVisible}
        onRequestClose={() => {
          setTransportationVisible(!transportationVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>How many miles did you drive today?</Text>
            <TextInput onChangeText={text => setTransportationLog(text)}/>
            
            <Pressable
              style={[styles.button]}
              onPress={() => saveUserData(transportationLog)}>
              <Text style={styles.text}>save</Text>
            </Pressable>

            <Pressable
              style={[styles.button]}
              onPress={() => setTransportationVisible(!transportationVisible)}>
              <Text style={styles.text}>close</Text>
            </Pressable>

          </View>
        </View>
        </Modal>

        <Modal style={styles.modal}
        animationType="slide"
        transparent={true}
        backdropOpacity={0}
        visible={recyclingVisible}
        onRequestClose={() => {
          setRecyclingVisible(!recyclingVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text style={styles.modalText}>How many pounds did you recycle today?</Text>
            
            <TextInput onChangeText={text => setRecyclingLog(text)}/>
            <Pressable
              style={[styles.button]}
              onPress={() => saveUserData(recyclingLog)}>
              <Text style={styles.text}>save</Text>
            </Pressable>

            <Pressable
              style={[styles.button]}
              onPress={() => setRecyclingVisible(!recyclingVisible)}>
              <Text style={styles.text}>close</Text>
            </Pressable>

          </View>
        </View>
        </Modal>


        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.text}>Add</Text>
        </Pressable>
    </View>
    
  )
}

export default CategoryPlusButton

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
        height: "30%",
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