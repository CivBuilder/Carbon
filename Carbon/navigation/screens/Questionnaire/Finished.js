import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { Colors } from '../../../styling/Colors';
import { API_URL } from '../../../config/Api';
import { SustainabilityScoreProfileView } from '../../../util/SustainabilityScoreProfileView';
import { getToken } from '../../../util/UserManagement';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QuestionnaireCTAButton } from './QuestionnaireCTAButton';

/*
Finished Screen
*/

export const postFinishedQuestionnaire = async () => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'secrettoken': await getToken(),
        }
    };

    try {
        const response = await fetch(API_URL + 'user/finish-questionnaire/', requestOptions);
        // console.log(JSON.stringify(response));
        if (response.status === 200) {
            // console.log("Finished Questionnaire");
        } else {
            // console.log("Failed to finish questionnaire");
        }
    } catch (error) {
        console.error(error);
    }
};

export default function FinishedScreen({route}) {
    //Final Calculations
    //Food Score is calculated in animaldiet and diet
    //Home score is calculated in household and bills
    //Transport Score is calculated in Public transport, mileage, vehicleType
    //Lifestyle score is calculated in recycling
    const transportScore = route.params?.transportScore;
    const foodScore = route.params?.foodScore;
    const homeScore = route.params?.homeScore;
    const awarenessScore = (transportScore + foodScore + homeScore) / 3;

    const questionnaireBody = {
        'transport_score': transportScore*100,
        'lifestyle_score': 50,
        'food_score': foodScore*100,
        'home_score': homeScore*100,
        'awareness_score': awarenessScore*100,
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sustainability_score = Math.floor(Object.values(questionnaireBody).reduce(reducer)*0.02); // same sustainability score function 

    const updateSustainability = async () => {
        try {
            // console.log("Updating sustainability score");

            const response = await fetch(API_URL + 'user/questionnaire', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'secrettoken': await getToken()
                },
                body: JSON.stringify(questionnaireBody)
            });

            if (response.status === 200) {
                // console.log("Updated sustainability score");
            } else {
                // console.log("Failed to update sustainability score");
                // console.log(await response.text());
            }
        } catch (error) {
            // console.log(error);
        }
    }


    const scoreCategory = SustainabilityScoreProfileView[sustainability_score].title;
    const scorePicture = SustainabilityScoreProfileView[sustainability_score].picture;

    const [bestScore, setBestScore] = useState("");
    const [worstScore, setWorstScore] = useState("");


    const calculateRanks = () => {
        const scoreMap = {
            Transportation: transportScore,
            Home: homeScore,
            Food: foodScore
        };

        const bestScore = Object.keys(scoreMap).reduce((best, score) => {
        return scoreMap[score] > scoreMap[best] ? score : best;
        }, Object.keys(scoreMap)[0]);

        const worstScore = Object.keys(scoreMap).reduce((worst, score) => {
        return scoreMap[score] < scoreMap[worst] ? score : worst;
        }, Object.keys(scoreMap)[0]);

        setBestScore(bestScore);
        setWorstScore(worstScore);
    }

    useEffect(() => {
        calculateRanks();
        updateSustainability();
    }, [route.params?.transportScore, route.params?.foodScore, route.params?.homeScore]);

    // ANIMATIONS
    // define animated values
    const rankTitleOpacity = useRef(new Animated.Value(0)).current;
    const rankPictureOpacity = useRef(new Animated.Value(0)).current;
    const rankPictureScale = useRef(new Animated.Value(0)).current;
    const homeScoreOpacity = useRef(new Animated.Value(0)).current;
    const transportScoreOpacity = useRef(new Animated.Value(0)).current;
    const foodScoreOpacity = useRef(new Animated.Value(0)).current;
    const bestCategoryOpacity = useRef(new Animated.Value(0)).current;
    const worstCategoryOpacity = useRef(new Animated.Value(0)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;

    // define animation configurations
    const rankTitleConfig = {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
    };
    const rankPictureConfig = {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
    };
    const rankPictureScaleConfig = {
        toValue: 1,
        duration: 1600,
        useNativeDriver: true,
    };
    const categoryScoreConfig = {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    };
    const buttonConfig = {
        toValue: 1,
        delay: 690,
        duration: 1000,
        useNativeDriver: true,
    }

    Animated.sequence([
        Animated.parallel([
            Animated.timing(rankPictureOpacity, rankPictureConfig),
            Animated.timing(rankPictureScale, rankPictureScaleConfig),
            Animated.timing(rankTitleOpacity, rankTitleConfig),
        ]),
        Animated.timing(homeScoreOpacity, categoryScoreConfig),
        Animated.timing(transportScoreOpacity, categoryScoreConfig),
        Animated.timing(foodScoreOpacity, categoryScoreConfig),
        Animated.timing(bestCategoryOpacity, categoryScoreConfig),
        Animated.timing(worstCategoryOpacity, categoryScoreConfig),
        Animated.timing(buttonOpacity, buttonConfig),
    ]).start();

    return (
        <View style={{flex: 1, backgroundColor: Colors.miscellaneous.SCREEN_BACKGROUND}}>
            <View style={{alignItems:'center'}}>
                <Text style={{ marginTop: 48, marginBottom: 6, fontSize: 20, }}>...and you're done!</Text>
                <Text style={{ marginBottom: 12, fontSize: 24, }}>Here are your results:</Text>
            </View>

            <View style={q_styles.result_container}>
                <View style={q_styles.center}>
                    <Animated.Image
                        source={scorePicture}
                        resizeMode='contain'
                        style={{...q_styles.rank_picture_container, opacity: rankPictureOpacity, transform: [{ scale: rankPictureScale }] }}
                    />

                    <Animated.Text style={{ ...q_styles.rank_title_text, opacity: rankTitleOpacity, }}>{scoreCategory}</Animated.Text>
                </View>

                <View style={{ marginBottom: 24, flexDirection: 'row' }}>
                    <Animated.View style={{ ...q_styles.score_category_container, borderColor: Colors.categories.HOME, opacity: homeScoreOpacity }}>
                        <Ionicons name='home-outline' size={36} color={Colors.categories.HOME} />
                        <Text style={{ ...q_styles.score_text, color: Colors.categories.HOME }}>
                            {homeScore * 10}/10
                        </Text>
                    </Animated.View>

                    <View style={{ marginHorizontal: 8 }}/>

                    <Animated.View style={{ ...q_styles.score_category_container, borderColor: Colors.categories.TRANSPORTATION, opacity: transportScoreOpacity }}>
                        <Ionicons name='bicycle-outline' size={36} color={Colors.categories.TRANSPORTATION} />
                        <Text style={{ ...q_styles.score_text, color: Colors.categories.TRANSPORTATION }}>
                            {transportScore * 10}/10
                        </Text>
                    </Animated.View>

                    <View style={{ marginHorizontal: 8 }}/>

                    <Animated.View style={{ ...q_styles.score_category_container, borderColor: Colors.categories.DIET, opacity: foodScoreOpacity }}>
                        <Ionicons name='fast-food-outline' size={36} color={Colors.categories.DIET} />
                        <Text style={{ ...q_styles.score_text, color: Colors.categories.DIET }}>
                            {foodScore * 10}/10
                        </Text>
                    </Animated.View>
                </View>
            </View>

            <View style={q_styles.best_worst_category_container} >
                <Animated.View style={{ ...q_styles.center, opacity: bestCategoryOpacity }}>
                    <Text style={{ fontSize: 20, marginBottom: 10, }}>Best Category:</Text>

                    <View style={{ ...q_styles.best_worst_category_score_container, borderColor: Colors.secondary.DARK_MINT }}>
                        <Text style={{ ...q_styles.best_worst_category_text, color: Colors.secondary.DARK_MINT, }}>{bestScore}</Text>
                    </View>
                </Animated.View>

                <Animated.View style={{ ...q_styles.center, opacity: worstCategoryOpacity }}>
                    <Text style={{ fontSize: 20, marginBottom: 10, }}>Worst Category:</Text>

                    <View style={{ ...q_styles.best_worst_category_score_container, borderColor: Colors.secondary.RED }}>
                        <Text style={{ ...q_styles.best_worst_category_text, color: Colors.secondary.RED, }}>{worstScore}</Text>
                    </View>
                </Animated.View>
            </View>

            <Animated.View style={{flex: 1, opacity: buttonOpacity}}>
                <QuestionnaireCTAButton
                    title={"Take me to the app!"}
                    isVisible={true}
                    onPress={() => {
                        postFinishedQuestionnaire()
                        route.params?.setFinishedQuestionnaire(true)
                    }}
                />
            </Animated.View>
        </View>
    )
}