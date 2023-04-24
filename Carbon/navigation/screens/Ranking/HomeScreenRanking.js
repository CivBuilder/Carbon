import * as React from 'react';
import { useState, useEffect } from 'react';
import {View} from 'react-native'
import LoadingIndicator from "../../../components/LoadingIndicator";
import getUserScores from './getUserScores';
import MiniRanking from './RankingMiniView';



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

}





