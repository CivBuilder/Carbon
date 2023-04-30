import { StyleSheet } from 'react-native';
import { Colors } from '../../../styling/Colors';

export const q_styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
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
    score_text: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 3,
    },
    score_category_container: {
        backgroundColor:'white',
        borderRadius: 200,
        borderWidth: 3,
        justifyContent:'center',
        alignItems: 'center',
        height: 96,
        width: 96,
    }
});