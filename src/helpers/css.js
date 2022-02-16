const frUnitRegExp = /^\d+fr$/;

export function canApplyCalc(width) {
  if (width.match(frUnitRegExp)) {
    return false;
  }
  if (width === 'auto') {
    return false;
  }
  return true;
}
