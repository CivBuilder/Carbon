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
import { EmissionCategory as EC } from './EmissionScoreCateogory';


const PAGE_SIZE = 15;
const API_Entry_RANK_URL = API_URL + "user/rank/";
const API_Entry_LEADERBOARD_URL = API_URL + "user/leaderboard/";


//For Testing - We must get these when establishing a user session. This data is in the database for testing
const KEY = "8";
const USERNAME = "sellen7";

const ListTabIDs = {
  PLAYERS_LIKE_YOU : 1, 
  TOP_PLAYERS : 2, 
  WORST_PLAYERS : 3,
} 


export default function RankingScreen({navigation, route}){



    /***************************************State Savers***************************************/
    // const [rank, setRank] = useState(null);
    // const [sustainability_score, setSustainabilityScore] = useState(null);
    const [userScores, setUserScores] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [emission_category, setEmissionCategory] = useState(EC.GLOBAL);
    const [loading, setLoading] = useState(false);
    const [leaderboardTables, setLeaderboardTables] = useState()


    //Lists and indexes for fetching lists from the database
      //For "Top Players" page
      const [global_table, setGlobalTable] = useState([])
      const [global_table_page_counter, setGlobalTableCounter] = useState(0);
      //For "Players Like You" page
      const [like_you_table, setPlayersLikeYouTable] = useState([]); //Empty array of entries 
      const [like_you_range, setLikeYouRange] = useState(null); //[0] = earliest page, [1] = last page


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


    /**********************State Dependant Helper Functions *****************************/
    /* Handle Button Presses */
    /* These are here so that the table isn't constantly updated everytime the tab is switched*/
    /* When the Ends of the Lists are met, the direct calls to the update functions are called*/
    // const HandlePressedButton = (buttonID) => {
    //   switch(buttonID){
    //     case 1 :
    //       setPressedButton(1);
    //       if(like_you_table.length === 0) fetchAndUpdatePlayersLikeYouTable(false);  
    //       break;
    //     case 2  :
    //       setPressedButton(2);
    //       if(global_table.length === 0) fetchAndUpdateGlobalTable();
    //       break;
    //     case 3 :
    //       //TODO : Social Feature for Ranking System
    //       setPressedButton(3);
    //       break;
    //   }
    // }



    // //Default fetch as this tab starts on the Local Score Tab
    useEffect( () => {getUserScores(setUserScores, setLoading, setErrorMessage)}, []);   
    // useEffect( () => {
      
    // })
    // useEffect( () => {fetchAndUpdatePlayersLikeYouTable(false)}, [initial_page_loaded]);
    

    if(userScores === null) return (
      <LoadingIndicator loading={loading}/>
    );

    if(errorMessage !== null) return (
      <ServerErrorScreen onRefresh={() =>{getUserScores(setUserScores, setLoading, setErrorMessage)}}/>
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
            initial={0}
            // onPress={value => this.setState({ gender: value })}
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


// {/* Displays Sad Screen Prompting Refresh on any server Error */}
// {errorMessage && 
//   //Make sure we refresh on the same page as last time
//   <ServerErrorScreen testID = "error_screen"
//     onRefresh = {async () => {
//       if(!rank) fetchUserRank();
//       else HandlePressedButton(buttonPressed);
//     }}
//     errorMessage = {errorMessage}
//   />}

/* Update the player Table - Takes in param saying which direction we are extending*/
async function fetchAndUpdatePlayersLikeYouTable (like_you_range, setLikeYouRange, ExtendUpwards, setLoading, setErrorMessage) {
 
  if(like_you_range === null) return;           //Do nothing with no bounds
  if(ExtendUpwards === false) setLoading(true); //Don't have two loading screens at once
 
  //Expand either the top or bottom
  let currentPageToLoad = ExtendUpwards ? like_you_range[0] : like_you_range[1]; 

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
























