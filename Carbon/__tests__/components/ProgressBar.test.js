import { render } from '@testing-library/react-native';
import RankProgressBar from '../../components/ProgressBar';
describe('RankProgressBar', () => {
  it('Basic Component Renders with Standard Ratio', () => {
    
    const {getByTestId} = render(<RankProgressBar progress = {1} total = {2}/>)
    const barContainer = getByTestId('ProgressBar Container');
    const progressText = getByTestId('progressText');
    const totalText = getByTestId('totalText');

    expect(barContainer).toBeDefined();
    expect(progressText.props.children).toEqual([1, " "]);
    expect(totalText.props.children).toEqual(2);

  });

  it('If we have a ratio of over 0, it will still render the animated view ~ NO divide by Zero error', () => {
    
    const {getByTestId} = render(<RankProgressBar progress = {1} total = {0}/>)
    const AnimatedProgressBar = getByTestId('AnimatedProgressBar');
    const progressText = getByTestId('progressText');
    const totalText = getByTestId('totalText');

    expect(AnimatedProgressBar).toBeDefined(); 
    expect(progressText.props.children).toEqual([1, " "]);
    expect(totalText.props.children).toEqual(0);

  });

  
  it('Again, if the next component is 0, where the the lower progress is 0, we do not get a Div by 0 error', () => {
    
    const {getByTestId} = render(<RankProgressBar progress = {0} total = {0}/>)
    const AnimatedProgressBar = getByTestId('AnimatedProgressBar');
    const progressText = getByTestId('progressText');
    const totalText = getByTestId('totalText');

    expect(AnimatedProgressBar).toBeDefined(); 
    expect(progressText.props.children).toEqual([0, " "]);
    expect(totalText.props.children).toEqual(0);
    
  });


});