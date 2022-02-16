export function drawLinearPath(points) {
  return points.map((point, index) => {
    return index === 0
      ? `M${getSvgPoint(point)}`
      : `L${getSvgPoint(point)}`
  }).join(',');
}

function getSvgPoint({ x, y }) {
  return `${x} ${y}`;
}