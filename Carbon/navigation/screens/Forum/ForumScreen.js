import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Image, Button, Platform} from 'react-native';
import {useState, useEffect} from 'react';
import EducationMenu from '../../../components/EducationMenu';
import * as images from '../../../assets/Forum';
import { RefreshControl, TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenNames } from '../Main/ScreenNames.js';
import { API_URL } from '../../../config/Api';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { Colors } from '../../../colors/Colors';

// Using my test AWS node server for now
export default function ForumScreen({navigation}) {
    const [forumData, setForumData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    // For now we fetch all of it, have to make an endpoint that allows fetching by category
    const fetchData = async() => {
        try {
            console.log("Fetching data for forumcontent");
            const response = await fetch(API_URL + "forumcontent");
            const data = await response.json();
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

    const thumbnails = {
        'electricity': images.electricityThumbnail,
        'recycle': images.recycleThumbnail,
        'food': images.foodThumbnail,
        'water': images.waterThumbnail,
        'transport': images.transportThumbnail
    }

    const renderContent = ({item}) => {
        return(
            <View
                style = {{
                    flex: 0.5,
                    borderRadius: 10,
                    margin: 6,
                    height: 200
                }}
            >
                <TouchableOpacity style={{ 
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                    }}
                    onPress={() => {
                        switch (item.type) {
                            case 'quiz':
                                    navigation.navigate(ScreenNames.QUIZ, { id: item.id_forumcontent})
                                break;
                            case 'embeded':
                                    navigation.navigate(ScreenNames.BROWSER, { id: item.id_forumcontent})
                                break;
                        
                            default:
                                    console.error("Unknown content type in ForumScreen");
                                break;
                        }
                    }}
                >
                    <Image source={thumbnails[item.category]} style={{width: '100%', height: '100%', borderRadius: 10}}/>
                    <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset='0.7' stopOpacity={0}/>
                                <Stop offset='1' stopOpacity={1.0} stopColor={'black'}/>
                            </LinearGradient>
                        </Defs>
                        <Rect width="100%" height="100%" fill="url(#grad)" rx={10}/>
                    </Svg>
                    <Text style={{
                        position: 'absolute',
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: Colors.primary.MINT_CREAM,
                        top: 5,
                        right: 10,
                    }}>
                        {item.type}
                    </Text>
                    <Text style={{
                        position: 'absolute',
                        fontSize: 22,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: Colors.primary.MINT_CREAM,
                        bottom: 10
                    }}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }


    return(
        <SafeAreaView style={{flexDirection:'column', flexGrow: 1}}>
            <View style={{width: '100%', flex: 1}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.categoryView}>
                        <EducationMenu
                            title = "All"
                            imageSrc = {images.anyIcon}
                            onPress= {() => onSelectCategory('all')}

                            style={styles.educationMenu}
                        />
                        <EducationMenu
                            title = "Food"
                            imageSrc = {images.foodIcon}
                            onPress= {() => onSelectCategory('food')}

                            style={styles.educationMenu}
                        />
                        <EducationMenu
                            title = "Transport"
                            imageSrc = {images.transportationIcon}
                            onPress= {() => onSelectCategory('transport')}

                            style={styles.educationMenu}
                        />
                        <EducationMenu
                            title = "Recycling"
                            imageSrc = {images.recycleIcon}
                            onPress= {() => onSelectCategory('recycle')}

                            style={styles.educationMenu}
                        />
                        <EducationMenu
                            title = "Water"
                            imageSrc = {images.waterIcon}
                            onPress= {() => onSelectCategory('water')}

                            style={styles.educationMenu}
                        />
                        <EducationMenu
                            title = "Electricity"
                            imageSrc = {images.electricityIcon}
                            onPress= {() => onSelectCategory('electricity')}

                            style={styles.educationMenu}
                        />
                    </View>
                </ScrollView>
            </View>
            <View style={{flex: 4}}>
                <FlatList
                    horizontal={false}
                    numColumns = {2}
                    data={selectedData}
                    renderItem = {renderContent}
                    keyExtractor = {(item) => item.id_forumcontent.toString()}
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
        alignItems: 'center'
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