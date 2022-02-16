import * as cols from './common-columns';
import * as albumCols from './album-columns';
import * as profileCols from './profile-columns';
import * as creditCols from './credit-columns';
import * as statsCols from './stats-columns';

export {
  cols,
  albumCols,
  profileCols,
  creditCols,
  statsCols
};

export function columns(columns) {
  return {
    add(column) {
      columns.push(column);
      return this;
    },
    addIf(condition, columnA, columnB) {
      if (condition) {
        this.add(columnA);
      } else if (columnB) {
        this.add(columnB);
      }

      return this;
    },
    value() {
      return columns;
    }
  };
}
