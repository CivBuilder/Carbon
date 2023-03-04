import * as React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../colors/Colors';

//Screens
import HomeScreen from './screens/Home/HomeScreen.js';
import ProgressScreen from './screens/ProgressScreen';
// import SettingsScreen from './screens/SettingsScreen';
import ForumScreen from './screens/ForumScreen';
import RankingScreen from './screens/RankingScreen';

// Screen Names (this shows up at the bottom navbar)
const homeName = 'Home';
const progressName = 'Progress';
const settingsName = 'Settings';
const forumName = 'Forum';
const rankingName = 'Ranking';

// Create the bottom navbar
const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        // Shows how the icons will appear
                        // without '-outline' is highlighted meaning it's the current page
                        // with '-outline' means it's not highlighted meaning it's not current page
                        if(rn === homeName){
                            iconName = focused ? 'home' : 'home-outline';
                        } else if(rn === progressName){
                            iconName = focused ? 'leaf' : 'leaf-outline';
                        } else if(rn === forumName){
                            iconName = focused ? 'book' : 'book-outline';
                        } else if(rn === settingsName){
                            iconName = focused ? 'settings' : 'settings-outline';
                        } else if(rn === rankingName){
                            iconName = focused ? 'trophy' : 'trophy-outline';
                        }

                        // Change the size and color here
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: Colors.primary.MINT
                })}
            >
            {/* This is how it appears on the app. You can also change the order here */}
            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={progressName} component={ProgressScreen} />
            <Tab.Screen name={forumName} component={ForumScreen} />
            <Tab.Screen name={rankingName} component={RankingScreen} />
            {/* <Tab.Screen name={settingsName} component={SettingsScreen} /> */}

            </Tab.Navigator>
        </NavigationContainer>
    );
}