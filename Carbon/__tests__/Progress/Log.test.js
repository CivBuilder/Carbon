import React from 'react';


import { fireEvent, render, waitFor, act } from '@testing-library/react-native';
import Log from '../../navigation/screens/Progress/Log.js';
const testData = [[100, 200, 300, 400, 500], [500, 545, 100, 555, 100], [100, 200, 300, 400, 500], [800, 200, 750, 600, 500]];
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(testData)

}));

describe('Log', () => {

  it('renders the loading text when the data has not loaded yet', async () => {
    await waitFor(() => {
      const { getByText } = render(<Log />) //we are making sure it shows loading while laoding
      expect(getByText('LOADING......')).toBeTruthy();

    });


  });

  it('Tests if loaded', async () => {
    await waitFor(() => {

      const { log } = render(<Log />); //render the log and make sure it actually exists
      expect(log).not.toBeNull();
    });
  });
  it('Checking if default is set to what it should be', async () => {
    const { getByText } = render(<Log />);
    await waitFor(() => {

      expect(getByText("Today's Log")).toBeTruthy();
    });

  });
  it('Checking if left button is rendered', async () => {
    const { getByText } = render(<Log />);
    await waitFor(() => expect(getByText(" <-")).toBeTruthy()); //make sure left button exists
    const button = getByText(' <-'); //then assign it 
    await waitFor(() => fireEvent.press(button)); //Testing left button

  });

  it('Checking if right button is rendered and works.', async () => {

    const { getByText } = render(<Log />);
    await waitFor(() => expect(getByText(" ->")).toBeTruthy());
    const button = getByText(' ->'); //same as above but for right button as well and make sure it puts us to the next state properly
    await waitFor(() => fireEvent.press(button));
    await waitFor(() => {

      expect(getByText("Yesterday's Log")).toBeTruthy();
    });
  });
  it('Testing both buttons and if they are fully working.', async () => {

    const { getByText } = render(<Log />); //render
    await waitFor(() => expect(getByText(" ->")).toBeTruthy()); //get right click button
    const buttonRight = getByText(' ->');
    await waitFor(() => expect(getByText(" <-")).toBeTruthy()); //get left click button
    const buttonLeft = getByText(' <-');

    await waitFor(() => fireEvent.press(buttonRight)); //go right one and see if it worked
    await waitFor(() => expect(getByText("Yesterday's Log")).toBeTruthy());
    
    await waitFor(() => fireEvent.press(buttonRight)); //right agian see if it worked
    await waitFor(() => expect(getByText("Weekly Log")).toBeTruthy());
   
    await waitFor(() => fireEvent.press(buttonRight)); //right again see if it worked
    await waitFor(() => expect(getByText("Monthly Log")).toBeTruthy());
   
    await waitFor(() => fireEvent.press(buttonRight)); //right again see if it worked (making sure it doenst go out of bounds)
    await waitFor(() => expect(getByText("Monthly Log")).toBeTruthy());

    await waitFor(() => fireEvent.press(buttonLeft)); //go back left see if its correct
    await waitFor(() => expect(getByText("Weekly Log")).toBeTruthy());

    await waitFor(() => fireEvent.press(buttonLeft)); //same as above
    await waitFor(() => expect(getByText("Yesterday's Log")).toBeTruthy());
    
    await waitFor(() => fireEvent.press(buttonLeft)); //same as above
    await waitFor(() => expect(getByText("Today's Log")).toBeTruthy());

    await waitFor(() => fireEvent.press(buttonLeft)); //Agai none extra left click to make sure its not out of bounds
    await waitFor(() => expect(getByText("Today's Log")).toBeTruthy());
  });
});


