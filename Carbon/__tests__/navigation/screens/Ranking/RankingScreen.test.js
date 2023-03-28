import React from 'react';
import { render, waitFor, act} from '@testing-library/react-native';
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
    
    // test('fetches user rank correctly', async () => {
    //     const mockFetch = jest.fn(() => {
    //     return new Promise(resolve => {
    //         resolve({
    //         ok: true,
    //         json: () => {
    //             return { ranking: 5, sustainability_score: 80 };
    //         },
    //         status : 200,
    //         });
    //     });
    //     });
    
    //     global.fetch = mockFetch;
    //     const { getByText } = render(<RankingScreen />);
    //     await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    //     await waitFor(() => expect(getByText('Rank: 5')).toBeTruthy());
    //     await waitFor(() => expect(getByText('Sustainability Score: 80')).toBeTruthy());
    // });
    
    // test('handles error on fetch user rank', async () => {
    //     const mockFetch = jest.fn(() => {
    //     return new Promise((resolve, reject) => {
    //         reject(new Error('failed to fetch user rank'));
    //     });
    //     });
    
    //     global.fetch = mockFetch;
    //     const { getByText } = render(<RankingScreen />);
    //     await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    //     await waitFor(() => expect(getByText('Error: failed to fetch user rank')).toBeTruthy());
    // });
    
    // add more tests for other functions
    });
