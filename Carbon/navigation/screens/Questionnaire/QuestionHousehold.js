import React, {useState,useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import { Colors } from '../../../styling/Colors';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QuestionnaireCTAButton } from './QuestionnaireCTAButton';

/*
Household Screen
TODO: Improving UI
*/

export default function HouseholdScreen({navigation,route}) {
    //Previous food score calculation [0,1]
    const foodScore = route.params?.foodScore;
    const[homeScore, setHomeScore] = useState(0);

    const [nextPage, setNextPage] = useState("q4")
    const [buttonIndex, setButtonIndex] = useState(-1)
    const [isDisabled, setIsDisabled] = useState(true)

    //Calculate points across several buttons (For CHECK ALL THAT APPLY choice only)
    const calculatePoints=() =>{
        //Solely Renewable energy has no carbon emissions:
        if(buttonIndex==1){
            setHomeScore(1);
        }
        //Score is determined by bills page, keep it at 0!
        else{
            setHomeScore(0);
        }
    }
    //Ensure points are synchronous & updating progress bar
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"20%",
        backgroundColor: Colors.secondary.CELADON,
        }}>
        </View>
        ),
        })
        calculatePoints();
    });

    return (
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
            <ImageBackground
                source={require('../../../assets/questionnaire-background.png')}
                style={ q_styles.background }
            />

            <View style={q_styles.back_button}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back-outline' size={36} color='black' />
                </TouchableOpacity>
            </View>

            <View style={q_styles.questionnaire_container}>
                <Text style={{ ...q_styles.question_text, marginHorizontal: 24}}>Where does your household's energy come from?</Text>

                <View style={{
                    width:"60%",
                }}
                >
                    <View style={q_styles.button_container}>
                        <TouchableOpacity
                            style={{
                                ...q_styles.answer_button,
                                backgroundColor: buttonIndex == 0 ? Colors.primary.MINT : 'white',
                                borderColor: buttonIndex == 0 ? Colors.primary.MINT : Colors.primary.GRAY,
                            }}
                            onPress={() => {
                                setButtonIndex(0)
                                setNextPage("q2a")
                                setIsDisabled(false)
                            }}
                        >
                            <Text style={q_styles.answer_text} >Fossil Fuels</Text>
                            <Text style={{...q_styles.answer_text, fontSize: 16}} >(Coal, Natural Gas, etc...)</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={q_styles.button_container}>
                        <TouchableOpacity
                            style={{
                                ...q_styles.answer_button,
                                backgroundColor: buttonIndex == 1 ? Colors.primary.MINT : 'white',
                                borderColor: buttonIndex == 1 ? Colors.primary.MINT : Colors.primary.GRAY,
                            }}
                            onPress={() => {
                                setButtonIndex(1)
                                setNextPage("q4")
                                setIsDisabled(false)
                            }}
                        >
                            <Text style={q_styles.answer_text} >Renewable Energy</Text>
                            <Text style={{...q_styles.answer_text, fontSize: 16}} >(Solar, Wind, etc...)</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <QuestionnaireCTAButton
                title={"Next Question"}
                isVisible={!isDisabled}
                onPress={() =>{ isDisabled ? null :
                    navigation.navigate(nextPage, {
                        homeScore:homeScore,
                        foodScore:foodScore,
                    })
                }}
            />
        </ScrollView>
    )
}