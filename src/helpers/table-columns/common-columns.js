import { TableCell } from 'components/ui/table-cell/table-cell';

export const rowIndex = {
  title: '#',
  key: 'index',
  anatomy: 'master-index',
  component: TableCell.PlainCell,
  componentProps: (item, index) => ({
    value: index + 1
  })
};

export const optionsHidden = {
  key: 'options',
  title: '',
  anatomy: 'options',
  skeletonClass: 'hidden'
};
