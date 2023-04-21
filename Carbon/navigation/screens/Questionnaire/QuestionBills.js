import React, {useState} from 'react';
import {View, Text,Button,TextInput } from 'react-native';
import { Colors } from '../../../colors/Colors';

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
        <Text>
        (Optional) Heating and Cooling in a household
        accounts for 43% of energy usage in U.S. homes. Provide
        your average electricity bill over the past year along with
        your electricity rates.
        </Text>
        <View>
        <Text> Bills (In Dollars) </Text>
        <TextInput
        placeholder="Ex: 99.99"
        style={{
        backgroundColor:Colors.secondary.NYANZA,
        }}
        keyboardType="decimal-pad"
        onChangeText={text=>setBill(text)}
        />

        <Text> Rates (In Dollars /kWh) </Text>
        <TextInput
        placeholder="Ex: .98"
        keyboardType="decimal-pad"
        style={{
        backgroundColor:Colors.secondary.NYANZA,
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