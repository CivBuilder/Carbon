import * as React from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useState, useEffect} from 'react';
import { RadioButton } from 'react-native-paper';
//import { response } from '../../../Server/app';

//eventually will be changed to server url
const APIURL = "http://localhost:3000/api/quiz/0"

const QuizScreen = () => {
    //used for fetching data 
    const[isLoading, setLoading] = useState(true);
    const[data, setData] = useState([]);
    const[question, setQuestion] = useState([]);

    //gets all content from quizcontent
    const fetchData = async() => {
        console.log("Fetching data for quizcontent");
        const response = await fetch(APIURL)
        const data = await response.json();
        setData(data.content);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // const renderContent = ({item}) => {
    //     return(
    //         <View
    //             style = {{
    //                 borderRadius: 10,
    //                 backgroundColor: '#74C69D',
    //                 paddingHorizontal : 14,
    //                 paddingVertical: 90,
    //                 margin: 5,
    //                 width : '45%'
    //             }}
    //         >
    //             <Text style= {{textAlign : 'center'}}>{item.question}</Text>
    //         </View>
    //     )
    // }


    //building out quiz with fake data, this data will be pulled from api eventually, should look/be named the same as data below

    const quiz = [
    {"quizname" : "quiz1", "id": "1", "questions": [
        {"quesid":"1", "question":"1. Is this the first question?", 
        "answers":[
            {"answer":"Yes", "ansid":"1", "iscorrect" : "true"},
            {"answer":"No", "ansid":"2", "iscorrect" : "false"},
            {"answer":"Maybe So", "ansid":"3", "iscorrect" : "false"},
            {"answer":"IDK", "ansid":"3", "iscorrect" : "false"},
        ]
        },
        {"quesid":"2", "question":"2. Is this working?", 
        "answers":[
            {"answer":"Yes", "ansid":"1", "iscorrect" : "false"},
            {"answer":"No", "ansid":"2", "iscorrect" : "false"},
            {"answer":"Maybe So", "ansid":"3", "iscorrect" : "true"},
            {"answer":"IDK", "ansid":"3", "iscorrect" : "false"},
        ]
        },
        {"quesid":"3", "question":"3. The answer is idk, or is it?", 
        "answers":[
            {"answer":"Yes", "ansid":"1", "iscorrect" : "false"},
            {"answer":"No", "ansid":"2", "iscorrect" : "false"},
            {"answer":"Maybe So", "ansid":"3", "iscorrect" : "false"},
            {"answer":"IDK", "ansid":"3", "iscorrect" : "true"},
        ]
        },
    ]
    },
];
    //sets score and current question to 0 
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    //HELPER FUNCTIONS
    const answerClicked = (isCorrect) => {
        if(isCorrect == "true"){
            setScore(score+1);
        }
        
        if(currentQuestion + 1 < quiz[0].questions.length){
            setCurrentQuestion(currentQuestion + 1);
        }
        else{
            setQuizCompleted(true)
        }
    }

    //BEGINNING OF DISPLAY
    return(
        <View>
            <Text>{quiz[0].quizname}</Text>

            {quizCompleted ? (
                <View>
                <Text>Quiz Done</Text>
                <Text>Final Score: {score}/{quiz[0].questions.length}</Text>
                </View>
            ) : (
                <View>
                <Text>Current Score: {score}</Text>
                <Text>Question {currentQuestion + 1} out of {quiz[0].questions.length}</Text>
                <Text>{quiz[0].questions[currentQuestion].question}</Text>
                {quiz[0].questions[currentQuestion].answers.map((answer) => (
                    <TouchableOpacity 
                    onPress={() => answerClicked(answer.iscorrect)}>
                        <Text>{answer.answer}</Text>
                    </TouchableOpacity>
                ))
                }
                </View>
            )}
        </View>
       
    )
    
}
    
    export default QuizScreen;