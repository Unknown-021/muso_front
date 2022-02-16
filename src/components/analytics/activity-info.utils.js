import { compileText as compile } from 'components/ui/interpolated-text';

export function compileText(map) {
  const res = {};

  for (let key in map) {
    const value = map[key];
    res[key] = {
      ...value,
      text: compile(value.text),
      fullText: value.fullText ? compile(value.fullText) : undefined
    };
  }
  
  return res;
};
