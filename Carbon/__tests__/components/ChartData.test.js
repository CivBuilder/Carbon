import React from 'react';
import { render } from '@testing-library/react-native';
import { CategoryChart, DailyLog } from '../../components/ChartData';
import { getData, getLabel } from '../../components/ChartData';

describe('CategoryChart', () => {
    it('returns an array of emissions data when data is successfully fetched and parsed', async () => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        const today = new Date();
        const currentMonth = monthNames[today.getMonth()];
        const mockFetchMonthEmissions = jest.fn().mockResolvedValue(JSON.stringify([
            { transport_emissions: 10, lifestyle_emissions: 20, home_emissions: 30, diet_emissions: 40 },
            { transport_emissions: 50, lifestyle_emissions: 60, home_emissions: 70, diet_emissions: 80 },
        ]));
        const expectedEmissionsData = [
            { x: 'Transport', y: 60 },
            { x: 'Lifestyle', y: 80 },
            { x: 'Home', y: 100 },
            { x: 'Diet', y: 120 },
        ];

        const emissionsData = await getData(currentMonth, mockFetchMonthEmissions);

        expect(mockFetchMonthEmissions).toHaveBeenCalledWith(currentMonth, 27);
        expect(emissionsData).toEqual(expectedEmissionsData);
    });

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

    const data = [
        { x: "Transport", y: 1000 },
        { x: "Diet", y: 2000 },
        { x: "Home", y: 3000 },
        { x: "Stuff", y: 4000 },
    ];

    test('calculate total value of all categories', () => {
        const expectedTotal = 10000;
        const total = data.reduce((acc, datum) => acc + datum.y, 0);
        expect(total).toEqual(expectedTotal);
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