import { View, Text, StyleSheet, TouchableOpacity, Image, Card } from 'react-native'
import Swiper from 'react-native-swiper';
import React from 'react'
import { StackActions } from '@react-navigation/native';

import * as thumbnails from '../assets/Forum';
import { Colors } from '../styling/Colors';
import { ScreenNames } from '../navigation/screens/Main/ScreenNames';


const ForumCards = ({navigation}) => {
    return (
        <Swiper
            horizontal={true}
            showsPagination={true}
            paginationStyle={{ bottom: 10 }}
            activeDotStyle={{ backgroundColor: Colors.primary.MINT }}

            // Autoplay: ON
            autoplay={true}
            autoplayTimeout={7}
            loop={true}

            // Autoplay: OFF
            // autplay={false}
            // loop={false}
        >
            <View style={styles.card}>
                <TouchableOpacity onPress={() => {
                    navigation.push(ScreenNames.FORUM, {
                        screen: ScreenNames.BROWSER,
                        initial: false,
                        params: {id: 24}
                    });
                }}>
                    <Image style={{width: '100%', height: '100%', borderRadius: 16}} source={thumbnails.food3}/>
                    <Text style={{position: 'absolute', color: 'white', fontWeight: 'bold', fontSize: 24, bottom: 20, left: 20, right: 20}}>
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
                <TouchableOpacity onPress={() => {
                    navigation.navigate(ScreenNames.FORUM, {
                        screen: ScreenNames.BROWSER,
                        params: {id: 19}
                    });
                }}>
                    <Image style={{width: '100%', height: '100%', borderRadius: 16}} source={thumbnails.transport3}/>
                    <Text style={{position: 'absolute', color: 'white', fontWeight: 'bold', fontSize: 24, bottom: 20, left: 20, right: 20}}>
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
                <TouchableOpacity onPress={() => {
                    navigation.navigate(ScreenNames.BROWSER, {
                        screen: ScreenNames.BROWSER,
                        params: {id: 36}
                    });
                }}>
                    <Image style={{width: '100%', height: '100%', borderRadius: 16}} source={thumbnails.water3}/>
                    <Text style={{position: 'absolute', color: 'white', fontWeight: 'bold', fontSize: 24, bottom: 20, left: 20, right: 20}}>
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
                <TouchableOpacity onPress={() => {
                    navigation.navigate(ScreenNames.BROWSER, {
                        screen: ScreenNames.QUIZ,
                        params: {id: 19}
                    });
                }}>
                    <Image style={{width: '100%', height: '100%', borderRadius: 16}} source={thumbnails.water3}/>
                    <Text style={{position: 'absolute', color: 'white', fontWeight: 'bold', fontSize: 24, bottom: 20, left: 20, right: 20}}>
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
        </Swiper>

    )
}

const styles = StyleSheet.create({
    card: {
        height: 300,
        borderRadius: 16,
        padding: 0,
        margin: 10,
    },
})

export default ForumCards