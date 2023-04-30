import React,{useEffect,useState} from 'react';
import {View, Text,Button,Image, Dimensions, TouchableOpacity} from 'react-native';
import { Colors } from '../../../styling/Colors';
import { API_URL } from '../../../config/Api';
import {SustainabilityScoreProfileView} from '../../../util/SustainabilityScoreProfileView';
import mapScoreCategory from '../../../calculations/mapScoreCategory';
import { getToken } from '../../../util/LoginManager';
import { q_styles } from './QuestionnaireStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

export default function FinishedScreen({navigation, route}) {
    //Final Calculations
    //Food Score is calculated in animaldiet and diet
    //Home score is calculated in household and bills
    //Transport Score is calculated in Public transport, mileage, vehicleType
    //Lifestyle score is calculated in recycling
    const transportScore = route.params?.transportScore;
    const foodScore = route.params?.foodScore;
    const homeScore = route.params?.homeScore;
    const awarenessScore = (transportScore+foodScore+homeScore)/3;

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

    const[bestScore,setBestScore] = useState("Transportation");
    const[worstScore,setWorstScore] = useState("Food");

    const calculateRanks=() =>{
        let maxVal = Math.max(transportScore,homeScore,foodScore)
        let minVal = Math.min(transportScore,homeScore,foodScore)
        if(transportScore==maxVal){
            setBestScore("Transportation")
        }else if (homeScore==maxVal){
            setBestScore("Home")
        }else if (awarenessScore==maxVal){
            setBestScore("Awareness")
        }else{
            setBestScore("Food")
        }

        if(foodScore==minVal){
            setWorstScore("Food")
        }else if (awarenessScore==minVal){
            setWorstScore("Awareness")
        }else if (homeScore ==minVal){
            setBestScore("Home")
        }else{
            setWorstScore("Transportation")
        }
    }

    useEffect(()=>{
        calculateRanks();
        updateSustainability();

        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"100%",
        backgroundColor: Colors.secondary.CELADON,
        }}>
        </View>
        ),
        })
    });

    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(216, 243, 220, 0.4)' }}>
            <View style={{ marginTop:"12%", alignItems: 'center', }}>
                <Text style={{fontSize:20,}}>...and you're done!</Text>
            </View>

            <View style={{ marginVertical:"5%", alignItems: 'center',  }}>
                <Text style={{ fontSize:24, }}>Here are your results:</Text>
            </View >

            <View
                style={{
                    alignItems:'center',
                    justifyContent:'center',
                    marginHorizontal: 24,
                    borderRadius: 16,
                    backgroundColor: Colors.secondary.ALMOND,
                }}
            >
                <View style={{
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <View style={{marginVertical: 24}}>
                        <Image
                            source = {scorePicture}
                            resizeMode='contain'
                            style={{
                                width: Dimensions.get('window').width * 0.35,
                                height: Dimensions.get('window').width * 0.35,
                            }}
                        />
                    </View>

                    <View>
                        <Text
                            style={{
                                fontSize:36,
                                fontWeight:"500",
                                textAlign:'center',
                            }}
                        >
                            {scoreCategory}
                        </Text>
                    </View>
                </View>

                <View style={{marginVertical: '10%', flexDirection:'row'}}>
                    <View style={{...q_styles.score_category_container, borderColor:Colors.categories.HOME }}>
                        <Ionicons name='home-outline' size={40} color={Colors.categories.HOME}/>
                        <Text style={{...q_styles.score_text, color:Colors.categories.HOME }}>
                            {homeScore*10}
                        </Text>
                    </View>

                    <View style={{marginHorizontal:6}}></View>

                    <View style={{...q_styles.score_category_container, borderColor:Colors.categories.TRANSPORTATION }}>
                        <Ionicons name='bicycle-outline' size={40} color={Colors.categories.TRANSPORTATION}/>
                        <Text style={{...q_styles.score_text, color:Colors.categories.TRANSPORTATION }}>
                            {transportScore*10}
                        </Text>
                    </View>

                    <View style={{marginHorizontal:6}}></View>

                    <View style={{...q_styles.score_category_container, borderColor:Colors.categories.DIET }}>
                        <Ionicons name='fast-food-outline' size={40} color={Colors.categories.DIET}/>
                        <Text style={{...q_styles.score_text, color:Colors.categories.DIET }}>
                            {foodScore*10}
                        </Text>
                    </View>
                </View>
            </View>

            <View
                style={{
                    marginTop: 24,
                    flexDirection:'row',
                    justifyContent:'space-evenly',
                }}
            >
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:20,marginBottom:10,}}>Best Category:</Text>

                    <View style={{marginBottom:40,}}>
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
                            <Text style={{ fontSize: 18, fontWeight:'500', textAlign: 'center', color: Colors.secondary.DARK_MINT, }}>{bestScore}</Text>
                        </View>
                    </View>
                </View>

                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:20,marginBottom:10,}}>Worst Category:</Text>

                    <View style={{marginBottom:40,}}>
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
                            <Text style={{ fontSize: 18, fontWeight:'500', textAlign: 'center', color: Colors.secondary.RED, }}>{worstScore}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{...q_styles.cta_container, position: 'absolute', bottom: 10, left: 0, right: 0}}>
                <TouchableOpacity
                    style={q_styles.cta_button}
                    onPress={() =>{
                        finishedQuestionnaire()
                        route.params?.setFinishedQuestionnaire(true)
                    }}
                >
                    <Text style={{...q_styles.cta_text, fontWeight: '600'}}>Take me to the app!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}