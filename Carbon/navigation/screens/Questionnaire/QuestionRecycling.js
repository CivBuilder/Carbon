import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { Colors } from '../../../styling/Colors';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QuestionnaireCTAButton } from './QuestionnaireCTAButton';
/*
Transport Screen
TODO: Find a better way to transfer values to the last screen(instead of transferring between pages)
TODO: Improve UI
*/

export default function RecycleScreen({navigation, route}) {
    const foodScore = route.params?.foodScore;
    const homeScore = route.params?.homeScore;
    const transportScore = route.params?.transportScore;
    const lifestyleScore = route.params?.lifestyleScore;
    const [nextPage, setNextPage] = useState("q5a");
    const [buttonIndex, setButtonIndex] = useState(-1);
    const [isDisabled, setIsDisabled] = useState(true);
    //Updating progress bar (a.k.a the header)
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"80%",
        backgroundColor: Colors.secondary.CELADON,
        }}>
        </View>
        ),
        })
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
                <Text style={ q_styles.question_text}>
                    Are you in the habit of recycling?
                </Text>

                <View style={{
                    width:"60%",
                }}
                >
                    <View style={q_styles.button_container}>
                        <TouchableOpacity
                            style={{
                                ...q_styles.answer_button,
                                backgroundColor: buttonIndex === 0 ? Colors.primary.MINT : 'white',
                                borderColor: buttonIndex === 0 ? Colors.primary.MINT : Colors.primary.GRAY,
                            }}
                            onPress={()=>{
                                setButtonIndex(0);
                                setNextPage("q5a");
                                setIsDisabled(false);
                            }}
                        >
                            <Text style={q_styles.answer_text}>Yes</Text>
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
                                setNextPage("finished");
                                setIsDisabled(false);
                            }}
                        >
                            <Text style={q_styles.answer_text}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <QuestionnaireCTAButton
                title={buttonIndex === 0 ? "Next Question" : buttonIndex === 1 ? "See My Results" : ""}
                isVisible={!isDisabled}
                onPress={() =>{ isDisabled ? null :
                    navigation.navigate(nextPage,{
                        foodScore:foodScore,
                        transportScore:transportScore,
                        homeScore:homeScore,
                        lifestyleScore:lifestyleScore,
                    })
                }}
            />
        </ScrollView>
    )
}