import {Colors} from "../../../colors/Colors";
import {StyleSheet, Text, View, Image} from 'react-native';
import { SustainabilityScoreProfileView } from '../../../util/SustainabilityScoreProfileView';
import RankProgressBar from '../../../components/ProgressBar.js';


export default function MiniRanking({userScores}) {
    if(userScores != null){ 
        
        //For the sake of removing too much indirection per statement 
        const rank = userScores.ranking;
        const sustainability_score = userScores.sustainability_score;
        const global_score = userScores.global_score;
        const nextRankScore = userScores.nextRankScore;

        return(
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
    }
    else return null; 

}

/**
 * Menial function to use across both the main and mini versions of the ranking screen 
 * @param {Number} rank - Value to return the correctly formatted placementstring 
 * @returns 
 */
function formatRankText(rank) {

    //11th, 12th, ... edge case.
    if(Math.floor(rank/10) % 10 === 1)
        return rank+"th";

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
  
  