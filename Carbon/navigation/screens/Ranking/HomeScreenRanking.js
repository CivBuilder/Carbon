import * as React from 'react';
import { useState, useEffect } from 'react';
import {View} from 'react-native'
import LoadingIndicator from "../../../components/LoadingIndicator";
import { API_URL } from '../../../config/Api';
import { getAuthHeader } from '../../../util/LoginManager';
import MiniRanking from './RankingMiniView';

const API_Entry_RANK_URL = API_URL + "user/rank/";


export default function HomeScreenRanking() {

  
    const [userScores, setUserScores] = useState(null);

    const [error, setErrorMessage] = useState(false);    
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getUserScores(setUserScores, setLoading, setErrorMessage);
    }, []);

    return (
      <View style= {{height : 160}}>
        <MiniRanking userScores={userScores}/>
        <LoadingIndicator loading={loading}/>
      </View>
    )
    // return null;
}


/**
 * 
 * @param {Function} setUserScores - Rank, sustainability, global_score & nextRankScore to be stored from fetch 
 * @param {Function} setLoading - to be set to true when function starts and false before it returns
 * @param {Function} setErrorMessage - Only set to true if fetch was not handled
 */
async function getUserScores(setUserScores, setLoading, setErrorMessage){
  setLoading(true);
  console.log(`Fetching from ${API_Entry_RANK_URL}`);

  //Get result from Server via Fetch
  try { 

    // Changing rank to use the new JWT
    const response = await fetch(API_Entry_RANK_URL, await getAuthHeader());

    //Set Rank and first table to load on the "Like You" page for the table
    if(response.status === 200) {
      const response_content = await response.json(); 
      setUserScores(response_content);      
      console.log(`Fetch from ${API_Entry_RANK_URL} was a success!`);
    }
    //Handle Error thrown from Server
    else if (response.status === 404) {
      throw new Error(`Fetch from ${API_Entry_RANK_URL} Failed, 404: bad ID`)
    }
  } 
  //Handle any other errors not necessarily from Server
  catch(err) {
    setUserScores(null);
    setErrorMessage(`Fetch from ${API_Entry_RANK_URL} Failed: ${err.message}`);
    console.log(`Fetch from ${API_Entry_RANK_URL} Failed: ${err.message}`);
  }
  setLoading(false);
}




