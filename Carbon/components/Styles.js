import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../colors/Colors';

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const margin = 12;

export const styles = StyleSheet.create({
    /*
        SCREEN STYLING
    */
    container: {
        marginHorizontal: margin,
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin: margin,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    card: {
        height: 300,
        borderRadius: 16,
    },
    link: {
        color: Colors.primary.MINT,
        fontSize: 12,
    },

    /*
        CHART STYLING
    */
    chart: {
        margin: margin,
    },

    /*
        POP-UP MENU STYLING
    */
    popup_modal: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.primary.RAISIN_BLACK,
        backgroundColor: "white",
        paddingHorizontal: 16,
        position: 'absolute',
        top: 42,
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
    }
});