import React from 'react';
import PredictInput from '../../calculations/PredictInput';
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
}];


describe("test suite one", () => {
    beforeAll(() => {
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
    });

    afterAll(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    test("PredictInput should return data", async () => {
        const data = await PredictInput();
        expect(data).toBeTruthy();
    });
});

describe("test suite two", () => {
    beforeAll(() => {
        global.fetch = jest.fn(() => {
            return new Promise(resolve => {
                resolve({
                    ok: false,
                    success: false,
                    json: () => {
                        return Promise.resolve("error message");
                    },
                    status: 400,
                });
            });
        });
    });

    afterAll(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    test("PredictInput should handle error", async () => {
        const data = await PredictInput();
        expect(data).toBe([0,0,0,0,0]);
    });
});