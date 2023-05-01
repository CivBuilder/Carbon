import React from "react";
import { View } from "react-native";
import Category from "../../../../navigation/screens/Progress/Category";
import KeyFactors from "../../../../navigation/screens/Progress/KeyFactors";

jest.mock("react-native", () => ({
  View: "View",
}));

describe("KeyFactors component", () => {
  it("should render a view and categories", () => {
    const data = [
      { x: "Category 1", y: 50 },
      { x: "Category 2", y: 30 },
      { x: "Category 3", y: 20 },
    ];
    const wrapper = shallow(<KeyFactors data={data} />);
    const totalEmissions = data.reduce((acc, category) => acc + category.y, 0);
    const categories = data.map((category, index) => (
      <Category
        key={index}
        id={index}
        title={category.x}
        emission={category.y}
        percentage={`${((category.y / totalEmissions) * 100).toFixed(1)}`}
      />
    ));
    expect(wrapper.contains(<View style={styling.keyFactors}>{categories}</View>)).toBe(true);
  });

  it("should render a view with no categories if data is empty", () => {
    const data = [];
    const wrapper = shallow(<KeyFactors data={data} />);
    expect(wrapper.contains(<View style={styling.keyFactors}></View>)).toBe(true);
  });
});
