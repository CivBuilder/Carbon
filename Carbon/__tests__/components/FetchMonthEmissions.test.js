import { FetchMonthEmissions } from "../../components/FetchMonthEmissions";

describe('FetchMonthEmissions', () => {
    const VALID_YEAR_MONTH = '2022-12';
    const VALID_USER_ID = 123;

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('throws an error if yearMonth is not in the correct format', async () => {
        const INVALID_YEAR_MONTH = '22-12';
        await expect(FetchMonthEmissions(INVALID_YEAR_MONTH, VALID_USER_ID)).rejects.toThrow('FetchMonthEmissions: yearMonth is not in the correct format (YYYY-MM)');
    });

    it('throws an error if user_id is not a non-negative whole number', async () => {
        const INVALID_USER_ID = '123';
        await expect(FetchMonthEmissions(VALID_YEAR_MONTH, INVALID_USER_ID)).rejects.toThrow('FetchMonthEmissions: user_id must be a non-negative whole number');
    });

    it('should return null if the response status is 204', async () => {
        // mock the fetch function to return a response with status 204
        global.fetch = jest.fn(() => Promise.resolve({ status: 204 }));
        const data = await FetchMonthEmissions(VALID_YEAR_MONTH, VALID_USER_ID);
        expect(data).toBeNull();
    });

    it('should fetch data and return it', async () => {
        // mock the fetch function to return some data
        const mockData = { foo: 'bar' };
        global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockData) }));
        const data = await FetchMonthEmissions(VALID_YEAR_MONTH, VALID_USER_ID);
        expect(data).toEqual(mockData);
    });

    it('should throw an error if the fetch fails', async () => {
        // mock the fetch function to throw an error
        global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
        await expect(FetchMonthEmissions(VALID_YEAR_MONTH, VALID_USER_ID)).rejects.toThrowError('Network error');
    });

    it('should time out if the fetch takes too long', async () => {
        // mock the fetch function to never resolve
        global.fetch = jest.fn(() => new Promise(() => {}));
        await expect(FetchMonthEmissions(VALID_YEAR_MONTH, VALID_USER_ID)).rejects.toThrowError('Network request timed out');
    }, 25000);
});