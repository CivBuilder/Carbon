import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecordRecycling = ({ navigation }) => {
  const [recycledAmount, setRecycledAmount] = useState(0);
  const [reusableBags, setReusableBags] = useState(false);

  const handleSave = () => {
    // Code to post data to the user's database
    navigation.goBack();
  };

  return (
    <View style={styles.centeredView}>
      <Text style={styles.modalText}>How many pounds did you recycle today?</Text>
      <View style={styles.textInput}>
        <Picker
          selectedValue={recycledAmount}
          onValueChange={(value) => setRecycledAmount(value)}
        >
          <Picker.Item label="0 lbs" value={0} />
          <Picker.Item label="0.25 lbs" value={0.25} />
          <Picker.Item label="0.5 lbs" value={0.5} />
          <Picker.Item label="0.75 lbs" value={0.75} />
          <Picker.Item label="1 lb" value={1} />
        </Picker>
      </View>
      <Text style={styles.modalText}>Did you use reusable bags?</Text>
      <View style={styles.checkboxContainer}>
        <Pressable
          style={styles.checkbox}
          onPress={() => setReusableBags(!reusableBags)}
        >
          {reusableBags ? (
            <Icon name="check-square-o" size={25} color="#201B1B" />
          ) : (
            <Icon name="square-o" size={25} color="#201B1B" />
          )}
          <Text style={styles.label}>Yes</Text>
        </Pressable>
      </View>
      <Pressable testID="saveButton" onPress={() => handleSave()}>
        <Icon name="save" size={40} color="#201B1B" style={styles.icon} />
      </Pressable>
      <Pressable testID="closeButton" onPress={() => navigation.goBack()}>
        <Icon name="close" size={40} color="#201B1B" style={styles.icon} />
      </Pressable>
    </View>
  );
};

export default RecordRecycling;


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: '#F7F7F7',
    },
    modalText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    textInput: {
      width: 150,
      height: 50,
      fontSize: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: '#201B1B',
      backgroundColor: 'white',
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    checkbox: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 10,
    },
    label: {
      marginLeft: 10,
      fontSize: 16,
    },
    icon: {
      marginVertical: 10,
    },
  });
