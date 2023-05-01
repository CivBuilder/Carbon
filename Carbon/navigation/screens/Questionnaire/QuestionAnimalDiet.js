import React, {useState,useEffect} from 'react';
import {View, Text,TextInput, TouchableOpacity, ImageBackground, ScrollView, Keyboard, KeyboardAvoidingView, Animated } from 'react-native';
import { Colors } from '../../../styling/Colors';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {aveFoodConsumption} from '../../../calculations/food_calculations/averageFoodConsumption';
import calcBeef from '../../../calculations/food_calculations/questionnaire/calcBeef';
import calcCheese from '../../../calculations/food_calculations/questionnaire/calcCheese';
import calcPork from '../../../calculations/food_calculations/questionnaire/calcPork';
import calcPoultry from '../../../calculations/food_calculations/questionnaire/calcPoultry';
import mapScore from '../../../calculations/questionnaireMapScore';

import { QuestionnaireCTAButton } from './QuestionnaireCTAButton';

/*
Animal Diet Screen (types of meat & amounts eaten per year)
*/

export default function AnimalDietScreen({navigation,route}) {
    //Importing average scores from government-based websites (or closely related sites)
    const aveBeef = aveFoodConsumption.aveAnnualBeefConsumption;
    const avePork = aveFoodConsumption.aveAnnualPorkConsumption;
    const avePoultry= aveFoodConsumption.aveAnnualPoultryConsumption;
    const aveCheese = aveFoodConsumption.aveAnnualCheeseConsumption;

    //Recalculating food scores in case they posted (not restrictions)
    const[foodScore, setFoodScore] = useState(route.params?.foodScore)
    //Find pounds consumed by user:
    const [lbsBeef,setlbsBeef]=useState(0);
    const [lbsPork,setlbsPork]=useState(0);
    const [lbsPoultry,setlbsPoultry]=useState(0);
    const [lbsCheese,setlbsCheese]=useState(0);
    //Updating progress bar (a.k.a the header)
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"10%",
        backgroundColor: Colors.secondary.CELADON,
        }}>
        </View>
        ),
        })
    });

    //Really difficult to hit top score, very easy to hit low score, very easy to translate between scores in the middle. Range=[0,1]
    const calculatePreciseFoodScore=() =>{
        let carbonEmissionsOfUser = (calcBeef(+lbsBeef)+calcPork(+lbsPork)+calcCheese(+lbsCheese)+calcPoultry(+lbsPoultry));
        let aveCarbonEmissions = (calcBeef(aveBeef)+calcPork(avePork)+calcCheese(aveCheese)+calcPoultry(avePoultry));
        let userPerformance = carbonEmissionsOfUser/aveCarbonEmissions;
        setFoodScore(mapScore(userPerformance));
    }

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

    return (
        <KeyboardAwareScrollView contentContainerStyle={q_styles.questionnaire_container}>
            <ImageBackground
                source={require('../../../assets/food-background-2.png')}
                style={ q_styles.background }
            />

            <View style={q_styles.back_button}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back-outline' size={36} color='black' />
                </TouchableOpacity>
            </View>

            <View style={q_styles.questionnaire_container}>
                <Text style={{...q_styles.question_text, textAlign: 'center', fontSize: 18, marginHorizontal: 24}}>
                    {`(Optional) Approximately how many pounds of the following do you eat\non a weekly basis?`}
                </Text>

                <Text style={q_styles.text_input_header}>Beef (lbs)</Text>
                <TextInput
                    placeholder="Ex: 1.1"
                    style={q_styles.text_input}
                    keyboardType="decimal-pad"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChangeText={text=>{
                        setlbsBeef(text? +text : 0);
                        calculatePreciseFoodScore()
                    }}
                />

                <Text style={q_styles.text_input_header}>Poultry (lbs)</Text>
                <TextInput
                    placeholder="Ex: 1.9"
                    keyboardType="decimal-pad"
                    style={q_styles.text_input}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChangeText={text=>{
                        setlbsPoultry(text? +text : 0);
                        calculatePreciseFoodScore()
                    }}
                />

                <Text style={q_styles.text_input_header}>Pork (lbs)</Text>

                <TextInput
                    placeholder="Ex: 0.96"
                    keyboardType="decimal-pad"
                    style={q_styles.text_input}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChangeText={text=>{
                        setlbsPork(text? +text : 0);
                        calculatePreciseFoodScore()
                    }}
                />

                <Text style={q_styles.text_input_header}>Cheese (lbs)</Text>

                <TextInput
                    placeholder="Ex: 0.75"
                    keyboardType="decimal-pad"
                    style={q_styles.text_input}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChangeText={text=>{
                        setlbsCheese(text? +text : 0);
                        calculatePreciseFoodScore()
                    }}
                />
            </View>

            <QuestionnaireCTAButton
                title={"Next Question"}
                isVisible={!isFocused && showButton}
                onPress={() => navigation.navigate('q2',{ foodScore:foodScore })}
            />
        </KeyboardAwareScrollView>
    )
}