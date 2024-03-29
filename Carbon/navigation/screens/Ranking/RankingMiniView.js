
import { Text, View, Image } from 'react-native';
import { SustainabilityScoreProfileView } from '../../../util/SustainabilityScoreProfileView';
import RankProgressBar from '../../../components/ProgressBar.js';
import { EmissionCategory as EC } from './Categories';
import { RankingMiniViewCSS as styling } from '../../../styling/RankingMiniViewCSS';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';

/**
 * 
 * @param {JSON} userScores - Prop JSon that is the result of the fetch request for the  
 * @param {JSON} rankCategory - EmissionScoreCategory JSON object that determines which category of rank
 * @returns 
 */
export default function MiniRanking({ userScores, rankCategory }) {
  if (userScores != null && rankCategory) {
    //For the sake of removing too much indirection per statement 
    const rank = userScores[rankCategory.title + "ranking"];
    const sustainability_score = userScores.sustainability_score;
    const currentScore = userScores[rankCategory.title + "score"];
    const nextRankScore = userScores["next_rank_" + rankCategory.title + "score"];
    const route = useRoute();
    let categoryName = (route.params == undefined) ? "Global" : (route.params.title).slice(0, -1);
    const leaderboardText = `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Rank:`;

    return (
      <View style={styling.rankLeaderboardContainer} testID='Ranking-Mini-Container'>
        <View style={styling.rankImageContainer}>
          <Image
            style={styling.profileImage}
            source={SustainabilityScoreProfileView[sustainability_score].picture}
            resizeMode="contain"
          />
        </View>
        <View style={styling.gap}></View>
        <View style={styling.rankingContainer}>
          <View style={styling.leaderboardRank}>
            <Text style={styling.leaderboardText}>{leaderboardText}</Text>
            <Text style={styling.leaderboardValue}>{formatRankText(rank)}</Text>
          </View>
          <View style={styling.rankTitle}>
            <Text style={styling.titleText}>{SustainabilityScoreProfileView[sustainability_score].title}</Text>
          </View>
          <View style={styling.rankProgress}>
            <RankProgressBar progress={currentScore} total={nextRankScore} />
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
export function formatRankText(rank) {

  //11th, 12th, ... edge case.
  if (Math.floor(rank / 10) % 10 === 1)
    return rank + "th";

  switch (rank % 10) {
    case 1:
      return rank + "st";
    case 2:
      return rank + "nd";
    case 3:
      return rank + "rd";
    default:
      return rank + "th";
  }
};