import * as React from 'react';
import { useState, useEffect } from 'react';
import { View } from 'react-native'
import LoadingIndicator from "../../../components/LoadingIndicator";
import getUserScores from './getUserScores';
import MiniRanking from './RankingMiniView';
import { EmissionCategory } from './EmissionScoreCategory';

export default function HomeScreenRanking() {
  const [userScores, setUserScores] = useState(null);
  const [error, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const rankCategory = EmissionCategory.GLOBAL; //Display the global score on your card 

  useEffect(() => {
    getUserScores(setUserScores, setLoading, setErrorMessage);
  }, []);

    useEffect(() => {
        getUserScores(setUserScores, setLoading, setErrorMessage);
    }, []);

    return (
      <View style= {{height : 160}} testID='home-screen-ranking'>
        <MiniRanking userScores={userScores} rankCategory ={rankCategory}/>
        <LoadingIndicator loading={loading}/>
      </View>
    )

}





