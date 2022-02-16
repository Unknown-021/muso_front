export default (url, symbol = 'No Website') => {
  if (!url) {
      return symbol;
  }
  return url.replace(/(^\w+:|^)\/\//, '');
}
