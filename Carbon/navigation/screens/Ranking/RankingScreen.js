import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import ServerErrorScreen from '../../../components/ServerErrorScreen';
import LoadingIndicator from "../../../components/LoadingIndicator";
import {Colors} from "../../../styling/Colors";
import ListPlayers from './ListPlayers';
import { API_URL } from '../../../config/Api';
import getUserScores from './getUserScores';
import MiniRanking from './RankingMiniView';
import SwitchSelector from "react-native-switch-selector";
import RankingCategoryOverlay from './RankCategoryOverlay';
import { EmissionCategory as EC, EmissionCategory } from './EmissionScoreCateogory';
import RankingList from './RankingTableClass';

const PAGE_SIZE = 15;

const API_Entry_LEADERBOARD_URL = API_URL + "user/leaderboard";


//For Testing - We must get these when establishing a user session. This data is in the database for testing
const KEY = "8";
const USERNAME = "sellen7";

const ListTabIDs = {
  PLAYERS_LIKE_YOU : 0, 
  TOP_PLAYERS : 1, 
  WORST_PLAYERS : 2,
} 


/**
 * @function updateTable - updates the table Array such that
 * @param {Function} setLeaderboardTables 
 * @param {EmissionCategory} currentCategory 
 * @param {Int} currentTab 
 * @param {EmissionCategory} fresh_start 
 * @param {Bool} ExtendUpwards
 * @returns 
 */



async function updateTable(setLeaderboardTables, leaderboardTables, currentCategory, currentTab, fresh_start, ExtendUpwards, setLoading, setErrorMessage){
  
  //Get the category and if we are in the worst tab to send has headers
  let category = currentCategory.title+"score";
  let worstList = (currentTab === ListTabIDs.WORST_PLAYERS); 
  let categoryItem = leaderboardTables[currentCategory.id][currentTab];

  
  // let table = [...(leaderboardTables[currentCategory.id][currentTab])];
  let page = fresh_start !== null ? fresh_start : ExtendUpwards ? categoryItem.indices[0] : categoryItem.indices[1];
  if(ExtendUpwards === false) setLoading(true); //Don't have two loading screens at once

  if(page < 0 && ExtendUpwards === true ){
    alert("No more players to load ~ We're at the top!");
    return;
  }
  
  try {
    
    if(page < 0 && ExtendUpwards === true ){
      throw new Error(`No more players to load ~ We're at the top ${topMessage}!`);
    }
      const response = await fetch(API_Entry_LEADERBOARD_URL+`?page=${page}&category=${category}&worst=${worstList}`)

    if(response.status === 200) {

      //get the package
      const response_content = await response.json();

      // //Concat to the end of our array if we refresh by reaching the end of the list, otherwise prepend the array
      if(fresh_start !== null) categoryItem.entries = response_content;
      else if (ExtendUpwards === false)  
        categoryItem.entries = categoryItem.entries.concat(response_content);
      else categoryItem.entries = response_content.concat(categoryItem.entries);

      //Start of a new list ,move both beginning and ending indices
      if(fresh_start !== null) {
        categoryItem.indices = [fresh_start-1, fresh_start+1];
      }
      else if(ExtendUpwards) {
        categoryItem.indices[0]--;
      }
      else categoryItem.indices[1]++;

      let copiedArray = leaderboardTables.map(obj => ({...obj}));
      setLeaderboardTables(copiedArray);
    }
    else if (response.status === 404){
      throw new Error(`Error: ${response.status} : ${response.statusText}`);
    }
  }
  //for any other server errors, just set the error screen
  catch(err) {
    setErrorMessage(`Error: ${err.message}`);
  }
  setLoading(false);
  return;
}


