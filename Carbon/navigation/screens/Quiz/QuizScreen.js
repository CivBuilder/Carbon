import * as React from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useState, useEffect} from 'react';
import { RadioButton } from 'react-native-paper';
import { getToken } from '../../../util/LoginManager';
import { API_URL } from '../../../config/Api';


const QuizScreen = ({route}) => {
    //used for fetching data 
    const[isLoading, setLoading] = useState(true);
    const[data, setData] = useState([]);
    const[question, setQuestion] = useState([]);

    //gets all content from quizcontent
    const fetchData = async() => {
        console.log('goop');
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
        }
        catch(error){
            console.error("Post Failed: " + error)
        }
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
                color: 'black',
                fontSize: 30
            }}>{data.questions[currentQuestion].question}</Text>
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
              borderWidth: 3,
              borderColor: 'black' ,
              backgroundColor:  quizActive ? (answer === selectedAnswer ? (answerSelected ? 'grey' : 'white') : 'white' ) : (answer === selectedAnswer ? (answer.iscorrect ? 'green' : 'red') : 'white'),
              height: 60,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 10
            }}
            onPress={() => answerClicked(answer)}>
            <Text style={{ fontSize: 20, color: 'black' }}>{answer.answer}</Text>
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
          onPress ={() => submitClicked()}>
              <Text style = {{fontSize: 20, color: 'black'}}> Submit </Text>
          </TouchableOpacity>
          ) : (<View></View>)}
      </View>
    )
}

const renderNextButton = () => {
    return( 

        <View>
            {showNext ?  (
            <TouchableOpacity
            onPress ={() => nextClicked()}>
                <Text style = {{fontSize: 20, color: 'black'}}> Next </Text>
            </TouchableOpacity>
            ) : (<View></View>)}
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
                   {perfectScore ? ( 
                        <View>
                            <Text>Congratulations! 100%, Press back to return to Education Forum</Text>
                        </View>

                   ) : (
                    <TouchableOpacity onPress={() => redoQuiz()}>
                        <Text>Redo Quiz</Text>
                    </TouchableOpacity>
                   )}

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
        
                        {/* Submit Button */}
                        {renderSubmitButton()}

                        {/* Next Button */}
                        {renderNextButton()}
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
    