import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import { Colors } from '../styling/Colors'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const EducationMenu = ({title, imageSrc, onPress, currentTab}) => {
    const test = {
        backgroundColor: '#43b262'
    }
    // const imageStyle = currentTab ? styles.categoryIcon : { ...styles.categoryIcon, tintColor: 'gray' };
    const iconColor = currentTab ? Colors.primary.MINT : 'gray';
    const roundButtonStyle = currentTab ? styles.roundButton : {...styles.roundButton, backgroundColor: 'white', borderColor: 'gray'};
    const textStyle = currentTab ? styles.imageText : {...styles.imageText, color: 'gray'};
    return(
        <View style={{paddingHorizontal: 10, alignItems: 'center'}}>
            <TouchableOpacity style = {roundButtonStyle}  onPress={onPress}>
                {/* <Image style = {imageStyle} source={imageSrc} /> */}
                <MaterialCommunityIcons name={imageSrc} size={40} color={iconColor} />
            </TouchableOpacity>
            <Text style = {textStyle}>{title}</Text>
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
        color: Colors.primary.MINT,
        textAlign: 'center'
    }
});


export default EducationMenu
