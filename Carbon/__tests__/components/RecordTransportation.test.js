import React from 'react';
import {View} from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import RecordTransportation from '../../navigation/screens/Progress/RecordTransportation';

describe('RecordTransportation', () => {
    it('should render correctly', () => {
        const { getByText } = render(<RecordTransportation />);
        expect(getByText('Log your travel for today')).toBeTruthy();
    });
});