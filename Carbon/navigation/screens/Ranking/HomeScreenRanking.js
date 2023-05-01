import * as React from 'react';
import { useState, useEffect } from 'react';
import { View } from 'react-native'
import LoadingIndicator from "../../../components/LoadingIndicator";
import getUserScores from './getUserScores';
import MiniRanking from './RankingMiniView';
import { EmissionCategory } from './EmissionScoreCateogory';


export default function HomeScreenRanking({ refreshing, setRefreshing }) {


  const [userScores, setUserScores] = useState(null);
  const [error, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialStart, setInitialStart] = useState(true);
  const rankCategory = EmissionCategory.GLOBAL; //Display the global score on your card 

  useEffect(() => {
    if (refreshing || initialStart) {
      getUserScores(setUserScores, setLoading, setErrorMessage);
      setRefreshing(false);
      setInitialStart(false);
    }
  }, [initialStart, refreshing, setRefreshing]);

  return (
    <View>
      {loading ? (
        <LoadingIndicator loading={loading} />
      ) : (
        <MiniRanking userScores={userScores} rankCategory={rankCategory} />
      )}
    </View>
  )

}





