import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { IconNames } from '../navigation/screens/Main/IconNames';
import { ScreenNames } from '../navigation/screens/Main/ScreenNames';
import { Colors } from '../colors/Colors';


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
            }
        },
        {
            title: 'Add Goal',
            icon: 'timer-outline',
            action: () => {
                navigation.navigate(ScreenNames.ADD_GOAL);
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
                            onPress={() => {
                                op.action();
                                setVisibility(false);
                            }}
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

const styles = StyleSheet.create({
    popup_modal: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.primary.RAISIN_BLACK,
        backgroundColor: "white",
        paddingHorizontal: 16,
        position: 'absolute',
        right: 24,
        top: Platform.OS === 'ios' ? 69 : 43, // TODO: Use `useHeaderHeight()` hook to get the height of the header
    },
    popup_title: {
        paddingRight: 16,
    },
    options: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomColor: '#ccc',
    },
    backdrop: { //NOTE: Keep the backdrop style in. Removing it causes the modal to not disappear when clicking outside
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});