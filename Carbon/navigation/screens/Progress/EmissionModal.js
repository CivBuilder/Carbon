import React, {useState} from 'react';
import { StyleSheet, Modal, Text, View, Pressable, TextInput, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const EmissionModal = ({visible, onRequestClose, title, saveData}) => {
  const [log, setLog] = useState('');  
  const showToast = () => {
    ToastAndroid.show("Emission saved successfully", ToastAndroid.SHORT);
  }
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
              <Pressable onPress={() => {
                saveData(log)
                showToast();
                onRequestClose();
              }}>
            <Icon name="save" size={40} color="#201B1B" style={styles.icon} />

            </Pressable>

            <Pressable
                  onPress={() => {
                  setLog('');
                  onRequestClose();
                }}
            >
            <Icon name="close" size={40} color="#201B1B" style={styles.icon} />

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
      icon: {
        paddingBottom: 10,
        paddingTop: 5
      }
})
