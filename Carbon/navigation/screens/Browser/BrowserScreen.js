import React, { Component, useState, useEffect } from 'react'
import {WebView} from 'react-native-webview'
import { API_URL } from '../../../config/Api';
import{ View, TouchableOpacity, Text} from 'react-native'

const BackButton = ({navigation}) =>
<TouchableOpacity onPress={() => {
    navigation.goBack()
}}>
    <Text>&lt; Back</Text>
</TouchableOpacity>


const BrowserScreen = ({navigation, route}) => {

    const[articleLink, setArticleLink] = useState('');
    const[loading, setLoading] = useState(true);

    //gets article link
    const fetchData = async() => {
        // console.log("Fetching data for article");
        try{
            const response = await fetch(API_URL + "article/" + route.params.id)
            const responsedata = await response.json();
            // console.log(responsedata);
            setArticleLink(responsedata.article.articlelink);
            setLoading(false);
        }
        catch(error) {
            console.error("An error occured when connecting to the api, ensure you turned on the server and updated the APIURL accordingly if hosting localy - Avery. The following is the official error message: " + error)
            navigation.goBack(); //Hacky way of going back to the previous screen if the api is down since there's no other way to exit out of the loading screen
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <View style = {{flex:1}}>
            {!loading && (
            <WebView source = {{ 
                uri: articleLink
            }}
            style={{flex:1}}
            />
            )}
        </View>
    )
}

export default BrowserScreen;