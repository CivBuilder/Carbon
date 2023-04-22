import * as React from 'react';
import { useState, useEffect } from 'react';
import {Colors} from "../../../colors/Colors";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { API_URL } from '../../../config/Api';
import { getAuthHeader } from '../../../util/LoginManager';
import {StyleSheet, Text, View, Image} from 'react-native';
import { SustainabilityScoreProfileView } from '../../../util/SustainabilityScoreProfileView';
import { State } from 'react-native-gesture-handler';
import RankProgressBar from '../../../components/ProgressBar.js';


const API_Entry_RANK_URL = API_URL + "user/testrank/";


export default function MiniRanking() {

    const [rank, setRank] = useState(1);
    const [sustainability_score, setSustainabilityScore] = useState(6);
    const [global_score, setglobalScore] = useState(8);
    const [nextRankScore, setNextRankScore] = useState(9);
    const [loading, setLoading] = useState(false);
    const [error, setErrorMessage] = useState(false);

    // useEffect(() => {
    //     getRankAndTitles(setRank, setSustainabilityScore, setLoading, setNextRankScore);
    // }, []);

    if(rank && sustainability_score!=null && nextRankScore != null) 
      return (
          <View style = {styles.miniRankContainer}>
            <View style = {styles.profileImageContainer}>
              <Image 
                style = {styles.profileImage}
                source = {SustainabilityScoreProfileView[sustainability_score].picture}
                resizeMode = "contain"
              />
            </View>
            <View style = {styles.SideContainer}>
              <View style = {styles.textContainer}> 
                <Text style = {styles.rankText}>Your Rank: {formatRankText(rank)}</Text>
                <Text style = {styles.titleText}>{SustainabilityScoreProfileView[sustainability_score].title}</Text>
                <RankProgressBar progress = {global_score} total = {nextRankScore}/>
              </View>
            </View>
          </View>
      )
    else return (<LoadingIndicator loading={loading}/>)
}


/**
 * Menial function to use across both the main and mini versions of the ranking screen 
 * @param {*} rank - number to use 
 * @returns 
 */
function formatRankText(rank) {

  
  switch(rank % 10) {
      case 1: 
          return rank+"st";
      case 2: 
          return rank+"nd";
      case 3:
          return rank+"rd";
      default: 
          return rank+"th";
  }
}


/**
 * 
 * @param {Function} setRank - State changing function to get the users rank 
 * @param {*} setSustainabilityProfile - State changing function to get the users Profile from the sustatinabilityScore
 * @param {*} setLoading - State changing function to set a loading screen
 * 
 * 
 */
async function getRankAndTitles(setRank, setSustainabilityScore, setLoading, setNextRankScore){
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
      setglobalScore(response_content.global_score);
      setNextRankScore(response_content.nextRankScore);

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




const styles = StyleSheet.create({

  miniRankContainer : { 
    flex : 1,
    flexDirection : 'row',
    // backgroundColor : "black",
    justifyContent : 'center',
    marginBottom : 12,
  },

  profileImageContainer :{
    flex : 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage : {
    height : 100,
    width : 100,
    resizeMode : 'contain',
  },

  SideContainer : {
    flex : 2,
    padding : 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent : 'center',
    // backgroundColor : 'cyan',
  },

  textContainer : {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent : 'center',
    // backgroundColor : 'white',
    flex : 0.75
  },


  rankText: {
    color: Colors.primary.RAISIN_BLACK,
    fontSize : 21,
    textAlignVertical : 'center',
    flex : 1,
    // backgroundColor : 'white',
  },

  titleText : { 
    color: Colors.primary.RAISIN_BLACK,
    fontWeight: 'bold',
    fontSize : 28,
    flex : 1,
    // backgroundColor : 'red',
    textAlignVertical : 'center',
    paddingBottom : 10,
  },
});

