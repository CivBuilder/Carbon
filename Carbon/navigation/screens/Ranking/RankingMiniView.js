
import { StyleSheet, Text, View, Image } from 'react-native';
import { SustainabilityScoreProfileView } from '../../../util/SustainabilityScoreProfileView';
import RankProgressBar from '../../../components/ProgressBar.js';
import { RankingMiniViewCSS as styling } from '../../../styling/RankingMiniViewCSS';

export default function MiniRanking({ userScores }) {
  if (userScores != null) {

    //For the sake of removing too much indirection per statement 
    const rank = userScores.ranking;
    const sustainability_score = userScores.sustainability_score;
    const global_score = userScores.global_score;
    const nextRankScore = userScores.nextRankScore;

    return (
      <View style={styling.rankLeaderboardContainer}>
        <View style={styling.leaderboardContainer}>
          <View style={styling.leaderboardRank}>
            <Text style={styling.leaderboardText}>Your current leaderboard rank is:</Text>
            <Text style={styling.leaderboardValue}>{formatRankText(rank)}</Text>
          </View>
        </View>
        <View style={styling.rankContainer}>
          <View style={styling.rankImage}>
            <Image
              style={styling.profileImage}
              source={SustainabilityScoreProfileView[sustainability_score].picture}
              resizeMode="contain"
            />
          </View>
          <View style={styling.rankTitleProgressContainer}>
            <View style={styling.rankTitle}>
              <Text style={styling.titleText}>{SustainabilityScoreProfileView[sustainability_score].title}</Text>
            </View>
            <View style={styling.rankProgress}>
              <RankProgressBar progress={global_score} total={nextRankScore} widthRatio={0.5} />
            </View>
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