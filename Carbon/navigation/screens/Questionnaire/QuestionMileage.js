import React, {useState,useEffect} from 'react';
import {View, Text,Button,TextInput } from 'react-native';
import { Colors } from '../../../styling/Colors';
/*
Mileage Screen

TODO: Improve UI
TODO: Improve transferring of data between pages
*/

export default function MileageScreen({navigation,route}) {
    //Values from previous pages
    const dietScore = route.params?.dietScore;
    const homePowerScore = route.params?.homePowerScore;
    const annualPower = route.params?.annualPower;
    const transportScore= route.params?.transportScore;

    //Value to calculate & transfer at the "finished" screen
    const [miles,setMiles] = useState(0);

    //Updating progress bar (a.k.a the header)
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"83%",
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
            fontSize:20,
            fontWeight:"400",
            marginBottom:40,
            paddingLeft:"6%",
            paddingRight:"6%",
        }}>
        (Optional) Fuel efficiency makes a big impact on your
         Carbon footprint. What is the fuel efficiency on your vehicle?
        </Text>
        <View>
        <Text style={{
            fontSize: 20,
            fontWeight: "400",
            marginBottom: 5,
        }}> Miles Per Gallon (MPG) </Text>
        <TextInput
        placeholder="Ex: 33"
        style={{
        backgroundColor:Colors.secondary.NYANZA,
        height: 32,
        }}
        keyboardType="decimal-pad"
        onChangeText={text=>setMiles(text)}
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
                navigation.navigate('finished',{
                    transportScore:transportScore,
                    dietScore:dietScore,
                    homePowerScore:homePowerScore,
                    annualPower:annualPower,
                    miles:miles,
                    })
            }
            />
            </View>
            </View>
            </>
        )
}