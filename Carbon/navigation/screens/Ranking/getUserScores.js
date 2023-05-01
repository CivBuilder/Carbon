import { getAuthHeader } from '../../../util/UserManagement';
import { API_URL } from '../../../config/Api';

const API_Entry_RANK_URL = API_URL + "user/rank/";

/**
 * 
 * @param {Function} setUserScores - Rank, sustainability, global_score & nextRankScore to be stored from fetch 
 * @param {Function} setLoading - to be set to true when function starts and false before it returns
 * @param {Function} setErrorMessage - Only set to true if fetch was not handled
 */
export default async function getUserScores(setUserScores, setLoading, setErrorMessage){
    setLoading(true);
    console.log(`Fetching from ${API_Entry_RANK_URL}`);
  
    //Get result from Server via Fetch
    try { 
  
      // Changing rank to use the new JWT
      const response = await fetch(API_Entry_RANK_URL, await getAuthHeader());
  
      //Set Rank and first table to load on the "Like You" page for the table
      if(response.status === 200) {
        const response_content = await response.json(); 
        setUserScores(response_content);      
        console.log(`Fetch from ${API_Entry_RANK_URL} was a success!`);
        setErrorMessage(null);
      }
      else{
        throw new Error(`Fetch from ${API_Entry_RANK_URL} Failed, Error: ${response.status}`)
      }
    }
    //Handle any other errors not necessarily from Server
    catch(err) {
      setUserScores(null);
      setErrorMessage(`${err.message}`);
      console.log(`${err.message}`);
    }
  setLoading(false);
}

