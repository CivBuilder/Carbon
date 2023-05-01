import { View, Text, StyleSheet, TouchableOpacity, Image, Card } from 'react-native'
import Swiper from 'react-native-swiper';
import React from 'react'
import { Platform } from 'react-native';

import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import * as thumbnails from '../assets/Forum';
import { Colors } from '../styling/Colors';
import { ScreenNames } from '../navigation/screens/Main/ScreenNames';
import { Platform } from "react-native";


const ForumCards = ({ navigation }) => {
    return (
        <Swiper
            horizontal={true}
            showsPagination={true}
            paginationStyle={{ bottom: 10 }}
            activeDotStyle={{ backgroundColor: Colors.primary.MINT }}
            style={{ height: 350 }}

            // Autoplay: ON
            autoplay={true}
            autoplayTimeout={7}
            loop={true}

        // Autoplay: OFF
        // autplay={false}
        // loop={false}
        >
            <View style={styles.card}>
                <TouchableOpacity
                    activeOpacity={1} //Removes the flashing effect when pressed
                    onPress={() => {
                    navigation.navigate(ScreenNames.FORUM, {
                        screen: ScreenNames.BROWSER,
                        initial: false,
                        params: { id: 24 }
                    });
                }}>
                    <Image style={{ width: '100%', height: '100%', borderRadius: 16 }} source={thumbnails.food3} />
                    <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset='0.7' stopOpacity={0} />
                                <Stop offset='1' stopOpacity={1.0} stopColor={'black'} />
                            </LinearGradient>
                        </Defs>
                        <Rect width="100%" height="100%" fill="url(#grad)" rx={10} />
                    </Svg>
                    <Text style={{ position: 'absolute', color: 'white', fontWeight: 'bold', fontSize: 24, bottom: 20, left: 20, right: 20 }}>
                        <Text style={{
                            position: 'absolute',
                            fontSize: 22,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: Colors.primary.MINT_CREAM,
                            bottom: 10
                        }}>
                            Learn more about sustainable eating habits
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <TouchableOpacity
                    activeOpacity={1} //Removes the flashing effect when pressed
                    onPress={() => {
                    navigation.navigate(ScreenNames.FORUM, {
                        screen: ScreenNames.QUIZ,
                        params: { id: 19 }
                    });
                }}>
                    <Image style={{ width: '100%', height: '100%', borderRadius: 16 }} source={thumbnails.transport3} />
                    <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset='0.7' stopOpacity={0} />
                                <Stop offset='1' stopOpacity={1.0} stopColor={'black'} />
                            </LinearGradient>
                        </Defs>
                        <Rect width="100%" height="100%" fill="url(#grad)" rx={10} />
                    </Svg>
                    <Text style={{ position: 'absolute', color: 'white', fontWeight: 'bold', fontSize: 24, bottom: 20, left: 20, right: 20 }}>
                        <Text style={{
                            position: 'absolute',
                            fontSize: 22,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: Colors.primary.MINT_CREAM,
                            bottom: 10
                        }}>
                            See how much you know about sustainable transportation
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <TouchableOpacity
                    activeOpacity={1} //Removes the flashing effect when pressed
                    onPress={() => {
                    navigation.navigate(ScreenNames.FORUM, {
                        screen: ScreenNames.BROWSER,
                        initial: false,
                        params: { id: 36 },
                    });
                }}>
                    <Image style={{ width: '100%', height: '100%', borderRadius: 16 }} source={thumbnails.water3} />
                    <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset='0.7' stopOpacity={0} />
                                <Stop offset='1' stopOpacity={1.0} stopColor={'black'} />
                            </LinearGradient>
                        </Defs>
                        <Rect width="100%" height="100%" fill="url(#grad)" rx={10} />
                    </Svg>
                    <Text style={{ position: 'absolute', color: 'white', fontWeight: 'bold', fontSize: 24, bottom: 20, left: 20, right: 20 }}>
                        <Text style={{
                            position: 'absolute',
                            fontSize: 22,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: Colors.primary.MINT_CREAM,
                            bottom: 10
                        }}>
                            Learn more about sustainable water systems
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <TouchableOpacity
                    activeOpacity={1} //Removes the flashing effect when pressed
                    onPress={() => {
                    navigation.navigate(ScreenNames.FORUM, {
                        screen: ScreenNames.QUIZ,
                        params: { id: 31 }
                    });
                }}>
                    <Image style={{ width: '100%', height: '100%', borderRadius: 16 }} source={thumbnails.recycle3} />
                    <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset='0.7' stopOpacity={0} />
                                <Stop offset='1' stopOpacity={1.0} stopColor={'black'} />
                            </LinearGradient>
                        </Defs>
                        <Rect width="100%" height="100%" fill="url(#grad)" rx={10} />
                    </Svg>
                    <Text style={{ position: 'absolute', color: 'white', fontWeight: 'bold', fontSize: 24, bottom: 20, left: 20, right: 20 }}>
                        <Text style={{
                            position: 'absolute',
                            fontSize: 22,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: Colors.primary.MINT_CREAM,
                            bottom: 10
                        }}>
                            Test your recycling knowledge
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </Swiper>

    )
}

const styles = StyleSheet.create({
    card: {
        height: 300,
        borderRadius: 16,
        padding: 0,
        marginTop: 10,
        marginHorizontal: 14,
        ...Platform.select({
            ios: {
                shadowColor: Colors.primary.RAISIN_BLACK,
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.125,
                shadowRadius: 2.5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
})

export default ForumCards