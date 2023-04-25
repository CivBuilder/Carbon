import React, {useState,useEffect} from 'react';
import {View, Text,Button,TextInput } from 'react-native';
import { Colors } from '../../../styling/Colors';

import {aveFoodConsumption} from '../../../calculations/food_calculations/averageFoodConsumption';
import calcBeef from '../../../calculations/food_calculations/calcBeef';
import calcCheese from '../../../calculations/food_calculations/calcCheese';
import calcPork from '../../../calculations/food_calculations/calcPork';
import calcPoultry from '../../../calculations/food_calculations/calcPoultry';
import mapScore from '../../../calculations/questionnaireMapScore';

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

    return (
    <>
    <View
    style={{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
    }}
    >
        <Text style={{
            fontSize:18,
            fontWeight:"400",
            marginBottom:40,
            paddingLeft:"12%",
            paddingRight:"6%",
        }}>
        (Optional) Approximately how many pounds per year of the following do you eat?
        </Text>
        <View style={{width:"60%"}}>

        <Text style={{
            fontSize:20,
            fontWeight:"400",
            marginBottom:5,
        }}> Beef </Text>

        <TextInput
        placeholder="(lbs) Ex: 50"
        style={{
        backgroundColor:Colors.secondary.NYANZA,
        height:32,
        marginBottom:12,
        }}
        keyboardType="decimal-pad"
        onChangeText={text=>{
            setlbsBeef(text? +text : 0);
            calculatePreciseFoodScore()
        }}
        />

        <Text style={{
              fontSize:20,
              fontWeight:"400",
              marginBottom:5,
        }}> Poultry </Text>

        <TextInput
        placeholder="(lbs) Ex: 35"
        keyboardType="decimal-pad"
        style={{
        backgroundColor:Colors.secondary.NYANZA,
        height:32,
        marginBottom:12,
        }}
        onChangeText={text=>{
            setlbsPoultry(text? +text : 0);
            calculatePreciseFoodScore()
        }}/>

        <Text style={{
              fontSize:20,
              fontWeight:"400",
              marginBottom:5,
        }}> Pork </Text>

        <TextInput
        placeholder="(lbs) Ex: 47"
        keyboardType="decimal-pad"
        style={{
        backgroundColor:Colors.secondary.NYANZA,
        height:32,
        marginBottom:12,
        }}
        onChangeText={text=>{
        setlbsPork(text? +text : 0);
        calculatePreciseFoodScore()
        }}/>

        <Text style={{
              fontSize:20,
              fontWeight:"400",
              marginBottom:5,
        }}> Cheese </Text>

        <TextInput
        placeholder="(lbs) Ex: 30"
        keyboardType="decimal-pad"
        style={{
        backgroundColor:Colors.secondary.NYANZA,
        height:32,
        marginBottom:12,
        }}
        onChangeText={text=>{
        setlbsCheese(text? +text : 0);
        calculatePreciseFoodScore()
        }}/>
        </View>
        </View>
        <View style={{
        justifyContent:'center',
        flexDirection:"row",
        }}>
        <View style={{width:'50%'}}>
        <Button
        title="Previous Question"
        color={Colors.primary.MINT}
        onPress={() =>
        navigation.goBack()
        }
        />
        </View>
        <View style={{width:'50%'}}>
        <Button
        title="Next Question"
        color={Colors.primary.MINT}
        onPress={() =>
        navigation.navigate('q2',{
        foodScore:foodScore
        })
        }
        />
        </View>
        </View>
        </>
    )
}