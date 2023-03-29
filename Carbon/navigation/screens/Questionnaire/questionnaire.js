import React, {useState,useEffect} from 'react';
import {View, Text,Switch,Button,TextInput } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Colors } from '../../../colors/Colors';
const Stack = createNativeStackNavigator();

function Start ({navigation}){
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

function Diet({navigation}) {
    return (
            <>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            <Text>What is your diet?</Text>
            </View>
            <View style={{
                justifyContent:'center',
                flexDirection:"row",
            }}>
            <View style={{width:'50%'}}>
            <Button
            title="Return to Start"
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
                navigation.navigate('q2')
            }
            />
            </View>
            </View>
            </>
        )
}

function HouseholdPower({navigation,route}) {

    return (
            <>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            <Text>How is your household powered?(Check All the Apply)</Text>
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
                navigation.navigate('q3')
            }
            />
            </View>
            </View>
            </>
        )
}

function Bills({navigation,route}) {

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
        navigation.navigate('q4')
        }
        />
        </View>
        </View>
        </>
    )
}

function ModeOfTransport({navigation, route}) {
    const dietScore = route.params?.dietScore;
    const homePowerScore = route.params?.homePowerScore;
    const annualPower = route.params?.annualPower;
    return (
            <>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            <Text>
            In 2020, passenger vehicles accounted for 38% of greenhouse
            gases emitted by the transportation industry. Do you own or drive
            a passenger vehicle?
            </Text>
            <View style={{
                width:"100%",
            }}
            >
            <Button
                title="Yes"
                onPress={()=>{
                    navigation.navigate("q4a");
                }}
                color={Colors.secondary.LIGHT_MINT}
            />
            <Button
                title ="No"
                onPress={()=>{
                    navigation.navigate("q4c");
                }}
                color={Colors.secondary.LIGHT_MINT}
            />
            </View>
            </View>
            <View style={{
                justifyContent:'center',
            }}>
            <Button
            title="Previous Question"
            color={Colors.primary.MINT}
            onPress={() =>
                navigation.goBack()
            }
            />
            </View>
            </>
        )
}

function VehicleType({navigation,route}) {

    return (
            <>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            <Text>What type of vehicle do you own?</Text>
            </View>
            <View style={{
                justifyContent:'center',
                flexDirection:"row",
            }}>
            <View style={{width:'50%'}}>
            <Button
            title="Previous"
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
                navigation.navigate('q4b')
            }
            />
            </View>
            </View>
            </>
        )
}
function Mileage({navigation,route}) {

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
        (Optional) What is the mileage on your vehicle?
        </Text>
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
                navigation.navigate('finished')
            }
            />
            </View>
            </View>
            </>
        )
}
function PublicTransportType({navigation,route}) {

    return (
            <>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            <Text>What form of transportation do you use?(Check All the Apply)</Text>
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
                navigation.navigate('finished')
            }
            />
            </View>
            </View>
            </>
        )
}

function FinishedScreen({navigation,route}) {
    const dietScore = route.params?.dietScore;
    const homePowerScore = route.params?.homePowerScore;
    const annualPower = route.params?.annualPower;
    const transportScore=route.params?.transportScore;
    const miles = (route.params?.miles) ? route.params?.miles : 0;

    const transScore = (miles!=0) ? transportScore*miles/200000: transportScore;
    const powerScore = annualPower/10632;
    const foodScore = dietScore;
    const homeScore = homePowerScore;
    const awarenessScore= (miles!=0) ? transportScore*miles/200000: transportScore

    return (
            <>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            <Text>
            Final Data:
            </Text>
            <Text>Transport Score: {transScore}</Text>
            <Text>Lifestyle Score: {powerScore}</Text>
            <Text>Food Score: {dietScore}</Text>
            <Text>Home Score: {homePowerScore}</Text>
            <Text>Awareness Score: {transScore}</Text>
            </View>
            <View style={{
                flex:0,
                justifyContent:'center',
            }}>
            <Button
            title="View your rank!"
            color={Colors.primary.MINT}
            onPress={() =>
                navigation.navigate('GetStarted')
            }
            />
            </View>
            </>
        )
}
export default function Questionnaire() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="GetStarted"
            screenOptions={{
                headerShown:false
            }}>
                <Stack.Screen name = "GetStarted" component={Start}/>
                <Stack.Screen name="q1" component={Diet}/>
                <Stack.Screen name="q2" component={HouseholdPower}/>
                <Stack.Screen name="q3" component={Bills}/>
                <Stack.Screen name="q4" component={ModeOfTransport}/>
                <Stack.Screen name="q4a" component={VehicleType}/>
                <Stack.Screen name="q4b" component={Mileage}/>
                <Stack.Screen name="q4c" component={PublicTransportType}/>
                <Stack.Screen name="finished" component={FinishedScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}