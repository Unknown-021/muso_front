<script>
export default {
  name: 'columns-grid',
  render() {
    const items = this.$slots.default;
    const columns = getColumns(this.columnCount, items);

    return (
      <div class="columns-grid">
        {columns.map(col => (
          <div class="grid-col">
            {col}
          </div>
        ))}
      </div>
    );
  },
  props: {
    columnCount: {
      type: Number,
      default: 1
    }
  }
}

function getColumns(columnCount, items) {
  const cols = new Array(columnCount).fill().map(() => []);

  for (let i = 0; i < items.length; ++i) {
    const colIndex = i % columnCount;
    cols[colIndex].push(items[i]);
  }

  return cols;
}
</script>

<style lang="scss">
.columns-grid {
  display: flex;
  --columns-grid-row-gap: 10px;
  --columns-grid-column-gap: 10px;
  margin-right: calc(-1 * var(--columns-grid-column-gap));
  margin-bottom: calc(-1 * var(--columns-grid-row-gap));
}
.grid-col {
  margin-right: var(--columns-grid-column-gap);
  width: 0;
  flex-grow: 1;
  > * {
    margin-bottom: var(--columns-grid-row-gap);
  }
}
</style>