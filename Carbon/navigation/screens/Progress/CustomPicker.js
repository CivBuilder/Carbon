import React from 'react';
import { View, Text } from 'react-native';
import {Colors} from '../../../styling/Colors';
import {Picker} from '@react-native-picker/picker';


const CustomPicker = ({ label, selectedValue, onValueChange, items, testID }) => {
  return (
    <View style={styles.pickerRow}>
      <Text style={styles.pickerLabel}>{label}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
        testID={testID}
      >
        {items.map((item) => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
};
const styles = {
    pickerLabel: {
        fontWeight: 'bold',
        color: Colors.primary.RAISIN_BLACK,
        fontSize: 14,
        alignSelf: 'center',
        marginTop: 5,
      },
      pickerRow: {
        display: 'flex',
        backgroundColor: Colors.primary.MINT_CREAM,
        borderRadius: 8,
        margin: 8,
        width: '50%',
      },
};
export default CustomPicker;