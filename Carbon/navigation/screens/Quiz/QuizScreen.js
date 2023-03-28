import * as React from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useState, useEffect} from 'react';
import { Colors } from '../../../colors/Colors';
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
    const answerClicked = (answer) => {
        if(answer.iscorrect){
            setScore(score+1);
        }
        console.log(answer.iscorrect)
        if(currentQuestion + 1 < data.questions.length){
            setCurrentQuestion(currentQuestion + 1);
        }
        else{
            setQuizCompleted(true)
        }
    }

    const redoQuiz = () => {
        setQuizCompleted(false)
        setCurrentQuestion(0)
        setScore(0)
    }

    //RENDER FUNCTIONS
    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 40
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{ fontSize: 20, opacity: 0.6, marginRight: 2}}>{currentQuestion + 1}</Text>
                    <Text style={{ fontSize: 18, opacity: 0.6}}>/ {data.questions.length}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: Colors.black,
                    fontSize: 30
                }}>{data.questions[currentQuestion].question}</Text>
            </View>
        )
    }

    const renderAnswers = () => {
        return(
            <View>
                {data.questions[currentQuestion].answers.map((answer) => (
                           <TouchableOpacity
                            key={answer}
                            style = {{
                               borderWidth: 3, borderColor: Colors.black,
                               backgroundColor: Colors.black, 
                               height: 60, borderRadius: 20, 
                               flexDirection: 'row', 
                               alignItems: 'center', justifyContent: 'space-between',
                               paddingHorizontal: 20, 
                               marginVertical: 10 
                            }}
                            onPress={() => answerClicked(answer)}>
                               <Text style = {{fontSize: 20, color: Colors.black}}>{answer.answer}</Text>
                           </TouchableOpacity>
                       ))
                }
            </View>
        )
    }

    //BEGINNING OF DISPLAY
    return(
        <SafeAreaView style = {{ flex: 1}}>
                {isLoading ? (
                <View>
                    <Text>Loading</Text>
                </View>

                ) : (
                    <SafeAreaView>
                         {quizCompleted ? (
                       <View>
                       <Text>Quiz Done</Text>
                       <Text>Final Score: {score}/{data.questions.length}</Text>
                       <TouchableOpacity onPress={() => redoQuiz()}>
                           <Text>Redo Quiz</Text>
                       </TouchableOpacity>
                       </View>
                   ) : (
                        <View style={{
                            
                            paddingVertical: 40,
                            paddingHorizontal: 16,
                            position:'relative'
                        }}>
                        <Text>Current Score: {score}</Text>

                            {/* ProgressBar */}
                            
            
                            {/* Question */}
                            {renderQuestion()}
            
                            {/* Answers */}
                            {renderAnswers()}
            
                            {/* Next Button */}
                        </View>
                   )}
                    </SafeAreaView>
                )}
                
        </SafeAreaView>
    )
}

    const styles = StyleSheet.create({

    })
    export default QuizScreen;