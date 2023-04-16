import { View, Text, FlatList } from "react-native";
import {Colors} from "../../../styling/Colors";
const DEFAULT_USERNAME = "sellen7"; //This is for testing purposes to get better code coverage 
const USERNAME = "anon1234" // This is to replaced by the actual username acquired from the session

export default function ListPlayers ({table, onRefresh, onEndReached}) {
    return(
        <FlatList 
            data={table}
            renderItem = {renderListEntry}
            onRefresh = {onRefresh}
            refreshing={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0}
            style = {{
            flex : 1
            }}
            testID="flatlist"
        ></FlatList>
        
    )
}

/* Display for List Entries */
function renderListEntry({ item }) {
    //Check if this is the client - if so highlight the entry
    let ClientEntry = false;  
    if(item.username === USERNAME || item.username === DEFAULT_USERNAME) ClientEntry = true;
    return(
      <View testID="list-entry" style = {[styles.ListEntryContainer, ClientEntry && {backgroundColor : "#FFD700"}]}>
      {/* // <View> */}
      <Text>
          {item.rank} -  {item.username} - {item.global_score}
      </Text>
      </View>
    );
};


styles = {
    UserListing : {
        backgroundColor : Colors.secondary.ALMOND,
        width : 'auto',
        borderRadius : 35, 
        borderWidth : 2, 
        padding : 15, 
    },

    ListEntryContainer : {
        backgroundColor : "#e4f6f8",
        width : 'auto',
        borderWidth : 1,
        borderColor : Colors.secondary.DARK_MINT,
        borderRadius : 15,
        padding : 8,
        marginHorizontal: 15,
        marginVertical : 8
    }
}