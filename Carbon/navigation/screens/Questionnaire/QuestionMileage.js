import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView, Keyboard } from 'react-native';
import { Colors } from '../../../styling/Colors';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QuestionnaireCTAButton } from './QuestionnaireCTAButton';

import { averageGasCarMPG } from '../../../calculations/travel_calculations/averageGasCarMPG';
import mapScoreReverse from '../../../calculations/questionnaireMapScoreReverse';

/*
Mileage Screen

TODO: Improve UI
TODO: Improve transferring of data between pages
*/

export default function MileageScreen({ navigation, route }) {
    // Values from previous pages
    const foodScore = route.params?.foodScore;
    const homeScore = route.params?.homeScore;
    const [transportScore, setTransportScore] = useState(route.params?.transportScore);

    // Value to calculate & transfer at the "finished" screen
    const [mpg, setMpg] = useState(0);

    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        height: 30,
                        borderRadius: 6,
                        width: "60%",
                        backgroundColor: Colors.secondary.CELADON,
                    }}
                />
            ),
        });
    }, []);

    //Updating transportation score
    useEffect(() => {
        calculateTransportScore();
    }, [mpg]);

    const calculateTransportScore = () => {
        //User performance = userMPG / aveMPG
        //transport score = mapped(userPerformance)
        let userPerformance = mpg / averageGasCarMPG.MPG;
        setTransportScore(mapScoreReverse(userPerformance));
    }

    const [hideButton, setHideButton] = useState(false);

    const handleInputFocus = () => {
        setHideButton(true);
    };

    const handleInputBlur = () => {
        setHideButton(false);
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => {
                setHideButton(true);
            },
        );

        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setHideButton(false);
            },
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <ImageBackground
                source={require('../../../assets/car-background-2.png')}
                style={q_styles.background}
            />

            <View style={q_styles.back_button}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back-outline' size={36} color='black' />
                </TouchableOpacity>
            </View>

            <View style={q_styles.questionnaire_container}>
                <Text style={{ ...q_styles.question_text, fontSize: 18, marginBottom: 12, marginHorizontal: 24 }}>
                    {`Fuel efficiency makes a big impact\non your Carbon footprint.`}
                </Text>
                <Text style={{ ...q_styles.question_text, fontSize: 18, marginHorizontal: 24 }}>
                    {`(Optional) What is your vehicle's\nfuel economy?`}
                </Text>

                <View>
                    <Text style={q_styles.text_input_header}>
                        Miles per gallon (mpg)
                    </Text>
                    <TextInput
                        placeholder="Ex: 25"
                        style={q_styles.text_input}
                        keyboardType="decimal-pad"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChangeText={text => {
                            text ? setMpg(text) : setMpg(0);
                            calculateTransportScore();
                        }}
                    />
                </View>
            </View>

            <QuestionnaireCTAButton
                title={"Next Question"}
                isVisible={!hideButton}
                onPress={() =>{
                    navigation.navigate('q5',{
                        transportScore:transportScore,
                        foodScore: foodScore,
                        homeScore:homeScore,
                    })
                }}
            />
        </ScrollView>
    )
}