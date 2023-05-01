import { View, Text, VirtualizedList, Image} from "react-native";
import {Colors} from "../../../styling/Colors";

import { StyleSheet} from "react-native";

import { AvatarView } from "../../../util/AvatarProfileMap";

export default function ListPlayers ({table, onRefresh, onEndReached, category, username}) {
    // useEffect()
    return(
        <VirtualizedList
            data={table}
            getItem={(table, index) => table[index]}
            getItemCount={table => table.length}
            keyExtractor={(item, i) => i}
            renderItem = {({item}) => <RenderListEntry item={item} category={category} username = {username}/>}
            onRefresh = {onRefresh}
            refreshing={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.9}
            style = {{
            }}
            testID="list"
        ></VirtualizedList>
    )
}

/* Display for List Entries */
function RenderListEntry({ item, category, username}) {
    //Check if this is the client - if so highlight the entry
    let ClientEntry = false;  
    if(item.username === username || item.username === username) ClientEntry = true;
    return(
      <View testID="list-entry" style = {[styles.ListEntryContainer, ClientEntry && styles.UserListing]}>

        <View style = {styles.RankTextView}>
            <Text style ={styles.ListText}>
                {item.rank}
            </Text>
        </View>

        <Text style = {styles.NameText}>
            {item.username}
        </Text>

        <View style = {styles.avatarView}>
            <Image 
            style ={styles.profileImage}
            source = {AvatarView[item.avatar_index]}
            resizeMode = "contain"
            />
        </View>

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
        marginLeft: 4
    },
    RankTextView : {
        width : "20%", 
        height : '100%', 
        // backgroundColor : 'cyan'
    },
    avatarView :{
        width : "10%",
        height : "auto",
    },
    profileImage : {
        height : "100%",
        width : "100%",
        resizeMode : 'contain',
    },
    NameText : {
        fontSize : 14, 
        height : "100%",
        textAlignVertical : 'center',
        width : "40%",
        marginRight : 10
    },
    ScoreText : {
        fontSize : 15, 
        fontWeight : 'bold',
        height : '100%',
        width : '10%',
        flex : 1, 
        textAlignVertical : 'center',
        textAlign : 'right',
        marginRight : 10,
    }
});