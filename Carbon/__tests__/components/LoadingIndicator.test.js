import { render } from '@testing-library/react-native';
import LoadingIndicator from '../../components/LoadingIndicator';

describe('LoadingIndicator', () => {
  it('If loading === false, it should render null', () => {
    const { queryByTestId } = render(<LoadingIndicator loading={false} />);
    expect(queryByTestId('loading-indicator')).toBeNull();
  });

  it('If loading === true, it should render an Activityindicator', () => {
    const { getByTestId } = render(<LoadingIndicator loading={true} />);
    expect(getByTestId('loading-indicator')).toBeDefined();
  });
});