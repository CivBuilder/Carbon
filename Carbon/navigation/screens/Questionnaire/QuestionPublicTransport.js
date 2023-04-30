import React, {useState,useEffect} from 'react';
import {View, Text,Button,Switch, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Colors } from '../../../styling/Colors';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QuestionnaireCTAButton } from './QuestionnaireCTAButton';

/*
Public Transport Screen

TODO: Improve UI
TODO: Improve transferring of data between pages
*/

export default function PublicTransportScreen({navigation,route}) {
    //Data transfered from previous pages
    const foodScore = route.params?.foodScore;
    const homeScore = route.params?.homeScore;
    const [transportScore,setTransportScore] = useState(0)
    //"Select all that apply" state variables
    const [isDisabled,setIsDisabled] = useState(false);
    const [buttonOn0, setButtonOn0] = useState(false);
    const [buttonOn1, setButtonOn1] =  useState(false);

    //Calculates score (scales from 0 to 1)
    const calculatePoints=() =>{
        if(!buttonOn0 && !buttonOn1){
            setTransportScore(0)
        }else{
            setTransportScore((buttonOn0*.5 + buttonOn1)/(buttonOn1+buttonOn0));
        }
    }
    //Ensure that points is synchronous
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"70%",
        backgroundColor: Colors.secondary.CELADON,
        }}>
        </View>
        ),
        })
        calculatePoints();
    });

    const toggleButton = (index) => {
        const flip = false;
        //Toggle specific button depending on input
        switch(index){
            case 0:
                setButtonOn0(!buttonOn0);
                break;
            case 1:
                setButtonOn1(!buttonOn1);
                break;
            default:
                break;
        }
    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
            <ImageBackground
                source={require('../../../assets/car-background-2.png')}
                style={ q_styles.background }
            />

            <View style={{position: 'absolute', top: 32, left: 10}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back-outline' size={36} color='black' />
                </TouchableOpacity>
            </View>

            <View style={q_styles.questionnaire_container}>
                <Text style={{...q_styles.question_text, textAlign: 'center', fontSize: 18, marginBottom: 6, marginHorizontal: 24}}>
                    What form of transportation do you use?
                </Text>
                <Text style={{...q_styles.question_text, textAlign: 'center', fontSize: 18, marginHorizontal: 24}}>
                    (Select all that apply)
                </Text>

                <View style={{
                    width:"60%",
                }}
                >
                    <View style={q_styles.button_container}>
                        <TouchableOpacity
                            style={{
                                ...q_styles.answer_button,
                                backgroundColor: buttonOn0 ? Colors.primary.MINT : 'white',
                                borderColor: buttonOn0 ? Colors.primary.MINT : Colors.primary.GRAY,
                            }}
                            onPress={()=>{
                                toggleButton(0);
                            }}
                        >
                            <Text style={q_styles.answer_text}>{`Public Transportation\n(bus, metro, train, etc...)`}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={q_styles.button_container}>
                        <TouchableOpacity
                            style={{
                                ...q_styles.answer_button,
                                backgroundColor: buttonOn1 ? Colors.primary.MINT : 'white',
                                borderColor: buttonOn1 ? Colors.primary.MINT : Colors.primary.GRAY,
                            }}
                            onPress={()=>{
                                toggleButton(1);
                            }}
                        >
                            <Text style={q_styles.answer_text}>{`Other\n(bicycle, walking, etc...)`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <QuestionnaireCTAButton
                title={"Next Question"}
                isVisible={buttonOn0 || buttonOn1}
                onPress={() =>{
                    navigation.navigate('q5',{
                        homeScore:homeScore,
                        foodScore:foodScore,
                        transportScore:transportScore,
                    })
                }}
            />
        </ScrollView>
    )
}