import React from 'react';
import updateTable from '../../../../navigation/screens/Ranking/UpdateTable';
import RankingList from '../../../../navigation/screens/Ranking/RankingTableClass';
import { EmissionCategory as EC } from '../../../../navigation/screens/Ranking/Categories';

const mockSetLBTable = jest.fn(x=>null);
const mockSetLoading = jest.fn(x=>null);
const mockSetErr = jest.fn(x=>null);

const currentCategory = 0;
const currentTab = 0; 
const lb = Array.from({length: 5}, () => Array.from({length: 3}, () => new RankingList()));
const emission_category = EC.GLOBAL

describe('UpdateTable', ()=>{
    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
      });

    global.fetch = jest.fn(() => {
        return new Promise(resolve => {
            resolve({
            ok: true,
            json: () => {
                return { ranking: 5, sustainability_score: 80 };
            },
            status : 200,
            });
        });
    });

    it('Will Exit And alert if the pae is less than 0, Extend Upwards is true', () =>{
        lb[0][0].indices = [-1,1];
        updateTable(mockSetLBTable, lb, emission_category, 0, null, true, mockSetLoading, mockSetErr);
        updateTable(mockSetLBTable, lb, emission_category, 0, null, false, mockSetLoading, mockSetErr);
        updateTable(mockSetLBTable, lb, emission_category, 0, 0, false, mockSetLoading, mockSetErr);


    })
    it('Will set data when the response is OK', async () =>{
        fetch.mockImplementationOnce(() => {
            return new Promise(resolve => {
                resolve({
                ok: true,
                json: () => {
                    return [];
                },
                status : 404,
                });
            });
        });
        lb[0][0].indices = [0,1]
        await updateTable(mockSetLBTable, lb, emission_category, 0, null, true,  mockSetLoading, mockSetErr) 
        await updateTable(mockSetLBTable, lb, emission_category, 0, 0, true,  mockSetLoading, mockSetErr) 
        await updateTable(mockSetLBTable, lb, emission_category, 0, null, false,  mockSetLoading, mockSetErr) 
        await updateTable(mockSetLBTable, lb, emission_category, 0, null, true,  mockSetLoading, mockSetErr) 
    })
    
    it('Will throw an ', async () =>{
        fetch.mockImplementationOnce(() => {
            return new Promise(resolve => {
                resolve({
                ok: true,
                json: () => {
                    return [];
                },
                status : 200,
                });
            });
        });
        lb[0][0].indices = [0,1]
        await updateTable(mockSetLBTable, lb, emission_category, 0, null, true,  mockSetLoading, mockSetErr) 
        await updateTable(mockSetLBTable, lb, emission_category, 0, 0, true,  mockSetLoading, mockSetErr) 
        await updateTable(mockSetLBTable, lb, emission_category, 0, null, false,  mockSetLoading, mockSetErr) 
        await updateTable(mockSetLBTable, lb, emission_category, 0, null, true,  mockSetLoading, mockSetErr) 
    })
})