import React from 'react';
import PredictInput from '../../calculations/PredictInput';
const testData =  [{"date": "2023-03-09", "diet_emissions": 222, "home_emissions": 500, "id": 10, "lifestyle_emissions": 222, "total_emissions": 1166, "transport_emissions": 222, "user_id": 323}];

global.fetch = jest.fn(() => {
    return new Promise(resolve => {
        resolve({
        ok: true,
        json: () => {
            return testData;
        },
        status : 200,
        });
    });
});

test("PredictInput", async () => {
    const data = await PredictInput();
    expect(data).toBeTruthy();

    
});