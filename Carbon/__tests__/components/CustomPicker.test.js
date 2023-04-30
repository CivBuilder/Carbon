import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomPicker from '../../navigation/screens/Progress/CustomPicker';

describe('CustomPicker', () => {
  const items = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  it('renders the label and options', () => {
    const { getByText } = render(
      <CustomPicker
        label="Test Picker"
        selectedValue="option2"
        onValueChange={() => {}}
        items={items}
        testID="test-picker"
      />
    );

    expect(getByText('Test Picker')).toBeDefined();
  });

  it('calls the onValueChange callback when an option is selected', () => {
    const onValueChange = jest.fn();
    const { getByTestId } = render(
      <CustomPicker
        label="Test Picker"
        selectedValue="option2"
        onValueChange={onValueChange}
        items={items}
        testID="test-picker"
      />
    );

    fireEvent(getByTestId('test-picker'), 'onValueChange', 'option3');

    expect(onValueChange).toHaveBeenCalledWith('option3');
  });
});