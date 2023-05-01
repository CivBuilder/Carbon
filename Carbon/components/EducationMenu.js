import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import { Colors } from '../styling/Colors'
import React from 'react'


const EducationMenu = ({title, imageSrc, onPress}) => {
    const test = {
        backgroundColor: '#43b262'
    }
    return(
        <View style={{paddingHorizontal: 10, alignItems: 'center'}}>
            <TouchableOpacity style = {styles.roundButton}  onPress={onPress}>
                <Image style = {styles.categoryIcon} source={imageSrc} />
            </TouchableOpacity>
            <Text style = {styles.imageText}>{title}</Text>
        </View>
   )
}

const styles = StyleSheet.create({
    roundButton: {
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: Colors.primary.MINT_CREAM,
        borderColor: Colors.primary.MINT,
        borderWidth: 3,
    },

    categoryIcon: {
        resizeMode: 'contain',
        height: '80%',
        width: '80%',
        tintColor: Colors.primary.MINT,
    },

    imageText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'gray',
        textAlign: 'center'
    }
});


export default EducationMenu
