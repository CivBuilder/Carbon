import React, {useState,useEffect} from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../styling/Colors';

export const QuestionnaireCTAButton = ({ title, isVisible, onPress }) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
    Animated.timing(fadeAnim, {
        toValue: isVisible ? 1 : 0,
        duration: 100,
        useNativeDriver: true,
    }).start();
    }, [isVisible, fadeAnim]);

    return (
        <Animated.View style={[styles.cta_container, { opacity: fadeAnim }]}>
            <TouchableOpacity style={styles.cta_button} onPress={onPress}>
            <Text style={styles.cta_text}>{title}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    cta_container: {
        position: 'absolute',
        bottom: 12,
        alignItems: 'center',
        width: '100%',
    },
    cta_button: {
        borderRadius: 12,
        padding: 12,
        width: '60%',
        backgroundColor: Colors.primary.MINT,
    },
    cta_text: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        color: Colors.primary.MINT_CREAM,
    },
});