import React, {useState,useEffect} from 'react';
import {View, Text,TextInput, TouchableOpacity, ImageBackground, ScrollView, Keyboard } from 'react-native';
import { Colors } from '../../../styling/Colors';
import {aveRecyclingPerWeek} from '../../../calculations/recycling_calculations/aveRecycling';
import mapScore from '../../../calculations/questionnaireMapScore';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QuestionnaireCTAButton } from './QuestionnaireCTAButton';
/*
Mileage Screen

TODO: Improve UI
TODO: Improve transferring of data between pages
*/

export default function RecycleAmountScreen({navigation,route}) {
    //Values from previous pages
    const homeScore = route.params?.homeScore;
    const [lifestyleScore,setLifestyleScore] = useState(route.params?.lifestyleScore);
    const foodScore = route.params?.foodScore;
    const transportScore= route.params?.transportScore;

    //Value to calculate & transfer at the "finished" screen
    const [recycleAmt,setRecycleAmt] = useState(0);

    //Updating progress bar (a.k.a the header)
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"90%",
        backgroundColor: Colors.secondary.CELADON,
        }}>
        </View>
        ),
        })
    });

    const [showButton, setShowButton] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    const handleInputFocus = () => {
        // setShowButton(false);
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        // setShowButton(true);
        setIsFocused(false);
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => {
                setShowButton(false);
            },
        );

        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setShowButton(true);
            },
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const calculateRecycleAmount=() =>{
        //More recycling is better
        let userPerformance = recycleAmt/aveRecyclingPerWeek.average;
        setLifestyleScore(mapScore(userPerformance));
    }

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
                <Text style={{...q_styles.question_text, marginHorizontal: 24}}>
                    (Optional) Approximately how many pounds of material do you recycle per week?
                </Text>

                <Text style={q_styles.text_input_header}>
                    Recycle Amount (lbs)
                </Text>
                <TextInput
                    placeholder="Ex: 10"
                    style={q_styles.text_input}
                    keyboardType="decimal-pad"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChangeText={text=>{
                        setRecycleAmt(text);
                        calculateRecycleAmount();
                    }}
                />
            </View>

            <QuestionnaireCTAButton
                title={"See My Results"}
                isVisible={showButton}
                onPress={() =>{
                    navigation.navigate('finished',{
                        transportScore:transportScore,
                        homeScore:homeScore,
                        foodScore:foodScore,
                        lifestyleScore:lifestyleScore,
                    })
                }}
            />
        </ScrollView>
    )
}