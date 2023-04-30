import { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, ScrollView } from 'react-native';
import { Colors } from '../../../styling/Colors';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

/*
Question 1 Screen
*/

export default function DietScreen({ navigation }) {
    // Manages progress bar
    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        height: 40,
                        borderRadius: 6,
                        width: 0,
                        backgroundColor: Colors.secondary.CELADON,
                    }}
                />
            ),
        });

        if (buttonIndex == 0) {
            setFoodScoreCalc(0);
        } else if (nextPage == "q2") {
            if (buttonIndex == 1) {
                setFoodScoreCalc(.5);
            } else if (buttonIndex == 2) {
                setFoodScoreCalc(.75)
            } else {
                setFoodScoreCalc(1);
            }
        }
    });

    // Disables "next" button
    const [isDisabled, setIsDisabled] = useState(false);
    // Changes button colors based on index
    const [buttonIndex, setButtonIndex] = useState(-1);
    // Set next page depending on button pressed:
    const [nextPage, setNextPage] = useState('q2');
    // Calculate food Score on temp variable
    const [foodScoreCalc, setFoodScoreCalc] = useState(0);

    // Changes the color based on the buttonIndex (Only useful for single-choice questions)
    const changeIndex = (index) => {
        setButtonIndex((previousState) => index);
    };

    // Prevent user from moving on until they press a button,
    // then calculate the score (equal to points/maxPoints)
    const disableButton = (points) => {
        setIsDisabled((previousState) => true);
    };

    return (
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <ImageBackground
                source={require('../../../assets/food-background.png')}
                style={q_styles.background}
            />
            <View style={{ position: 'absolute', top: 32, left: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back-outline' size={36} color='black' />
                </TouchableOpacity>
            </View>

            <View style={q_styles.questionnaire_container}>
                {/* Question */}
                <Text style={q_styles.question_text}>Do you consume animal products?</Text>

                {/* Answers */}
                <View
                    style={{
                        width: '60%',
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
                                disableButton(3);
                                setButtonIndex(0);
                                setNextPage('q1a');
                            }}
                        >
                            <Text style={q_styles.answer_text} >Yes</Text>
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
                                disableButton(4);
                                setButtonIndex(1);
                                setNextPage('q2');
                            }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={q_styles.answer_text}>No, I'm pescatarian</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={q_styles.button_container}>
                        <TouchableOpacity
                            style={{
                                ...q_styles.answer_button,
                                backgroundColor: buttonIndex == 2 ? Colors.primary.MINT : 'white',
                                borderColor: buttonIndex == 2 ? Colors.primary.MINT : Colors.primary.GRAY,
                            }}
                            onPress={() => {
                                disableButton(6);
                                setButtonIndex(2);
                                setNextPage("q2");
                            }}
                        >
                            <Text style={q_styles.answer_text}>No, I'm vegetarian</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={q_styles.button_container}>
                        <TouchableOpacity
                            style={{
                                ...q_styles.answer_button,
                                backgroundColor: buttonIndex == 3 ? Colors.primary.MINT : 'white',
                                borderColor: buttonIndex == 3 ? Colors.primary.MINT : Colors.primary.GRAY,
                            }}
                            onPress={() => {
                                disableButton(10);
                                setButtonIndex(3);
                                setNextPage("q2");
                            }}
                        >
                            <Text style={q_styles.answer_text}>No, I'm vegan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={q_styles.cta_container}>
                {isDisabled ? (
                    <TouchableOpacity
                        style={q_styles.cta_button}
                        onPress={() => {
                            navigation.navigate(nextPage, {
                                foodScore: foodScoreCalc,
                            });
                        }}
                    >
                        <Text style={q_styles.cta_text}>Next Question</Text>
                    </TouchableOpacity>
                ) : (
                    null
                )}
            </View>
        </ScrollView>
    )
}