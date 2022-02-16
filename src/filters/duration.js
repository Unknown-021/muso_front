export default (value, symbol = '-') => {
  if (!value) {
    return symbol;
  }
  let val = (value > 10000) ? Math.floor(value / 1000) : value;

  let minutes = Math.floor(val / 60);
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  let seconds = val % 60;
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return `${minutes}:${seconds}`;
}
