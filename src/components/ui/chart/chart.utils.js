export function getCurrPointIndex(x, extremePoints) {
  const { start, startIndex, end, endIndex } = extremePoints;
  const deltaX = x - start.x;
  const pointsDeltaX = end.x - start.x;

  return deltaX > pointsDeltaX / 2
    ? endIndex
    : startIndex;
}

export function getExtremePoints(x, points) {
  const safeX = Math.max(x, 1);
  const endIndex = points.findIndex(p => p.x >= safeX);
  const end = points[endIndex];
  const startIndex = endIndex - 1;
  const start = points[startIndex];

  return {
    start,
    startIndex,
    end,
    endIndex
  };
}
