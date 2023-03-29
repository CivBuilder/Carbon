import { render, fireEvent } from '@testing-library/react-native';
import LoginNavButton from '../../components/LoginNavButton';

describe('LoginNavButton', () => {
  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<LoginNavButton onPress={onPressMock} />);
    const loginNavButton = getByText('Login');

    fireEvent.press(loginNavButton);

    expect(onPressMock).toHaveBeenCalled();
  });
});
