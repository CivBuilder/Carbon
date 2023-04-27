import React,{useEffect,useState} from 'react';
import {View, Text,Button,Image} from 'react-native';
import { Colors } from '../../../styling/Colors';
import { API_URL } from '../../../config/Api';
import {SustainabilityScoreProfileView} from '../../../util/SustainabilityScoreProfileView';
import mapScoreCategory from '../../../calculations/mapScoreCategory';
import { getToken } from '../../../util/LoginManager';

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
        let maxVal = Math.max(transportScore,homeScore,awarenessScore,foodScore)
        let minVal = Math.min(transportScore,homeScore,awarenessScore,foodScore)
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
        }else if (homeScore==minVal){
            setWorstScore("Home")
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
            <>
            <View style={{
                marginTop:"15%",
                alignItems: 'center',
            }}>
            <Text style={{
                fontSize:30,
            }}>
            ...and you're done!
            </Text>
            </View>
            <View style={{
                marginTop:"10%",
                alignItems: 'center',
            }}>
            <Text style={{
                fontSize:16,
            }}>
            Here are your results:
            </Text>
            </View >
            <View style={{
                alignItems:'center',
            }}>
            <Text style={{
                fontSize:30,
                fontWeight:"900",
            }}>
            {scoreCategory}
            </Text>
            </View>
            <View style={{
                flex:1,
                alignItems: 'center',
                width: "100%",
            }}>
            <Image
                source = {scorePicture}
                resizeMode = "contain"
                style={{
                    height:"80%",
                }}/>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent:'center',
                    width:"100%"
                }}
            >
            <Text style={{fontSize:20,marginBottom:10,}}
            >
            Best Category:
            </Text>
            <View style={{marginBottom:40,width:"80%",}}>
            <Button
            title={bestScore}
            color={Colors.secondary.NON_PHOTO_BLUE}
            />
            </View>
            <Text style={{fontSize:20,marginBottom:10,}}
            >
            Worst Category:
            </Text>
            <View style={{marginBottom:40,width:"80%"}}>
            <Button
            title={worstScore}
            color={Colors.secondary.RED}
            />
            </View>
            </View>

            <View style={{
                flex:0,
                justifyContent:'center',
            }}>
            <Button
            title="Continue to Carbon!"
            color={Colors.primary.MINT}
            onPress={() =>{
                finishedQuestionnaire()
                route.params?.setFinishedQuestionnaire(true)
            }}
            />
            </View>
            </>
        )
}