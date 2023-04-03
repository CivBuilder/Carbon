import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { Card } from 'react-native-elements';
import { Colors } from '../../../colors/Colors';
import { ScreenNames } from '../Main/ScreenNames';
import { styles, windowHeight } from '../../../components/Styles';
import Log from './Log';

// =====================
//     Home Screen
// =====================
export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 1 }}
            >
                {/******* CARBON FOOTPRINT SUMMARY *******/}
                <View>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.title}>Your Footprint</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.PROGRESS)}>
                            <Text style={styles.link}>See More</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={{ backgroundColor: "white", borderRadius: 16, height: windowHeight / 4, padding: 10 }}>
                            {/* Add Carbon Footprint chart here */}
                        </View>
                    </View>
                </View>
                {/* <View style={styles.container}>
                    <View style={{ backgroundColor: "white",  borderRadius: 16, height: windowHeight / 2, padding: 10 }}>
                        <Log/>
                    </View>
                </View> */}
                {/******* RANKINGS *******/}
                <View>
                    <View style={styles.header}>
                        <Text style={styles.title}>Rankings</Text>
                        {/* <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.RANKING)}>
                            <Text style={styles.link}>See More</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.container}>
                        <View style={{ backgroundColor: "white", borderRadius: 16, height: windowHeight / 4, padding: 10 }}>
                            {/* Add Ranking chart here */}
                        </View>
                    </View>
                </View>

                {/******* FOR YOU *******/}
                <View>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.title}>For You</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.FORUM)}>
                            <Text style={styles.link}>Learn More</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.container}> */}
                        <View style={{ height: 400 }}>
                            <Swiper
                                horizontal={true}
                                showsPagination={true}
                                paginationStyle={{ bottom: 10 }}
                                activeDotStyle={{ backgroundColor: Colors.primary.MINT }}

                                // Autoplay: ON
                                // autoplay={true}
                                // autoplayTimeout={3}
                                // loop={true}

                                // Autoplay: OFF
                                autplay={false}
                                loop={false}
                            >
                                <View>
                                    <Card containerStyle={styles.card}>
                                        <Card.Title>Card Title 1</Card.Title>
                                        <Text style={{ marginBottom: 10 }}>
                                            The idea with React Native Elements is more about component structure than actual design.
                                        </Text>
                                    </Card>
                                </View>
                                <View>
                                    <Card containerStyle={styles.card}>
                                        <Card.Title>Card Title 2</Card.Title>
                                        <Text style={{ marginBottom: 10 }}>
                                            The idea with React Native Elements is more about component structure than actual design.
                                        </Text>
                                    </Card>
                                </View>
                                <View>
                                    <Card containerStyle={styles.card}>
                                        <Card.Title>Card Title 3</Card.Title>
                                        <Text style={{ marginBottom: 10 }}>
                                            The idea with React Native Elements is more about component structure than actual design.
                                        </Text>
                                    </Card>
                                </View>
                            </Swiper>
                        </View>
                    {/* </View> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};