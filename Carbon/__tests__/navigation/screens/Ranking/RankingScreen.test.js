import React from 'react';
import { render, act, fireEvent, waitFor} from '@testing-library/react-native';
import getUserScores from '../../../../navigation/screens/Ranking/getUserScores';
import RankingScreen from '../../../../navigation/screens/Ranking/RankingScreen';
import updateTable from '../../../../navigation/screens/Ranking/UpdateTable';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('../../../../navigation/screens/Ranking/UpdateTable', ()=>jest.fn());

jest.mock('../../../../navigation/screens/Ranking/getUserScores', ()=>jest.fn(
    (setUserScores, setLoading, setErrorMessage)=>{setUserScores({})}
    )
);


describe('RankingScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
      });

    global.fetch = jest.fn(() => {
        return new Promise(resolve => {
            resolve({
            ok: true,
            json: () => {
                return { ranking: 5, sustainability_score: 80 };
            },
            status : 200,
            });
        });
    });
    
    test('renders loading Screen view when the userscores are null', async () => {
        getUserScores.mockImplementation((setUserScores, setLoading, setErrorMessage)=>{setUserScores(null)});
        const { findByTestId } = render(<RankingScreen />);
        const loadscreen = await findByTestId('load-screen');
        expect(loadscreen).toBeDefined();        
    });

    
    test('renders loading Screen view when the userscores are null', async () => {
        getUserScores.mockImplementation((setUserScores, setLoading, setErrorMessage)=>{setErrorMessage(true) 
        setUserScores({
            sustainability_score : 1,
            avatar_index : 1,
            global_score : 1,
            transport_score : 2,
            lifestyle_score : 1 ,
            diet_score: 1,
            home_score : 1, 
            username : 'hello',
            global_ranking : 1 ,
            transport_ranking : 1 ,
            lifestyle_ranking : 1 ,
            diet_ranking : 1 ,
            home_ranking : 1 ,    
        })});

        const { findByTestId } = render(<RankingScreen />);
        const error_screen = await findByTestId('error-screen');
        expect(error_screen).toBeDefined();        
    });

    test('renders loading Screen view when the userscores are null', async () => {
        getUserScores.mockImplementation((setUserScores, setLoading, setErrorMessage)=>{setUserScores({
            sustainability_score : 1,
            avatar_index : 1,
            global_score : 1,
            transport_score : 2,
            lifestyle_score : 1 ,
            diet_score: 1,
            home_score : 1, 
            username : 'hello',
            global_ranking : 1 ,
            transport_ranking : 1 ,
            lifestyle_ranking : 1 ,
            diet_ranking : 1 ,
            home_ranking : 1 ,       
        })})
        const { findByTestId} = render(<RankingScreen />);
        const screen = await findByTestId('list');
        expect(screen).toBeDefined();
        fireEvent(screen, 'refresh');
        fireEvent(screen, 'endReached');
    });
});