import * as React from 'react';
import { useState, useEffect } from 'react';
import {Colors} from "../../../colors/Colors";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { API_URL } from '../../../config/Api';
import { getAuthHeader } from '../../../util/LoginManager';
import {StyleSheet, Text, View, Image} from 'react-native';
import { AvatarView } from '../../../util/AvatarProfileMap';
import { SustainabilityScoreProfileView } from '../../../util/SustainabilityScoreProfileView';


const localPath  = "../../../"; //Path to Carbon/Carbon directory for profile view
const API_Entry_RANK_URL = API_URL + "user/testrank/";


export default function MiniRanking() {

    const [rank, setRank] = useState(null);
    const [sustainability_score, setSustainabilityScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setErrorMessage] = useState(false);

    useEffect(() => {
        getRankAndTitles(setRank, setSustainabilityScore, setLoading);
    }, []);

    useEffect( () => {
        if(sustainability_score != null)
        console.log(localPath+SustainabilityScoreProfileView[sustainability_score].picture);
    }, [sustainability_score]);



    return (

        
        <View style = {{flex : 1}}>
          <View style = {{flexDirection : 'row', flex : 2}}>
            <Image 
              source = {SustainabilityScoreProfileView[sustainability_score].picture}
              style={{ width: '100%', height: '100%' , flex : 1}}
              resizeMode = "contain"
            />
            <Image 
              source = {SustainabilityScoreProfileView[sustainability_score].picture}
              style={{ width: '130%', height: '130%' , flex : 1.5}}
              resizeMode = "contain"
            />
            <Image 
              source = {SustainabilityScoreProfileView[sustainability_score].picture}
              style={{ width: '100%', height: '100%' , flex : 1}}
              resizeMode = "contain"
            />
          </View>
          <Text style = {styles.rankText}>Poop</Text>
        </View>
    )
}



const styles = StyleSheet.create({

  miniRankContainer : { 
    flex : 1
  },
  imageContainer  : { 
    flexDirection : 'row',
    flex : 2
  },
  profileImage : {
    width : '100%',
    height : '100%',
    flex : 1 
  },
  rankText: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 25,
    flex : 1
  }
});


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


