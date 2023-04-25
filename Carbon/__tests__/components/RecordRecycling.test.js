import React from 'react';
import { render } from '@testing-library/react-native';
import RecordRecycling from '../../navigation/screens/Progress/RecordRecycling';

describe('RecordFood', () => {
    it('should render correctly', () => {
        const { getByText } = render(<RecordRecycling />);
        expect(getByText('Log the amount of each material you recycled today')).toBeTruthy();
    });  
});