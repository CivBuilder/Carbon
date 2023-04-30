import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import RecordEmission, {postResults} from '../../navigation/screens/Progress/RecordEmission';
import { Alert } from 'react-native';
import { API_URL } from '../../config/Api';
import { getToken } from '../../util/LoginManager';
describe('RecordEmissionScreen', () => {
  let navigation, route, component;
  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    route = {
      params: {
          returningEmissionsEntry : {
            transport_emissions: 2,
            total_emissions: 5,
            lifestyle_emissions: 5,
            diet_emissions: 1,
            home_emissions: 5,
        }
      }
    };
    component = render(<RecordEmission navigation={navigation} route={route} />);
  
  });
  
  it('should render correctly', () => {
    const { getByTestId } = component;
    expect(getByTestId('modal-view')).toBeTruthy();
  });
  it('should navigate to the FoodScreen when the cutlery icon is pressed', async () => {
    const { getByTestId } = component;
    const cutleryIcon = getByTestId('cutlery-icon');
    const em = {
      "transport_emissions": 2,
      "total_emissions": 5,
      "lifestyle_emissions": 5,
      "diet_emissions": 1,
      "home_emissions": 5,
    }
    fireEvent.press(cutleryIcon);
    expect(navigation.navigate).toHaveBeenCalledWith('Food', {sentEmissionsEntry : em});
  });
  it('should navigate to the TransportationScreen when the car icon is pressed', async () => {
    const { getByTestId } = component;
    const carIcon = getByTestId('car-icon');
    const em = {
      "transport_emissions": 2,
      "total_emissions": 5,
      "lifestyle_emissions": 5,
      "diet_emissions": 1,
      "home_emissions": 5,
    }
    fireEvent.press(carIcon);
    expect(navigation.navigate).toHaveBeenCalledWith('Transportation', {sentEmissionsEntry : em});
  });
  it('should navigate to the RecyclingScreen when the recycle icon is pressed', async () => {
    const { getByTestId } = component;
    const recycleIcon = getByTestId('recycle-icon');
    const em = {
      "transport_emissions": 2,
      "total_emissions": 5,
      "lifestyle_emissions": 5,
      "diet_emissions": 1,
      "home_emissions": 5,
    }
    fireEvent.press(recycleIcon);
    expect(navigation.navigate).toHaveBeenCalledWith('Recycling', {sentEmissionsEntry : em});
  });
  it('should navigate to the ElectricityScreen when the plug icon is pressed', async () => {
    const { getByTestId } = component;
    const plugIcon = getByTestId('electricity-icon');
    const em = {
      "transport_emissions": 2,
      "total_emissions": 5,
      "lifestyle_emissions": 5,
      "diet_emissions": 1,
      "home_emissions": 5,
    }
    fireEvent.press(plugIcon);
    expect(navigation.navigate).toHaveBeenCalledWith('Electricity', {sentEmissionsEntry : em});
  });
  //it shoudld save the results
  it('should save the results and navigate to the ProgressScreen when the save icon is pressed', async () => {
    const { getByTestId } = component;
    const saveIcon = getByTestId('save-and-exit-icon');
    const navigation = { goBack: jest.fn() };
    const emissionsEntry = { 
      total_emissions: 100,
      diet_emissions: 50,
      transport_emissions: 25,
      home_emissions: 25,
      lifestyle_emissions: 0,
     };
    global.fetch = jest.fn(() => Promise.resolve({ status: 200 }));
    console.log = jest.fn(); // to suppress console.log output
    global.alert = jest.fn(); // to suppress alert output
    fireEvent.press(saveIcon);
    await postResults(navigation, emissionsEntry);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(navigation.goBack).toHaveBeenCalledTimes(1);

  }
  );
});

describe('postResults', () => {
  it('should handle successful request', async () => {
    const emissionsEntry = { 
        total_emissions: 100,
        diet_emissions: 50,
        transport_emissions: 25,
        home_emissions: 25,
        lifestyle_emissions: 0,
       };
    const navigation = { goBack: jest.fn() };
    global.fetch = jest.fn(() => Promise.resolve({ status: 200 }));
    console.log = jest.fn(); // to suppress console.log output

    await postResults(navigation, emissionsEntry);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}userEmissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'secrettoken': await getToken(),
      },
      body: JSON.stringify(emissionsEntry),
    });
  });
  //alert if no emission entered
  it('should display an alert when no emissions were entered', async () => {
    // mock the Alert.alert method
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation();
    const navigation = { goBack: jest.fn() };
    // call the postResults function with an empty emissions entry
    await postResults(navigation, {
      diet_emissions: 0,
      home_emissions: 0,
      transport_emissions: 0,
      lifestyle_emissions: 0,
      total_emissions: 0
    });

    // assert that the Alert.alert method was called with the expected message
    expect(alertSpy).toHaveBeenCalledWith('Please Upload at least one Emission Category');

    // restore the original Alert.alert method
    alertSpy.mockRestore();
  });
    //204
  it('should deny second post of the day', async () => {
    const emissionsEntry = {
      total_emissions: 100,
      diet_emissions: 50,
      transport_emissions: 25,
      home_emissions: 25,
      lifestyle_emissions: 0,
    };
    jest.spyOn(Alert, 'alert');
    const navigation = { goBack: jest.fn() };
    global.fetch = jest.fn(() => Promise.resolve({ status: 204 }));
    console.log = jest.fn(); // to suppress console.log output
    global.alert = jest.fn(); // to suppress alert output

    await postResults(emissionsEntry, navigation);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(navigation.goBack).toHaveBeenCalledTimes(0);

  });
  //404
  it('should handle bad request', async () => {
    const emissionsEntry = {
      total_emissions: 100,
      diet_emissions: 50,
      transport_emissions: 25,
      home_emissions: 25,
      lifestyle_emissions: 0,
    };
    jest.spyOn(Alert, 'alert');
    const navigation = { goBack: jest.fn() };
    global.fetch = jest.fn(() => Promise.resolve({ status: 404 }));
    console.log = jest.fn(); // to suppress console.log output
    global.alert = jest.fn(); // to suppress alert output

    await postResults(emissionsEntry, navigation);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(navigation.goBack).toHaveBeenCalledTimes(0);
  });

});
