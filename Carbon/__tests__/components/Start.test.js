import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StartScreen from '../../navigation/screens/Questionnaire/Start';

describe('<StartScreen />', () => {
  it('renders correctly', () => {
    const navigation = {
      navigate: jest.fn(),
      setOptions: jest.fn(),
    };
    const { getByText } = render(<StartScreen navigation={navigation} />);
    expect(getByText('Hello!')).toBeDefined();
    expect(getByText('Take the first step to lowering your carbon emissions and a more eco-friendly lifestyle')).toBeDefined();
    expect(getByText('Start Questionnaire')).toBeDefined();
  });

  it('navigates to "q1" screen when Start Questionnaire button is pressed', () => {
    const navigation = {
      navigate: jest.fn(),
      setOptions: jest.fn(),
    };
    const { getByText } = render(<StartScreen navigation={navigation} />);
    const startButton = getByText('Start Questionnaire');
    fireEvent.press(startButton);
    expect(navigation.navigate).toHaveBeenCalledWith('q1');
  });
});