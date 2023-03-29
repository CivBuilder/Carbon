import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import RecordEmission from '../../navigation/screens/Progress/RecordEmission';

describe('RecordEmission', () => {
  let component;
  beforeEach(() => {
    component = render(<RecordEmission />);
  });

  it('should render Record Emissions button', () => {
    const button = component.getByText('Record Emissions');
    expect(button).toBeTruthy();
  });
  
  it('should open modal when Record Emissions button is pressed', () => {
    const button = component.getByText('Record Emissions');
    fireEvent.press(button);
    const modal = component.getByTestId('button-modal');
    expect(modal.props.visible).toBeTruthy();
  });

  it('should close modal when close icon is pressed', () => {
    const button = component.getByText('Record Emissions');
    fireEvent.press(button);
    const closeIcon = component.getByTestId('close-icon');
    fireEvent.press(closeIcon);
    const modal = component.getByTestId('button-modal');
    expect(modal.props.visible).toBeFalsy();
  });
  it('should close modal onRequestClose', () => {
    const button = component.getByText('Record Emissions');
    fireEvent.press(button);
    const modal = component.getByTestId('button-modal');
    fireEvent(modal, 'requestClose');
    expect(modal.props.visible).toBeFalsy();
  });

  it('should open food emission modal when cutlery icon is pressed and close on request', () => {
    const saveLog = jest.fn();
    const button = component.getByText('Record Emissions');
    fireEvent.press(button);
    const cutleryIcon = component.getByTestId('cutlery-icon');
    fireEvent.press(cutleryIcon);
    const foodModal = component.getByTestId('food-modal');
    expect(foodModal.props.visible).toBeTruthy();
    fireEvent(foodModal, 'requestClose');
    expect(foodModal.props.visible).toBeFalsy();
  });

  it('should open transportation emission modal when car icon is pressed and close on request', () => {
    const button = component.getByText('Record Emissions');
    fireEvent.press(button);
    const carIcon = component.getByTestId('car-icon');
    fireEvent.press(carIcon);
    const transportationModal = component.getByTestId('transportation-modal');
    expect(transportationModal.props.visible).toBeTruthy();
    fireEvent(transportationModal, 'requestClose');
    expect(transportationModal.props.visible).toBeFalsy();
  });

  it('should open recycling emission modal when recycle icon is pressed and close on request', () => {
    const button = component.getByText('Record Emissions');
    fireEvent.press(button);
    const recycleIcon = component.getByTestId('recycle-icon');
    fireEvent.press(recycleIcon);
    const recyclingModal = component.getByTestId('recycle-modal');
    expect(recyclingModal.props.visible).toBeTruthy();
    fireEvent(recyclingModal, 'requestClose');
    expect(recyclingModal.props.visible).toBeFalsy();
  });
});