import { Dimensions, StyleSheet, Platform } from 'react-native';
import { Colors } from '../colors/Colors';

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const margin = 12;
export const marginHorizontal = 18;

export const styles = StyleSheet.create({
    /*********************
        SCREEN STYLING
    **********************/
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginHorizontal: marginHorizontal,
        marginVertical: margin,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    link: {
        color: Colors.primary.MINT,
        fontSize: 14,
    },
    container: {
        marginHorizontal: marginHorizontal,
        backgroundColor: "white",
        borderRadius: 16,
        // ...Platform.select({
        //     ios: {
        //         shadowColor: Colors.primary.RAISIN_BLACK,
        //         shadowOffset: { width: 5, height: 5 },
        //         shadowOpacity: 0.125,
        //         shadowRadius: 2.5,
        //     },
        //     android: {
        //         elevation: 5,
        //     },
        // }),
    },
    card: {
        width: windowWidth - (marginHorizontal * 2),
        height: 300,
        borderRadius: 16,
    },
    margins: {
        marginHorizontal: marginHorizontal,
        marginVertical: margin,
    },

    /*********************
        CHART STYLING
    **********************/
    chart: {
        margin: margin,
    },

    /**************************
        POP-UP MENU STYLING
    ***************************/
    popup_modal: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.primary.RAISIN_BLACK,
        backgroundColor: "white",
        paddingHorizontal: 16,
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 36,
        right: 24,
    },
    popup_title: {
        paddingRight: 16,
    },
    options: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomColor: '#ccc',
    },
    backdrop: { //NOTE: Keep the backdrop style in. Removing it causes the modal to not disappear when clicking outside
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});