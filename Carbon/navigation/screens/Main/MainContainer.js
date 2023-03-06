import * as React from 'react';
import { StatusBar, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { IconNames } from './IconNames';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenNames } from './ScreenNames';
import { Colors } from '../../../colors/Colors';
import { HomeScreen, ProgressScreen, ForumScreen, RankingScreen, SettingsScreen, AddProgress } from '../../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

/******* CUSTOM HEADERS *******/
const HomeStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={' '}
                component={HomeScreen}
                options={{
                    headerShown: true,
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
                    headerTitleAlign: 'center',
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
        </Stack.Navigator>
    );
};

const ProgressStack = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={' '}
                component={ProgressScreen}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.ADD_PROGRESS)}>
                            <Ionicons
                                name={IconNames.ADD}
                                size={24}
                                color={Colors.primary.MINT}
                                style={{ marginRight: 16 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen name={ScreenNames.ADD_PROGRESS} component={AddProgress} />
        </Stack.Navigator>
    );
};

export default function MainContainer(){
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent={true} />
            <NavigationContainer>
                <Tab.Navigator
                initialRouteName={ScreenNames.HOME}
                screenOptions={{
                    headerShown: false, // Hides the default header
                    tabBarLabelStyle: { display: 'none' }, // hide label text
                    tabBarActiveTintColor: Colors.primary.MINT,
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
                    component={ForumScreen}
                    options={screenOptions}
                />
                <Tab.Screen
                    name={ScreenNames.RANKING}
                    component={RankingScreen}
                    options={screenOptions}
                />
            </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};