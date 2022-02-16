import { canApplyCalc } from 'helpers/css';
import { identity as empty } from 'helpers/utils';

const mapColumnToSize = {
  'credits-icon' : 'var(--col-small-avatar)',
  'master-avatar': 'var(--col-avatar)',
  'master-reorder': 'var(--col-reo)',
  'master-checkbox': 'var(--col-check)',
  'master-index': 'var(--col-index)',
  'master': '1fr',
  'default': 'var(--col-default)',
  'auto': 'auto',
  'options': 'var(--col-opt)'
};

export function getColumnSizes(columns) {
  return columns
    .map(col => mapColumnToSize[col.anatomy])
    .filter(empty);
}

export function shiftSizesWidth(sizes, widthShifts) {
  return sizes.map((width, index) => {
    const shift = widthShifts[index];
    if (shift && canApplyCalc(width)) {
      return `calc(${width} + ${shift}px)`;
    }
    return width;
  });
}
