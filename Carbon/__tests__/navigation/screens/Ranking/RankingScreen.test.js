import React from 'react';
import { render, act, fireEvent, waitFor} from '@testing-library/react-native';
import getUserScores from '../../../../navigation/screens/Ranking/getUserScores';
import RankingScreen from '../../../../navigation/screens/Ranking/RankingScreen';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


jest.mock('../../../../navigation/screens/Ranking/getUserScores', ()=>jest.fn(
    (setUserScores, setLoading, setErrorMessage)=>{setUserScores({
        // sustainability_score : 1,
        // avatar_index : 1,
        // global_score : 1,
        // transport_score : 2,
        // lifestyle_score : 1 ,
        // diet_score: 1,
        // home_score : 1, 
        // username : 'hello',
        // global_ranking : 1 ,
        // transport_ranking : 1 ,
        // lifestyle_ranking : 1 ,
        // diet_ranking : 1 ,
        // home_ranking : 1 ,


        // [sequelize.literal('ROW_NUMBER() OVER (ORDER BY "global_score" DESC)'), 'global_ranking'],
        // [sequelize.literal('ROW_NUMBER() OVER (ORDER BY transport_score DESC)'), 'transport_ranking'],
        // [sequelize.literal('ROW_NUMBER() OVER (ORDER BY lifestyle_score DESC)'), 'lifestyle_ranking'],
        // [sequelize.literal('ROW_NUMBER() OVER (ORDER BY diet_score DESC)'), 'diet_ranking'],
        // [sequelize.literal('ROW_NUMBER() OVER (ORDER BY global_score DESC)'), 'home_ranking'],
        
        // [sequelize.literal('(SELECT COUNT(*) FROM user as user2 WHERE user2.global_score > user.global_score) + 1'), 'global_ranking'],
        // [sequelize.literal('(SELECT COUNT(*) FROM user as user2 WHERE user2.transport_score > user.transport_score) + 1'), 'transport_ranking'],
        // [sequelize.literal('(SELECT COUNT(*) FROM user as user2 WHERE user2.lifestyle_score > user.lifestyle_score) + 1'), 'lifestyle_ranking'],
        // [sequelize.literal('(SELECT COUNT(*) FROM user as user2 WHERE user2.diet_score > user.diet_score) + 1'), 'diet_ranking'],
        // [sequelize.literal('(SELECT COUNT(*) FROM user as user2 WHERE user2.home_score > user.home_score) + 1'), 'home_ranking'],
        
    })})
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
        const screen = await findByTestId('tab-switcher');
        expect(screen).toBeDefined();

    });

    // test('renders correctly - return status 400', async () => {
    //     fetch.mockImplementationOnce(() => {
    //         return new Promise(resolve => {
    //             resolve({
    //             ok: true,
    //             json: () => {
    //                 return { ranking: 5, sustainability_score: 80 };
    //             },
    //             status : 404,
    //             });
    //         });
    //     });
    //     const { getByTestId } = render(<RankingScreen />);
    //     await waitFor(() =>{expect(getByTestId('error_screen')).toBeDefined()});
    // })

    
    // test('renders correctly - fetch Throws Error - rejected HTTP Promise', async () => {
    //     fetch.mockImplementationOnce(() => {
    //         return new Promise.reject("API Failure");
    //     });
        
    //     const { getByTestId } = render(<RankingScreen />);
    //     await waitFor(() =>{expect(getByTestId('error_screen')).toBeDefined()});
    // })
    

    // test('HandlePressedButton is called when button is pressed', async () => {
    //     const mockHandlePressedButton = jest.fn();
    //     const { getByTestId } = render(<RankingScreen HandlePressedButton={mockHandlePressedButton} />);
    //     const button1 = getByTestId('likeYouButton');
        

    //     const button2 = getByTestId('globalButton');
    //     const button3 = getByTestId('socialButton');
      
        
    //     fireEvent(button1, 'click');

    //     fetch.mockImplementationOnce(() => {
    //         return new Promise(resolve => {
    //             resolve({
    //             ok: true,
    //             json: () => {
    //                 return { ranking: 5, sustainability_score: 80 };
    //             },
    //             status : 404,
    //             });
    //         });
    //     });
    //     fireEvent(button2, 'click');
        
    //     fetch.mockImplementationOnce(() => {
    //         return new Promise(resolve => {
    //             resolve({
    //             ok: true,
    //             json: () => {
    //                 return { ranking: 5, sustainability_score: 80 };
    //             },
    //             status : 204,
    //             });
    //         });
    //     });
    //     fireEvent(button2, 'click');

    //     fetch.mockImplementationOnce(() => {
    //         return new Promise(resolve => {
    //             resolve({
    //             ok: true,
    //             json: () => {
    //                 return { ranking: 5, sustainability_score: 80 };
    //             },
    //             status : 200,
    //             });
    //         });
    //     });
    //     fireEvent(button2, 'click');
    //     fireEvent(button3, 'click');
        
    //     await waitFor(() => expect(mockHandlePressedButton).toHaveBeenCalledTimes(0));
    // });

});