import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { QuizScreen } from '../../navigation/screens/index.js';


// mock API response
const mockData = {
 "quiz": {
   "quizid": 1,
   "quizname": "quiz 1",
   "createdAt": "2023-03-10T02:02:31.000Z",
   "updatedAt": "2023-03-10T02:02:31.000Z",
   "questions": [
     {
       "quesid": 1,
       "quizid": 1,
       "question": "1. Is this the first question?",
       "createdAt": "2023-03-10T02:02:46.000Z",
       "updatedAt": "2023-03-10T02:02:46.000Z",
       "answers": [
         {
           "ansid": 1,
           "quesid": 1,
           "answer": "Yes",
           "iscorrect": true,
           "createdAt": "2023-03-10T02:02:59.000Z",
           "updatedAt": "2023-03-10T02:02:59.000Z"
         },
         {
           "ansid": 2,
           "quesid": 1,
           "answer": "No",
           "iscorrect": false,
           "createdAt": "2023-03-10T02:37:54.000Z",
           "updatedAt": "2023-03-10T02:37:54.000Z"
         }
       ]
     },
     {
       "quesid": 2,
       "quizid": 1,
       "question": "2. Is this The first Question?",
       "createdAt": "2023-03-10T02:39:02.000Z",
       "updatedAt": "2023-03-10T02:39:02.000Z",
       "answers": [
         {
           "ansid": 3,
           "quesid": 2,
           "answer": "Maybe",
           "iscorrect": true,
           "createdAt": "2023-03-10T02:41:03.000Z",
           "updatedAt": "2023-03-10T02:41:03.000Z"
         },
         {
           "ansid": 4,
           "quesid": 2,
           "answer": "No",
           "iscorrect": false,
           "createdAt": "2023-03-10T02:41:26.000Z",
           "updatedAt": "2023-03-10T02:41:26.000Z"
         }
       ]
     }
   ]
 }
};


// mock fetch function to return the mock data
global.fetch = jest.fn(() =>
 Promise.resolve({
   json: () => Promise.resolve(mockData),
 })
);


describe('QuizScreen', () => {
 beforeEach(() => {
   // reset mock fetch function
   global.fetch.mockClear();
 });


 it('should show loading message while data is being fetched', () => {
   const { getByText } = render(<QuizScreen />);


   expect(getByText('Loading')).toBeDefined();
 });


 it('should render quiz name and first question when data is loaded', async () => {
   const { getByText, queryByText } = render(<QuizScreen />);


   // wait for data to load
   await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));


   // check that loading message is
// check that loading message is gone
expect(queryByText('Loading')).toBeNull();


// check that quiz name and first question are displayed
expect(getByText('quiz 1')).toBeDefined();
expect(getByText('Current Score: 0')).toBeDefined();
expect(getByText('Question 1 out of 2')).toBeDefined();
expect(getByText('1. Is this the first question?')).toBeDefined();
expect(getByText('Yes')).toBeDefined();
expect(getByText('No')).toBeDefined();
});






it('should show final score and completion message when quiz is completed', async () => {
const { getByText, queryByText } = render(<QuizScreen />);
// wait for data to load
await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));


// select correct answer for both questions
fireEvent.press(getByText('Yes'));
fireEvent.press(getByText('Maybe'));


// check that final score and completion message are shown
expect(getByText('Quiz Done')).toBeDefined();
expect(getByText('Final Score: 2/2')).toBeDefined();
expect(queryByText('Current Score:')).toBeNull();
expect(queryByText('Question')).toBeNull();
});
});
