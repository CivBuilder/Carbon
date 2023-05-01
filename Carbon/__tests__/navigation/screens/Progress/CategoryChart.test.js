import React from 'react';
import { render } from '@testing-library/react-native';
import CategoryChart from '../../../../navigation/screens/Progress/CategoryChart';

describe('CategoryChart', () => {
  test('renders the component with data', () => {
    const data = [
      { name: 'Category 1', value: 10 },
      { name: 'Category 2', value: 20 },
      { name: 'Category 3', value: 30 },
    ];

    const { getByTestId } = render(<CategoryChart data={data} />);
    const component = getByTestId('category-chart');

    expect(component).toBeDefined();
  });

  test('renders the component without data', () => {
    const { getByTestId } = render(<CategoryChart />);
    const component = getByTestId('category-chart');

    expect(component).toBeDefined();
  });

  test('renders the component with edge categories', () => {
    const data = [
      { name: 'Category 1', value: 10 },
      { name: 'Category 2', value: 20 },
      { name: 'Category 3', value: 30 },
    ];

    const { getByTestId } = render(<CategoryChart data={data} />);
    const component = getByTestId('category-chart');

    expect(component.props.children[0].props.children[0].props.cornerRadius).toEqual({ top: 0, bottom: 7 });
    expect(component.props.children[0].props.children[2].props.cornerRadius).toEqual({ top: 7, bottom: 0 });
  });

  test('renders the component with non-edge categories', () => {
    const data = [
      { name: 'Category 1', value: 10 },
      { name: 'Category 2', value: 20 },
      { name: 'Category 3', value: 30 },
    ];

    const { getByTestId } = render(<CategoryChart data={data} />);
    const component = getByTestId('category-chart');

    expect(component.props.children[0].props.children[1].props.cornerRadius).toEqual({ top: 0, bottom: 0 });
  });

  test('renders the component with correct bar width', () => {
    const data = [
      { name: 'Category 1', value: 10 },
      { name: 'Category 2', value: 20 },
      { name: 'Category 3', value: 30 },
    ];

    const { getByTestId } = render(<CategoryChart data={data} />);
    const component = getByTestId('category-chart');

    expect(component.props.children[0].props.children[0].props.barWidth).toEqual(28);
  });

  test('renders the component with correct y value', () => {
    const data = [
      { name: 'Category 1', value: 10 },
      { name: 'Category 2', value: 20 },
      { name: 'Category 3', value: 30 },
    ];

    const { getByTestId } = render(<CategoryChart data={data} />);
    const component = getByTestId('category-chart');

    expect(component.props.children[0].props.children[0].props.y({ y: 10, newValue: 20 })).toEqual(20);
    expect(component.props.children[0].props.children[0].props.y({ y: 0, newValue: 20 })).toEqual(0);
  });

  test('renders the component with correct style', () => {
    const data = [
      { name: 'Category 1', value: 10 },
      { name: 'Category 2', value: 20 },
      { name: 'Category 3', value: 30 },
    ];

    const { getByTestId } = render(<CategoryChart data={data} />);
    const component = getByTestId('category-chart');

    expect(component.props.children[0].props.children[0].props.style).toEqual({ data: { fill: '#2F80ED' } });
    expect(component.props.children[0].props.children[1].props.style).toEqual({ data: { fill: '#56CCF2' } });
    expect(component.props.children[0].props.children[2].props.style).toEqual({ data: { fill: '#27AE60' } });
  });

  test('renders the component with correct categories', () => {
    const data = [
      { name: 'Category 1', value: 10 },
      { name: 'Category 2', value: 20 },
      { name: 'Category 3', value: 30 },
    ];

    const { getByTestId } = render(<CategoryChart data={data} />);
    const component = getByTestId('category-chart');

    expect(component.props.children.length).toEqual(1);
    expect(component.props.children[0].type).toEqual(VictoryStack);
    expect(component.props.children[0].props.children.length).toEqual(3);
    expect(component.props.children[0].props.children[0].type).toEqual(VictoryBar);
    expect(component.props.children[0].props.children[1].type).toEqual(VictoryBar);
    expect(component.props.children[0].props.children[2].type).toEqual(VictoryBar);
    expect(component.props.children[0].props.children[0].props.data).toEqual([{ y: 10, fill: '#2F80ED', x: 'dummy' }]);
    expect(component.props.children[0].props.children[1].props.data).toEqual([{ y: 20, fill: '#56CCF2', x: 'dummy' }]);
    expect(component.props.children[0].props.children[2].props.data).toEqual([{ y: 30, fill: '#27AE60', x: 'dummy' }]);
  });

  test('renders the component with no data', () => {
    const { getByTestId } = render(<CategoryChart />);
    const component = getByTestId('category-chart');

    expect(component.props.children.length).toEqual(1);
    expect(component.props.children[0].type).toEqual(VictoryStack);
    expect(component.props.children[0].props.children.length).toEqual(0);
  });
});