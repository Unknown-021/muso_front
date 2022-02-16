const anatomyToClass = {
  'master-avatar': 'col-avatar',
  'master-index': 'col-index',
  'master-reorder': 'col-reo',
  'master-checkbox': 'col-check',
  'auto' : 'auto', 
  'master': 'col-master ellipsis',
  'default': 'col-def',
  'options': 'col-opt'
};

export function getColumnClass(column) {
  const className = [column.class, anatomyToClass[column.anatomy]];
  return className.filter(item => item);
}

export function getColumnsHasClasses(columns) {
  return columns
    .filter(isMasterColumn)
    .map(col => `has-${anatomyToClass[col.anatomy]}`);
}

function isMasterColumn({ anatomy = ''}) {
  return anatomy.startsWith('master-');
}

export function isMasterTable(columns) {
  return columns.some(col => col.anatomy === 'master');
}
