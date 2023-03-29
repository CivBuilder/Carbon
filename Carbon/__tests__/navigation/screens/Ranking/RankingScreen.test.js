import React from 'react';
import { render, waitFor, act, fireEvent} from '@testing-library/react-native';
import RankingScreen from '../../../../navigation/screens/Ranking/RankingScreen';

describe('RankingScreen', () => {

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
    
    beforeEach( () => {
        fetch.mockClear();
    });

    test('renders correctly - return status 200', async () => {
        const { getByTestId } = render(<RankingScreen />);
        await waitFor(() =>{expect(getByTestId('rankingComponent')).toBeDefined()});
        
    });

    test('renders correctly - return status 400', async () => {
        fetch.mockImplementationOnce(() => {
            return new Promise(resolve => {
                resolve({
                ok: true,
                json: () => {
                    return { ranking: 5, sustainability_score: 80 };
                },
                status : 404,
                });
            });
        });
        const { getByTestId } = render(<RankingScreen />);
        await waitFor(() =>{expect(getByTestId('error_screen')).toBeDefined()});
    })

    
    test('renders correctly - fetch Throws Error - rejected HTTP Promise', async () => {
        fetch.mockImplementationOnce(() => {
            return new Promise.reject("API Failure");
        });
        
        const { getByTestId } = render(<RankingScreen />);
        await waitFor(() =>{expect(getByTestId('error_screen')).toBeDefined()});
    })
    

    test('HandlePressedButton is called when button is pressed', async () => {
        const mockHandlePressedButton = jest.fn();
        const { getByTestId } = render(<RankingScreen HandlePressedButton={mockHandlePressedButton} />);
        const button1 = getByTestId('likeYouButton');
        

        const button2 = getByTestId('globalButton');
        const button3 = getByTestId('socialButton');
      
        
        fireEvent(button1, 'click');

        fetch.mockImplementationOnce(() => {
            return new Promise(resolve => {
                resolve({
                ok: true,
                json: () => {
                    return { ranking: 5, sustainability_score: 80 };
                },
                status : 404,
                });
            });
        });
        fireEvent(button2, 'click');
        
        fetch.mockImplementationOnce(() => {
            return new Promise(resolve => {
                resolve({
                ok: true,
                json: () => {
                    return { ranking: 5, sustainability_score: 80 };
                },
                status : 204,
                });
            });
        });
        fireEvent(button2, 'click');

        fetch.mockImplementationOnce(() => {
            return new Promise(resolve => {
                resolve({
                ok: true,
                json: () => {
                    return { ranking: 5, sustainability_score: 80 };
                },
                status : 204,
                });
            });
        });
        fireEvent(button2, 'click');
        fireEvent(button3, 'click');
        
        await waitFor(() => expect(mockHandlePressedButton).toHaveBeenCalledTimes(0));
    });

});