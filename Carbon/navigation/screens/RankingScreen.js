import * as React from 'react';
import { useState, useEffect } from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View, RefreshControl, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ICON_SIZE = 75;
const PAGE_SIZE = 50;
const STATES = {
  
}



 const API_Entry_RANK_URL = "http://localhost:3000/api/user/rank/"
 const API_Entry_LEADERBOARD_URL = "http://localhost:3000/api/user/leaderboard/"


const KEY = "1" //to remove when we get authentication. this is to debug our get requests


export default function RankingScreen({navigation}){
    //State Savers
    const [rank, setRank] = useState(null);
    const [sustainability_score, setSustainabilityScore] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [buttonPressed, setPressedButton] = useState(1); //We'll have the first button pressed be the default one
    const [loading, setLoading] = useState(false);

    //Lists and indexes for fetching lists from the database
    let global_table_page_counter = 0; 
    const [global_table, setGlobalTable] = useState([])
    let players_like_you_page_counter = -1; 
    const [players_like_you_table, setPlayersLikeYouTable] = useState([]); //Empty array of entries 


    /*For when Users see their local  */
    const fetchUserRank = async () => {
      setLoading(true);
      console.log(`Fetching from ${API_Entry_RANK_URL+KEY}`);
      try { 
        const response = await fetch(API_Entry_RANK_URL+KEY);
        if(response.status === 200) {
          const response_content = await response.json(); 
          setRank(response_content.ranking);
          setSustainabilityScore(response_content.sustainability_score);
          setErrorMessage(null);
          players_like_you_page_counter = rank/PAGE_SIZE;
          console.log(`Fetch from ${API_Entry_RANK_URL+KEY} was a success!`);
        }
        else if (response.status === 404) {
          setRank(null);
          setSustainabilityScore(null);
          setErrorMessage(`Error: ${response_content.status} : ${response_content.statusText}`);
          console.log(`Fetch from ${API_Entry_RANK_URL+KEY} Failed, 404: bad ID`);
        }
      } catch(err) {
        setRank(null);
        setSustainabilityScore(null);
        setErrorMessage(`Error: ${err.message}`);
        console.log(`Fetch from ${API_Entry_RANK_URL+KEY} Failed: ${err.message}`);
      }
      setLoading(false);
    }
    

    /* Get the next page from the global table*/ 
    const fetchAndUpdateGlobalTable = async () => {
      console.log(`Fetching Local Table from ${API_Entry_LEADERBOARD_URL+global_table_page_counter.toString()}`);
      setLoading(true);
      try{
        const response = await fetch(API_Entry_LEADERBOARD_URL+global_table_page_counter.toString());
        if(response.status === 200) {
          const response_content = await response.json();
          setGlobalTable(global_table.concat(response_content));
          global_table_page_counter++;
          setErrorMessage(null);
        }
        else if(response.status === 204) {
          alert("No More users to load");
        }
        else if(response.status === 400) {
          alert("Error: Couldn't Fetch User Data : Bad Request");
          global_table_page_counter--;
          setErrorMessage(`Error: ${err.message}`);
        }
      } catch (err) {
          global_table_page_counter--;
          setErrorMessage(`Error: ${err.message}`);
      }
      setLoading(false);
    }


    const fetchAndUpdatePlayersLikeYouTable = async (ExtendUpwards) =>{
      //Change based on if user extends to top of list or bottom
      ExtendUpwards ? players_like_you_page_counter-- : players_like_you_page_counter++; 
      if(players_like_you_page_counter < 0){
        alert("No More Users to load - We're at the top!")
        return; 
      }
      console.log(`Fetching Players Like You Table from ${API_Entry_LEADERBOARD_URL+players_like_you_page_counter.toString()}`);
      setLoading(true);

      //Get and handle the response from server
      try{
       const response = await fetch(API_Entry_LEADERBOARD_URL+players_like_you_page_counter.toString());
       
       //Handle the same if there was a successful server request - 204 has no content so just alert the user
       if(response.status === 200) {
        const response_content = await response.json();
        if(ExtendUpwards)
          setPlayersLikeYouTable(response_content.concat(players_like_you_table));
        else 
          setPlayersLikeYouTable(players_like_you_table.concat(response_content));
        
        setErrorMessage(null);
       }
       if(response.status === 204) {
        setErrorMessage(null);
        alert("No More Further Users.")
       } 
      }catch(err) {
        global_table_page_counter--;
        setErrorMessage(`Error: ${err.message}`);
      }

      console.log(players_like_you_table);
      console.log(players_like_you_page_counter);

      setLoading(false);
    }

    /* Handle Button Presses */
    /* These are here so that the table isn't constantly updated everytime the tab is switched*/
    /* When the Ends of the Lists are met, the direct calls to the update functions are called*/
    const HandlePressedButton = (buttonID) => {
      switch(buttonID){
        case 1 :
          setPressedButton(1);
          if(players_like_you_table.length === 0) fetchAndUpdatePlayersLikeYouTable(false);  
          break;
        case 2  :
          setPressedButton(2);
          if(global_table.length === 0) fetchAndUpdateGlobalTable();
          break;
        case 3 :
          //TODO : Social Feature for Ranking System
          setPressedButton(3);
          break;
      }
    }

    /*On an error Screen(Not an alert) Users can swipe down to refresh, this just ensure it will return their last screen */
    const handleRefresh = () => {
      fetchUserRank().then();
      if(!errorMessage) HandlePressedButton(buttonPressed);
    };

    //Default fetch as this tab starts on the Local Score Tab
    useEffect( () => {handleRefresh()}, []);


    const renderItem = ({ item }) => (
      <Text>
        {item.rank} -  {item.username} - {item.global_score}
      </Text>
    );

    return (
      <View>

        {!errorMessage && 
          <View>
            <View style = {styles.CategoryHighlights}>
              
                <View style = {styles.buttonContainer}> 
                  <TouchableOpacity style={[styles.button, buttonPressed === 1 && styles.pressedButton]}
                      onPress={() => {HandlePressedButton(1)}}
                  >
                    <Text style={styles.buttonText}>Players Like You</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button, buttonPressed === 2 && styles.pressedButton]}
                    onPress={() => {HandlePressedButton(2)}}
                  >
                    <Text style={styles.buttonText}>Top Scorers</Text>
                  </TouchableOpacity>


                  <TouchableOpacity style={[styles.button, buttonPressed === 3 && styles.pressedButton]}
                    onPress={() => {HandlePressedButton(3)}}
                  >
                    <Text style={styles.buttonText}>Social</Text>
                  </TouchableOpacity>
                </View>


              {/*Display the USERS RANK*/}
              { buttonPressed === 1 &&
                <View>
                <Text style = {styles.HeaderText}>

                  {/* TODO : Hash title from the sustainability score retrieved from fetch request*/}
                  As A [Title]....{"\n"}
                  Your Rank is
                </Text>

                <Text style = {styles.RankText}>
                  {rank}
                </Text>
              </View>
              }

            {/* Display the Top users */}
            {buttonPressed === 2}


            {/* Display a list of you and your friends */}
            {buttonPressed === 3 &&
              <Text style = {styles.HeaderText}>
                Coming Soon!
              </Text>               
            }

            </View>

            {/*Display the Ranks in a list view in a lower container*/}
            <View>

              {/* {console.log(players_like_you_table)} */}
              <FlatList 
                data={players_like_you_table}
                renderItem = {renderItem}
                // onRefresh = {() => {fetchAndUpdatePlayersLikeYouTable(true)}}
                // refreshing={loading}
                onEndReached={() => {fetchAndUpdatePlayersLikeYouTable(false); console.log("Refreshing end of page")}}
                onEndReachedThreshold={0.95}
              ></FlatList>

            </View>

          </View>
        }
        

        {/* Loading Screen At the bottom below the menu and the list */}
        {loading &&
          <ActivityIndicator size="large" color={Colors.primary.RAISIN_BLACK}/>
        }

        {errorMessage && (
          <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
          }
          >
            <View
              style = {{
                padding : 50,
                flex : 1,
                justifyContent : 'center',
                alignItems : 'center',
              }}
            >
              <Ionicons name="sad-outline" size = {ICON_SIZE}></Ionicons>
              <Text
                onPress={() => fetchUserRank()}
              >
                {errorMessage}{"\n"}
                Swipe Down the Refresh Page
              </Text>
            </View>

          </ScrollView>
        )}

      </View>
    );
}









