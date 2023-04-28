import * as React from 'react';
import { Dimensions, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Modal, StatusBar, ScrollView } from 'react-native';
import {useState, useEffect} from 'react';
import { getToken } from '../../../util/LoginManager';
import { API_URL } from '../../../config/Api';
import { Colors } from '../../../styling/Colors';
import { Ionicons } from '@expo/vector-icons';
import { colors } from 'react-native-elements';

const QuizScreen = ({navigation, route}) => {
    //used for fetching data
    const[isLoading, setLoading] = useState(true);
    const[data, setData] = useState([]);
    const[question, setQuestion] = useState([]);

    //gets all content from quizcontent
    const fetchData = async() => {
        console.log("Fetching data for quizcontent with id:", route.params.id);
        try{
        const response = await fetch(API_URL + "quiz/" + route.params.id)
        const responsedata = await response.json();
        setData(responsedata.quiz);
        setLoading(false);

        }
        catch(error) {
            console.error("An error occured when connecting to the api, ensure you turned on the server and updated the APIURL accordingly if hosting localy - Avery. The following is the official error message: " + error)
            navigation.goBack(); //Hacky way of going back to the previous screen if the api is down since there's no other way to exit out of the loading screen
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //sets score and current question to 0
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [quizActive, setQuizActive] = useState(true);
    const [showNext, setShowNext] = useState(false);
    const [showSubmit, setShowSubmit] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerSelected, setAnswerSelected] = useState(false);
    const [perfectScore, setperfectScore] = useState(false);

    // Handles the modal when user clicks the close button
    const [showModal, setShowModal] = useState(false);


    //HELPER FUNCTIONS
    const answerClicked = (answer) => {
        if(quizActive){
            setSelectedAnswer(answer);
            setShowSubmit(true);
            setAnswerSelected(true);
        }
    }

    const submitClicked = () => {
        setQuizActive(false);
        if(selectedAnswer.iscorrect){
            setScore(score+1);
        }
        setShowSubmit(false);
        setShowNext(true);

    }

    const nextClicked = () => {
        if(currentQuestion + 1 < data.questions.length){
            setCurrentQuestion(currentQuestion + 1);
        }
        else{
            setQuizCompleted(true)
            if(score/data.questions.length == 1){
                setperfectScore(true)
                postScore()
            }
            else{
                setperfectScore(false)
            }
        }
        setShowNext(false);
        setAnswerSelected(false);
        setQuizActive(true);
    }

    const redoQuiz = () => {
        setQuizCompleted(false)
        setCurrentQuestion(0)
        setScore(0)
    }

    async function postScore() {
        try{
            const fscore = {score: 100};
            console.log(await getToken());
            const response = await fetch(`${API_URL}user/quiz`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'secrettoken': await getToken(),
                },
                body : JSON.stringify(fscore)
            });
        } catch(error){
                console.error("Post Failed: " + error)
        }
    }


    //RENDER FUNCTIONS
    const renderQuestion = () => {
        return (
            <>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12, }}>
                    {/* Question Counter */}
                    <View>
                        <Text style={ styles.question_counter }>{`Question ${currentQuestion + 1} of ${data.questions.length}`}</Text>
                    </View>

                    {/* Score Counter */}
                    <View>
                        <Text style={ styles.score_counter }>Score: {score}</Text>
                    </View>
                </View>

                {/* Question */}
                <View style={styles.question_container}>
                    <Text
                        style={{
                            ...styles.question_text,
                            fontSize: data.questions[currentQuestion].question.length > 90 ? 18 : 22,
                        }}
                    >
                        {data.questions[currentQuestion].question}
                    </Text>
                </View>
            </View>
            </>
        )
    }

    const renderAnswers = () => {
        return (
            <View>
                {data.questions[currentQuestion].answers.map((answer) => (
                    <TouchableOpacity
                        key={answer.ansid}
                        style={{
                            ...styles.answer_button,
                            backgroundColor:
                                quizActive ?(answer === selectedAnswer ?
                                (answerSelected ? '#80bbff' : "white") : "white" ) :
                                (answer === selectedAnswer ? (answer.iscorrect ? '#9ce8b2' : '#ff9494') : "white"),

                            borderColor:
                                quizActive ?(answer === selectedAnswer ?
                                (answerSelected ? '#1e73d6' : '#737373') : '#737373' ) :
                                (answer === selectedAnswer ? (answer.iscorrect ? '#1c622f' : '#c83737') : '#737373'),
                            }}
                        onPress={() => answerClicked(answer)}
                    >
                        <Text
                            style={{
                                ...styles.answer_text,
                                //font size 14 if answer is longer than 70 characters
                                fontSize: answer.answer.length > 70 ? 16 : 18,
                            }}
                        >{answer.answer}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    const renderSubmitButton = () => {
        return(
            <View>
                {showSubmit ?  (
                    <TouchableOpacity
                        style={ styles.cta_button }
                        onPress ={() => submitClicked()}
                    >
                        <Text style = { styles.cta_text }> Submit </Text>
                    </TouchableOpacity>
                ) : (
                    <View/>
                )}
            </View>
        )
    }

    const renderNextButton = () => {
        return(
            <View>
                {showNext ?  (
                    <TouchableOpacity
                        style={ styles.cta_button }
                        onPress ={() => nextClicked()}
                    >
                        <Text style = { styles.cta_text }> Next </Text>
                    </TouchableOpacity>
                ) : (
                    <View/>
                )}
            </View>
        )
    }

    //BEGINNING OF DISPLAY
    return (
        // This modal prevents from showing the tab navigation
        <Modal
            isVisible={true}
            animationType="fade"
            animationInTiming={1000}
            animationOutTiming={1000}
        >
            <SafeAreaView style={ styles.screen }>
            <StatusBar backgroundColor={Colors.primary.MINT_CREAM} />
                {isLoading ? (
                    <View>
                        <Text>Loading</Text>
                    </View>
                ) : (
                    <View>
                        { quizCompleted ? (
                            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                                <View style={styles.result_container}>
                                    <Text style={styles.result_heading}>Quiz completed!</Text>
                                    <View style={{ backgroundColor: 'white', borderRadius: 200, width: 180, height: 180, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text
                                            style={{
                                                ...styles.result_score,
                                                color:
                                                    score / data.questions.length >= 0.8
                                                        ? "#3CB371" // Green if at least 80% of the questions are correct
                                                        : score / data.questions.length >= 0.5
                                                        ? "#FFA500" // Yellow if between 50% and 80%
                                                        : "#FF6347", // Red if below 50%
                                                }}
                                        >
                                            {Math.round(score / data.questions.length * 100)}%
                                        </Text>
                                    </View>

                                    <Text style={styles.result_info}>{`You got ${score} out of ${data.questions.length} questions right.`}</Text>

                                    <Text style={styles.result_encouragement}>
                                        {perfectScore &&
                                            "Impressive! You got a perfect score!"}
                                        {score / data.questions.length >= 0.8 && score / data.questions.length < 1 &&
                                            "Great job! You really know your stuff!"}
                                        {score / data.questions.length < 0.8 && score / data.questions.length >= 0.5 &&
                                            "Good effort! You're on the right track!"}
                                        {score / data.questions.length < 0.5 && score / data.questions.length > 0 &&
                                            "You can retake the quiz and improve your score!"}
                                        {score / data.questions.length == 0 &&
                                            "Don't give up! You can retake the quiz and try again!"}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flex:1,
                                        position: 'absolute',
                                        bottom: 20,
                                        width: '100%',
                                    }}
                                >
                                    {/* Only ask to retake the quiz if the user got a score less than 100% */}
                                    {!perfectScore && (
                                        <TouchableOpacity
                                            style={{ ...styles.cta_button, marginBottom: 12, backgroundColor: "#1e73d6" }}
                                            onPress={() => redoQuiz()}
                                        >
                                            <Text style={styles.cta_text}>Retake Quiz</Text>
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity style={{ ...styles.cta_button, backgroundColor: 'transparent', padding: 3, borderWidth: 3, borderColor: Colors.secondary.DARK_MINT }} onPress={() => navigation.goBack()}>
                                        <Text  style={{ ...styles.cta_text, color: Colors.secondary.DARK_MINT }}>Finish</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        ) : (

                            <View style={{height: '100%'}}>
                                {/* Close button and exit modal */}
                                <View style={{ position: 'relative' }}>
                                    <TouchableOpacity
                                        onPress={() => { setShowModal(true); }}
                                        style={{ position: 'absolute', top: 0, right: 0, }}
                                    >
                                        <Ionicons name="close-outline" size={30} color="black" />
                                    </TouchableOpacity>

                                    {showModal && (
                                        <Modal
                                            isVisible={showModal}
                                            animationType="fade"
                                            animationInTiming={1000}
                                            animationOutTiming={1000}
                                            transparent={true}
                                        >
                                            <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: 'flex-end'}}>
                                                <TouchableOpacity onPress={() => setVisibility(false)}/>
                                                <View
                                                    style={{
                                                        position: 'absolute', bottom: '40%', left: 24, right: 24, top: '30%',
                                                        borderRadius: 18,
                                                        backgroundColor: 'white',
                                                        padding: 22,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Text style={{ fontSize: 22 }}>
                                                        Are you sure you want to quit?
                                                    </Text>
                                                    <Text style={{ fontSize: 22, marginBottom: 48 }}>
                                                        Your progress will be lost.
                                                    </Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setShowModal(false);
                                                                navigation.goBack();
                                                            }}
                                                            style={{
                                                                backgroundColor: '#74C69D',
                                                                borderRadius: 12,
                                                                padding: 12,
                                                                paddingHorizontal: 48,
                                                                marginRight: 36,
                                                            }}
                                                        >
                                                            <Text style={{ color: Colors.primary.MINT_CREAM, fontSize: 18, fontWeight: '500' }}>Yes</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setShowModal(false);
                                                            }}
                                                            style={{
                                                                backgroundColor: 'white',
                                                                borderRadius: 12,
                                                                borderWidth: 2,
                                                                borderColor: '#db2525',
                                                                padding: 12,
                                                                paddingHorizontal: 48,
                                                            }}
                                                        >
                                                            <Text style={{ color: Colors.primary.RAISIN_BLACK, fontSize: 18, fontWeight: '500', color: '#db2525' }}>No</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>
                                    )}

                                </View>

                                <View style={{flex: 1}}>
                                    <View style={{ marginTop: 36 }} >
                                        {/* Question */}
                                        {renderQuestion()}
                                    </View>

                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        style={{
                                            marginTop: 12,
                                            // backgroundColor: 'orange',
                                            height: 240,
                                        }}
                                    >
                                        {/* Answers */}
                                        {renderAnswers()}
                                    </ScrollView>

                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'flex-end',
                                            marginBottom: 12,
                                        }}
                                    >
                                        <View
                                            style={{ alignContent: 'center', justifyContent: 'center', }}
                                        >
                                            {/* Submit Button */}
                                            {renderSubmitButton()}

                                            {/* Next Button */}
                                            {renderNextButton()}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                )}
            </SafeAreaView>
        </Modal>
    )
}

styles = StyleSheet.create({
    screen:{
        backgroundColor: Colors.primary.MINT_CREAM,
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
        backgroundColor: '#fff1c9',
        minHeight: 200,
        maxHeight: 400,
    },
    question_counter: {
        fontSize: 16,
        color: Colors.primary.RAISIN_BLACK,
    },
    score_counter: {
        fontSize: 16,
        marginRight: 12*2,
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
        backgroundColor: Colors.secondary.LIGHT_MINT,
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
        backgroundColor: Colors.secondary.CELADON,
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

export default QuizScreen;