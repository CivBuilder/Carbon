import React from 'react';
import { render } from '@testing-library/react-native';

import
    {
        getTotalData, fetchTotalData, getCurrentMonth, getLastSixMonths,
        setMaxDomain, tickFormat, getMonthEmission,getPercentDifference,
        RenderPercentDifference, MonthlyFootprintChart,
    } from '../../components/MonthlyFootprintLineChart';

describe('getTotalData', () => {
    const fetchedData  = [
        { total_emissions: 10 },
        { total_emissions: 20 },
        { total_emissions: 30 },
    ];
    const expectedYearMonth = '2023-04';

    const mockFetch = jest.fn(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(fetchedData),
    }));

    const mockError = new Error('Network request failed');
    const mockReject = jest.fn(() => Promise.reject(mockError));

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 0 when no data is fetched', async () => {
        const result = await getTotalData(expectedYearMonth, jest.fn());
        expect(result).toBe(0);
    });

    it('should return the sum of all total_emissions values when data is fetched', async () => {
        global.fetch = mockFetch;
        const result = await getTotalData(expectedYearMonth, jest.fn());
        expect(result).toBe(60);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining(`/api/userEmissions/${expectedYearMonth}/27`));
    });

    it('should call the setError function when an error occurs', async () => {
        const setErrorMock = jest.fn();
        global.fetch = mockReject;
        const result = await getTotalData(expectedYearMonth, setErrorMock);
        expect(result).toBe(0);
        expect(setErrorMock).toHaveBeenCalledWith(mockError);
    });
});

describe('fetchTotalData', () => {
    const setDataMock = jest.fn();
    const setErrorMock = jest.fn();

    afterEach(() => {
        setDataMock.mockReset();
        setErrorMock.mockReset();
    });

    // it('should set data to empty array when all y values are zero', async () => {
    //     const data = [
    //         { x: 'Jan', y: 0 },
    //         { x: 'Feb', y: 0 },
    //         { x: 'Mar', y: 0 },
    //     ];

    //     await fetchTotalData(['2022-01', '2022-02', '2022-03'], setDataMock, setErrorMock);

    //     expect(setDataMock).toHaveBeenCalledWith([]);
    //     expect(setErrorMock).not.toHaveBeenCalled();
    // });

    // it('should set data to non-empty array when at least one y value is non-zero', async () => {
    //     const data = [
    //         { x: 'Jan', y: 10 },
    //         { x: 'Feb', y: 20 },
    //         { x: 'Mar', y: 30 },
    //     ];

    //     await fetchTotalData(['2022-01', '2022-02', '2022-03'], setDataMock, setErrorMock);

    //     expect(setDataMock).toHaveBeenCalledWith(data);
    //     expect(setErrorMock).not.toHaveBeenCalled();
    // });

    it('should set data to empty array and call setError when an error occurs', async () => {
        const mockError = new Error('Network request failed');
        const emptyData = [];

        await fetchTotalData(['2022-01', '2022-02', '2022-03'], setDataMock, setErrorMock);

        expect(setDataMock).toHaveBeenCalledWith(emptyData);
        expect(setErrorMock).toHaveBeenCalledWith(mockError);
    });
});

describe('getLastSixMonths', () => {
    it('returns the last six months as an array of strings in YYYY-MM format', () => {
        const expectedMonths = [
            '2022-11',
            '2022-12',
            '2023-01',
            '2023-02',
            '2023-03',
            '2023-04',
        ];
        const actualMonths = getLastSixMonths();
        expect(actualMonths).toEqual(expectedMonths);
    });
});

describe('setMaxDomain', () => {
    it('should return the correct maximum domain with offset', () => {
        const data = [
            { x: 'Jan', y: 10 },
            { x: 'Feb', y: 20 },
            { x: 'Mar', y: 30 },
            { x: 'Apr', y: 25 },
        ];

        expect(setMaxDomain(data)).toEqual(36);
    });

    it('should throw a TypeError if data is not an array', () => {
        const data = 'not an array';

        expect(() => setMaxDomain(data)).toThrow(TypeError);
    });
});

