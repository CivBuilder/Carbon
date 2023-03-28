import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmissionModal from '../../navigation/screens/Progress/EmissionModal';
jest.mock('react-native/Libraries/Components/ToastAndroid/ToastAndroid', () => ({
    show: jest.fn(),
  }));
describe('EmissionModal', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <EmissionModal visible={true} onRequestClose={() => {}} title="Test Modal" saveData={() => {}} testID="modal"/>
    );
    expect(getByTestId('modal')).toBeTruthy();
    expect(getByTestId('textInput')).toBeTruthy();
    expect(getByTestId('saveButton')).toBeTruthy();
    expect(getByTestId('closeButton')).toBeTruthy();
  });

  it('calls saveData and onRequestClose on save button press', () => {
    const saveDataMock = jest.fn();
    const onRequestCloseMock = jest.fn();
    const { getByTestId } = render(
      <EmissionModal visible={true} onRequestClose={onRequestCloseMock} title="Test Modal" saveData={saveDataMock} testID="modal"/>
    );
    const textInput = getByTestId('textInput');
    const saveButton = getByTestId('saveButton');
    fireEvent.changeText(textInput, 'test log');
    fireEvent.press(saveButton);
    expect(saveDataMock).toHaveBeenCalledTimes(1);
    expect(saveDataMock).toHaveBeenCalledWith('test log');
    expect(onRequestCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onRequestClose when modal is requested to close', () => {
    const onRequestCloseMock = jest.fn();
    const { getByTestId } = render(
        <EmissionModal visible={true} onRequestClose={onRequestCloseMock} title="Test Modal" saveData={() => {}} testID="modal"/>
        );
    const modal = getByTestId('modal');
    fireEvent(modal, 'requestClose');
    expect(onRequestCloseMock).toHaveBeenCalledTimes(1);
  });
  it('calls onRequestClose on close button press', () => {
    const onRequestCloseMock = jest.fn();
    const { getByTestId } = render(
        <EmissionModal visible={true} onRequestClose={onRequestCloseMock} title="Test Modal" saveData={() => {}} testID="modal"/>
        );
    const modal = getByTestId('modal');
    const closeButton = getByTestId('closeButton');
    fireEvent.press(closeButton);
    expect(onRequestCloseMock).toHaveBeenCalledTimes(1);
  });
});