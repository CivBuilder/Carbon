import { FetchMonthEmissions } from "../../components/FetchMonthEmissions";

describe('FetchMonthEmissions', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return null if the response status is 204', async () => {
        // mock the fetch function to return a response with status 204
        global.fetch = jest.fn(() => Promise.resolve({ status: 204 }));
        const data = await FetchMonthEmissions('january', '1234');
        expect(data).toBeNull();
    });

    it('should fetch data and return it', async () => {
        // mock the fetch function to return some data
        const mockData = { foo: 'bar' };
        global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockData) }));
        const data = await FetchMonthEmissions('january', '1234');
        expect(data).toEqual(mockData);
    });

    it('should throw an error if the fetch fails', async () => {
        // mock the fetch function to throw an error
        global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
        await expect(FetchMonthEmissions('january', '1234')).rejects.toThrowError('Network error');
    });

    it('should time out if the fetch takes too long', async () => {
        // mock the fetch function to never resolve
        global.fetch = jest.fn(() => new Promise(() => {}));
        await expect(FetchMonthEmissions('january', '1234')).rejects.toThrowError('Network request timed out');
      }, 30000); // increase timeout to 10000ms
});