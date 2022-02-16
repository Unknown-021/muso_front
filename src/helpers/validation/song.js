const lengthRegx = /^\d{1,2}:\d{2}$/;

export function validLength(value) {
  if (!value) return true;
  return lengthRegx.test(value);
}
