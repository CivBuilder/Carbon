import * as React from 'react';
import { useState, useEffect } from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View, RefreshControl, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ICON_SIZE = 75;
const PAGE_SIZE = 15;
const STATES = {
  
}



 const API_Entry_RANK_URL = "http://localhost:3000/api/user/rank/"
 const API_Entry_LEADERBOARD_URL = "http://localhost:3000/api/user/leaderboard/"


const KEY = "8" //to remove when we get authentication. this is to debug our get requests


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
    const [like_you_table, setPlayersLikeYouTable] = useState([]); //Empty array of entries 
    const [like_you_range, setLikeYouRange] = useState(null); //[0] = earliest page, [1] = last page
    const [initial_page_loaded, setLikeYouFirstPageFlag] = useState(false);



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
          setLikeYouRange([Math.floor(response_content.ranking/PAGE_SIZE), Math.floor(response_content.ranking/PAGE_SIZE)]);
          setLikeYouFirstPageFlag(true);

          console.log("Rank" + response_content.ranking);
          console.log("Starting Page : " + response_content.ranking/PAGE_SIZE)

          console.log(`Fetch from ${API_Entry_RANK_URL+KEY} was a success!`);

        }
        else if (response.status === 404) {
          setRank(null);
          setSustainabilityScore(null);
          setErrorMessage(`Error: ${response.status} : ${response
            .statusText}`);
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
      if(like_you_range === null) return;
      //Change based on if user extends to top of list or bottom
      console.log(like_you_range);
      let currentPageToLoad = ExtendUpwards ? like_you_range[0] : like_you_range[1];

      if(currentPageToLoad < 0 && ExtendUpwards===true){
        alert("No More Users to load - We're at the top!")
        return; 
      }

      console.log("Fetching Players Like you Table with URL "+API_Entry_LEADERBOARD_URL+currentPageToLoad);
      //This conflicts with React Natives built in refresh icon and it kills me 
      if(ExtendUpwards === false) setLoading(true);

      //Get and handle the response from server
      try{
       const response = await fetch(API_Entry_LEADERBOARD_URL+currentPageToLoad.toString());
       console.log(response.status);
       //Handle the same if there was a successful server request - 204 has no content so just alert the user
       if(response.status === 200) {
        //Change index of next page to load
        if(like_you_range[0] === like_you_range[1]){
          console.log("Pooploop");
          setLikeYouRange([like_you_range[0]-1, like_you_range[1]+1])
        }
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
       if(response.status === 204) {
        setErrorMessage(null);
        alert("No More Further Users.")
       } 
      }catch(err) {
        setErrorMessage(`Error: ${err.message}`);
      }



      setLoading(false);
    }

    /* Handle Button Presses */
    /* These are here so that the table isn't constantly updated everytime the tab is switched*/
    /* When the Ends of the Lists are met, the direct calls to the update functions are called*/
    const HandlePressedButton = (buttonID) => {
      switch(buttonID){
        case 1 :
          setPressedButton(1);
          console.log(like_you_table.length)
          if(like_you_table.length === 0) fetchAndUpdatePlayersLikeYouTable(false);  
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
    const handleRefresh = async () => {
      if(!rank){ 
        fetchUserRank();
      }
      else HandlePressedButton(buttonPressed);
    };



    //Default fetch as this tab starts on the Local Score Tab
    useEffect( () => {handleRefresh()}, []);   
    useEffect( () => {fetchAndUpdateGlobalTable(false)}, [initial_page_loaded]);
    


    return (
      <View backgroundColor = {Colors.secondary.NYANZA} style = {{ flexGrow : 1, flex : 1}}>

        {!errorMessage && 
          <View style = {{flex : 1}}>
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
            <View style = {{backgroundColor : Colors.secondary.NYANZA, flex : 1}}>

              {/* {console.log(players_like_you_table)} */}
              {buttonPressed === 1 &&
                <FlatList 
                  data={like_you_table}
                  renderItem = {renderListEntry}
                  onRefresh = {() => {fetchAndUpdatePlayersLikeYouTable(true)}}
                  refreshing={false}
                  onEndReached={() => {fetchAndUpdatePlayersLikeYouTable(false)}}
                  onEndReachedThreshold={0}
                  style = {{
                    flex : 1
                  }}
                ></FlatList>
              }
            </View>

          </View>
        }
        

        {/* Loading Screen At the bottom below the menu and the list */}
        {loading && 
          <ActivityIndicator size="large" color={Colors.primary.RAISIN_BLACK} style={{
            position: 'absolute',
            zIndex: 999,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            }}/>
        }

        {errorMessage && (
          <ScrollView 
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
          }
          >
            <View
              style = {{
                padding : 75,
                flex : 1,
                justifyContent : 'space-between',
                alignItems : 'center',
                color : Colors.secondary.NYANZA,
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

function renderListEntry({ item }) {  
  return(
    <View style = {styles.ListEntryContainer}>
    {/* // <View> */}
    <Text>
        {item.rank} -  {item.username} - {item.global_score}
    </Text>
    </View>
  );
};








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
    backgroundColor: Colors.secondary.NON_PHOTO_BLUE,
    borderRadius: 10,
    borderBottomEndRadius : 10,
    borderBottomStartRadius : 10,
    // borderTopEndRadius : 50,
    // borderTopStartRadius : 50,
    padding: 15,
    overflow : 'hidden',
    borderColor : Colors.primary.RAISIN_BLACK,
    borderWidth : 0,
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
    borderColor : "#219df4",
    borderWidth : 3,
    backgroundColor : "#219df4",
    width : 'auto',
    justifyContent : 'center',
    alignItems : 'center'
    
  },
  button: {
    flex : 1,
    backgroundColor: '#FFFFFF',
    padding: 2,
    marginHorizontal: 6,
    borderRadius: 25,
  },
  pressedButton : {
    backgroundColor : Colors.secondary.ALMOND,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
  },


  ListEntryContainer : {
    backgroundColor : "#e4f6f8",
    width : 'auto',
    borderWidth : 1,
    borderColor : Colors.secondary.ALMOND,
    borderRadius : 15,
    padding : 8,
    marginHorizontal: 15,
    marginVertical : 8
  }
});