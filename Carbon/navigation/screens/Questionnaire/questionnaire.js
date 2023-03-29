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
    const maxPoints = 10.0;
    const [isDisabled,setIsDisabled] = useState(false);
    const [pointPercent,setPointPercent] = useState(0);
    const [buttonIndex, setButtonIndex] = useState(-1);
    const changeIndex=(index)=>{
        setButtonIndex(previousState=>index);
    }
    const disableButton=(points)=> {
            setIsDisabled(previousState=>true);
            setPointPercent(previousState=>points/maxPoints);
    }

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
            <View style={{
                width:"100%",
            }}
            >
            <Button
                title="No Restrictions"
                onPress={()=>{
                disableButton(3);
                setButtonIndex(0);
                }}
                color={buttonIndex==0 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title ="Pescatarian"
                onPress={()=>{
                disableButton(4);
                setButtonIndex(1);
                }}
                color={buttonIndex==1 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title="Vegetarian"
                onPress={()=>{
                disableButton(6);
                setButtonIndex(2);
                }}
                color={buttonIndex==2 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title ="Vegan/Plant-Based"
                onPress={()=>{
                disableButton(10);
                setButtonIndex(3);
                }}
                color={buttonIndex==3 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Text>{pointPercent}</Text>
            </View>
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
                navigation.navigate('q2',{dietScore:pointPercent})
            }
            disabled ={isDisabled ? false: true}
            />
            </View>
            </View>
            </>
        )
}

function HouseholdPower({navigation,route}) {
    const dietScore = route.params?.dietScore;
    const maxPoints = 10.0;

    const [isDisabled,setIsDisabled] = useState(false);
    const [pointPercent,setPointPercent] = useState(0);

    const [buttonOn0, setButtonOn0] = useState(false);
    const [buttonOn1, setButtonOn1] =  useState(false);
    const [buttonOn2, setButtonOn2] = useState(false);
    const [buttonOn3, setButtonOn3] = useState(false);

    const calculatePoints=() =>{
        let numerator = buttonOn0*1 + buttonOn1*2 + buttonOn2*3 + buttonOn3*10;
        let denominator = (buttonOn0+buttonOn1+buttonOn2+buttonOn3)*maxPoints;
        setPointPercent(previousState=>numerator/denominator);
    }
    //Ensure that points is synchronous
    useEffect(()=>{
        calculatePoints();
    });

    const toggleButton = (index) => {
        const flip = false;
        //Toggle specific button depending on input
        switch(index){
            case 0:
                setButtonOn0(!buttonOn0);
                break;
            case 1:
                setButtonOn1(!buttonOn1);
                break;
            case 2:
                setButtonOn2(!buttonOn2);
                break;
            case 3:
                setButtonOn3(!buttonOn3);
                break;
            default:
                break;
        }
    }

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
            <View style={{
                width:"100%",
            }}
            >
            <Button
                title="Coal"
                onPress={()=>{
                    toggleButton(0);
                }}
                color={buttonOn0 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title ="Petroleum"
                onPress={()=>{
                    toggleButton(1);
                }}
                color={buttonOn1 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title="Natural Gas"
                onPress={()=>{
                    toggleButton(2);
                }}
                color={buttonOn2 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title ="Renewable Energy (Solar, Wind, etc...)"
                onPress={()=>{
                    toggleButton(3);
                }}
                color={buttonOn3 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Text>{pointPercent}</Text>
            <Text>{dietScore}</Text>
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
                navigation.navigate('q3',{dietScore:dietScore,
                powerSourceScore:pointPercent,
                })
            }
            disabled ={(buttonOn0||buttonOn1||buttonOn2||buttonOn3) ? false: true}
            />
            </View>
            </View>
            </>
        )
}

function Bills({navigation,route}) {
    const dietScore = route.params?.dietScore;
    const powerScore = route.params?.powerSourceScore;

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
        <Text>{rate}</Text>
        <Text>{bill}</Text>
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
                    navigation.navigate("q4a",{
                    dietScore:dietScore,
                    homePowerScore:homePowerScore,
                    annualPower:annualPower,
                    });
                }}
                color={Colors.secondary.LIGHT_MINT}
            />
            <Button
                title ="No"
                onPress={()=>{
                    navigation.navigate("q4c",{
                    dietScore:dietScore,
                    homePowerScore:homePowerScore,
                    annualPower:annualPower,
                    });
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
    const dietScore = route.params?.dietScore;
    const homePowerScore = route.params?.homePowerScore;
    const annualPower = route.params?.annualPower;

    const maxPoints = 10.0;
    const [isDisabled,setIsDisabled] = useState(false);
    const [pointPercent,setPointPercent] = useState(0);
    const [buttonIndex, setButtonIndex] = useState(-1);

    const changeIndex=(index)=>{
        setButtonIndex(previousState=>index);
    }
    const disableButton=(points)=> {
            setIsDisabled(previousState=>true);
            setPointPercent(previousState=>points/maxPoints);
    }

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
            <View style={{
                width:"100%",
            }}
            >
            <Button
                title="Gas-Based"
                onPress={()=>{
                disableButton(3);
                setButtonIndex(0);
                }}
                color={buttonIndex==0 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title ="Diesel-Based"
                onPress={()=>{
                disableButton(4);
                setButtonIndex(1);
                }}
                color={buttonIndex==1 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title="Electric"
                onPress={()=>{
                disableButton(8);
                setButtonIndex(2);
                }}
                color={buttonIndex==2 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Text>{pointPercent}</Text>
            </View>
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
                navigation.navigate('q4b',{
                    transportScore:pointPercent,
                    dietScore:dietScore,
                    homePowerScore:homePowerScore,
                    annualPower:annualPower,
                    })
            }
            disabled ={isDisabled ? false: true}
            />
            </View>
            </View>
            </>
        )
}
function Mileage({navigation,route}) {
    const dietScore = route.params?.dietScore;
    const homePowerScore = route.params?.homePowerScore;
    const annualPower = route.params?.annualPower;
    const transportScore= route.params?.transportScore;

    const [miles,setMiles] = useState(0);

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
        <Text>{miles}</Text>
        <View>
        <Text> Miles </Text>
        <TextInput
        placeholder="Ex: 208309"
        style={{
        backgroundColor:Colors.secondary.NYANZA,
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
function PublicTransportType({navigation,route}) {
    const dietScore = route.params?.dietScore;
    const homePowerScore = route.params?.homePowerScore;
    const annualPower = route.params?.annualPower;

    const maxPoints = 10.0;

    const [isDisabled,setIsDisabled] = useState(false);
    const [pointPercent,setPointPercent] = useState(0);

    const [buttonOn0, setButtonOn0] = useState(false);
    const [buttonOn1, setButtonOn1] =  useState(false);

    const calculatePoints=() =>{
        let numerator = buttonOn0*6 + buttonOn1*10;
        let denominator = (buttonOn0+buttonOn1)*maxPoints;
        setPointPercent(previousState=>numerator/denominator);
    }
    //Ensure that points is synchronous
    useEffect(()=>{
        calculatePoints();
    });

    const toggleButton = (index) => {
        const flip = false;
        //Toggle specific button depending on input
        switch(index){
            case 0:
                setButtonOn0(!buttonOn0);
                break;
            case 1:
                setButtonOn1(!buttonOn1);
                break;
            default:
                break;
        }
    }

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
            <View style={{
                width:"100%",
            }}
            >
            <Button
                title="Public Transportation (Bus,Metro,etc...)"
                onPress={()=>{
                    toggleButton(0);
                }}
                color={buttonOn0 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title ="Other (Bicycle,walking,etc...)"
                onPress={()=>{
                    toggleButton(1);
                }}
                color={buttonOn1 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Text>{pointPercent}</Text>
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
                    dietScore:dietScore,
                    homePowerScore:homePowerScore,
                    annualPower:annualPower,
                    transportScore:pointPercent,
                    })
            }
            disabled ={(buttonOn0||buttonOn1) ? false: true}
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