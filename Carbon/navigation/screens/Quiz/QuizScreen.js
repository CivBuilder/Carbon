import * as React from 'react';
import { Dimensions, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Modal } from 'react-native';
import {useState, useEffect} from 'react';
import { getToken } from '../../../util/LoginManager';
import { API_URL } from '../../../config/Api';
import { Colors } from '../../../styling/Colors';
import { Ionicons } from '@expo/vector-icons';

const QuizScreen = ({navigation, route}) => {
    //used for fetching data
    const[isLoading, setLoading] = useState(true);
    const[data, setData] = useState([]);
    const[question, setQuestion] = useState([]);

    //gets all content from quizcontent
    const fetchData = async() => {
        console.log("Fetching data for quizcontent");
        try{
        const response = await fetch(API_URL + "quiz/" + route.params.id)
        const responsedata = await response.json();
        setData(responsedata.quiz);
        setLoading(false);

        }
        catch(error) {
            console.error("An error occured when connecting to the api, ensure you turned on the server and updated the APIURL accordingly if hosting localy - Avery. The following is the official error message: " + error)
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
            <View>
                {/* Question Counter */}
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text
                        style={ styles.question_counter }
                    >
                        {`Question ${currentQuestion + 1} of ${data.questions.length}`}
                    </Text>
                </View>

                {/* Question */}
                <View style={styles.question_container}>
                    <Text
                        style={{
                            ...styles.question_text,
                            fontSize: data.questions[currentQuestion].question.length > 50 ? 18 : 22,
                        }}
                    >
                        {data.questions[currentQuestion].question}
                    </Text>
                </View>
            </View>
        )
    }

    const renderAnswers = () => {
        return (
            <View>
                {data.questions[currentQuestion].answers.map((answer) => (
                    <TouchableOpacity
                        key={answer}
                        style={{
                            ...styles.answer_button,
                            backgroundColor:
                                quizActive ?(answer === selectedAnswer ?
                                (answerSelected ? 'rgba(32, 27, 27, 0.1)' : Colors.primary.MINT_CREAM) : Colors.primary.MINT_CREAM ) :
                                (answer === selectedAnswer ? (answer.iscorrect ? 'rgba(116, 198, 157, 0.8)' : 'rgba(225, 28, 43, 0.5)') : Colors.primary.MINT_CREAM),

                            borderColor:
                                quizActive ?(answer === selectedAnswer ?
                                (answerSelected ? 'rgba(32, 27, 27, 0.6)' : 'rgba(32, 27, 27, 0.2)') : 'rgba(32, 27, 27, 0.2)' ) :
                                (answer === selectedAnswer ? (answer.iscorrect ? 'rgba(49, 105, 57, 1)' : 'rgba(225, 28, 43, 1)') : 'rgba(32, 27, 27, 0.2)'),
                            }}
                        onPress={() => answerClicked(answer)}
                    >
                        <Text style={styles.answer_text}>{answer.answer}</Text>
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
            <SafeAreaView
                style={{
                    // backgroundColor: "lightgreen"
                    marginTop: 12,
                    marginHorizontal: 24,
                }}
            >
                {isLoading ? (
                    <View>
                        <Text>Loading</Text>
                    </View>
                ) : (
                    <View>
                        {/* Close button and exit modal */}
                        <View style={{ position: 'relative' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowModal(true);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                }}
                            >
                                <Ionicons name="close-outline" size={30} color="black" />
                            </TouchableOpacity>

                            {showModal && (
                                <Modal
                                    isVisible={showModal}
                                    animationType="fade"
                                    animationInTiming={1000}
                                    animationOutTiming={1000}
                                >
                                    <TouchableOpacity onPress={() => setVisibility(false)}/>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            padding: 22,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text style={{ fontSize: 18, marginBottom: 24 }}>
                                            Are you sure you want to exit the quiz?
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowModal(false);
                                                navigation.goBack();
                                            }}
                                            style={{
                                                backgroundColor: '#74C69D',
                                                borderRadius: 10,
                                                padding: 12,
                                                paddingHorizontal: 48,
                                            }}
                                        >
                                            <Text style={{ color: Colors.primary.RAISIN_BLACK }}>Yes</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowModal(false);
                                            }}
                                            style={{
                                                backgroundColor: 'lightgray',
                                                borderRadius: 10,
                                                padding: 12,
                                                paddingHorizontal: 48,
                                                marginTop: 12,
                                            }}
                                        >
                                            <Text>No</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            )}

                        </View>

                        {quizCompleted ? (
                            <View
                                style={{
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 24,
                                        marginBottom: 12 * 3,
                                    }}
                                >
                                    All done!
                                </Text>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 24
                                    }}
                                >
                                    Your Score:
                                </Text>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 36,
                                        fontWeight: '500'
                                    }}
                                >
                                    {score}/{data.questions.length}
                                </Text>
                                <View
                                    style={{
                                        // backgroundColor: "lightpink",
                                        position: 'absolute',
                                        bottom: 0,
                                        marginBottom: 12 * 3,
                                        width: '100%',
                                    }}
                                >
                                    <View
                                        style={{
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{ ...styles.cta_button, marginBottom: 12 }}
                                            onPress={() => redoQuiz()}
                                        >
                                            <Text
                                                style={ styles.cta_text}
                                            >
                                                Retake
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={ styles.cta_button }
                                            onPress={() => navigation.goBack()}
                                        >
                                            <Text
                                                style={ styles.cta_text }
                                            >
                                                Go back
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <View style={{height: '100%'}}>
                                {/* <View
                                    style={{
                                        // backgroundColor: "orange",
                                    }}
                                >
                                    <Text style={{textAlign: 'center', fontSize: 16}}>Score: {score}</Text>
                                </View> */}

                                {/* ProgressBar */}

                                <View
                                    style={{
                                        // backgroundColor: "lightblue",
                                        marginTop: 36
                                    }}
                                    >
                                    {/* Question */}
                                    {renderQuestion()}
                                </View>
                                <View
                                    style={{
                                        // backgroundColor: "red",
                                        position: 'absolute',
                                        bottom: 0,
                                        marginBottom: 12*14,
                                        width: '100%',
                                    }}
                                >
                                    {/* Answers */}
                                    {renderAnswers()}
                                </View>
                                <View
                                    style={{
                                        // backgroundColor: "lightpink",
                                        position: 'absolute',
                                        bottom: 0,
                                        marginBottom: 12*3,
                                        width: '100%',
                                    }}
                                >
                                    <View
                                        style={{
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                            // marginHorizontal: Dimensions.get('window').width/5,
                                        }}
                                    >
                                        {/* Submit Button */}
                                        {renderSubmitButton()}

                                        {/* Next Button */}
                                        {renderNextButton()}
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
    question_container: {
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 24,
        height: Dimensions.get('window').height/3,
        backgroundColor: 'rgba(247, 223, 197, 0.5)', //Same color as ALMOND, but half the opacity
    },
    question_counter: {
        fontSize: 14,
        color: Colors.primary.RAISIN_BLACK,
        marginBottom: 12,
    },
    question_text: {
        fontWeight: '400',
        color: Colors.primary.RAISIN_BLACK,
    },
    answer_button: {
        borderRadius: 12,
        borderWidth: 2,
        padding: 12,
        marginVertical: 8,
    },
    answer_text: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(32, 27, 27, 0.9)',
        textAlign: 'center',
    },
    cta_button: {
        borderRadius: 12,
        padding: 12,
        backgroundColor: Colors.secondary.LIGHT_MINT,
    },
    cta_text: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.primary.RAISIN_BLACK,
    }
});

export default QuizScreen;