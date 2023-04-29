import React from "react";
import { PredictScreen } from "../../navigation/screens";
import { waitFor, fireEvent, render } from "@testing-library/react-native";
const testData = [{
  "date": "2023-03-09", "diet_emissions": 222, "home_emissions": 500, "id": 10,
  "lifestyle_emissions": 222, "total_emissions": 1166, "transport_emissions": 222, "user_id": 323
},
{
  "date": "2023-06-09", "diet_emissions": 222, "home_emissions": 500, "id": 10, "lifestyle_emissions": 222,
  "total_emissions": 1166, "transport_emissions": 222, "user_id": 323
},
{
  "date": "2023-09-09", "diet_emissions": 222, "home_emissions": 500, "id": 10, "lifestyle_emissions": 222,
  "total_emissions": 1166, "transport_emissions": 222, "user_id": 323
}, {
  "date": "2023-12-09", "diet_emissions": 222, "home_emissions": 500,
  "id": 10, "lifestyle_emissions": 222, "total_emissions": 1166, "transport_emissions": 222, "user_id": 323
},{
  "date": "2023-12-09", "diet_emissions": 222, "home_emissions": 500,
  "id": 10, "lifestyle_emissions": 222, "total_emissions": 1166, "transport_emissions": 222, "user_id": 323
},{
  "date": "2023-12-09", "diet_emissions": 222, "home_emissions": 500,
  "id": 10, "lifestyle_emissions": 222, "total_emissions": 1166, "transport_emissions": 222, "user_id": 323
}];

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(testData)

}));

describe('PredictScreen', () => {

  it('Tests if loaded', async () => {
    await waitFor(() => {

      const { Screen } = render(<PredictScreen />); //render the log and make sure it actually exists
      expect(Screen).not.toBeNull();
    });
  });
  it('Checking if Accept button is rendered', async () => {
    await waitFor(async () => {
      const { getByText } = render(<PredictScreen />)
      expect(getByText("Predicting Results")).toBeTruthy();
      await waitFor(() => {
        expect(getByText("Accept")).toBeTruthy();

      },{timeout:10000})
      const button = getByText("Accept");
      fireEvent.press(button);
    },{timeout:10000});


  });
})