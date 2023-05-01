import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Section } from "../../components/Section";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native");

describe("Section component", () => {
  it("renders with default props", () => {
    const { getByTestId, queryByTestId } = render(<Section />);
    expect(getByTestId("header")).toBeTruthy();
    expect(queryByTestId("shortcut")).toBeNull();
    expect(getByTestId("container")).toBeTruthy();
    expect(getByTestId("body")).toBeTruthy();
    expect(getByTestId("content")).toBeTruthy();
  });

  it("renders with cardView = false", () => {
    const { getByTestId, queryByTestId } = render(<Section cardView={false} />);
    expect(getByTestId("header")).toBeTruthy();
    expect(queryByTestId("shortcut")).toBeNull();
    expect(getByTestId("container")).toBeNull();
    expect(queryByTestId("body")).toBeNull();
    expect(getByTestId("content")).toBeTruthy();
  });

  it("renders with shortcutURL and shortcutTitle", () => {
    const { getByTestId } = render(
      <Section shortcutURL="test" shortcutTitle="test" />
    );
    expect(getByTestId("header")).toBeTruthy();
    expect(getByTestId("shortcut")).toBeTruthy();
    expect(getByTestId("container")).toBeTruthy();
    expect(getByTestId("body")).toBeTruthy();
    expect(getByTestId("content")).toBeTruthy();
  });

  it("navigates to the correct screen on shortcut press", () => {
    const navigate = jest.fn();
    useNavigation.mockReturnValue({ navigate });
    const { getByTestId } = render(
      <Section shortcutURL="test" shortcutTitle="test" />
    );
    fireEvent.press(getByTestId("shortcut"));
    expect(navigate).toHaveBeenCalledWith("test");
  });
});