import React, {useState} from 'react';
import { StyleSheet, Modal, Text, View, Pressable, TextInput, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecordTransportation = ({ navigation }) => {
  const [log, setLog] = useState('');
  const showToast = () => {
    ToastAndroid.show("Emission saved successfully", ToastAndroid.SHORT);
  }

  const handleSave = () => {
    showToast("Emission saved successfully", { type: 'success' });
    navigation.goBack();
  };

  return (
    <View style={styles.centeredView}>
      <Text style={styles.modalText}></Text>
      <View style={styles.textInput}>
        <TextInput onChangeText={text => setLog(text)} testID="textInput"/>
      </View>
      <Pressable testID="saveButton" onPress={handleSave}>
        <Icon name="save" size={40} color="#201B1B" style={styles.icon} />
      </Pressable>
      <Pressable testID="closeButton" onPress={() => navigation.goBack()}>
        <Icon name="close" size={40} color="#201B1B" style={styles.icon} />
      </Pressable>
    </View>
  );
};

export default RecordTransportation;

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
      width: 100,
      height: 30,
      fontSize: 12,
      borderRadius: 8,
      borderWidth: 2,
      elevation: 2,
      borderColor: '#201B1B',
      backgroundColor: 'white',
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