import { render } from '@testing-library/react-native';
import { formatRankText } from '../../../../navigation/screens/Ranking/RankingMiniView';
import MiniRanking from '../../../../navigation/screens/Ranking/RankingMiniView';
import { EmissionCategory as EC } from '../../../../navigation/screens/Ranking/EmissionScoreCateogory';

describe('FormatRankText', () => {
    it('Will return st with 1s ordinals are that arent in the 10s place', () => {
        expect(formatRankText(1)).toEqual("1st");
        expect(formatRankText(21)).toEqual("21st");
        expect(formatRankText(11)).not.toEqual("11st")
    });

    it('Will return nd with 2s ordinals are that arent in the 10s place', () => {
        expect(formatRankText(2)).toEqual("2nd");
        expect(formatRankText(22)).toEqual("22nd");
    });

    
    it('Will return rd with 3s ordinals are that arent in the 10s place', () => {
        expect(formatRankText(3)).toEqual("3rd");
        expect(formatRankText(23)).toEqual("23rd");
    });

    it('Will return th with other ordinals that arent in the 10s place', () => {
        expect( formatRankText(4)).toEqual("4th");
        expect(formatRankText(5)).toEqual("5th");
    });

    it('Will return th for 10s place values', () => {
        const eleventh = formatRankText(11);
        expect(eleventh).toEqual("11th");
    });
});

describe('MiniRanking', () => {
    it('Will return null if userScores is null', () =>{
        const { queryByTestId } = render(<MiniRanking userScores={null} rankCategory={EC.GLOBAL} />);
        expect(queryByTestId('Ranking-Mini-Container')).toBeNull();
    });
    it('Will return null if rankCategory is not an Emissions Category', () =>{
        const { queryByTestId } = render(<MiniRanking userScores={1} rankCategory={null} />);
        expect(queryByTestId('Ranking-Mini-Container')).toBeNull();
    });
    it('Will render correctly', () => {
        const {queryByTestId} = render(
        <MiniRanking 
            userScores={{
                global_ranking : 1, 
                sustainability_score : 1 ,
                global_score : 500,
                next_rank_global_score : 1000
            }}
            rankCategory = {EC.GLOBAL}
        />)
        expect(queryByTestId('Ranking-Mini-Container')).not.toBeNull();

        
    })

});