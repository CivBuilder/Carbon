import React, { useState, useEffect} from 'react';
import { StatusBar, Image, TouchableOpacity, SafeAreaView, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

import { Colors } from '../../../styling/Colors';
import { IconNames } from './IconNames';
import { API_URL } from '../../../config/Api';

import { ScreenNames } from './ScreenNames';

import { HomeScreen, ProgressScreen, ForumScreen, RankingScreen, SettingsScreen, QuizScreen, BrowserScreen, GoalScreen, LoginScreen, SignUpScreen, FoodScreen, TransportationScreen, RecyclingScreen, RecordEmissionScreen, PredictScreen} from '../../screens';
import StartScreen from '../Questionnaire/Start';
import DietScreen from '../Questionnaire/QuestionDiet';
import HouseholdScreen from '../Questionnaire/QuestionHousehold';
import BillScreen from '../Questionnaire/QuestionBills';
import TransportScreen from '../Questionnaire/QuestionTransport';
import VehicleTypeScreen from '../Questionnaire/QuestionVehicleType';
import MileageScreen from '../Questionnaire/QuestionMileage';
import PublicTransportScreen from '../Questionnaire/QuestionPublicTransport';
import FinishedScreen from '../Questionnaire/Finished';
import RecycleScreen from '../Questionnaire/QuestionRecycling';
import RecycleAmountScreen from '../Questionnaire/QuestionRecycleAmount';
import AnimalDietScreen from '../Questionnaire/QuestionAnimalDiet';

import { getAuthHeader, getToken, setRenderCallback } from '../../../util/LoginManager';
import { PopUpMenu } from '../../../components/PopUpMenu';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/*
    NOTE ON STACK NAVIGATION:
    To be able to add stack navigation for each main screens, the stack navigation
    has to be set within the component of the bottom tab navigation.
    In this case, it's easier to keep the stack navigation on its own function for readability.

    If you need to add more screens to each main screen, just add
        <Stack.Screen name={"NAME_OF_SCREEN"} component={"THE_SCREEN_FUNCTION_IMPORTED"} />
    at the bottom.

    Also it's best to add the screen function inside the index.js so it reduces the lines needed to import screens.
    Just add the function name on the import on top.
*/

const QuestionnaireStack = (props) => {
    return(
    <Stack.Navigator
    initialRouteName="GetStarted"
    >
        <Stack.Screen name = "GetStarted" component={StartScreen}/>
        <Stack.Screen name="q1" component={DietScreen} />
        <Stack.Screen name="q1a" component={AnimalDietScreen}/>
        <Stack.Screen name="q2" component={HouseholdScreen} />
        <Stack.Screen name="q2a" component={BillScreen}/>
        <Stack.Screen name="q4" component={TransportScreen}/>
        <Stack.Screen name="q4a" component={VehicleTypeScreen}/>
        <Stack.Screen name="q4b" component={MileageScreen}/>
        <Stack.Screen name="q4c" component={PublicTransportScreen}/>
        <Stack.Screen name="q5" component={RecycleScreen}/>
        <Stack.Screen name="q5a" component={RecycleAmountScreen}/>
        <Stack.Screen name="finished" component={FinishedScreen}
            initialParams={{
                setFinishedQuestionnaire: props.setFinishedQuestionnaire
            }}
        />
    </Stack.Navigator>
    )
}


// Home screen stack navigation & header
const HomeStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={' '}
                component={HomeScreen}
                options={{
                    headerShown: true,
                    // headerStyle: {
                    //     height: Platform.OS === 'ios' ? 48 : 72,
                    // },
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <Image
                            source={require('../../../assets/Carbon_Logo.png')}
                            style={{
                                //TODO: 1080x356 is the current dimension. Find a better way to scale this properly.
                                width: 1080 / 12,
                                height: 356 / 12,
                            }}
                        />
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.SETTINGS)}>
                            <Ionicons
                                name={IconNames.SETTINGS}
                                size={24}
                                color={Colors.primary.RAISIN_BLACK}
                                style={{ marginRight: 16 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen name={ScreenNames.SETTINGS} component={SettingsScreen} />
            <Stack.Screen name={ScreenNames.RECORD_EMISSION} component={RecordEmissionScreen} />
        </Stack.Navigator>
    );
};

// Progress screen stack navigation & header
const ProgressStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'Your Progress'}
                component={ProgressScreen}
                options={{
                    headerShown: true,
                    // headerStyle: {
                    //     height: Platform.OS === 'ios' ? 48 : 72,
                    // },
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <PopUpMenu navigation={navigation}/>
                    ),
                }}
            />
            <Stack.Screen name={ScreenNames.PREDICT} component={PredictScreen} />
            <Stack.Screen name={ScreenNames.ADD_GOAL} component={GoalScreen} />
            <Stack.Screen name={ScreenNames.RECORD_EMISSION} component={RecordEmissionScreen} />

            <Stack.Screen name={ScreenNames.FOOD} component={FoodScreen} />
            <Stack.Screen name={ScreenNames.TRANSPORTATION} component={TransportationScreen} />
            <Stack.Screen name={ScreenNames.RECYCLING} component={RecyclingScreen} />
        </Stack.Navigator>
    );
};

