import { render, fireEvent } from '@testing-library/react-native';
import getUserScores from '../../../../navigation/screens/Ranking/getUserScores';
import HomeScreenRanking from '../../../../navigation/screens/Ranking/HomeScreenRanking';


jest.mock('../../../../navigation/screens/Ranking/getUserScores', ()=>jest.fn());

describe('HomeScreenRanking', ()=>{
    it('Will call the hook on startup', ()=>{
        const {getByTestId} = render(<HomeScreenRanking/>);
        expect(getUserScores).toHaveBeenCalled();
    }) 
    it('Component will render', ()=>{
        const {getByTestId} = render(<HomeScreenRanking/>);
        const view = getByTestId('home-screen-ranking');
        expect(view).toBeDefined();
    })
})
