export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function min(data, prop) {
  const values = data.map(item => item[prop]);
  return Math.min(...values);
}

export function max(data, prop) {
  const values = data.map(item => item[prop]);
  return Math.max(...values);
}

// Fixes JavaScript floating point issues
// Example: precisionRound(44.940000000000005, 2) => 44.94
export function precisionRound(number, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
