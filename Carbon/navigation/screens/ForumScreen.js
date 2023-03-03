import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList} from 'react-native';
import {useState, useEffect} from 'react';
import EducationMenu from '../../components/EducationMenu';

const APIURL = "http://carbontest-env.eba-gpgdvm85.us-west-1.elasticbeanstalk.com/api"
// Using my test AWS node server for now
export default function ForumScreen({navigation}) {
    const [forumData, setForumData] = useState([]);
    const [loading, setLoading] = useState(true);

    // For now we fetch all of it, have to make an endpoint that allows fetching by category
    const fetchData = async() => {
        console.log("Fetching data for forumcontent");
        const response = await fetch(APIURL + "/forumcontent");
        const data = await response.json();
        setForumData(data.content);
        setLoading(false);
    };

    const renderContent = ({item}) => {
        return(
            <View
                style = {{
                    borderRadius: 10,
                    backgroundColor: '#74C69D',
                    paddingHorizontal : 14,
                    paddingVertical: 90,
                    margin: 5,
                    width : '45%'
                }}
            >
                <Text style= {{textAlign : 'center'}}>{item.type}</Text>
            </View>
        )
    }

    useEffect(() => {
        fetchData();
    }, []);

    const [type, setType] = useState("food");
    const styles = StyleSheet.create({
       row: {
           flexDirection:'row'
       }
    })

    return(
        <View>
            <View>
                <ScrollView>
                    <View style ={{flex: 3, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 50, marginBottom: 75}}>
                        <EducationMenu
                            key={"food"}
                            title = "Food"
                                type ={type}
                                setType = {setType}
                        />
                        <EducationMenu
                                key={"transportation"}
                                title = "Transportation"
                                type ={type}
                                setType = {setType}
                        />
                        <EducationMenu
                            key={"recycling"}
                            title = "Recycling"
                                type ={type}
                                setType = {setType}
                        />
                        <EducationMenu
                            key={"water"}
                            title = "Water"
                                type ={type}
                                setType = {setType}
                        />
                        <EducationMenu
                            key={"electricity"}
                            title = "Electricity"

                            type ={type}
                            setType = {setType}
                        />
                    </View>
                </ScrollView>
            </View>
            <View>
                {loading && <Text>Loading</Text>}
                <FlatList
                    horizontal={false}
                    numColumns = {2}
                    data={forumData}
                    renderItem = {renderContent}
                    keyExtractor = {(item) => item.id_forumcontent.toString()}
                />
            </View>
        </View>
    )
}

