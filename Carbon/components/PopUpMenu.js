import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { IconNames } from '../navigation/screens/Main/IconNames';
import { ScreenNames } from '../navigation/screens/Main/ScreenNames';
import { Colors } from '../colors/Colors';
import { styles } from './Styles';


export const PopUpMenu = ({navigation}) => {
    /*  Handles the visibility of the pop-up menu when the plus button is pressed,
        when user pressed anywhere outside of the modal, and when user clicks one of the options
    */
    const [visible, setVisibility] = useState(false);

    // Lists out the options user can do within this pop-up menu
    const options = [
        {
            title: 'Record Emissions',
            icon: 'checkmark-circle-outline',
            action: () => {
                console.log("Record Emissions button is clicked"); // TODO: Connect to the Record Emissions page
                // TODO: Add the records emissions page in ProgressStack in MainContainer.js
                setVisibility(false)
            }
        },
        {
            title: 'Add Goal',
            icon: 'timer-outline',
            action: () => {
                navigation.navigate(ScreenNames.ADD_GOAL);
                setVisibility(false);
            },
        },
    ];

    return (
        <View>
            {/* Displays the pop-up menu when the + button is pressed */}
            <TouchableOpacity
                onPress={() => setVisibility(true)}
            >
                <Ionicons
                    name={IconNames.ADD}
                    size={28}
                    color={Colors.primary.MINT}
                    style={{ marginRight: 16 }}
                />
            </TouchableOpacity>

            <Modal transparent visible={visible}>
                {/* Clicking outside of the modal will close the menu */}
                {/* NOTE: Keep the backdrop style in. Removing it causes the modal to not disappear when clicking outside */}
                <TouchableOpacity style={styles.backdrop} onPress={() => setVisibility(false)}/>

                {/* Handles the menu inside the modal */}
                <View style={styles.popup_modal}>
                    {options.map((op, i) => (
                        <TouchableOpacity
                            style={[styles.options, { borderBottomWidth: i === options.length - 1 ? 0 : 1 }]}
                            key={i}
                            onPress={() => op.action()}
                        >
                            {/* Display the menu text */}
                            <Text style={styles.popup_title}>{op.title}</Text>

                            {/* Display the menu icons */}
                            <Ionicons
                                name={op.icon}
                                size={24}
                                color={Colors.primary.RAISIN_BLACK}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </View>
    );
}