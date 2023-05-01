import getMinBarSize from '../../util/getMinBarSize';

describe('getMinBarSize', () => {
  it('should calculate the minimum bar size correctly', () => {
    const data = [
      { x: 1, y: 5 },
      { x: 2, y: 10 },
      { x: 3, y: 15 },
    ];
    const [newData, newYKey] = getMinBarSize(data);
    expect(newYKey).toEqual('minY');
    expect(newData).toHaveLength(3);
    expect(newData[0]).toHaveProperty('minY');
    expect(newData[0].minY).toEqual(5);
    expect(newData[1].minY).toEqual(10);
    expect(newData[2].minY).toEqual(15);
  });

  it('should use maxBarRatio if the ratio is greater than maxBarRatio', () => {
    const data = [
      { x: 1, y: 50 },
      { x: 2, y: 100 },
      { x: 3, y: 150 },
    ];
    const [newData, newYKey] = getMinBarSize(data);
    expect(newYKey).toEqual('minY');
    expect(newData).toHaveLength(3);
    expect(newData[0]).toHaveProperty('minY');
    expect(newData[0].minY).toEqual(50 / 35);
    expect(newData[1].minY).toEqual(100 / 35);
    expect(newData[2].minY).toEqual(150 / 35);
  });
});
