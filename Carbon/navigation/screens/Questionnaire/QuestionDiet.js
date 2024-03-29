import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Colors } from '../../../styling/Colors';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QuestionnaireCTAButton } from './QuestionnaireCTAButton';

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
    const [isDisabled, setIsDisabled] = useState(true);
    // Changes button colors based on index
    const [buttonIndex, setButtonIndex] = useState(-1);
    // Set next page depending on button pressed:
    const [nextPage, setNextPage] = useState('q2');
    // Calculate food Score on temp variable
    const [foodScoreCalc, setFoodScoreCalc] = useState(0);

    return (
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <ImageBackground
                source={require('../../../assets/food-background.png')}
                style={q_styles.background}
            />
            <View style={q_styles.back_button}>
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
                                setIsDisabled(false);
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
                                setIsDisabled(false);
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
                                setIsDisabled(false);
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
                                setIsDisabled(false);
                                setButtonIndex(3);
                                setNextPage("q2");
                            }}
                        >
                            <Text style={q_styles.answer_text}>No, I'm vegan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

                <QuestionnaireCTAButton
                    title={"Next Question"}
                    isVisible={!isDisabled}
                    onPress={() =>{
                        isDisabled ? null :
                        navigation.navigate(nextPage,{
                        foodScore:foodScoreCalc,
                        });
                    }}
                />
            </ScrollView>
    )
}