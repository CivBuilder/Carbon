import { render } from '@testing-library/react-native';
import GetData from '../../../../navigation/screens/Home/GetData';

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
            return getData();
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