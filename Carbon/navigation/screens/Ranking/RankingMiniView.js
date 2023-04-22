import * as React from 'react';
import { useState, useEffect } from 'react';
import {Colors} from "../../../colors/Colors";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { API_URL } from '../../../config/Api';
import { getAuthHeader } from '../../../util/LoginManager';
import {StyleSheet, Text, View, Image} from 'react-native';
import { AvatarView } from '../../../util/AvatarProfileMap';
import { SustainabilityScoreProfileView } from '../../../util/SustainabilityScoreProfileView';


const API_Entry_RANK_URL = API_URL + "user/testrank/";


export default function MiniRanking() {

    const [rank, setRank] = useState(null);
    const [sustainability_score, setSustainabilityScore] = useState(null);
    const [nextRankScore, setNextRankScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setErrorMessage] = useState(false);

    useEffect(() => {
        getRankAndTitles(setRank, setSustainabilityScore, setLoading, setNextRankScore);
    }, []);

    // useEffect( () => {
    //     if(sustainability_score != null) ;
    // }, [sustainability_score]);

    

    if(rank && sustainability_score!=null && nextRankScore != null) 
      return (
            // <View style = {styles.miniRankContainer}>
            //   <View style = {styles.imageContainer}>
            //     <Image 
            //       source = {SustainabilityScoreProfileView[sustainability_score].picture}
            //       style={styles.profileImage}
            //       resizeMode = "contain"
            //     />

            //     <View style = {styles.rankSphere}>            
            //       <Text style = {styles.rankText}>
            //         {formatRankText(rank)}
            //       </Text>
            //     </View>

            //     <Image 
            //       source = {AvatarView[avatar]}
            //       style={styles.profileImage}
            //       resizeMode = "contain"
            //     />
            //   </View>
            //   <Text style = {styles.titleText}>{SustainabilityScoreProfileView[sustainability_score].title}</Text>
            // </View>
          <View style = {styles.miniRankContainer}>
            <Image 
              style = {styles.profileImage}
              source = {SustainabilityScoreProfileView[sustainability_score].picture}
              resizeMode = "contain"
            />
            <View style = {styles.SideContainer}>
              <Text style = {styles.rankText}> Your Rank: {formatRankText(rank)}</Text>
              <Text style = {styles.titleText}>{SustainabilityScoreProfileView[sustainability_score].title}</Text>
              <View style = {styles.progressBar}></View>
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
 * @param {*} setRank - State changing function to get the users rank 
 * @param {*} setSustainabilityProfile - State changing function to get the users Profile from the sustatinabilityScore
 * @param {*} setLoading - State changing function to set a loading screen
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
    flexDirection : 'row'
  },

  profileImage : {
    width : '100%',
    height : '100%',
    flex : 1
  },

  SideContainer : {
    flex : 2,
    padding : 10
  },


  rankText: {
    color: Colors.primary.RAISIN_BLACK,
    textAlign : "left",
    fontSize : 23,
    flex : 1
  },

  titleText : { 
    color: Colors.primary.RAISIN_BLACK,
    fontWeight: 'bold',
    flex : 1,
    fontSize : 28,
  },

  progressBar : {
    flex : 1
  }
});

