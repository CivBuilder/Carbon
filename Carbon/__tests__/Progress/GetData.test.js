import { render } from '@testing-library/react-native';
import GetData from '../../navigation/screens/Progress/GetData.js';
/*
    This needs to be updated with more tests
    It's currently having issues with fetching
    Try to add multiple tests 
*/
global.fetch = jest.fn(() => {
    return new Promise(resolve => {
        resolve({
        ok: true,
        json: () => {
            return [[100, 200, 300, 400, 500], [500, 545, 100, 555, 100], [100, 200, 300, 400, 500], [800, 200, 750, 600, 500]];
        },
        status : 200,
        });
    });
});
test('GetData', async () => {
    const twoDdata = await GetData();
    expect(twoDdata).not.toBeNull();
    console.log(twoDdata)
});