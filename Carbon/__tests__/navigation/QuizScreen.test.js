import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { QuizScreen } from '../../navigation/screens/index.js';


// // mock API response
// const mockData = {
//  "quiz": {
//    "quizid": 1,
//    "quizname": "quiz 1",
//    "createdAt": "2023-03-10T02:02:31.000Z",
//    "updatedAt": "2023-03-10T02:02:31.000Z",
//    "questions": [
//      {
//        "quesid": 1,
//        "quizid": 1,
//        "question": "1. Is this the first question?",
//        "createdAt": "2023-03-10T02:02:46.000Z",
//        "updatedAt": "2023-03-10T02:02:46.000Z",
//        "answers": [
//          {
//            "ansid": 1,
//            "quesid": 1,
//            "answer": "Yes",
//            "iscorrect": true,
//            "createdAt": "2023-03-10T02:02:59.000Z",
//            "updatedAt": "2023-03-10T02:02:59.000Z"
//          },
//          {
//            "ansid": 2,
//            "quesid": 1,
//            "answer": "No",
//            "iscorrect": false,
//            "createdAt": "2023-03-10T02:37:54.000Z",
//            "updatedAt": "2023-03-10T02:37:54.000Z"
//          }
//        ]
//      },
//      {
//        "quesid": 2,
//        "quizid": 1,
//        "question": "2. Is this The first Question?",
//        "createdAt": "2023-03-10T02:39:02.000Z",
//        "updatedAt": "2023-03-10T02:39:02.000Z",
//        "answers": [
//          {
//            "ansid": 3,
//            "quesid": 2,
//            "answer": "Maybe",
//            "iscorrect": true,
//            "createdAt": "2023-03-10T02:41:03.000Z",
//            "updatedAt": "2023-03-10T02:41:03.000Z"
//          },
//          {
//            "ansid": 4,
//            "quesid": 2,
//            "answer": "No",
//            "iscorrect": false,
//            "createdAt": "2023-03-10T02:41:26.000Z",
//            "updatedAt": "2023-03-10T02:41:26.000Z"
//          }
//        ]
//      }
//    ]
//  }
// };


// mock the fetch function to return test data
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    quiz: {
      title: 'Test Quiz',
      questions: [
        {
          question: 'What is 2+2?',
          answers: [
            { id: 1, text: '1', iscorrect: false },
            { id: 2, text: '2', iscorrect: false },
            { id: 3, text: '3', iscorrect: false },
            { id: 4, text: '4', iscorrect: true }
          ]
        }
      ]
    }
  })
}));

// describe('QuizScreen', () => {
//   beforeEach(() => {
//     // clear the fetch mock before each test
//     global.fetch.mockClear();
//   });

//   it('renders the quiz title', async () => {
//     const { getByText } = render(<QuizScreen navigation={{ goBack: jest.fn() }} route={{ params: { id: 1 } }} />);
//     await waitFor(() => getByText('Test Quiz'));
//   });

//   it('renders the first question', async () => {
//     const { getByText } = render(<QuizScreen navigation={{ goBack: jest.fn() }} route={{ params: { id: 1 } }} />);
//     await waitFor(() => getByText('What is 2+2?'));
//   });

//   it('allows the user to select an answer', async () => {
//     const { getByTestId } = render(<QuizScreen navigation={{ goBack: jest.fn() }} route={{ params: { id: 1 } }} />);
//     await waitFor(() => getByTestId('answer-4'));
//     fireEvent.press(getByTestId('answer-4'));
//     expect(getByTestId('answer-4').props.style.backgroundColor).toEqual('#e3f2fd');
//   });

//   it('submits the selected answer and shows the next button', async () => {
//     const { getByTestId, getByText } = render(<QuizScreen navigation={{ goBack: jest.fn() }} route={{ params: { id: 1 } }} />);
//     await waitFor(() => getByTestId('answer-4'));
//     fireEvent.press(getByTestId('answer-4'));
//     fireEvent.press(getByText('Submit'));
//     await waitFor(() => getByText('Next'));
//   });

