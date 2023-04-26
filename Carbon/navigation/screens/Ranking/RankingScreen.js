import * as React from 'react';
import { useState, useEffect } from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View, RefreshControl, TouchableOpacity, FlatList} from 'react-native';
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
const API_Entry_RANK_URL = API_URL + "user/rank/";
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
  // console.log(leaderboardTables, currentCategory, currentTab, fresh_start, ExtendUpwards);

  // console.log(typeof table);
  // console.log(table);
  // console.log(JSON.stringify(leaderboardTables, null, 2));
  // console.log(JSON.stringify(leaderboardTables[2],null,2));

  let table = leaderboardTables[currentCategory.id][currentTab];
  let page = fresh_start !== null ? fresh_start : ExtendUpwards ? table.indices[0] : table.indices[1];
  if(ExtendUpwards === false) setLoading(true); //Don't have two loading screens at once

  console.log(JSON.stringify(table, null, 2));
  console.log(page);
  
  //Get the category and if we are in the worst tab to send has headers
  let category = currentCategory.title+"score";
  let worstList = (currentTab === ListTabIDs.WORST_PLAYERS); 

  try {
    const response = await fetch(API_Entry_LEADERBOARD_URL+`?page=${page}&category=${category}&worst=${worstList}`)
    console.log(response.status);
  }
  //for any other server errors, just set the error screen
  catch(err) {
    setErrorMessage(`Error: ${err.message}`);
  }
  setLoading(false);
  return;



  //Display Error if we try to grow upwards when we're at the very first page
  if(currentPageToLoad < 0 && ExtendUpwards===true){
    alert("No More Users to load - We're at the top!")
    return; 
  }

  console.log("Fetching Players Like you Table with URL "+API_Entry_LEADERBOARD_URL+currentPageToLoad);
  

  //Get and handle the response from server
  try{
    const response = await fetch(API_Entry_LEADERBOARD_URL+currentPageToLoad.toString());

    //Update table and indices for pages on a successful request
    if(response.status === 200) {

      //If the beginning and ending indices are the same, move them both apart
      if(like_you_range[0] === like_you_range[1]){
        setLikeYouRange([like_you_range[0]-1, like_you_range[1]+1])
      }
      //Otherwise just move in which direction we updated the table
      else{
        ExtendUpwards? setLikeYouRange([like_you_range[0]-1, like_you_range[1]]) : setLikeYouRange([like_you_range[0], like_you_range[1]+1]);  
      }
      
      //Merge arrays
      const response_content = await response.json();
      if(ExtendUpwards)
        setPlayersLikeYouTable(response_content.concat(like_you_table));
      else 
        setPlayersLikeYouTable(like_you_table.concat(response_content));

      setErrorMessage(null);
    }

    //Just alert the users if we have no more content to retrieve
    if(response.status === 204) {
      setErrorMessage(null);
      alert("No More Further Users.")
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
    // const [rank, setRank] = useState(null);
    // const [sustainability_score, setSustainabilityScore] = useState(null);
    const [userScores, setUserScores] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [emission_category, setEmissionCategory] = useState(EC.GLOBAL);
    const [loading, setLoading] = useState(false);
    const [leaderboardTables, setLeaderboardTables] = useState(Array.from({length: 5}, () => Array.from({length: 3}, () => new RankingList())));
    const [currentTab, setCurrentTab] = useState(ListTabIDs.PLAYERS_LIKE_YOU);





    // //Default fetch as this tab starts on the Local Score Tab
    useEffect( () => {getUserScores(setUserScores, setLoading, setErrorMessage);}, []);   
    useEffect( () => {
      if(userScores === null) return;
      
      console.log(JSON.stringify(userScores, null, 2)); 
      // updateTable(setLeaderboardTables,leaderboardTables);
      //Start at the page based on why 
      Object.values(EC).forEach((Cat)=>{
        updateTable(setLeaderboardTables, leaderboardTables, Cat, ListTabIDs.PLAYERS_LIKE_YOU, Math.floor(userScores[Cat.title+"ranking"]/PAGE_SIZE), false, setLoading, setErrorMessage);
        updateTable(setLeaderboardTables, leaderboardTables, Cat, ListTabIDs.TOP_PLAYERS, 0, false, setLoading, setErrorMessage); 
        updateTable(setLeaderboardTables, leaderboardTables, Cat, ListTabIDs.WORST_PLAYERS, 0, false, setLoading, setErrorMessage);
      })
    }, [userScores])

    

    if(userScores === null) return (
      <LoadingIndicator loading={loading}/>
    );

    if(errorMessage !== null) return (
      <ServerErrorScreen onRefresh={() =>{getUserScores(setUserScores, setErrorMessage)}}/>
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

      <View style={styles.ListContentContainer}>
          <Text> Poop</Text>
      </View>

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
  
  

// {!errorMessage && 
//   <View style = {{flex : 1}}>

//     {/* Houses Buttons and the Category Highlights */}
//     <View style = {styles.CategoryHighlights}>              
    
//         {/* Buttons to Switch Tabs */}
//         <View style = {styles.buttonContainer}> 
//           <TouchableOpacity style={[styles.button, buttonPressed === 1 && styles.pressedButton]}
//               onPress={() => {HandlePressedButton(1)}}
//               testID = "likeYouButton"
//           >
//             <Text style={[styles.buttonText, buttonPressed === 1 && styles.pressedButtonText]}>Players Like You</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={[styles.button, buttonPressed === 2 && styles.pressedButton]}
//             onPress={() => {HandlePressedButton(2)}}
//             testID = "globalButton"
//           >
//             <Text style={[styles.buttonText, buttonPressed === 2 && styles.pressedButtonText ]}>Top Scorers</Text>
//           </TouchableOpacity>


//           <TouchableOpacity style={[styles.button, buttonPressed === 3 && styles.pressedButton]}
//             onPress={() => {HandlePressedButton(3)}}
//             testID = "socialButton"
//           >
//             <Text style={[styles.buttonText, buttonPressed === 3 && styles.pressedButtonText ]}>Social</Text>
//           </TouchableOpacity>
//         </View>



//     </View>

//     {/*Display the Ranks in a list view in a lower container*/}
//     <View style = {{backgroundColor : Colors.secondary.NYANZA, flex : 1}}>

//       {/*Like You Table Display*/}
//       {buttonPressed === 1 && 
//       <ListPlayers
//         table = {like_you_table}
//         onRefresh ={() =>{fetchAndUpdatePlayersLikeYouTable(true);}}
//         onEndReached = {() => {fetchAndUpdatePlayersLikeYouTable(false)}}
//       />}

//       {/*Global Table Display*/}
//       {buttonPressed === 2 &&
//         <ListPlayers
//         table = {like_you_table}
//         onRefresh = {null}
//         onEndReached = {() => {fetchAndUpdateGlobalTable()}}
//       />
//       }

//       {/*Social Table Display*/}
//       {buttonPressed === 3 && <View></View>}

//     </View>

//   </View>
// }


// {/* Loading Screen*/}
// <LoadingIndicator loading = {loading}/>


/* Update the player Table - Takes in param saying which direction we are extending*/
async function fetchAndUpdatePlayersLikeYouTable (like_you_range, setLikeYouRange, ExtendUpwards, setLoading, setErrorMessage) {
 
  
}

    /***************************************Server Requests***************************************/
    // //Get's User Rank - Any Response other than 200 will cause page to show Error Screen
    // const fetchUserRank = async () => {
    //   setLoading(true);
    //   console.log(`Fetching from ${API_Entry_RANK_URL+KEY}`);

    //   //Get result from Server via Fetch
    //   try { 

    //     // Changing rank to use the new JWT
    //     const response = await fetch(API_Entry_RANK_URL, await getAuthHeader());

    //     //Set Rank and first table to load on the "Like You" page for the table
    //     if(response.status === 200) {
    //       const response_content = await response.json(); 
    //       console.log(response_content);
          
    //       setRank(response_content.ranking);
    //       setSustainabilityScore(response_content.sustainability_score);
    //       setErrorMessage(null);          
    //       setLikeYouRange([Math.floor(response_content.ranking/PAGE_SIZE), Math.floor(response_content.ranking/PAGE_SIZE)]);
    //       setLikeYouFirstPageFlag(true);

    //       console.log(`Fetch from ${API_Entry_RANK_URL+KEY} was a success!`);
    //     }
    //     //Handle Error thrown from Server
    //     else if (response.status === 404) {
    //       setRank(null);
    //       setSustainabilityScore(null);
    //       setErrorMessage(`Error: ${response.status} : ${response.statusText}`);
    //       console.log(`Fetch from ${API_Entry_RANK_URL+KEY} Failed, 404: bad ID`);
    //     }
    //   } 
    //   //Handle any other errors not necessarily from Server
    //   catch(err) {
    //     setRank(null);
    //     setSustainabilityScore(null);
    //     setErrorMessage(`Error: ${err.message}`);
    //     console.log(`Fetch from ${API_Entry_RANK_URL+KEY} Failed: ${err.message}`);
    //   }
    //   setLoading(false);
    // }
    


    // /* Get the next page from the global table 200/204 OK*/ 
    // const fetchAndUpdateGlobalTable = async () => {
    //   setLoading(true);
    //   try{
    //     const response = await fetch(API_Entry_LEADERBOARD_URL+global_table_page_counter.toString());
        
    //     //Add to our list on a successful get request
    //     if(response.status === 200) {
    //       const response_content = await response.json();
    //       setGlobalTable(global_table.concat(response_content));
    //       setGlobalTableCounter(global_table_page_counter+1);
    //       setErrorMessage(null);
    //     }
    //     //Server Response if you have a page with no elements in it - No Content
    //     else if(response.status === 204) {
    //       alert("No More users to load");
    //     }
    //     //Set error if we go out of bounds on the server request
    //     else if(response.status === 400) {
    //       alert("Error: Couldn't Fetch User Data : Bad Request");
    //       setGlobalTableCounter(global_table_page_counter-1)
    //       setErrorMessage(`Error: ${err.message}`);
    //     }
    //     //Set Error on any server failure
    //   } catch (err) {
    //       setGlobalTableCounter(global_table_page_counter-1);
    //       setErrorMessage(`Error: ${err.message}`);
    //   }
    //   setLoading(false);
    // }
























