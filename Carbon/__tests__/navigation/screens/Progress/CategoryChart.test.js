import React from 'react';
import CategoryChart from '../../../../navigation/screens/Progress/CategoryChart';
import getMinBarSize from '../../../../util/getMinBarSize';
import getEdgeIndices from '../../../../util/getEdgeIndices';
import renderer from 'react-test-renderer';

jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn().mockReturnValue({ width: 100, height: 100 }),
  },
  View: 'View',
}));

jest.mock('../../../../util/getMinBarSize');
jest.mock('../../../../util/getEdgeIndices');
jest.mock('../../../../styling/Colors', () => ({
  Colors: {
    categories: {
      0: 'red',
      1: 'blue',
    },
  },
}));

describe('CategoryChart', () => {
  beforeEach(() => {
    getMinBarSize.mockClear();
    getEdgeIndices.mockClear();
  });

  it('renders CategoryChart component', () => {
    getMinBarSize.mockReturnValueOnce([[], '']);
    getEdgeIndices.mockReturnValueOnce([0, 0]);
    const data = [];
    const component = renderer.create(<CategoryChart data={data} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders CategoryChart component with data', () => {
    const data = [
      { x: 'A', y: 10 },
      { x: 'B', y: 20 },
    ];
    const newData = [
      { x: 'A', y: 10, fill: 'red' },
      { x: 'B', y: 20, fill: 'blue' },
    ];
    getMinBarSize.mockReturnValueOnce([newData, 'y']);
    getEdgeIndices.mockReturnValueOnce([0, 1]);
    const component = renderer.create(<CategoryChart data={data} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
