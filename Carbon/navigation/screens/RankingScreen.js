import * as React from 'react';
import { useState, useEffect } from 'react';
import {ScrollView, StyleSheet, Text, View, RefreshControl} from 'react-native';

const API_Entry_URL = "http://192.168.0.232:3000/api/user/rank/"
//  const API_Entry_URL = "http://localhost:3000/api/user/rank/"

const KEY = "1" //to remove when we get authentication. this is to debug our get requests



export default function RankingScreen({navigation}){
    const [rank, setRank] = useState(null);
    const [sustainability_score, setSustainabilityScore] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [inRefresh, setIsRefreshing] = useState(false);
  

    const fetchUserRank = async () => {
      console.log(`Fetching from ${API_Entry_URL+KEY}`);
      try { 
        const response = await fetch(API_Entry_URL+KEY);
        if(response.status === 200) {
          const response_content = await response.json(); 
          setRank(response_content.ranking);
          setSustainabilityScore(response_content.sustainability_score);
          setErrorMessage(null);
          console.log(`Fetch from ${API_Entry_URL+KEY} was a success!`);
        }
        else if (response.status === 404) {
          setRank(null);
          setSustainabilityScore(null);
          setErrorMessage(`Error: ${response_content.status} : ${response_content.statusText}`);
          console.log(`Fetch from ${API_Entry_URL+KEY} Failed, 404: bad ID`);
        }
      } catch(err) {
        setRank(null);
        setSustainabilityScore(null);
        setErrorMessage(`Error: ${err.message}`);
        console.log(`Fetch from ${API_Entry_URL+KEY} Failed: ${err.message}`);
      }
    }

    const handleRefresh = () => {
      setIsRefreshing(true);
      fetchUserRank().then(() => setIsRefreshing(false));
    };

    useEffect( () => {fetchUserRank();}, []);

    return (
      <View>
        {rank && 
          <Text>
            Your Rank is: {rank}{"\n"}
            Your Sustainability Score is {sustainability_score}
          </Text> 
        }
        
        {errorMessage && (
          <ScrollView
          refreshControl={
            <RefreshControl refreshing={inRefresh} onRefresh={handleRefresh} />
          }
          >
            <Text
              onPress={() => fetchUserRank()}
            >
              {errorMessage}{"\n"}
              Swipe Down the Refresh Page
            </Text>

          </ScrollView>
        )}
      </View>
    );
}