// Forum screen stack navigation & header
const ForumStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'Education'}
                component={ForumScreen}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name={'Quiz'}
                component={QuizScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={'Browser'}
                component={BrowserScreen}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
};

// Ranking screen stack navigation & header
const RankingStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={' '}
                component={RankingScreen}
                options={{
                    headerShown: false, // Set to false for now until we need to implement headers for this screen
                }}
            />
        </Stack.Navigator>
    );
};


// Login screen stack navigation & header
const LoginStack = (props,{navigation}) => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={ScreenNames.LOGIN}
                component={LoginScreen}
                options={{
                    headerShown: false, // Set to false for now until we need to implement headers for this screen
                }}
                initialParams={{
                    setIsSignedIn:props.confirmSignup
                }}
            />
            <Stack.Screen
                name={ScreenNames.SIGNUP}
                component={SignUpScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ScreenNames.QUESTIONNAIRE}
                component={QuestionnaireStack}
                options={{
                    headerShown:false,
                }}
                initialParams={{
                    setIsSignedIn:props.confirmSignup
                }}
            />
        </Stack.Navigator>
    );
};

export default function MainContainer({navigation}){
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [finishedQuestionnaire, setFinishedQuestionnaire] = useState(false);

    // In order to rerender the maincontainer on signin, we gotta callback and update the state
    setRenderCallback(setIsSignedIn);

    useEffect(() => {
        async function checkSignin() {
            setIsSignedIn(await getToken());
        }

        checkSignin();
    }, []);

    useEffect(() => {
        async function checkQuestionnaire() {
            try {
                const url = API_URL + 'user/check-questionnaire/';
                const response = await fetch(url, await getAuthHeader());
                // console.log("checkQuestionnaire (response): " + JSON.stringify(response));
                const data = await response.json();
                console.log("checkQuestionnaire (data): " + JSON.stringify(data));
                setFinishedQuestionnaire(data);
            } catch (error) {
                console.error('Error while checking questionnaire:', error);
            }
        }
        if (isSignedIn) {
            checkQuestionnaire();
        }
    }, [isSignedIn]);

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent={true}/>
            <NavigationContainer>
            {isSignedIn ? (
                finishedQuestionnaire ? (
                    <>
                        <Tab.Navigator //Sets the default screen for the bottom nav bar (in this case, Home Screen)
                        initialRouteName={ScreenNames.HOME}
                        screenOptions={{
                            headerShown: false, // Hides the default header
                            tabBarLabelStyle: { display: 'none' }, // Hides label text
                            tabBarActiveTintColor: Colors.primary.MINT,
                            tabBarHideOnKeyboard: true,
                        }}
                        >
                            <Tab.Screen
                                name={ScreenNames.HOME}
                                component={HomeStack}
                                options={{
                                    tabBarIcon: ({ color, size }) => (
                                        <Ionicons name={IconNames.HOME} size={size} color={color} />
                                    ),
                                }}
                            />
                            <Tab.Screen
                                name={ScreenNames.PROGRESS}
                                component={ProgressStack}
                                options={screenOptions}
                            />
                            <Tab.Screen
                                name={ScreenNames.FORUM}
                                component={ForumStack}
                                options={screenOptions}
                            />
                            <Tab.Screen
                                name={ScreenNames.RANKING}
                                component={RankingStack}
                                options={screenOptions}
                            />
                        </Tab.Navigator>
                    </>
                ) : (
                    <QuestionnaireStack setFinishedQuestionnaire={setFinishedQuestionnaire}/>
                )
            ) : (
                <LoginStack/>
            )}
            </NavigationContainer>
        </SafeAreaView>
    );
};

const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
        let iconName;

        switch (route.name) {
        case ScreenNames.HOME:
            iconName = IconNames.HOME;
            break;
        case ScreenNames.PROGRESS:
            iconName = IconNames.PROGRESS;
            break;
        case ScreenNames.FORUM:
            iconName = IconNames.FORUM;
            break;
        case ScreenNames.RANKING:
            iconName = IconNames.RANKING;
            break;
        default:
            break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
    },
});