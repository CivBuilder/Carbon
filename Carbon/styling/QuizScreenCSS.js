import { Colors } from './Colors';
import { Dimensions, StyleSheet } from 'react-native';

export const QuizStyles = StyleSheet.create({
    screen: {
        backgroundColor: '#E3FFF1',
        paddingTop: 12,
        paddingHorizontal: 24,
        height: '100%',
    },
    question_container: {
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 24,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#9BECF2',
        minHeight: 200,
        maxHeight: 400,
    },
    question_counter: {
        fontSize: 16,
        color: Colors.primary.RAISIN_BLACK,
    },
    score_counter: {
        fontSize: 16,
        marginRight: 12 * 2,
        color: Colors.primary.RAISIN_BLACK,
    },
    question_text: {
        fontWeight: '400',
        textAlign: 'center',
        color: Colors.primary.RAISIN_BLACK,
    },
    answer_button: {
        borderRadius: 12,
        borderWidth: 2,
        padding: 8,
        marginVertical: 6,
    },
    answer_text: {
        fontWeight: '500',
        color: Colors.primary.RAISIN_BLACK,
        textAlign: 'center',
    },
    cta_button: {
        borderRadius: 12,
        backgroundColor: Colors.primary.MINT,
        justifyContent: 'center',
        padding: 6,
    },
    cta_text: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.primary.MINT_CREAM,
    },
    result_container: {
        paddingVertical: 36,
        paddingHorizontal: 24,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Dimensions.get('window').height / 4,
        backgroundColor: '#9BECF2',
        borderRadius: 36,
    },
    result_heading: {
        textAlign: 'center',
        fontSize: 36,
        fontWeight: '500',
        marginBottom: 12,
    },
    result_subheading: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    result_score: {
        textAlign: 'center',
        fontSize: 72,
        fontWeight: '800',
        marginVertical: 24,
    },
    result_info: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '400',
        marginVertical: 24,
    },
    result_encouragement: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
});