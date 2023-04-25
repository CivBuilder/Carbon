import React, {useState,useEffect} from 'react';
import {View, Text,Button,TextInput } from 'react-native';
import { Colors } from '../../../styling/Colors';
/*
Bills Screen

TODO: Make better calculation (Based on research)
TODO: Improve UI
TODO: Improve transfer of points between pages
*/

export default function BillScreen({navigation,route}) {

    //Transfer Scores from previous pages
    const dietScore = route.params?.dietScore;
    const powerScore = route.params?.powerSourceScore;

    //Bill values (not calculated until the end)
    const [bill,setBill] = useState(0);
    const [rate,setRate] = useState(0);

    //Updating progress bar (a.k.a the header)
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"28%",
        backgroundColor: Colors.secondary.CELADON,
        }}>
        </View>
        ),
        })
    });

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
        (Optional) Heating and Cooling in a household
        accounts for 43% of energy usage in U.S. homes. Provide
        your average electricity bill over the past year along with
        your electricity rates.
        </Text>
        <View>
        <Text style={{
            fontSize:20,
            fontWeight:"400",
            marginBottom:5,
        }}> Electricity Bill </Text>
        <TextInput
        placeholder="(Dollar Amount) Ex: 99.99"
        style={{
        backgroundColor:Colors.secondary.NYANZA,
        height:32,
        marginBottom:12,
        }}
        keyboardType="decimal-pad"
        onChangeText={text=>setBill(text)}
        />

        <Text style={{
              fontSize:20,
              fontWeight:"400",
              marginBottom:5,
        }}> Power Rates </Text>
        <TextInput
        placeholder="(Dollars per Killowatt-Hour) Ex: .98"
        keyboardType="decimal-pad"
        style={{
        backgroundColor:Colors.secondary.NYANZA,
        height:32,
        marginBottom:12,
        }}
        onChangeText={text=>
        setRate(text)}
        />
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
        navigation.navigate('q4',{
        dietScore: dietScore,
        homePowerScore:powerScore,
        annualPower:bill/rate,
        })
        }
        />
        </View>
        </View>
        </>
    )
}