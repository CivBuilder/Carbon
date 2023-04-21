import * as React from 'react';
import { useState, useEffect } from 'react';
import {Colors} from "../../../colors/Colors";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { API_URL } from '../../../config/Api';
import { getAuthHeader } from '../../../util/LoginManager';
import { SustainabilityScoreProfileView } from '../../../util/SustainabilityScoreProfileView';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View, RefreshControl, TouchableOpacity, FlatList} from 'react-native';
const localPath  = "../../../"; //Path to Carbon/Carbon directory for profile view
const API_Entry_RANK_URL = API_URL + "user/testrank/";


export default function MiniRanking() {

    const [rank, setRank] = useState(null);
    const [sustainability_score, setSustainabilityScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setErrorMessage] = useState(false);

    useEffect(() => {
        getRankAndTitles(setRank, setSustainabilityScore, setLoading);
    }, []);




    return (
        <View>
            <LoadingIndicator loading={loading}></LoadingIndicator>
            { rank && sustainability_score !== null ? (
                <View>
                   <Text>{rank}</Text> 
                </View>

            ) : null}
        </View>
    )
}

/**
 * 
 * @param {*} setRank - State changing function to get the users rank 
 * @param {*} setSustainabilityProfile - State changing function to get the users Profile from the sustatinabilityScore
 * @param {*} setLoading - State changing function to set a loading screen
 */
async function getRankAndTitles(setRank, setSustainabilityScore, setLoading){
    setLoading(true);
    console.log(`Fetching from ${API_Entry_RANK_URL}`);

    //Get result from Server via Fetch
    try { 

      // Changing rank to use the new JWT
      const response = await fetch(API_Entry_RANK_URL, await getAuthHeader());

      //Set Rank and first table to load on the "Like You" page for the table
      if(response.status === 200) {
        const response_content = await response.json(); 
        console.log(response_content);
        
        setRank(response_content.ranking);
        setSustainabilityScore(response_content.sustainability_score);
        console.log(`Fetch from ${API_Entry_RANK_URL} was a success!`);
      }
      //Handle Error thrown from Server
      else if (response.status === 404) {
        setRank(null);
        setSustainabilityScore(null);
        console.log(`Fetch from ${API_Entry_RANK_URL} Failed, 404: bad ID`);
      }
    } 
    //Handle any other errors not necessarily from Server
    catch(err) {
      setRank(null);
      setSustainabilityScore(null);
      console.log(`Fetch from ${API_Entry_RANK_URL} Failed: ${err.message}`);
    }
    setLoading(false);
}