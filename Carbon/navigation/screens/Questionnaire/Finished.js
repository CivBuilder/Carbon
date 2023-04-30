import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, Dimensions, Animated } from 'react-native';
import { Colors } from '../../../styling/Colors';
import { API_URL } from '../../../config/Api';
import { SustainabilityScoreProfileView } from '../../../util/SustainabilityScoreProfileView';
import mapScoreCategory from '../../../calculations/mapScoreCategory';
import { getToken } from '../../../util/UserManagement';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QuestionnaireCTAButton } from './QuestionnaireCTAButton';

/*
Finished Screen
*/

const finishedQuestionnaire = async () => {
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
            console.log("Finished Questionnaire");
        } else {
            console.log("Failed to finish questionnaire");
        }
    } catch (error) {
        console.error(error);
    }
};

export default function FinishedScreen({ navigation, route }) {
    //Final Calculations
    //Food Score is calculated in animaldiet and diet
    //Home score is calculated in household and bills
    //Transport Score is calculated in Public transport, mileage, vehicleType
    //Lifestyle score is calculated in recycling
    const transportScore = route.params?.transportScore;
    const foodScore = route.params?.foodScore;
    const homeScore = route.params?.homeScore;
    const awarenessScore = (transportScore + foodScore + homeScore) / 3;

    const questionanaireBody = {
        'transport_score': transportScore,
        'lifestyle_score': 50,
        'food_score': foodScore,
        'home_score': foodScore,
        'awareness_score': awarenessScore,
    }

    const updateSustainability = async () => {
        try {
            console.log("Updating sustainability score");
            const response = await fetch(API_URL + 'user/questionnaire', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'secrettoken': await getToken()
                },
                body: JSON.stringify(questionanaireBody)
            });

            if (response.status === 200) {
                console.log("Updated sustainability score");
            } else {
                console.log("Failed to update sustainability score");
                console.log(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    const scoreCategory = SustainabilityScoreProfileView[mapScoreCategory(awarenessScore)].title;
    const scorePicture = SustainabilityScoreProfileView[mapScoreCategory(awarenessScore)].picture;

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
    });

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
        <View style={{flex: 1, backgroundColor: 'rgba(216, 243, 220, 0.4)'}}>
            <View style={{ marginTop: 48, marginBottom: 6, alignItems: 'center', }}>
                <Text style={{ fontSize: 20, }}>...and you're done!</Text>
            </View>

            <View style={{ marginBottom: 12, alignItems: 'center', }}>
                <Text style={{ fontSize: 24, }}>Here are your results:</Text>
            </View >

            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 24,
                    borderRadius: 16,
                    backgroundColor: Colors.secondary.ALMOND,
                }}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{ marginVertical: 24 }}>
                        <Animated.Image
                            source={scorePicture}
                            resizeMode='contain'
                            style={{
                                width: Dimensions.get('window').width * 0.35,
                                height: Dimensions.get('window').width * 0.35,
                                opacity: rankPictureOpacity,
                                transform: [{ scale: rankPictureScale }],
                            }}
                        />
                    </View>

                    <View style={{ marginBottom: 24 }}>
                        <Animated.Text
                            style={{
                                fontSize: 36,
                                fontWeight: "500",
                                textAlign: 'center',
                                opacity: rankTitleOpacity,
                            }}
                        >
                            {scoreCategory}
                        </Animated.Text>
                    </View>
                </View>

                <View style={{ marginBottom: 24, flexDirection: 'row' }}>
                    <Animated.View style={{ ...q_styles.score_category_container, borderColor: Colors.categories.HOME, opacity: homeScoreOpacity }}>
                        <Ionicons name='home-outline' size={36} color={Colors.categories.HOME} />
                        <Text style={{ ...q_styles.score_text, color: Colors.categories.HOME }}>
                            {homeScore * 10}
                        </Text>
                    </Animated.View>

                    <View style={{ marginHorizontal: 8 }}/>

                    <Animated.View style={{ ...q_styles.score_category_container, borderColor: Colors.categories.TRANSPORTATION, opacity: transportScoreOpacity }}>
                        <Ionicons name='bicycle-outline' size={36} color={Colors.categories.TRANSPORTATION} />
                        <Text style={{ ...q_styles.score_text, color: Colors.categories.TRANSPORTATION }}>
                            {transportScore * 10}
                        </Text>
                    </Animated.View>

                    <View style={{ marginHorizontal: 8 }}/>

                    <Animated.View style={{ ...q_styles.score_category_container, borderColor: Colors.categories.DIET, opacity: foodScoreOpacity }}>
                        <Ionicons name='fast-food-outline' size={36} color={Colors.categories.DIET} />
                        <Text style={{ ...q_styles.score_text, color: Colors.categories.DIET }}>
                            {foodScore * 10}
                        </Text>
                    </Animated.View>
                </View>
            </View>

            <View
                style={{
                    marginTop: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                }}
            >
                <Animated.View style={{ justifyContent: 'center', alignItems: 'center', opacity: bestCategoryOpacity }}>
                    <Text style={{ fontSize: 20, marginBottom: 10, }}>Best Category:</Text>

                    <View
                        style={{
                            backgroundColor: 'white',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: Colors.secondary.DARK_MINT,
                            width: 170,
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: '500', textAlign: 'center', color: Colors.secondary.DARK_MINT, }}>{bestScore}</Text>
                    </View>
                </Animated.View>

                <Animated.View style={{ justifyContent: 'center', alignItems: 'center', opacity: worstCategoryOpacity }}>
                    <Text style={{ fontSize: 20, marginBottom: 10, }}>Worst Category:</Text>

                    <View
                        style={{
                            backgroundColor: 'white',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: Colors.secondary.RED,
                            width: 170,
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: '500', textAlign: 'center', color: Colors.secondary.RED, }}>{worstScore}</Text>
                    </View>
                </Animated.View>
            </View>

            <Animated.View style={{flex: 1, opacity: buttonOpacity}}>
                <QuestionnaireCTAButton
                    title={"Take me to the app!"}
                    isVisible={true}
                    onPress={() => {
                        finishedQuestionnaire()
                        route.params?.setFinishedQuestionnaire(true)
                    }}
                />
            </Animated.View>
        </View>
    )
}