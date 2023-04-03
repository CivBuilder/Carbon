import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, SafeAreaView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { IconNames } from '../navigation/screens/Main/IconNames';
import { Colors } from '../colors/Colors';
import { styles } from './Styles';

export const PopUpMenu = ({navigation}) => {
    // Sets the visibility of the pop-up menu when the plus button is pressed
    const [visible, setVisibility] = useState(false);

    // Lists out the options user can do within this pop-up menu
    const options = [
        {
            title: 'Record Emissions',
            icon: 'checkmark-circle-outline',
            action: () => navigation.navigate(ScreenNames.ADD_GOAL), // TODO: Connect to the Record Emissions page
        },
        {
            title: 'Add Goal',
            icon: 'timer-outline',
            action: () => alert('Add Goal button pressed'), // TODO: Connect to the Add Goal page
        },
    ];

    return (
        <View>
            <TouchableOpacity
                onPress={() =>
                    setVisibility(true)
                }
            >
                <Ionicons
                    name={IconNames.ADD}
                    size={28}
                    color={Colors.primary.MINT}
                    style={{ marginRight: 16 }}
                />
            </TouchableOpacity>

            <Modal transparent visible={visible}>
                <SafeAreaView
                    style={{ flex:1 }}
                    onTouchStart={() => setVisibility(false) }
                >
                    <View style={styles.popup_modal}>
                        {options.map((op, i) => (
                            <TouchableOpacity
                                style={[styles.options, {borderBottomWidth: i === options.length - 1 ? 0 : 1}]}
                                key={i}
                                onPress={() => op.action}
                            >
                                <Text style={styles.popup_title}>{op.title}</Text>
                                <Ionicons
                                    name={op.icon}
                                    size={24}
                                    color={Colors.primary.RAISIN_BLACK}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}