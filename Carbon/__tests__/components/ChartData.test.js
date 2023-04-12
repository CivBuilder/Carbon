import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { CategoryChart, DailyLog } from '../../components/ChartData';
import { getData, fetchData, getLabel, getSelectedLabel } from '../../components/ChartData';

describe('getData', () => {
    const fakeFetch = (data) => {
        return jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data),
        }));
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return null if no data is fetched', async () => {
        const setLoading = jest.fn();
        const setError = jest.fn();
        global.fetch = fakeFetch([]);
        const result = await getData('2022-01', setLoading, setError);
        expect(result).toBeNull();
        expect(setLoading).toHaveBeenCalledTimes(2);
        expect(setLoading).toHaveBeenNthCalledWith(1, true);
        expect(setLoading).toHaveBeenNthCalledWith(2, false);
        expect(setError).not.toHaveBeenCalled();
    });

    it('should return the emissions data when data is fetched', async () => {
        const setLoading = jest.fn();
        const setError = jest.fn();
        const fetchedData = [
            {
                id: 1,
                user_id: 323,
                date: '2022-01-01',
                transport_emissions: 10,
                lifestyle_emissions: 20,
                home_emissions: 30,
                diet_emissions: 40,
            },
            {
                id: 2,
                user_id: 323,
                date: '2022-01-02',
                transport_emissions: 50,
                lifestyle_emissions: 60,
                home_emissions: 70,
                diet_emissions: 80,
            },
        ];
        global.fetch = fakeFetch(fetchedData);
        const result = await getData('2022-01', setLoading, setError);
        expect(result).toEqual([
            { x: 'Transport', y: 60 },
            { x: 'Lifestyle', y: 80 },
            { x: 'Home', y: 100 },
            { x: 'Diet', y: 120 },
        ]);
        expect(setLoading).toHaveBeenCalledTimes(2);
        expect(setLoading).toHaveBeenNthCalledWith(1, true);
        expect(setLoading).toHaveBeenNthCalledWith(2, false);
        expect(setError).not.toHaveBeenCalled();
    });

    it('should return null and set error when fetch fails', async () => {
        const setLoading = jest.fn();
        const setError = jest.fn();
        const fetchError = new Error('Fetch error');
        global.fetch = jest.fn().mockImplementation(() => Promise.reject(fetchError));
        const result = await getData('2022-01', setLoading, setError);
        expect(result).toBeNull();
        expect(setLoading).toHaveBeenCalledTimes(2);
        expect(setLoading).toHaveBeenNthCalledWith(1, true);
        expect(setLoading).toHaveBeenNthCalledWith(2, false);
        expect(setError).toHaveBeenCalledTimes(1);
        expect(setError).toHaveBeenCalledWith(fetchError);
    });

    // it('should return null and set error when fetch times out', async () => {
    //     expect.assertions(6);

    //     const setLoading = jest.fn();
    //     const setError = jest.fn();

    //     global.fetch = jest.fn().mockImplementation(() => {
    //         return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve([]);
    //         }, 30000);
    //         });
    //     });

    //     const resultPromise = getData('2022-01', setLoading, setError);
    //     const result = await Promise.race([resultPromise, new Promise(resolve => setTimeout(resolve, 31000))]);

    //     expect(result).toBeNull();
    //     expect(setLoading).toHaveBeenCalledTimes(2);
    //     expect(setLoading).toHaveBeenNthCalledWith(1, true);
    //     expect(setLoading).toHaveBeenNthCalledWith(2, false);
    //     expect(setError).toHaveBeenCalledTimes(1);
    //     expect(setError.mock.calls[0][0].message).toBe('Network request timed out');
    // }, 30000);
});

