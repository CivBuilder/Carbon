import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView, Keyboard } from 'react-native';
import { Colors } from '../../../styling/Colors';
import { aveAnnualHomeEmissions } from '../../../calculations/home_calculations/aveHomeEmissions';
import homeElec from '../../../calculations/home_calculations/questionnaire/homeElec'
import mapScore from '../../../calculations/questionnaireMapScore';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QuestionnaireCTAButton } from './QuestionnaireCTAButton';

/*
Bills Screen
TODO: Improve UI
TODO: Improve transfer of points between pages
*/

export default function BillScreen({ navigation, route }) {

    //Transfer Scores from previous pages
    const foodScore = route.params?.foodScore;
    const [homeScore, setHomeScore] = useState(route.params?.homeScore);

    //Bill values (not calculated until the end)
    const [bill, setBill] = useState(0);
    const [rate, setRate] = useState(0);

    //Updating progress bar (a.k.a the header)
    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <View style={{
                    position: "absolute",
                    top: 0,
                    height: 30,
                    borderRadius: 6,
                    width: "30%",
                    backgroundColor: Colors.secondary.CELADON,
                }}>
                </View>
            ),
        });
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
    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <View style={{
                    position: "absolute",
                    top: 0,
                    height: 30,
                    borderRadius: 6,
                    width: "30%",
                    backgroundColor: Colors.secondary.CELADON,
                }}>
                </View>
            ),
        });
        calculateHomeScore();
    }, [bill, rate]);

    const calculateHomeScore = () => {
        //Electricity bill (in dollars)
        //Power Rate (dollar/KWh)
        let userPerformance = 0;
        if (rate <= 0 || bill <= 0) {
            userPerformance = 0
        } else {
            //homeElec is calculated in mW, so we divide by 1000
            let userScore = homeElec(bill / rate / 1000)
            userPerformance = userScore / aveAnnualHomeEmissions.homePowerEmissions
        }
        // console.log("Rate:", rate)
        // console.log("Bill:", bill)
        // console.log("User Performance", userPerformance)

        setHomeScore(mapScore(userPerformance))
    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <ImageBackground
                source={require('../../../assets/questionnaire-background.png')}
                style={q_styles.background}
            />

            <View style={{ position: 'absolute', top: 32, left: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back-outline' size={36} color='black' />
                </TouchableOpacity>
            </View>

            <View style={q_styles.questionnaire_container}>
                <Text style={{ ...q_styles.question_text, fontSize: 18, marginHorizontal: 24, marginBottom: 24 }}>
                    {`Heating and cooling in a household\naccounts for 43% of energy usage\nin U.S. homes.`}
                </Text>
                <Text style={{ ...q_styles.question_text, fontSize: 18, marginHorizontal: 24 }}>
                    (Optional) Provide your average monthly electricity bill and
                    your electricity rates.
                </Text>

                <View>
                    <Text style={q_styles.text_input_header}>Electricity Bill ($)</Text>
                    <TextInput
                        placeholder="Ex: 120"
                        style={q_styles.text_input}
                        keyboardType="decimal-pad"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChangeText={text => text ? setBill(text) : 0}
                    />

                    <Text style={q_styles.text_input_header}>Power Rates ($/kW⋅h)</Text>
                    <TextInput
                        placeholder="Ex: 0.13"
                        keyboardType="decimal-pad"
                        style={q_styles.text_input}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChangeText={text => text ? setRate(text) : 0}
                    />
                </View>
            </View>

            <QuestionnaireCTAButton
                title={"Next Question"}
                isVisible={!isFocused && showButton}
                onPress={() =>{
                    navigation.navigate('q4',{
                        foodScore:foodScore,
                        homeScore:homeScore,
                    })
                }}
            />
        </ScrollView>
    )
}