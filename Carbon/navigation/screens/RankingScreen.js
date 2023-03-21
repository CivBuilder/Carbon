import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const API_Entry_URL = "http://OUR_AWS_URL:3000/api/user/rank/"
//  const API_Entry_URL = "http://localhost:3000/api/user/rank/"

const ID = "1" //to remove when we get authentication. this is to debug our get requests



export default function RankingScreen({navigation}){
    const [rank, setRank] = useState(null);
    const [sustainability_score, setSustainabilityScore] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
  
    const fetchUserRank = async () => {
      console.log(`Fetching from ${API_Entry_URL+ID}`);
      try { 
        const response = await fetch(API_Entry_URL+ID);
        if(response.status === 200) {
          const response_content = await response.json(); 
          setRank(response_content.ranking);
          setErrorMessage(null);
          console.log(`Fetch from ${API_Entry_URL+ID} was a success!`);
        }
        else if (response.status === 404) {
          setRank(null);
          setSustainabilityScore(null);
          setErrorMessage(`Error: ${response_content.status} : ${response_content.statusText}`);
          console.log(`Fetch from ${API_Entry_URL+ID} Failed, 404: bad ID`);
        }
      } catch(err) {
        setRank(null);
        setSustainabilityScore(null);
        setErrorMessage(`Error: ${err.message}`);
        console.log(`Fetch from ${API_Entry_URL+ID} Failed: ${err.message}`);
      }
    }

    useEffect( () => {fetchUserRank();}, []);

    return (
      <View>
        {rank && <Text>Your rank is: {rank}</Text>}
        {errorMessage && (
          <View>
            <Text
              onPress={() => fetchUserRank()}
            >
              {errorMessage}
            </Text>

          </View>
        )}
      </View>
    );
}