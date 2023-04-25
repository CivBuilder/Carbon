import {Overlay} from "react-native-elements";
import {View, Button, Text, StyleSheet} from "react-native";
export default function RankingCategoryOverlay({toggleOverlay, visible}){

    return (
        <View>
        <Button title="Open Overlay" onPress={toggleOverlay} />
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle = {styles.OverlayContainer}>
            <Text>Hello from Overlay!</Text>
        </Overlay>
        </View>
    );
}


styles = StyleSheet.create({
    OverlayContainer:{
        height : '50%',
        width : '70%',
        alignContent : 'center', 
    }
})