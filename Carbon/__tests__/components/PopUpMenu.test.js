import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { create } from 'react-test-renderer';
import { PopUpMenu } from "../../components/PopUpMenu";
import { ScreenNames } from "../../navigation/screens/Main/ScreenNames";

describe("PopUpMenu", () => {
    test('renders correctly', () => {
        const tree = create(<PopUpMenu />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('displays the pop-up menu when the + button is pressed', () => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId } = render(<PopUpMenu navigation={navigation} />);
        const plusButton = getByTestId('plus_button');

        fireEvent.press(plusButton);

        expect(getByTestId('popup_menu')).toBeVisible();
    });

    it('closes the pop-up menu when the backdrop is pressed', () => {
        const navigation = { navigate: jest.fn() };
        const { getByTestId } = render(<PopUpMenu navigation={navigation} />);
        const plusButton = getByTestId('plus_button');

        fireEvent.press(plusButton);
        fireEvent.press(getByTestId('popup_menu_backdrop'));

        expect(getByTestId('popup_menu')).not.toBeVisible();
    });

    test('renders plus button', () => {
        const { getByTestId } = render(<PopUpMenu navigation={jest.fn()} />);
        expect(getByTestId('plus_button')).toBeTruthy();
    });

    test('renders menu options', () => {
        const { getByTestId, getByText } = render(<PopUpMenu navigation={jest.fn()} />);
        fireEvent.press(getByTestId('plus_button'));

        expect(getByTestId('popup_menu')).toBeTruthy();
        expect(getByText('Record Emissions')).toBeTruthy();
        expect(getByText('Add Goal')).toBeTruthy();
    });

    test('navigates to correct screen when option is pressed', () => {
        const navigateMock = jest.fn();
        const { getByTestId, getByText } = render(<PopUpMenu navigation={{ navigate: navigateMock }} />);
        fireEvent.press(getByTestId('plus_button'));
        fireEvent.press(getByText('Record Emissions'));

        expect(navigateMock).toHaveBeenCalledWith(ScreenNames.RECORD_EMISSION);
    });

    it('navigates to the record emissions screen when the "Record Emissions" option is selected', () => {
        const navigateMock = jest.fn();
        const { getByTestId, getByText } = render(<PopUpMenu navigation={{ navigate: navigateMock }} />);
        fireEvent.press(getByTestId('plus_button'));
        fireEvent.press(getByText('Record Emissions'));
        expect(navigateMock).toHaveBeenCalledWith(ScreenNames.RECORD_EMISSION);
        expect(getByTestId('popup_menu')).not.toBeVisible();
    });

    it('navigates to the add goal screen when the "Add Goal" option is selected', () => {
        const navigateMock = jest.fn();
        const { getByTestId, getByText } = render(<PopUpMenu navigation={{ navigate: navigateMock }} />);
        fireEvent.press(getByTestId('plus_button'));
        fireEvent.press(getByText('Add Goal'));
        expect(navigateMock).toHaveBeenCalledWith(ScreenNames.ADD_GOAL);
        expect(getByTestId('popup_menu')).not.toBeVisible();
    });
});