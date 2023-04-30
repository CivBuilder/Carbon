import { View, Text, FlatList, Image} from "react-native";
import {Colors} from "../../../styling/Colors";
import { StyleSheet } from "react-native";
import { AvatarView } from "../../../util/AvatarProfileMap";

export default function ListPlayers ({table, onRefresh, onEndReached, category, username}) {
    
    // useEffect()
    return(
        <FlatList 
            data={table}
            renderItem = {({item}) => <RenderListEntry item={item} category={category} username = {username}/>}
            onRefresh = {onRefresh}
            refreshing={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.9}
            style = {{
            }}
            testID="flatlist"
        ></FlatList>
        
    )
}

/* Display for List Entries */
function RenderListEntry({ item, category, username}) {
    //Check if this is the client - if so highlight the entry
    let ClientEntry = false;  
    if(item.username === username || item.username === username) ClientEntry = true;
    return(
      <View testID="list-entry" style = {[styles.ListEntryContainer, ClientEntry && styles.UserListing]}>
      {/* <Text style = {styles.ListTest}>
          {item.rank} -  {item.username} - {item[category.title+"score"]}
      </Text> */}

        <View style = {styles.RankTextView}>
            <Text style ={styles.ListText}>
                {item.rank}
            </Text>
        </View>

        <View style = {styles.avatarView}>
            <Image 
            style ={styles.profileImage}
            source = {AvatarView[item.avatar_index]}
            resizeMode = "contain"
            />
        </View>

        
        <Text style = {styles.NameText}>
            {item.username}
        </Text>

        <Text style = {styles.ScoreText}>
            {item[category.title+"score"]}
        </Text>

      </View>
    );
};


const styles = StyleSheet.create({
    UserListing : {
        backgroundColor : Colors.secondary.DARK_MINT,
        borderTopWidth : 0,
        borderBottomWidth : 0,
    },
    ListEntryContainer : {
        backgroundColor : "#e4f6f8",
        width : 'auto',
        borderTopWidth : 1,
        borderBottomWidth : 1,
        borderColor : Colors.secondary.DARK_MINT,
        borderRadius : 10,
        padding : 8,
        marginHorizontal: 15,
        marginVertical : 8,
        height : 50,
        flexDirection : 'row',
        // justifyContent : 'center',
    },
    ListText : {
        fontSize : 23, 
        fontWeight : 'bold',
        textAlignVertical : 'center',
        textAlign : 'center'
    },
    RankTextView : {
        width : "10%", 
        height : '100%', 
        // backgroundColor : 'cyan'
    },
    avatarView :{
        marginRight: 10,
        width : "15%",
        height : "auto",
        // backgroundColor : "black"
    },
    profileImage : {
        height : "100%",
        width : "100%",
        resizeMode : 'contain',
    },
    NameText : {
        fontSize : 14, 
        height : "100%",
        // backgroundColor : 'yellow',
        textAlignVertical : 'center',
        width : "50%",
        marginRight : 10
    },
    ScoreText : {
        fontSize : 15, 
        fontWeight : 'bold',
        height : '100%',
        flex : 1, 
        textAlignVertical : 'center',
    }
});