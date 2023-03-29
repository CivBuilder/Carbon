import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Log from '../../../../navigation/screens/Home/Log';

describe('Log', () => {
  it('renders the loading text when the data has not loaded yet', () => {
    const { getByText } = render(<Log />);
    expect(getByText('LOADING......')).toBeTruthy();

  });

  it('Tests if not loaded', () => {
    const {log}  = render(<Log />);
    expect(log).not.toBeNull();

  });
});

  // it('Checks left click button.', () => {
  //   const { getByTestId } = render(<Log />);
  //   const leftClick = getByTestId("left-click");
  //   act(fireEvent.press(leftClick));

  // });
  // it('Checks left click button.', () => {
  //   const { getByTestId } = render(<Log />);
  //   const rightClick = getByTestId("right-click");
  //   act(fireEvent.press(rightClick));

  // });

  // it('renders an error message when there is not enough data for the selected timeframe', () => {
  //   const { getByText } = render(<Log />);
  //   fireEvent.press(getByText('->'));
  //   fireEvent.press(getByText('->'));
  //   fireEvent.press(getByText('->'));
  //   fireEvent.press(getByText('->'));
  //   expect(getByText('ERROR, not enough data for Weekly log.\n                    Please click left or right.')).toBeTruthy();
  // });
  