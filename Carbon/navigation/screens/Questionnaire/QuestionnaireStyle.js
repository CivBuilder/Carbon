import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../styling/Colors';

export const q_styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    back_button: {
        position: 'absolute',
        top: 40,
        left: 12,
        zIndex: 999,
    },
    questionnaire_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.secondary.LIGHT_GREEN,
    },
    question_text:{
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 40,
        textAlign: 'center',
    },
    answer_container: {
        width: '60%',
    },
    button_container: {
        marginBottom: 24,
    },
    text_input_header: {
        fontSize:16,
        fontWeight:"400",
        marginBottom:5,
        textAlign: 'center',
    },
    text_input: {
        height: 40,
        width: 12*16,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginBottom: 24,
        backgroundColor: 'white',
    },
    answer_button: {
        borderRadius: 12,
        borderWidth: 2,
        padding: 12,
        alignItems: 'center',
    },
    answer_text: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        color: Colors.primary.RAISIN_BLACK,
    },
    result_container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 24,
        borderRadius: 16,
        backgroundColor: Colors.secondary.ALMOND,
    },
    rank_picture_container:{
        marginVertical: 24,
        width: Dimensions.get('window').width * 0.35,
        height: Dimensions.get('window').width * 0.35,
    },
    rank_title_text: {
        fontSize: 36,
        fontWeight: "500",
        textAlign: 'center',
        marginBottom: 24,
    },
    score_text: {
        fontSize: Dimensions.get('window').width * 0.06,
        fontWeight: '500',
        marginBottom: 3,
    },
    score_category_container: {
        backgroundColor:'white',
        borderRadius: 200,
        borderWidth: 3,
        justifyContent:'center',
        alignItems: 'center',
        height: Dimensions.get('window').width * 0.24,
        width: Dimensions.get('window').width * 0.24,
    },
    best_worst_category_container: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    best_worst_category_text: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    best_worst_category_score_container: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 2,
        width: 170,
    },
});