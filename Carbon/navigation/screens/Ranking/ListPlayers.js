import { View, Text, FlatList } from "react-native";
import {Colors} from "../../../colors/Colors";
const USERNAME = "sellen7"; //To be removed when we get sessions enabled

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
        ></FlatList>
        
    )
}

/* Display for List Entries */
function renderListEntry({ item }) {
    //Check if this is the client - if so highlight the entry
    let ClientEntry = false;  
    if(item.username === USERNAME) ClientEntry = true;
    return(
      <View style = {[styles.ListEntryContainer, ClientEntry && {backgroundColor : "#FFD700"}]}>
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