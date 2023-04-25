import * as React from 'react';
import {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../styling/Colors';
import { ScreenNames } from '../Main/ScreenNames';
import { RadioButton } from 'react-native-paper';
import { EmissionCategory as ec } from './EmissionScoreCateogory';


export default function RankCategoryOverlay({setEmissionCategory}){
 
  const [modalVisible, setVisibility] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(ec.GLOBAL);

    return (
        <View>
            <TouchableOpacity onPress={() => {setVisibility(!modalVisible)}}>
                <Ionicons
                    name={"list-outline"}
                    size={26}
                    color={Colors.primary.RAISIN_BLACK}
                    style={{ marginRight: 16 }}
                />
            </TouchableOpacity>
            <Modal 
                transparent = {true}
                animationType='slide'
                visible = {modalVisible}
                onRequestClose={() => {setVisibility(false);}}
            >
                <View style = {styles.ModalOuterContainer}>
                    <View style = {styles.modalView}>
                        <Text style = {styles.QuestionText}>
                            Please Select your Leaderboard Category:
                        </Text>

                        <View style = {styles.RadioButtonContainer}>
                            <RadioButton
                                value = "Global Score"
                                status={ selectedCategory === ec.GLOBAL ? 'checked' : 'unchecked' }
                                onPress={() => setSelectedCategory(ec.GLOBAL)}
                                color = {Colors.secondary.DARK_MINT}
                            />
                            <Ionicons
                                name={"earth-outline"}
                                size={26}
                                color={Colors.primary.RAISIN_BLACK}
                                style={{ marginRight: 16, marginLeft: 40 }}
                            />
                            <Text> Global Score </Text>
                        </View>
                        
                        <View style = {styles.RadioButtonContainer}>
                            <RadioButton
                                value = "Transport Score"
                                status={ selectedCategory === ec.TRANSPORT ? 'checked' : 'unchecked' }
                                onPress={() => setSelectedCategory(ec.TRANSPORT)}
                                color = {Colors.secondary.DARK_MINT}
                            />
                            <Ionicons
                                name={"car-sport-outline"}
                                size={26}
                                color={Colors.primary.RAISIN_BLACK}
                                style={{ marginRight: 16, marginLeft: 40 }}
                            />
                            <Text> Transport Score </Text>
                        </View>

                        <View style = {styles.RadioButtonContainer}>
                            <RadioButton
                                value = "Lifestyle Score"
                                status={ selectedCategory === ec.LIFESTYLE ? 'checked' : 'unchecked' }
                                onPress={() => setSelectedCategory(ec.LIFESTYLE)}
                                color = {Colors.secondary.DARK_MINT}
                            />
                            <Ionicons
                                name={"wallet-outline"}
                                size={26}
                                color={Colors.primary.RAISIN_BLACK}
                                style={{ marginRight: 16, marginLeft: 40 }}
                            />
                            <Text> Lifestyle Score </Text>
                        </View>

                        <View style = {styles.RadioButtonContainer}>
                            <RadioButton
                                value = "Diet Score"
                                status={ selectedCategory === ec.DIET ? 'checked' : 'unchecked' }
                                onPress={() => setSelectedCategory(ec.DIET)}
                                color = {Colors.secondary.DARK_MINT}
                            />
                            <Ionicons
                                name={"restaurant-outline"}
                                size={26}
                                color={Colors.primary.RAISIN_BLACK}
                                style={{ marginRight: 16, marginLeft: 40 }}
                            />
                            <Text> Diet Score </Text>
                        </View>

                        <View style = {styles.RadioButtonContainer}>
                            <RadioButton
                                value = "Home Score"
                                status={ selectedCategory === ec.HOME ? 'checked' : 'unchecked' }
                                onPress={() => setSelectedCategory(ec.HOME)}
                                color = {Colors.secondary.DARK_MINT}
                            />
                            <Ionicons
                                name={"home-outline"}
                                size={26}
                                color={Colors.primary.RAISIN_BLACK}
                                style={{ marginRight: 16, marginLeft: 40 }}
                            />
                            <Text>Home Score</Text>
                        </View>

                        <Pressable 
                            style = {styles.button} 
                            onPress = {() => {
                                setVisibility(!modalVisible); 
                                setEmissionCategory(selectedCategory);
                            }}
                        >
                            <Text> Return </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>

        
    );
  
}

const styles = StyleSheet.create({
    ModalOuterContainer  : { 
        flex : 1, 
        justifyContent : 'center',
        alignContent : 'center',
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        height : 350,
        width : 290,
        alignSelf : 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding : 5,
    },
    RadioButtonContainer : {
        flexDirection : 'row', 
        alignContent : 'center', 
        alignItems : 'center', 
        marginLeft : 15,
    },
    QuestionText : {
        flex : 0.4,
        fontSize : 20,
        fontWeight : 'bold',
        textAlign : 'center',
        marginTop : 5,
    },
    button: {
        borderRadius: 20,
        padding: 5,
        elevation: 2,
        alignSelf : 'center',
        backgroundColor : Colors.primary.MINT
    },    
});