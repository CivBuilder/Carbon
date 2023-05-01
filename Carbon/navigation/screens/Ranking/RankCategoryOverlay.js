import * as React from 'react';
import {useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../styling/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import { EmissionCategory as ec } from './Categories';


export default function RankCategoryOverlay({setEmissionCategory}){
 
  const [modalVisible, setVisibility] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(ec.GLOBAL);

    return (
        <View>
            <TouchableOpacity onPress={() => {setVisibility(!modalVisible)}} testID='list-btn'>
                <Ionicons
                    name={"list-outline"}
                    size={26}
                    color={Colors.primary.RAISIN_BLACK}
                    style={{ marginRight: 16 }}
                />
            </TouchableOpacity>
            <Modal 
                testID='overlay-modal'
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
                                testID='glob-btn'
                                value = "Global Score"
                                status={ selectedCategory === ec.GLOBAL ? 'checked' : 'unchecked' }
                                onPress={() => setSelectedCategory(ec.GLOBAL)}
                                color = {Colors.secondary.DARK_MINT}
                            />
                            <Ionicons
                                name={"earth"}
                                size={26}
                                color={Colors.primary.RAISIN_BLACK}
                                style={{ marginRight: 16, marginLeft: 40 }}
                            />
                            <Text> Global Score </Text>
                        </View>
                        
                        <View style = {styles.RadioButtonContainer}>
                            <RadioButton
                                testID='trans-btn'
                                value = "Transport Score"
                                status={ selectedCategory === ec.TRANSPORT ? 'checked' : 'unchecked' }
                                onPress={() => setSelectedCategory(ec.TRANSPORT)}
                                color = {Colors.secondary.DARK_MINT}
                            />
                            <Ionicons
                                name={"car-sport"}
                                size={26}
                                color={Colors.primary.RAISIN_BLACK}
                                style={{ marginRight: 16, marginLeft: 40 }}
                            />
                            <Text> Transport Score </Text>
                        </View>

                        <View style = {styles.RadioButtonContainer}>
                            <RadioButton
                                testID='life-btn'
                                value = "Lifestyle Score"
                                status={ selectedCategory === ec.LIFESTYLE ? 'checked' : 'unchecked' }
                                onPress={() => setSelectedCategory(ec.LIFESTYLE)}
                                color = {Colors.secondary.DARK_MINT}
                            />
                            <Icon 
                                name = "recycle"
                                size = {26}
                                color={Colors.primary.RAISIN_BLACK}
                                style={{ marginRight: 16, marginLeft: 40 }}
                            />
                            <Text> Lifestyle Score </Text>
                        </View>

                        <View style = {styles.RadioButtonContainer}>
                            <RadioButton
                                testID='diet-btn'
                                value = "Diet Score"
                                status={ selectedCategory === ec.DIET ? 'checked' : 'unchecked' }
                                onPress={() => setSelectedCategory(ec.DIET)}
                                color = {Colors.secondary.DARK_MINT}
                            />
                            <Ionicons
                                name={"restaurant"}
                                size={26}
                                color={Colors.primary.RAISIN_BLACK}
                                style={{ marginRight: 16, marginLeft: 40 }}
                            />
                            <Text> Diet Score </Text>
                        </View>

                        <View style = {styles.RadioButtonContainer}>
                            <RadioButton
                                testID='home-btn'
                                value = "Home Score"
                                status={ selectedCategory === ec.HOME ? 'checked' : 'unchecked' }
                                onPress={() => setSelectedCategory(ec.HOME)}
                                color = {Colors.secondary.DARK_MINT}
                            />
                            <Ionicons
                                name={"home"}
                                size={26}
                                color={Colors.primary.RAISIN_BLACK}
                                style={{ marginRight: 16, marginLeft: 40 }}
                            />
                            <Text> Home Score </Text>
                        </View>

                        <Pressable 
                            testID='leave-btn'
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