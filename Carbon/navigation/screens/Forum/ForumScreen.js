import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button, Platform, VirtualizedList} from 'react-native';
import {useState, useEffect} from 'react';
import EducationMenu from '../../../components/EducationMenu';
import * as images from '../../../assets/Forum';
import { RefreshControl, TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenNames } from '../Main/ScreenNames.js';
import { API_URL } from '../../../config/Api';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { Colors } from '../../../styling/Colors';
import { render } from '@testing-library/react-native';

// Using my test AWS node server for now
export default function ForumScreen({navigation, params}) {
    const [forumData, setForumData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState('all');

    // For now we fetch all of it, have to make an endpoint that allows fetching by category
    const fetchData = async() => {
        try {
            // console.log("Fetching data for forumcontent");
            const response = await fetch(API_URL + "forumcontent");
            const data = await response.json();
            //data.content = [data.content[0]]
            setForumData(data.content);
            updateSelected();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const onRefresh = React.useCallback(() => {
        setLoading(true);
        fetchData();
        setLoading(false);
    }, []);

    const onSelectCategory = async (category) => {
        setFilter(category);
    }

    function updateSelected() {
        if (filter === 'all') {
            setSelectedData(forumData);
            return;
        }

        const data = forumData.filter(item => item.category == filter);
        setSelectedData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        updateSelected();
    }, [filter, forumData]);

    // Hardcoding images to ids because im out of time, too bad!
    const thumbnails = {
        38: images.electricity2,
        39: images.electricity2,
        40: images.electricity3,
        41: images.electricity3,
        42: images.electricity1,
        43: images.electricity1,

        20: images.food1,
        21: images.food1,
        22: images.food2,
        23: images.food2,
        24: images.food3,
        25: images.food3,

        26: images.recycle1,
        27: images.recycle1,
        28: images.recycle2,
        29: images.recycle2,
        30: images.recycle3,
        31: images.recycle3,

        14: images.transport1,
        15: images.transport1,
        16: images.transport2,
        17: images.transport2,
        18: images.transport3,
        19: images.transport3,

        32: images.water1,
        33: images.water1,
        34: images.water2,
        35: images.water2,
        36: images.water3,
        37: images.water3,
    }

    const renderContent = ({item}) => {
        return(
            <View style={{flexDirection: 'row', flexGrow: 0}}>
            {item.map((item, i) => (
            <View
                key={i}
                style = {{
                    flex: 1,
                    borderRadius: 10,
                    margin: 6,
                    height: 200
                }}
            >
                <TouchableOpacity testID={'opacity' + item.type} style={{ 
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                    }}
                    onPress={() => {
                        switch (item.type) {
                            case 'Quiz':
                                    navigation.navigate(ScreenNames.QUIZ, { id: item.id_forumcontent})
                                break;
                            case 'Article':
                                    navigation.navigate(ScreenNames.BROWSER, { id: item.id_forumcontent})
                                break;
                        
                            default:
                                    console.error("Unknown content type in ForumScreen");
                                break;
                        }
                    }}
                >
                    <Image source={thumbnails[item.id_forumcontent]} style={{width: '100%', height: '100%', borderRadius: 10}}/>
                    <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset='0' stopOpacity={0.8} stopColor={'black'}/>
                                <Stop offset='0.25' stopOpacity={0}/>
                                <Stop offset='0.4' stopOpacity={0}/>
                                <Stop offset='1' stopOpacity={0.8} stopColor={'black'}/>
                            </LinearGradient>
                        </Defs>
                        <Rect width="100%" height="100%" fill="url(#grad)" rx={10}/>
                    </Svg>
                    <Text style={{
                        position: 'absolute',
                        fontSize: 18,
                        fontWeight: '700',
                        color: 'white',
                        top: 5,
                        right: 10,
                    }}>
                        {item.type}
                    </Text>
                    <Text style={{
                        position: 'absolute',
                        fontSize: 22,
                        fontWeight: '500',
                        textAlign: 'center',
                        color: Colors.primary.MINT_CREAM,
                        bottom: 10
                    }}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            </View>
            ))}
            </View>
        )
    }


    return(
        <SafeAreaView edges={['bottom', 'left', 'right']} style={{flexDirection:'column', flexGrow: 1, backgroundColor:Colors.miscellaneous.SCREEN_BACKGROUND}}>
            <View style={{width: '100%'}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.categoryView}>
                        <EducationMenu
                            title = "All"
                            imageSrc = "all-inclusive"
                            onPress= {() => {onSelectCategory('all'); setCurrentTab('all');}}
                            currentTab={currentTab === 'all' ? true : false}
                            style={styles.educationMenu}
                        />
                        <EducationMenu
                            title = "Food"
                            imageSrc = "silverware-variant"
                            onPress= {() => {onSelectCategory('food'); setCurrentTab('food');}}
                            currentTab={currentTab === 'food' ? true : false}
                            style={styles.educationMenu}
                        />
                        <EducationMenu
                            title = "Transport"
                            imageSrc = "train-car"
                            onPress= {() => {onSelectCategory('transport'); setCurrentTab('transport');}}
                            currentTab={currentTab === 'transport' ? true : false}
                            style={styles.educationMenu}
                        />
                        <EducationMenu
                            title = "Recycling"
                            imageSrc = "recycle"
                            onPress= {() => {onSelectCategory('recycle'); setCurrentTab('recycle');}}
                            currentTab={currentTab === 'recycle' ? true : false}
                            style={styles.educationMenu}
                        />
                        <EducationMenu
                            title = "Water"
                            imageSrc = "water"
                            onPress= {() => {onSelectCategory('water'); setCurrentTab('water');}}
                            currentTab={currentTab === 'water' ? true : false}
                            style={styles.educationMenu}
                        />
                        <EducationMenu
                            title = "Electricity"
                            imageSrc = "lightning-bolt"
                            onPress= {() => {onSelectCategory('electricity'); setCurrentTab('electricity');}}
                            currentTab={currentTab === 'electricity' ? true : false}
                            style={styles.educationMenu}
                        />
                    </View>
                </ScrollView>
            </View>
            <View style={{flex: 4}}>
                <VirtualizedList
                    data={selectedData}
                    getItem={(data, index) => {
                        var items = [];
                        for (var i = 0; i < 2; i++) {
                            const item = data[index * 2 + i]
                            item && items.push(item)
                        }
                        return items
                    }}
                    getItemCount={(selectedData) => selectedData.length}
                    keyExtractor = {(item, index) => index.toString()}

                    horizontal={false}
                    numColumns = {2}
                    renderItem = {renderContent}

                    refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh}/>}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    categoryView: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
        paddingVertical: 12
    },

    educationMenu: {
        paddingHorizontal: 40
    },

    container: {
        margin: 10,
        height: '100%',
        backgroundColor: "white",
        borderRadius: 16,
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
});