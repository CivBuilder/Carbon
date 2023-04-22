import {View, Text,Button} from 'react-native';
import {useEffect} from 'react';
import { Colors } from '../../../styling/Colors';

/*
Start Screen -> Leads to the first question for questionnaire.js
TODO: Add UI to align the aesthetic with the rest of the app
*/
export default function StartScreen({navigation}){
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
            <View style={{
            position: "absolute",
            top:0,
            height:40,
            borderRadius: 6,
            width:"0%",
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
            }}
        >
        <Text>Tell us about yourself</Text>
        </View>
        <View style={{
            flex: 0,
        }}>
        <Button
        title="Get Started"
        color={Colors.primary.MINT}
        onPress={() =>
            navigation.navigate('q1')
        }
        />
        </View>
        </>
    )
}