import * as React from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text } from 'react-native';
import { Colors } from '../../../colors/Colors';
import { LineChartFootprint, CategoryChart, CatgegoryChartv2 } from '../Home/ChartData';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const horizontalMargin = 20;

export default function ProgressScreen() {
    return(
        <SafeAreaView style={{height: windowHeight}}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{flexGrow: 1}}
            >
                {/* Chart #1 */}
                <View>
                    <Text style={{...styles.headerTitle, margin: 10}}>By Time</Text>
                    <LineChartFootprint/>
                </View>

                {/* Chart #2 */}
                <View>
                    <View style={styles.marginContainer}>
                        <Text style={{...styles.headerTitle, margin: 10}}>By Category</Text>
                        <View style={{backgroundColor: Colors.primary.MINT, borderRadius: 16}}>
                            <CategoryChart/>
                        </View>
                        <View style={{height: windowHeight}}>
                            <CatgegoryChartv2/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    marginContainer: {
        marginHorizontal: horizontalMargin / 2
    },
});