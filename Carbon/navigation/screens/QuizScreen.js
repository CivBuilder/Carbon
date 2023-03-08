import * as React from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useState, useEffect} from 'react';
import { RadioButton } from 'react-native-paper';
//import { response } from '../../../Server/app';

//eventually will be changed to server url
const APIURL = "http://localhost:3000/api/quizcontent"

const QuestionnaireScreen = () => {
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [hasSelectedOption, setHasSelectedOption] = React.useState(false);

    //used for fetching data 
    const[isLoading, setLoading] = useState(true);
    const[data, setData] = useState([]);
    const[question, setQuestion] = useState([]);

    //gets all content from quizcontent
    const fetchData = async() => {
        console.log("Fetching data for quizcontent");
        const response = await fetch(APIURL)
        const data = await response.json();
        setForumData(data.content);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderContent = ({item}) => {
        return(
            <View
                style = {{
                    borderRadius: 10,
                    backgroundColor: '#74C69D',
                    paddingHorizontal : 14,
                    paddingVertical: 90,
                    margin: 5,
                    width : '45%'
                }}
            >
                <Text style= {{textAlign : 'center'}}>{item.question}</Text>
            </View>
        )
    }

    return(
        <SafeAreaView>
            {isLoading ? (
                <ActivityIndicator/>
            ) : (
                <FlatList
                    horizontal={false}
                    numColumns = {2}
                    data={data}
                    renderItem = {renderContent}
                    keyExtractor = {(item) => item.title.toString()}
                />
            )}
        </SafeAreaView>
    );
    };
//     //  This is where all the questions and answers are stored
//     //  TODO: Find a way to keep from a separate file. Maybe JSON?
//     //  TODO: Change the placeholder questions to the actual questions
//     const questions = [
//         { 
//             id: 1,
//             question: "What is your favorite color?",
//             options: [
//                 { label: 'Option A', value: 'a' },
//                 { label: 'Option B', value: 'b' },
//                 { label: 'Option C', value: 'c' },
//             ]
//         },
//         {
//             id: 2,
//             question: "What is your favorite food?",
//             options: [
//                 { label: 'Option A', value: 'a' },
//                 { label: 'Option B', value: 'b' },
//                 { label: 'Option C', value: 'c' },
//             ]
//         },
//         {
//             id: 3,
//             question: "What is your favorite animal?",
//             options: [
//                 { label: 'Option A', value: 'a' },
//                 { label: 'Option B', value: 'b' },
//                 { label: 'Option C', value: 'c' },
//             ]
//         },
//     ];


//     //  Handles all the rules for the previous, next, and submit buttons when the user has selected an option
//     /*  BUG:    When going back and forth through the answered questions, the answers are saved, but the next button is still invisible.
//                 The user has to select an answer again to make the next button visible.
//     */
//     const handleSelectOption = (questionId, value) => {
//         const newSelectedOptions = [...selectedOptions];
//         newSelectedOptions[currentQuestionIndex] = { questionId, value };
//         setSelectedOptions(newSelectedOptions);
//         setHasSelectedOption(true);
//     };

//     /*  Renders the question in the return function inside SafeAreaView
//         This is how the questions appear one by one in the same page
//     */
//     const renderQuestion = (index) => {
//         const question = questions[index];
//         const selectedOption = selectedOptions[index];
//         return (
//             <View key={question.id} style={styles.questionContainer}>
//                 {/* Question */}
//                 <Text style={styles.titleText}>
//                     {question.question}
//                 </Text>

//                 {/* Multiple choice options */}
//                 {question.options.map((option, index) => (
//                     <View key={index} style={styles.radioButton}>
//                         <RadioButton
//                             value={option.value}
//                             status={selectedOption && selectedOption.value === option.value ? 'checked' : 'unchecked'}
//                             onPress={() => handleSelectOption(question.id, option.value)}
//                             color='#43b262'
//                             uncheckedColor='#afafaf'
//                         />
//                         <Text>{option.label}</Text>
//                     </View>
//                 ))}
//             </View>
//         );
//     };

//     /*  Handles how the previous button is displayed
//         The previous button is invisible at the first question
//     */
//     const handlePrevButtonPress = () => {
//         setCurrentQuestionIndex(currentQuestionIndex - 1);
//     };

//     /*  Handles the next button's visibility
//         The next button stays invisible until the user has picked an answer
//         The submit button also appears only when the user has picked an answer at the last question
//     */
//     const handleNextButtonPress = () => {
//         if (hasSelectedOption) {
//             if (currentQuestionIndex === questions.length - 1) {
//                 setSubmitButtonVisible(true);
//             } else {
//                 setCurrentQuestionIndex(currentQuestionIndex + 1);
//                 setHasSelectedOption(false);
//             }
//         } else {
//             Alert.alert('Please select an option');
//         }
//     };

//     //  Handles the submit button after being pressed
//     const handleSubmitButtonPress = () => {
//         //  TODO: Redirect the submit button to go to ResultScreen.js
//         Alert.alert('Submitted');
//     };

//     /*  Creates a submit button at the end of the question
//         The submit button only appears and is enabled when the user chooses an answer on the last question
//     */
//     const renderSubmitButton = () => {
//         if (currentQuestionIndex === questions.length - 1 && hasSelectedOption) {
//             return (
//                 <TouchableOpacity
//                     style={[styles.butttonStyle, styles.nextButton]}
//                     onPress={handleSubmitButtonPress}
//                 >
//                     <Text style={styles.buttonText}>SUBMIT</Text>
//                 </TouchableOpacity>
//             );
//         } else {
//             return null;
//         }
//     };

//     //  Renders the entire questionnaire
//     return (
//         <SafeAreaView style={styles.container}>
//             {/* Questionnaire Portion */}
//             <View>
//                 {renderQuestion(currentQuestionIndex)}
//             </View>

//             {/* Prev/Next Buttons */}
//             <View style={styles.bottomView}>

//                 {/* Previous Button */}
//                 <TouchableOpacity
//                     style={[
//                         styles.butttonStyle,
//                         styles.prevButton,
//                         currentQuestionIndex === 0 ? styles.disabledButton : null //  Changes the style of the previous button at the first question
//                     ]}
//                     onPress={handlePrevButtonPress}
//                     disabled={currentQuestionIndex === 0}
//                 >
//                     <Text style={styles.buttonText}>PREVIOUS</Text>
//                 </TouchableOpacity>

//                 {/* Next Button */}
//                 <TouchableOpacity
//                     style={[
//                         styles.butttonStyle,
//                         styles.nextButton,
//                         currentQuestionIndex === questions.length - 1 ? styles.disabledButton : null, //  Changes the style of the next button at the last question
//                         !hasSelectedOption ? { opacity: 0 } : null //  Makes the next button invisible until the user has picked an answer
//                     ]}
//                     onPress={handleNextButtonPress}
//                     disabled={currentQuestionIndex === questions.length - 1} //  Disables the next button at the last question
//                 >
//                     <Text style={styles.buttonText}>NEXT</Text>
//                 </TouchableOpacity>


//                 {/* Submit Button */}
//                 {renderSubmitButton()}
//             </View>


//             {/* TODO: Progress Bar */}
//         </SafeAreaView>
//     );
// }

// //  CSS
// const styles = StyleSheet.create({
//     // TODO:    Move the questionnaire portion higher
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     bottomView: {
//         position: 'absolute',
//         bottom: 0,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//         paddingHorizontal: 20,
//         paddingBottom: 20,
//     },
//     titleText: {
//         fontSize: 20,
//         fontWeight: "bold"
//     },
//     radioButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
//     butttonStyle: {
//         borderRadius: 25,
//         backgroundColor: '#43b262', //TODO: change to global const variable of main color
//         padding: 5,
//         width: 100,
//     },
//     buttonText: {
//         color: 'white',
//         textAlign: 'center',
//     },
//     prevButton: {
//         marginRight: 'auto',
//     },
//     nextButton: {
//         marginLeft: 'auto',
//     },
//     disabledButton: {
//         opacity: 0,
//     }
// })

export default QuestionnaireScreen;