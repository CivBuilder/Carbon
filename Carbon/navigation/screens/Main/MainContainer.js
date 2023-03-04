import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../colors/Colors';
import { ScreenNames } from './ScreenNames';
import { IconNames } from './IconNames';

// Import screens
import HomeScreen from '../Home/HomeScreen';
import ProgressScreen from '../Progress/ProgressScreen';
import ForumScreen from '../Forum/ForumScreen';
import RankingScreen from '../Ranking/RankingScreen';

// Create the bottom navbar
const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent={true} />
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName={ ScreenNames.HOME }
                    screenOptions={({ route }) => ({
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            let rn = route.name;

                            // Shows how the icons will appear
                            // without '-outline' is highlighted meaning it's the current page
                            // with '-outline' means it's not highlighted meaning it's not current page
                            if(rn === ScreenNames.HOME){
                                iconName = focused ? IconNames.HOME : IconNames.HOME_OUTLINE;
                            } else if(rn === ScreenNames.PROGRESS){
                                iconName = focused ? IconNames.PROGRESS : IconNames.PROGRESS_OUTLINE;
                            } else if(rn === ScreenNames.FORUM){
                                iconName = focused ? IconNames.FORUM : IconNames.FORUM_OUTLINE;
                            // } else if(rn === ScreenNames.SETTINGS){
                            //     iconName = focused ? 'settings' : 'settings-outline';
                            } else if(rn === ScreenNames.RANKING){
                                iconName = focused ? IconNames.RANKING : IconNames.RANKING_OUTLINE;
                            }

                            // Change the size and color here
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: Colors.primary.MINT,
                    })}
                >
                {/* This is how it appears on the app. You can also change the order here */}
                <Tab.Screen name={ScreenNames.HOME} component={HomeScreen} />
                <Tab.Screen name={ScreenNames.PROGRESS} component={ProgressScreen} />
                <Tab.Screen name={ScreenNames.FORUM} component={ForumScreen} />
                <Tab.Screen name={ScreenNames.RANKING} component={RankingScreen} />
                {/* <Tab.Screen name={settingsName} component={SettingsScreen} /> */}

                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}