import React, {useState, useEffect} from 'react';
import {View, Text,Button, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { Colors } from '../../../styling/Colors';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QuestionnaireCTAButton } from './QuestionnaireCTAButton';

/*
Transport Screen
TODO: Find a better way to transfer values to the last screen(instead of transferring between pages)
TODO: Improve UI
*/

export default function TransportScreen({navigation, route}) {

    //Carry Scores and values from previous pages
    const foodScore = route.params?.foodScore;
    const homeScore = route.params?.homeScore;
    const [nextPage, setNextPage] = useState("q4a");
    const [buttonIndex, setButtonIndex] = useState(-1);

    //Updating progress bar (a.k.a the header)
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"40%",
        backgroundColor: Colors.secondary.CELADON,
        }}>
        </View>
        ),
        })
    });

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

            <View style={{ ...q_styles.questionnaire_container }}>
                <Text style={{ ...q_styles.question_text, fontSize: 18, marginHorizontal: 24, marginBottom: 20}}>
                    In 2020, passenger vehicles accounted for 38% of greenhouse
                    gases emitted by the transportation industry.
                </Text>
                <Text style={{ ...q_styles.question_text, fontSize: 18, marginHorizontal: 24}}>
                    Do you own or drive a passenger vehicle?
                </Text>

                <View style={{ width:'60%'}}>
                    <View style={ q_styles.button_container }>
                        <TouchableOpacity
                            style={{
                                ...q_styles.answer_button,
                                backgroundColor: buttonIndex === 0 ? Colors.primary.MINT : 'white',
                                borderColor: buttonIndex === 0 ? Colors.primary.MINT : Colors.primary.GRAY,
                            }}
                            onPress={()=>{
                                setButtonIndex(0);
                                setNextPage("q4a");
                            }}
                        >
                            <Text style={q_styles.answer_text} >Yes</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={q_styles.button_container}>
                        <TouchableOpacity
                            style={{
                                ...q_styles.answer_button,
                                backgroundColor: buttonIndex === 1 ? Colors.primary.MINT : 'white',
                                borderColor: buttonIndex === 1 ? Colors.primary.MINT : Colors.primary.GRAY,
                            }}
                            onPress={()=>{
                                setButtonIndex(1);
                                setNextPage("q4c");
                            }}
                        >
                            <Text style={q_styles.answer_text} >No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <QuestionnaireCTAButton
                title={"Next Question"}
                isVisible={buttonIndex !== -1}
                onPress={() =>{
                    navigation.navigate(nextPage,{
                        homeScore:homeScore,
                        foodScore:foodScore,
                    });
                }}
            />
        </ScrollView>
    )
}