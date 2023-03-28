import * as React from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useState, useEffect} from 'react';
import { RadioButton } from 'react-native-paper';

//eventually will be changed to server url
const APIURL = "http://localhost:3000/api/quiz/1"

const QuizScreen = () => {
    //used for fetching data 
    const[isLoading, setLoading] = useState(true);
    const[data, setData] = useState([]);
    const[question, setQuestion] = useState([]);


    //gets all content from quizcontent
    const fetchData = async() => {
        console.log("Fetching data for quizcontent");
        try{
        const response = await fetch(APIURL)
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

    //HELPER FUNCTIONS
    const answerClicked = (isCorrect) => {
        if(isCorrect){
            setScore(score+1);
        }
        
        if(currentQuestion + 1 < data.questions.length){
            setCurrentQuestion(currentQuestion + 1);
        }
        else{
            setQuizCompleted(true)
        }
    }

    //BEGINNING OF DISPLAY
    return(
        <SafeAreaView>
            <View>
                {isLoading ? (
                <View>
                    <Text>Loading</Text>
                </View>
                ) : (
                <View>
                    <Text>{data.quizname}</Text>

                    {quizCompleted ? (
                        <View>
                        <Text>Quiz Done</Text>
                        <Text>Final Score: {score}/{data.questions.length}</Text>
                        </View>
                    ) : (
                        <View>
                        <Text>Current Score: {score}</Text>
                        <Text>Question {currentQuestion + 1} out of {data.questions.length}</Text>
                        <Text>{data.questions[currentQuestion].question}</Text>
                        {data.questions[currentQuestion].answers.map((answer) => (
                            <TouchableOpacity 
                            onPress={() => answerClicked(answer.iscorrect)}>
                                <Text>{answer.answer}</Text>
                            </TouchableOpacity>
                        ))
                        }
                        </View>
                    )}
                </View>
                )}
            </View>
        </SafeAreaView>
    )
    
}
    
    export default QuizScreen;