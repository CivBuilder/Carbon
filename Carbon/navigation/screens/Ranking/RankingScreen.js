import * as React from 'react';
import { View, Text, Dimensions, SafeAreaView } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import Colors from '../../../colors/Colors';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function RankingScreen({navigation}) {
    return(
        // <View
        //     style={{
        //         flex: 1,
        //         alignItems: 'center',
        //         justifyContent: 'center'
        //     }}
        // >
        //     <Text
        //         onPress={() =>
        //             navigation.navigate('Home')
        //         }
        //         style={{
        //             fontSize: 26,
        //             fontWeight: 'bold'
        //         }}
        //     >
        //         Ranking Screen
        //     </Text>
        // </View>
        <SafeAreaView>
            <View>
                {/* TODO: add header */}
                {/* TODO: add an information button on the top right. this will inform users on how the ranking system works */}
                <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Header</Text>
            </View>
            <View style={{height: windowHeight/3, backgroundColor: "lightblue"}}>
                <View style={{alignItems: 'center'}}>
                    <Text>Your Current Rank:</Text>
                    <Text>Earth Defender</Text>
                    <Text>You are top 1%</Text>
                    <Text>PUT IMAGE HERE</Text>
                    <Text> </Text>
                    <Text> </Text>
                    <Text> </Text>
                    <Text> </Text>
                    <Text> </Text>
                    <Text> </Text>
                    <Text> </Text>
                    <Text>Your progress to next rank</Text>
                    <Text>|=============---|</Text>
                </View>
            </View>
            <View style={{height: windowHeight*2/3, backgroundColor: "lightgreen"}}>
                <View style={{alignItems: 'center'}}>
                    <Text>Rankings</Text>
                    <Text>Weekly | Monthly | All Time</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}