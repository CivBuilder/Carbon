import React from 'react';
import { render } from '@testing-library/react-native';
import { CategoryChart, DailyLog } from '../../components/ChartData';
import { getLabel } from '../../components/ChartData';

describe('CategoryChart', () => {
    test('renders the current month as a title', () => {
        const { getByText } = render(<CategoryChart />);
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        expect(getByText(currentMonth)).toBeDefined();
    });

    test('displays a message to select a section if no slice is selected', () => {
        const { getByText } = render(<CategoryChart />);
        expect(getByText(/Click a section to learn more/)).toBeDefined();
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