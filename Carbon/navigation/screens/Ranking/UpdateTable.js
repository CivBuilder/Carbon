import { API_URL } from '../../../config/Api';
const API_Entry_LEADERBOARD_URL = API_URL + "user/leaderboard";
import { EmissionCategory as EC, ListTabIDs } from './Categories';

/**
 * @function updateTable - updates the table Array such that
 * @param {Function} setLeaderboardTables 
 * @param {EmissionCategory} currentCategory 
 * @param {Int} currentTab 
 * @param {EmissionCategory} fresh_start 
 * @param {Bool} ExtendUpwards
 * @returns 
 */
export default async function updateTable(setLeaderboardTables, leaderboardTables, currentCategory, currentTab, fresh_start, ExtendUpwards, setLoading, setErrorMessage){
  
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
    else{
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
