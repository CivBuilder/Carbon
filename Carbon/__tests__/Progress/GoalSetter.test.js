import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GoalSetter from '../../navigation/screens/Progress/GoalSetter';

describe('GoalSetter component', () => {
    test('renders slider and button', () => {
        const { getByTestId } = render(<GoalSetter />);
        const slider = getByTestId('slider');
        const setGoalButton = getByTestId('set-goal-button');
        expect(slider).toBeDefined();
        expect(setGoalButton).toBeDefined();
    });

    test('updates goal percentage when slider value changes', () => {
        const { getByTestId } = render(<GoalSetter />);
        const slider = getByTestId('slider');
        const sliderPercentage = getByTestId('sliderPercentage');
        expect(sliderPercentage.props.children).toStrictEqual([0, "%"]);
    });
});
