import getUserScores from '../../../../navigation/screens/Ranking/getUserScores';
jest.mock(`@react-native-async-storage/async-storage`)

const mockSetUserScores = jest.fn(x=>0);
const mockSetLoading = jest.fn(x=>0);
const mockSetErrorMessage = jest.fn(x=>0);


describe('getUserScores ~ function that retrieves user scores from the database', ()=>{


    //Default fetch Implementation - returns 200 
    global.fetch = jest.fn(() => {
        return new Promise(resolve => {
            resolve({
            ok: true,
            json: () => {
                return {};
            },
            status : 200,
            });
        });
    });
    
    //clear each mock if it overwrites it
    beforeEach( () => {
        // fetch.mockClear();
        jest.clearAllMocks();
    });


    it('sets loading from on to off, assigns a user score, and assigns null to error message', async () => {
        await getUserScores(mockSetUserScores, mockSetLoading, mockSetErrorMessage);
        expect(mockSetUserScores.mock.calls).toHaveLength(1);
        expect(mockSetLoading.mock.calls).toHaveLength(2);
        expect(mockSetErrorMessage.mock.calls).toHaveLength(1);

    })
    it('sets loading from on to off, does not assign a user score, assigns an error message ', async () => {
        fetch.mockImplementationOnce(() => {
            return new Promise(resolve => {
                resolve({
                ok: true,
                json: () => {
                    return {};
                },
                status : 404,
                });
            });
        });

        await getUserScores(mockSetUserScores, mockSetLoading, mockSetErrorMessage);
        expect(mockSetUserScores.mock.calls).toHaveLength(1);
        expect(mockSetLoading.mock.calls).toHaveLength(2);
        expect(mockSetErrorMessage.mock.calls).toHaveLength(1);

    })
})