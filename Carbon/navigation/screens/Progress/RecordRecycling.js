import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../../colors/Colors';

const RecordRecycling = ({ navigation }) => {
  const [recycledAmount, setRecycledAmount] = useState(0);
  const [reusableBags, setReusableBags] = useState(false);

  const handleSave = () => {
    // Code to post data to the user's database
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>How many pounds did you recycle today?</Text>
      <Picker
        selectedValue={recycledAmount}
        onValueChange={(value) => setRecycledAmount(value)}
        style={styles.picker}
      >
        <Picker.Item label="0 lbs" value={0} />
        <Picker.Item label="0.25 lbs" value={0.25} />
        <Picker.Item label="0.5 lbs" value={0.5} />
        <Picker.Item label="0.75 lbs" value={0.75} />
        <Picker.Item label="1 lb" value={1} />
      </Picker>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Did you use reusable bags?</Text>
        <Switch
          value={reusableBags}
          onValueChange={(value) => setReusableBags(value)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>      
    </View>
  );
};

export default RecordRecycling;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary.MINT,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary.RAISIN_BLACK,
        marginBottom: 10,
    },
    picker: {
      width: '100%',
      marginBottom: 20,
      color: Colors.primary.RAISIN_BLACK,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 10,
    },
    button: {
      backgroundColor: Colors.secondary.DARK_MINT,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: Colors.primary.MINT_CREAM,
      paddingVertical: 12,
      paddingHorizontal: 12,
      margin: 4,
      minWidth: 60,
      alignItems: 'center',
    },
    buttonText: {
      color: Colors.primary.MINT_CREAM,
      fontWeight: 'bold',
      fontSize: 16,
    },
    
  });
