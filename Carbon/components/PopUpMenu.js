import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Modal, SafeAreaView, Text, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { IconNames } from '../navigation/screens/Main/IconNames';
import { Colors } from '../colors/Colors';
import { styles } from './Styles';

export const PopUpMenu = ({navigation}) => {
    // Sets the visibility of the pop-up menu when the plus button is pressed
    const [visible, setVisibility] = useState(false);

    const scale = useRef(new Animated.Value(0)).current;

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

    function resizeBox(to) {
        to === 1 && setVisibility(true);
        Animated.timing(scale,{
            toValue:to,
            useNativeDriver: true,
            duration: 150,
            easing: Easing.linear,
        }).start(() => to === 0 && setVisibility(false));
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => resizeBox(1)}
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
                    onTouchStart={() => resizeBox(0) }
                >
                    <Animated.View
                        style={[
                            styles.popup_modal,
                            { opacity: scale.interpolate({inputRange:[0,1], outputRange:[0,1]})},
                            { transform: [{ scale }] },
                        ]}
                    >
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
                    </Animated.View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}