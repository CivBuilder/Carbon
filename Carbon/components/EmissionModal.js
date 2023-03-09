import React, {useState} from 'react';
import { StyleSheet, Modal, Text, View, Pressable, TextInput } from 'react-native';

const SaveEmissions = ({visible, onRequestClose, title, saveData}) => {
  const [log, setLog] = useState('');  
  return (
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          backdropOpacity={0}
          visible={visible}
          onRequestClose={onRequestClose}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{title}</Text>
              <TextInput onChangeText={text => setLog(text)} />
              <Pressable style={[styles.button]} onPress={() => saveData(log)}>
                <Text style={styles.text}>Save</Text>
              </Pressable>
              <Pressable
                style={[styles.button]}
                onPress={onRequestClose}
              >
                <Text style={styles.text}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      );
    };

export default SaveEmissions;

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