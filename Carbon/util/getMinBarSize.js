/* Calculates minimum bar size for categories when rendering the overall category chart on the progress screen */

const getMinBarSize = (data) => {
  const newYKey = "minY";
  const maxBarRatio = 35;
  const values = data.map(({ y }) => y);
  const maxValue = Math.max(...values);

  const newData = data.map(d => {
    const isHigherRatio = Math.round(maxValue/d.y) > maxBarRatio;

    return {
      ...d,
      [newYKey]: isHigherRatio ? Math.round(maxValue / maxBarRatio) : d.y,
    }
  });

  return [newData, newYKey];
};

export default getMinBarSize;