import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react-native';
import Log from '../../../../navigation/screens/Home/Log';
const testData = [[100, 200, 300, 400, 500], [500, 545, 100, 555, 100], [100, 200, 300, 400, 500], [800, 200, 750, 600, 500]];
global.fetch = jest.fn(() => {
  return new Promise(resolve => {
    resolve({
      ok: true,
      json: () => {
        return testData;
      },
      status: 200,
    });
  });
});
test('Log', async () => {

  act('renders the loading text when the data has not loaded yet', async () => {


    const { getByText } = render(<Log />);
    expect(getByText('LOADING......')).toBeTruthy();
  });

  act('Tests if not loaded', async () => {

    const { log } = render(<Log />);
    expect(log).not.toBeNull();
});
act('Checking if default is set to what it should be', async () => {
  const { getByText } = render(<Log />);
  expect(getByText("Today's Log")).toBeTruthy();
});
  // it('Checking if left button is rendered', async ()=> {
  //   const {getByText} = render(<Log />);
  //   await waitFor(() => expect(getByText(" <-")).toBeTruthy());

  // });
  // it('Checking if right button is rendered', async ()=> {
  //   const {getByText} = render(<Log />);
  //   await waitFor(() => expect(getByText(" ->")).toBeTruthy());

  // });
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