describe('fetchData', () => {
    const currentMonth = 'April';
    let setData;
    let setTotal;
    let setLoading;
    let setError;

    beforeEach(() => {
        setData = jest.fn();
        setTotal = jest.fn();
        setLoading = jest.fn();
        setError = jest.fn();
    });

    it('should fetch data and update state when data is retrieved', async () => {
        const emissionsData = [
            { x: "Transport", y: 50 },
            { x: "Lifestyle", y: 30 },
            { x: "Home", y: 20 },
            { x: "Diet", y: 10 },
        ];
        const getTotal = emissionsData.reduce((acc, datum) => acc + datum.y, 0);
        const getData = jest.fn().mockResolvedValue(emissionsData);

        await fetchData(currentMonth, setData, setTotal, setLoading, setError, getData);

        expect(setLoading).toHaveBeenCalledTimes(2);
        expect(setLoading).toHaveBeenCalledWith(true);
        expect(setLoading).toHaveBeenCalledWith(false);
        expect(setData).toHaveBeenCalledWith(emissionsData);
        expect(setTotal).toHaveBeenCalledWith(getTotal);
        expect(setError).not.toHaveBeenCalled();
    });

    it('should handle error and set default state', async () => {
        const expectedError = new Error('Fetch error');
        const getData = jest.fn().mockRejectedValue(expectedError);

        await fetchData(currentMonth, setData, setTotal, setLoading, setError, getData);

        expect(setData).toHaveBeenCalledWith([]);
        expect(setTotal).toHaveBeenCalledWith(0);
        expect(setLoading).toHaveBeenCalledTimes(2); // should be called twice, once to turn on and once to turn off
        expect(setError).toHaveBeenCalledWith(expectedError);
    });
});

describe('getLabel', () => {
    it('should return the correct label when percentage is greater than 4%', () => {
        const datum = { x: 'Transport', y: 50 };
        const total = 200;
        const expectedLabel = 'Transport\n25%';
        expect(getLabel(datum, total)).toEqual(expectedLabel);
    });

    it('should return null when percentage is less than or equal to 4%', () => {
        const datum = { x: 'Lifestyle', y: 5 };
        const total = 200;
        expect(getLabel(datum, total)).toBeNull();
    });
});

describe('getSelectedLabel', () => {
    test('getSelectedLabel returns the correct label when given valid input', () => {
        const data = [
            { x: 'Label 1', y: 10 },
            { x: 'Label 2', y: 20 },
            { x: 'Label 3', y: 30 }
        ];
        const selectedSlice = 1;

        expect(getSelectedLabel(selectedSlice, data)).toBe('Label 2\n20 lbs CO2');
    });

    test('getSelectedLabel returns null when selectedSlice is null', () => {
        const data = [
            { x: 'Label 1', y: 10 },
            { x: 'Label 2', y: 20 },
            { x: 'Label 3', y: 30 }
        ];
        const selectedSlice = null;

        expect(getSelectedLabel(selectedSlice, data)).toBeNull();
    });

    test('getSelectedLabel returns null when data is empty', () => {
        const data = [];
        const selectedSlice = 0;

        expect(getSelectedLabel(selectedSlice, data)).toBeNull();
    });
});

describe('CategoryChart', () => {
    test('returns the correct label when percentage is greater than 4', () => {
        const datum = { x: 'Transport', y: 100 };
        const total = 1000;
        const label = getLabel(datum, total);
        expect(label).toBe('Transport\n10%');
    });

    test('returns null when percentage is less than or equal to 4', () => {
        const datum = { x: 'Transport', y: 30 };
        const total = 1000;
        const label = getLabel(datum, total);
        expect(label).toBeNull();
    });

    test('calculate total value of all categories', () => {
        const data = [
            { x: "Transport", y: 1000 },
            { x: "Diet", y: 2000 },
            { x: "Home", y: 3000 },
            { x: "Stuff", y: 4000 },
        ];

        const expectedTotal = 10000;
        const total = data.reduce((acc, datum) => acc + datum.y, 0);
        expect(total).toEqual(expectedTotal);
    });

    it('renders correctly', () => {
        const data = [
            { x: "Transport", y: 1000 },
            { x: "Diet", y: 2000 },
            { x: "Home", y: 3000 },
            { x: "Stuff", y: 4000 },
        ];

        const tree = renderer.create(<CategoryChart data={data} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders the "no data" message and "add emissions" button when there is no data', () => {
        const data = [];
        const navigation = {
            navigate: jest.fn(),
        };
        const component = renderer.create(
            <CategoryChart data={data} navigation={navigation} />,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

//Checks if daily log renders properly
describe('DailyLog', () => {
    it('renders a bar chart', () => {
        const dataArray = [5, 10, 15, 20, 25];
        const { log } = render(<DailyLog dataArray={dataArray} />);
        expect(log).not.toBeNull();
    });
});