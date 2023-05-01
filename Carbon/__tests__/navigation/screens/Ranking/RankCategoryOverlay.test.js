import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { EmissionCategory as EC } from '../../../../navigation/screens/Ranking/Categories';
import RankCategoryOverlay from '../../../../navigation/screens/Ranking/RankCategoryOverlay';

const MockSetEmission = jest.fn(x=>0);

describe('Rank Category Overlay Modal', () => {
    //clear each mock if it overwrites it
    beforeEach( () => {
        jest.clearAllMocks();
    });

        
    it('Will call MockSetEmission with each button pressed', ()=>{
        const {getByTestId} = render(<RankCategoryOverlay setEmissionCategory={MockSetEmission}/>);
        //test the pressing of all buttons
        fireEvent(getByTestId('list-btn'), 'press');
        fireEvent(getByTestId('glob-btn'), 'press');
        fireEvent(getByTestId('trans-btn'), 'press');
        fireEvent(getByTestId('life-btn'), 'press');
        fireEvent(getByTestId('diet-btn'), 'press');
        fireEvent(getByTestId('home-btn'), 'press');
        fireEvent(getByTestId('leave-btn'), 'press');

        //Restart list to request close
        fireEvent(getByTestId('list-btn'), 'press');
        fireEvent(getByTestId('overlay-modal'), 'requestClose');

        expect(MockSetEmission.mock.calls).toHaveLength(1);
    })
})