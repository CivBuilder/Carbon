import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '../styling/Colors'


const CalculationsButton = ({ onPress }) => {
    return (
        <View >
            <Pressable style={styles.button} onPress={onPress} testID="calculation-details">
                <Text style={styles.buttonText}>Calculation Details</Text>
            </Pressable >
        </View>

    )
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#74C69D',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    buttonText: {
        color: '#74C69D',
        fontSize: 16,
        // fontFamily: 'sans-serif',
    },
})
export default CalculationsButton;