export default function RankingScreen({navigation, route}){



    /***************************************State Savers***************************************/
    const [userScores, setUserScores] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [emission_category, setEmissionCategory] = useState(EC.GLOBAL);
    const [loading, setLoading] = useState(false);
    const [leaderboardTables, setLeaderboardTables] = useState(Array.from({length: 5}, () => Array.from({length: 3}, () => new RankingList())));
    const [currentTab, setCurrentTab] = useState(ListTabIDs.PLAYERS_LIKE_YOU);
    const [doneInit, setInitDone] = useState(null)




    // //Default fetch as this tab starts on the Local Score Tab
    useEffect( () => {getUserScores(setUserScores, setLoading, setErrorMessage);}, []);   
    useEffect( () => {
      if(userScores === null) return;
      
      // console.log(JSON.stringify(userScores, null, 2)); 
      // updateTable(setLeaderboardTables,leaderboardTables);
      //Start at the page based on why 
      Object.values(EC).forEach((Cat)=>{
        updateTable(setLeaderboardTables, leaderboardTables, Cat, ListTabIDs.PLAYERS_LIKE_YOU, Math.floor(userScores[Cat.title+"ranking"]/PAGE_SIZE), false, setLoading, setErrorMessage);
        updateTable(setLeaderboardTables, leaderboardTables, Cat, ListTabIDs.TOP_PLAYERS, 0, false, setLoading, setErrorMessage); 
        updateTable(setLeaderboardTables, leaderboardTables, Cat, ListTabIDs.WORST_PLAYERS, 0, false, setLoading, setErrorMessage);
      })
      setInitDone(true);
    }, [userScores])


    useEffect( () => {
      if(leaderboardTables[0][0].entries.length !== 0){
        // console.log(JSON.stringify(leaderboardTables[0][0], null, 2));
      }
    }, [leaderboardTables])
    


    if(userScores === null) return (
      <LoadingIndicator loading={loading}/>
    );

    if(errorMessage !== null) return (
      <View>
        <ServerErrorScreen onRefresh={() =>{getUserScores(setUserScores, setLoading, setErrorMessage)}} errorMessage={errorMessage}/>
        <LoadingIndicator loading={loading}/>
      </View>
    );

    return (
    
    <View style = {{flex : 1}}>

      {/* Header with Toggling Overlay */}
      <View style = {{height : 100, backgroundColor : 'white', flexDirection : 'row-reverse'}}>
        <View style = {{flex : 0.10, marginRight : 10, justifyContent : 'flex-end', paddingBottom: 15}}>
          <RankingCategoryOverlay setEmissionCategory={setEmissionCategory}/>
        </View>
      </View>


      <View>
        <View style = {styles.MiniRankContainer}>
          {/* Replace with the  */}
          <MiniRanking userScores={userScores} rankCategory={emission_category}/> 
        </View>
        
        <View style = {{margin : 5}}>
          <SwitchSelector
            initial={ListTabIDs.PLAYERS_LIKE_YOU}
            onPress={value => {setCurrentTab(value)}}
            textColor={"white"} //'#7a44cf'
            selectedColor={"black"}
            buttonColor={"white"}
            borderColor={Colors.secondary.DARK_MINT}
            backgroundColor={"#0096FF"} //Bright blue
            hasPadding={true}
            options={[
              { label: "Players Like You", value: ListTabIDs.PLAYERS_LIKE_YOU},
              { label: "Top Players", value: ListTabIDs.TOP_PLAYERS},
              { label: "Worst Players", value : ListTabIDs.WORST_PLAYERS}
            ]}
            testID="gender-switch-selector"
            accessibilityLabel="gender-switch-selector"
            animationDuration = {150}
            height = {36}
          />
        </View>
      </View> 

      <ListPlayers 
        onRefresh={()=>{updateTable(setLeaderboardTables, leaderboardTables, emission_category, currentTab, null, true, setLoading, setErrorMessage)}}
        onEndReached={() =>{updateTable(setLeaderboardTables, leaderboardTables, emission_category, currentTab, null, false, setLoading, setErrorMessage)}}
        table={leaderboardTables[emission_category.id][currentTab].entries}
        category = {emission_category}
        username={userScores.username}
      />

      <LoadingIndicator loading={loading}/>
    </View>);
}



  const styles = StyleSheet.create({
    MiniRankContainer : { 
      height : 180,
      // backgroundColor : Colors.secondary.NYANZA,
      padding : 12,
    },
    ListContentContainer : {
      flex : 1,
      backgroundColor : "black",
      paddingTop : 5,
    },
    HeaderText : {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign : 'center',
      fontSize : 18,
      fontWeight : 'bold'
    },
  
    RankText : {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign : 'center',
      fontWeight : 'bold',
      fontSize : 45,
    },
  
    buttonContainer : {
      flex : 0.04,
      backgroundColor : Colors.secondary.RED,
      width : '90%',
      alignSelf : 'center',
      borderRadius : 7,
      flexDirection : 'row',
    },
  
    buttonText: {
      color: '#FFFFFF',
      textAlign: 'center',
    },

  
  });
