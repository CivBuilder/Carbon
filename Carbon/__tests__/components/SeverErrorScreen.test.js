import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ServerErrorScreen from "../../../Carbon/components/ServerErrorScreen"

describe('ServerErrorScreen', () => {
  const mockOnRefresh = jest.fn();
  const errorMessage = 'Network error';

  it('Renders Correctly with the provided Error Message in the file', async () => {
    const {getAllByTestId, getByText} = render(
      <ServerErrorScreen onRefresh={mockOnRefresh} errorMessage={errorMessage} />,
    );
    const elements = getAllByTestId(/.+/);
    elements.map(el => console.log(el.props.testID));


    const sadIcon = getAllByTestId('Sad-Icon-Error-Text');
    const errorMessageText = getByText(/Error Getting Data - Swipe Down to Refresh Page/i);
    expect(sadIcon).toBeTruthy();
    expect(errorMessageText).toBeTruthy();

  });
});