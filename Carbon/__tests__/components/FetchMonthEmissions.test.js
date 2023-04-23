import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { FetchMonthEmissions } from "../../components/FetchMonthEmissions";

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

describe('FetchMonthEmissions', () => {
    const VALID_YEAR_MONTH = '2023-04';
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('throws an error if yearMonth is not in the correct format', async () => {
        const INVALID_YEAR_MONTH = '22-12';
        await expect(FetchMonthEmissions(INVALID_YEAR_MONTH)).rejects.toThrow('FetchMonthEmissions: yearMonth is not in the correct format (YYYY-MM)');
    });

    it('throws an error if yearMonth is not a string', async () => {
        const yearMonth = 202304;
        await expect(FetchMonthEmissions(yearMonth)).rejects.toThrow('FetchMonthEmissions: yearMonth is not in the correct format (YYYY-MM)');
    });

    it('throws an error if yearMonth is not provided', async () => {
        await expect(FetchMonthEmissions()).rejects.toThrow('FetchMonthEmissions: yearMonth is not in the correct format (YYYY-MM)');
    });

    it('should fetch data and return it', async () => {
        // mock the fetch function to return some data
        const mockData = { foo: 'bar' };
        global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockData) }));
        const data = await FetchMonthEmissions(VALID_YEAR_MONTH);
        expect(data).toEqual(mockData);
    });

    it('should return null if the response status is 204', async () => {
        // mock the fetch function to return a response with status 204
        global.fetch = jest.fn(() => Promise.resolve({ status: 204 }));
        const data = await FetchMonthEmissions(VALID_YEAR_MONTH);
        expect(data).toBeNull();
    });

    it('throws an error if the response status is not 204', async () => {
        // mock the fetch function to return a response with status 404
        global.fetch = jest.fn(() =>
            Promise.resolve({
            status: 404,
            json: jest.fn().mockRejectedValue(new Error('Not Found')),
        })
        );
        await expect(FetchMonthEmissions(VALID_YEAR_MONTH)).rejects.toThrowError(
            'Not Found'
        );
    });

    it('throws an error if the response is empty and has a status other than 204', async () => {
        // mock the fetch function to return a response with status 404 and an empty response body
        global.fetch = jest.fn(() => Promise.resolve({ status: 404, text: () => Promise.resolve('') }));
        await expect(FetchMonthEmissions('2023-04')).rejects.toThrowError('response.json is not a function');
    });

    it('throws an error if the response is not valid JSON', async () => {
        // mock the fetch function to return a response with status 200 and an invalid JSON response body
        global.fetch = jest.fn(() => Promise.resolve({ status: 200, text: () => Promise.resolve('{foo:bar}') }));
        await expect(FetchMonthEmissions('2023-04')).rejects.toThrowError('response.json is not a function');
    });

    it('should throw an error if the fetch fails', async () => {
        // mock the fetch function to throw an error
        global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
        await expect(FetchMonthEmissions(VALID_YEAR_MONTH)).rejects.toThrowError('Network error');
    });

    // it('calls getAuthHeader with the correct arguments', async () => {
    //     const yearMonth = '2023-04';
    //     const mockGetAuthHeader = jest.fn().mockResolvedValue({});
    //     await FetchMonthEmissions(yearMonth, mockGetAuthHeader);
    //     expect(mockGetAuthHeader).toHaveBeenCalledWith();
    // });

    it('throws an error if getAuthHeader() fails', async () => {
        const error = new Error(`Cannot read properties of undefined (reading 'status')`);
        const mockGetAuthHeader = jest.fn().mockRejectedValue(error);
        await expect(
            FetchMonthEmissions(VALID_YEAR_MONTH, mockGetAuthHeader)
        ).rejects.toThrowError(error);
    });
});