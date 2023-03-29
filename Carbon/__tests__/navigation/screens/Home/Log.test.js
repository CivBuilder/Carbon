import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Log from '../../../../navigation/screens/Home/Log';

describe('Log', () => {
  it('renders the loading text when the data has not loaded yet', () => {
    const { getByText } = render(<Log />);
    expect(getByText('LOADING......')).toBeTruthy();
  });

  it('Checks left click button.', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<Log />);

    data-testid="right-click"

  });

  // it('renders an error message when there is not enough data for the selected timeframe', () => {
  //   const { getByText } = render(<Log />);
  //   fireEvent.press(getByText('->'));
  //   fireEvent.press(getByText('->'));
  //   fireEvent.press(getByText('->'));
  //   fireEvent.press(getByText('->'));
  //   expect(getByText('ERROR, not enough data for Weekly log.\n                    Please click left or right.')).toBeTruthy();
  // });
});
  