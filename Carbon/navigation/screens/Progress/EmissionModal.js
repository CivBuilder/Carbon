import React, {useState} from 'react';
import { StyleSheet, Modal, Text, View, Pressable, TextInput } from 'react-native';

const EmissionModal = ({visible, onRequestClose, title, saveData}) => {
  const [log, setLog] = useState('');  
  
  return (
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          backdropOpacity={0}
          visible={visible}
          onRequestClose={() => {
            setLog('');
            onRequestClose();
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{title}</Text>
              <View style={styles.textInput}>
                <TextInput  onChangeText={text => setLog(text)} />
              </View>
              <Pressable style={[styles.button]} onPress={() => {
                saveData(log)
                onRequestClose();
              }}>
                <Text style={styles.text}>Save</Text>
              </Pressable>
              <Pressable
                style={[styles.button]}
                onPress={() => {
                  setLog('');
                  onRequestClose();
                }}
              >
                <Text style={styles.text}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      );
    };

export default EmissionModal;

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
        height: "50%",
        borderTopStartRadius: 12,
        borderTopEndRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#B2E4EE',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    
    text: {
      textAlign: 'center',
    },
    textInput: {
      borderRadius: 4,
      borderWidth: 2,
      elevation: 2,

      borderColor: '#201B1B',
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