//Colors before file restructuring
const Colors = {
  primary : {
    MINT : "#74C69D",
    RAISIN_BLACK : "#201B1B",
    MINT_CREAM : "#F7FCF8",
  },
  secondary : {
    CELADON : "#B1E7B9",
    NON_PHOTO_BLUE : "#B2E4EE",
    ALMOND : "#F7DFC5",
    LIGHT_MINT : "#8BD0AD", 
    DARK_MINT : "#51B885",
    NYANZA : "#D8F3DC",
  }
}



const styles = StyleSheet.create({
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

  CategoryHighlights : {
    backgroundColor: Colors.secondary.LIGHT_MINT,
    borderRadius: 10,
    borderBottomEndRadius : 50,
    borderBottomStartRadius : 50,
    padding: 10,
  },

  UserListing : {
    backgroundColor : Colors.secondary.ALMOND,
    width : 'auto',
    borderRadius : 35, 
    borderWidth : 2, 
    padding : 15, 
  },

  buttonContainer: {
    overflow : 'hidden',
    flexDirection: 'row',
    borderRadius: 30,
    borderColor : Colors.primary.RAISIN_BLACK,
    borderWidth : 2,
    backgroundColor : Colors.secondary.RAISIN_BLACK,
    width : 'auto',
    justifyContent : 'center',
    alignItems : 'center'
  },
  button: {
    flex : 1,
    backgroundColor: '#FFFFFF',
    padding: 3,
    marginHorizontal: 1,
  },
  pressedButton : {
    backgroundColor : Colors.secondary.ALMOND,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
  },
});