//   it('shows the quiz results when completed', async () => {
//     const { getByTestId, getByText } = render(<QuizScreen navigation={{ goBack: jest.fn() }} route={{ params: { id: 1 } }} />);
//     await waitFor(() => getByTestId('answer-4'));
//     fireEvent.press(getByTestId('answer-4'));
//     fireEvent.press(getByText('Submit'));
//     fireEvent.press(getByText('Next'));
//     fireEvent.press(getByText('Next'));
//     await waitFor(() => getByText('Quiz Results'));
//     expect(getByText('Score: 1/1')).toBeTruthy();
//   });
// });

describe('QuizScreen', () => {
  let navigation;
  let route;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    route = {
      params: {
        id: '1',
      },
    };
  });

  it('should render loading screen', () => {
    const { getByTestId } = render(<QuizScreen navigation={navigation} route={route} />);
    expect(getByTestId('loading-screen')).toBeDefined();
  });

  it('should render quiz content', async () => {
    const data = {
      quiz: {
        name: 'Test Quiz',
        questions: [
          {
            question: 'What is the capital of France?',
            answers: [
              { id: 1, text: 'Paris', iscorrect: true },
              { id: 2, text: 'Madrid', iscorrect: false },
              { id: 3, text: 'Berlin', iscorrect: false },
            ],
          },
        ],
      },
    };
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
      })
    );
    const { getByText, getAllByText } = render(<QuizScreen navigation={navigation} route={route} />);
    await waitFor(() => expect(getByText('Test Quiz')).toBeDefined());
    expect(getAllByText('What is the capital of France?')).toHaveLength(1);
    expect(getByText('Paris')).toBeDefined();
    expect(getByText('Madrid')).toBeDefined();
    expect(getByText('Berlin')).toBeDefined();
  });

  it('should handle API error', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject('API is down'));
    const { getByTestId } = render(<QuizScreen navigation={navigation} route={route} />);
    await waitFor(() => expect(getByTestId('error-screen')).toBeDefined());
  });

  it('should handle answer selection', async () => {
    const data = {
      quiz: {
        name: 'Test Quiz',
        questions: [
          {
            question: 'What is the capital of France?',
            answers: [
              { id: 1, text: 'Paris', iscorrect: true },
              { id: 2, text: 'Madrid', iscorrect: false },
              { id: 3, text: 'Berlin', iscorrect: false },
            ],
          },
        ],
      },
    };
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
      })
    );
    const { getByText } = render(<QuizScreen navigation={navigation} route={route} />);
    await waitFor(() => expect(getByText('Paris')).toBeDefined());
    fireEvent.press(getByText('Paris'));
    expect(getByText('Submit')).toBeDefined();
  });
});

// // mock fetch function to return the mock data
// global.fetch = jest.fn(() =>
//  Promise.resolve({
//    json: () => Promise.resolve(mockData),
//  })
// );


// describe('QuizScreen', () => {
//  beforeEach(() => {
//    // reset mock fetch function
//    global.fetch.mockClear();
//  });


//  it('should show loading message while data is being fetched', () => {
//    const { getByText } = render(<QuizScreen />);


//    expect(getByText('Loading')).toBeDefined();
//  });


//  it('should render quiz name and first question when data is loaded', async () => {
//    const { getByText, queryByText } = render(<QuizScreen />);


//    // wait for data to load
//    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));


//    // check that loading message is
// // check that loading message is gone
// expect(queryByText('Loading')).toBeNull();


// // check that quiz name and first question are displayed
// expect(getByText('quiz 1')).toBeDefined();
// expect(getByText('Current Score: 0')).toBeDefined();
// expect(getByText('Question 1 out of 2')).toBeDefined();
// expect(getByText('1. Is this the first question?')).toBeDefined();
// expect(getByText('Yes')).toBeDefined();
// expect(getByText('No')).toBeDefined();
// });






// it('should show final score and completion message when quiz is completed', async () => {
// const { getByText, queryByText } = render(<QuizScreen />);
// // wait for data to load
// await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));


// // select correct answer for both questions
// fireEvent.press(getByText('Yes'));
// fireEvent.press(getByText('Maybe'));


// // check that final score and completion message are shown
// expect(getByText('Quiz Done')).toBeDefined();
// expect(getByText('Final Score: 2/2')).toBeDefined();
// expect(queryByText('Current Score:')).toBeNull();
// expect(queryByText('Question')).toBeNull();
// });
// });
