import * as React from 'react';
import { useState, useEffect } from 'react';
import {View} from 'react-native'
import LoadingIndicator from "../../../components/LoadingIndicator";
import getUserScores from './getUserScores';
import MiniRanking from './RankingMiniView';
import { EmissionCategory } from './EmissionScoreCateogory';


export default function HomeScreenRanking({refreshing, setRefreshing}) {

  
    const [userScores, setUserScores] = useState(null);
    const [error, setErrorMessage] = useState(false);    
    const [loading, setLoading] = useState(false);
    const rankCategory = EmissionCategory.GLOBAL; //Display the global score on your card 

    useEffect(() => {
      if(refreshing) {
        getUserScores(setUserScores, setLoading, setErrorMessage);
        setRefreshing(false);
      }
    }, [refreshing, setRefreshing]);

    return (
      <View style= {{height : 160}}>
        {loading ? (
          <LoadingIndicator loading={loading}/>
        ): (
          <MiniRanking userScores={userScores} rankCategory ={rankCategory}/>
        )}
      </View>
    )

}