describe('tickFormat', () => {
    it('should throw a TypeError if tick is not a number', () => {
        expect(() => tickFormat('not a number')).toThrow(TypeError);
    });

    it('should format a tick value with magnitude suffixes', () => {
        expect(tickFormat(123)).toEqual('123');
        expect(tickFormat(1234)).toEqual('1.2K');
        expect(tickFormat(12345)).toEqual('12.3K');
        expect(tickFormat(123456)).toEqual('123.5K');
        expect(tickFormat(1234567)).toEqual('1.2M');
        expect(tickFormat(12345678)).toEqual('12.3M');
        expect(tickFormat(123456789)).toEqual('123.5M');
        expect(tickFormat(1234567890)).toEqual('1.2B');
        expect(tickFormat(12345678901)).toEqual('12.3B');
        expect(tickFormat(123456789012)).toEqual('123.5B');
    });
});

describe('getMonthEmission', () => {
    const data = [
        {x: "Jan", y: 500},
        {x: "Feb", y: 1000},
        {x: "Mar", y: 1500000},
        {x: "Apr", y: 5500},
        {x: "May", y: 100000},
    ];

    it('should return the emission value for a valid input', () => {
        expect(getMonthEmission(data, 4)).toEqual(500);
        expect(getMonthEmission(data, 3)).toEqual(1000);
        expect(getMonthEmission(data, 2)).toEqual(1500000);
        expect(getMonthEmission(data, 1)).toEqual(5500);
        expect(getMonthEmission(data, 0)).toEqual(100000);
    });

    it('should return 0 if the data is empty', () => {
        expect(getMonthEmission([], 3)).toEqual(0);
    });

    it('should return 0 if num is greater than the data length', () => {
        expect(getMonthEmission(data, 10)).toEqual(0);
    });
});

describe('getPercentDifference', () => {
    it('should return the correct percentage difference', () => {
        expect(getPercentDifference(10, 5)).toEqual("100");
        expect(getPercentDifference(20, 10)).toEqual("100");
        expect(getPercentDifference(15, 10)).toEqual("50");
        expect(getPercentDifference(30, 25)).toEqual("20");
    });

    it('should return "Infinity" if previous value is 0', () => {
        expect(getPercentDifference(10, 0)).toEqual("100");
    });

    it('should return "-100" if current value is 0', () => {
        expect(getPercentDifference(0, 10)).toEqual("-100");
    });

    it('should return "-100" if current value is 0', () => {
        expect(getPercentDifference(0, 0)).toEqual("0");
    });
});

describe('RenderPercentDifference', () => {
    it('should render properly if the number is positive', () => {
        const { getByTestId } = render(
            <RenderPercentDifference percentDifference={10} percentColor="green" />
        );
        expect(getByTestId('percentDifferenceText')).toBeDefined();
    });

    it('should render properly if the number is negative', () => {
        const { getByTestId } = render(
            <RenderPercentDifference percentDifference={-20} percentColor="red" />
        );
        expect(getByTestId('percentDifferenceText')).toBeDefined();
    });

    // TODO
    // it('renders correctly with positive percent difference', () => {
    //     const { getByTestId, getByText } = render(
    //         <RenderPercentDifference percentDifference={10} percentColor="green" />
    //     );

    //     const caretIcon = getByTestId('caret-icon');
    //     const percentText = getByText('10% from previous month');

    //     expect(caretIcon.props.name).toBe('caret-up');
    //     expect(caretIcon.props.color).toBe('green');
    //     expect(percentText.props.style.color).toBe('green');
    // });

    // it('renders correctly with negative percent difference', () => {
    //     const { getByTestId, getByText } = render(
    //         <RenderPercentDifference percentDifference={-5} percentColor="red" />
    //     );

    //     const caretIcon = getByTestId('caret-icon');
    //     const percentText = getByText('5% from previous month');

    //     expect(caretIcon.props.name).toBe('caret-down');
    //     expect(caretIcon.props.color).toBe('red');
    //     expect(percentText.props.style.color).toBe('red');
    // });
});

describe('MonthlyFootprintChart', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<MonthlyFootprintChart navigation={{ navigate: jest.fn() }} />);
    });

        it('displays loading indicator while data is being fetched', () => {
        const { getByTestId } = render(<MonthlyFootprintChart navigation={{ navigate: jest.fn() }} />);
        expect(getByTestId('loading-indicator')).toBeTruthy();
    });
});