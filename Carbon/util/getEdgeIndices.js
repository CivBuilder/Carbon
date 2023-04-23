const getEdgeIndices = (data) => {
  const values = data.map(({ y }) => y);
  let firstIndex = 0;
  let lastIndex = values.length-1;
  let prevFirstIndex = -1;
  let prevLastIndex = -1;;

  while (firstIndex !== prevFirstIndex || lastIndex !== prevLastIndex) {
    prevFirstIndex = firstIndex;
    if (values[firstIndex] === 0) firstIndex++;
    prevLastIndex = lastIndex;
    if (values[lastIndex] === 0) lastIndex--;
  }

  return [firstIndex, lastIndex];
};

export default getEdgeIndices;