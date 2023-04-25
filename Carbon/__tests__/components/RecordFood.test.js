import React from 'react';
import { render } from '@testing-library/react-native';
import RecordFood from '../../navigation/screens/Progress/RecordFood';

describe('RecordFood', () => {
    it('should render correctly', () => {
        const { getByText } = render(<RecordFood />);
        expect(getByText('Log your food intake for today')).toBeTruthy();
    });  
});