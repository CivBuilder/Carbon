import React, {useState,useEffect} from 'react';
import {View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Colors } from '../../../styling/Colors';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QuestionnaireCTAButton } from './QuestionnaireCTAButton';

/*
Vehicle Type Screen

TODO: Improve UI
TODO: Better handling of previous page values
TODO: Better handling of max points per question
*/


export default function VehicleTypeScreen({navigation,route}) {

    //Transferred Scores from previous pages
    const foodScore = route.params?.foodScore;
    const homeScore= route.params?.homeScore;
    const [transportScore,setTransportScore] = useState(0);

    //Single Choice Question, so we only need one button value
    const [buttonIndex, setButtonIndex] = useState(-1);
    //Change page depending on the answer:
    const [nextPage,setNextPage] = useState("q4b");
    const [isDisabled, setIsDisabled] = useState(true);

    const calculateTransportScore=() =>{
        //Electric Vehicle => Automatic 1 (0 carbon emissions)
        //Others => Automatic 0 (recalculate when given MPG in next page)
        let userPerformance = 0;
        if(buttonIndex == 2){
            userPerformance=1;
        }
        setTransportScore(userPerformance)
    }
    //Updating progress bar (a.k.a the header)
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"50%",
        backgroundColor: Colors.secondary.CELADON,
        }}>
        </View>
        ),
        })
        calculateTransportScore();
    });
    return (
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
            <ImageBackground
                source={require('../../../assets/car-background-2.png')}
                style={ q_styles.background }
            />

            <View style={q_styles.back_button}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back-outline' size={36} color='black' />
                </TouchableOpacity>
            </View>

            <View style={q_styles.questionnaire_container}>
                <Text style={ q_styles.question_text}>What type of vehicle do you own?</Text>

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
                                setNextPage("q4b");
                                setIsDisabled(false);
                            }}
                        >
                            <Text style={{...q_styles.answer_text, fontSize: 18}}>Non-electric</Text>
                            <Text style={{...q_styles.answer_text, fontSize: 16}}>(Gas, Diesel, Hybrid)</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={q_styles.button_container}>
                        <TouchableOpacity
                            style={{
                                ...q_styles.answer_button,
                                backgroundColor: buttonIndex === 2 ? Colors.primary.MINT : 'white',
                                borderColor: buttonIndex === 2 ? Colors.primary.MINT : Colors.primary.GRAY,
                            }}
                            onPress={()=>{
                                setButtonIndex(2);
                                setNextPage("q5");
                                setIsDisabled(false);
                            }}
                        >
                            <Text style={q_styles.answer_text}>Electric</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            </View>

            <QuestionnaireCTAButton
                title={"Next Question"}
                isVisible={!isDisabled}
                onPress={() =>{ isDisabled ? null :
                    navigation.navigate(nextPage,{
                        homeScore:homeScore,
                        foodScore:foodScore,
                        transportScore:transportScore,
                    })
                }}
            />
        </ScrollView>
    )
}