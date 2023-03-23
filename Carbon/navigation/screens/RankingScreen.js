import * as React from 'react';
import { useState, useEffect } from 'react';
import {ScrollView, StyleSheet, Text, View, RefreshControl, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ICON_SIZE = 75;


// const API_Entry_URL = "http://192.168.0.232:3000/api/user/rank/"
 const API_Entry_URL = "http://localhost:3000/api/user/rank/"

const KEY = "1" //to remove when we get authentication. this is to debug our get requests


export default function RankingScreen({navigation}){
    const [rank, setRank] = useState(null);
    const [sustainability_score, setSustainabilityScore] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [inRefresh, setIsRefreshing] = useState(false);
  

    const fetchUserRank = async () => {
      console.log(`Fetching from ${API_Entry_URL+KEY}`);
      try { 
        const response = await fetch(API_Entry_URL+KEY);
        if(response.status === 200) {
          const response_content = await response.json(); 
          setRank(response_content.ranking);
          setSustainabilityScore(response_content.sustainability_score);
          setErrorMessage(null);
          console.log(`Fetch from ${API_Entry_URL+KEY} was a success!`);
        }
        else if (response.status === 404) {
          setRank(null);
          setSustainabilityScore(null);
          setErrorMessage(`Error: ${response_content.status} : ${response_content.statusText}`);
          console.log(`Fetch from ${API_Entry_URL+KEY} Failed, 404: bad ID`);
        }
      } catch(err) {
        setRank(null);
        setSustainabilityScore(null);
        setErrorMessage(`Error: ${err.message}`);
        console.log(`Fetch from ${API_Entry_URL+KEY} Failed: ${err.message}`);
      }
    }

    const handleRefresh = () => {
      setIsRefreshing(true);
      fetchUserRank().then(() => setIsRefreshing(false));
    };

    useEffect( () => {fetchUserRank();}, []);

    return (
      <View>
        {rank && 
          <View>
            <View style = {styles.LeaderBoardHighlights}>
              
                <View style = {styles.buttonContainer}> 
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Your Score</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Top Scorers</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Social</Text>
                  </TouchableOpacity>
                </View>


              <Text
                style = {{
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign : 'center',
                  fontSize : 18,
                  fontWeight : 'bold'
                }}
                >
                Your Rank is: {rank}{"\n"}
                Your Sustainability Score is {sustainability_score}
              </Text>
            </View>

            <View>
              <Text>
                hello lol
              </Text>
            </View>
          </View>

          
          // <View>
          //   <Text>
          //     Your Rank is: {rank}{"\n"}
          //     Your Sustainability Score is {sustainability_score}
          //   </Text>
          // </View>

        }
        
        {errorMessage && (
          <ScrollView
          refreshControl={
            <RefreshControl refreshing={inRefresh} onRefresh={handleRefresh} />
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
  LeaderBoardHighlights : {
    backgroundColor: Colors.secondary.LIGHT_MINT,
    borderRadius: 10,
    borderBottomEndRadius : 50,
    borderBottomStartRadius : 50,
    padding: 10,
  },


  buttonContainer: {
    overflow : 'hidden',
    flexDirection: 'row',
    borderRadius: 30,
    borderColor : Colors.primary.RAISIN_BLACK,
    borderWidth : 2,
    backgroundColor : Colors.secondary.ALMOND,
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
  buttonText: {
    color: '#000000',
    textAlign: 'center',
  },
});