export function validateColumnsProp(value) {
  return value.every(column => {
    let errorMessage = null;
    if (column.title === undefined) {
      errorMessage = '"title" property is required in column definition';
    }
    if (!column.key) {
      errorMessage = '"key" property is required in column definition';
    }
    if (column.field && column.componentProps) {
      errorMessage = '"field" and "componentProps" fields cannot present in column definition at the same time';
    }
    if (column.sorter && typeof column.sortKey !== 'string') {
      errorMessage = '"sortKey" property is required in column definition when "sorter" property defined';
    }

    if (errorMessage) {
      console.info(column);
      throw TypeError(errorMessage);
    }

    return true;
  })
}
