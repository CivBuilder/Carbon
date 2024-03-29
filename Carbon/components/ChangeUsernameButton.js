import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const ChangeUsernameButton = ({disabled, onPress }) => {
    return (
        <View >
            {disabled ? (
                <Pressable style={{...styles.button, backgroundColor: '#C2C2C2'}} onPress={onPress} testID="changeUsernameButton" disabled={disabled}>
                    <Text style={styles.buttonText}>Change Username</Text>
                </Pressable>
            ) : (
                <Pressable style={styles.button} onPress={onPress} testID="changeUsernameButton" disabled={disabled}>
                    <Text style={styles.buttonText}>Change Username</Text>
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 40,
        backgroundColor: '#74C69D',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        // fontFamily: 'sans-serif',
    },
})

export default ChangeUsernameButton