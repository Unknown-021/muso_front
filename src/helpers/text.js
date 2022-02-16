export function truncateStrToNearestWord(str, maxLength) {
  if (str.length === 0) return str;
  if (str.length <= maxLength) return str;

  const truncatedStr = str.slice(0, maxLength);
  const lastIndexOf = truncatedStr.lastIndexOf(' ');
  if (lastIndexOf === -1) {
    return truncatedStr;
  }
  if (lastIndexOf === truncatedStr.length - 1) {
    return truncatedStr.trim();
  }

  return truncatedStr.slice(0, lastIndexOf);
}

const tagRegExp = /<[^>]*>/g;
export function stripHtmlTags(str) {
  return str.replace(tagRegExp, '');
}

const snakeCaseReg = /_/g;
export function snakeToKebabCase(str) {
  return str.replace(snakeCaseReg, '-');
}

export function capitalizeWord(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camelToKebab(str) {
  return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
}