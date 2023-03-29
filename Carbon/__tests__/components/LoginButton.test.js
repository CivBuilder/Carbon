import { render, fireEvent } from '@testing-library/react-native';
import LoginButton from '../../components/LoginButton';

describe('LoginButton', () => {
  it('calls the onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<LoginButton onPress={onPressMock} />);
    const loginButton = getByText('Login');

    fireEvent.press(loginButton);

    expect(onPressMock).toHaveBeenCalled();
  });
});
