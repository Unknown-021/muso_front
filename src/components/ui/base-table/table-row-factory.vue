<script>
import { getColumnClass } from './table-column.utils';
import { isParentElementInteractive } from 'helpers/dom';

export default {
  name: 'table-row-factory',
  props: {
    hoverable: {
      type: Boolean,
      default: true
    },
    getColumnContent: {
      type: Function,
      required: true
    },
    processing: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    tableComponent: {
      type: Object,
      required: true
    }
  },
  render(h) {
    return (
      <tr class={this.className} role="row" attrs={this.$attrs} on={this.listeners}>
        {this.tableComponent.columns.map(this.getItem)}
      </tr>
    );
  },
  computed: {
    className() {
      return {
        'tr': true,
        'tr--hov': this.hoverable,
        'tr--loading': this.processing
      };
    },
    listeners() {
      return {
        ...this.$listeners,
        click: this.handleClick
      };
    }
  },
  methods: {
    getItem(column) {
      const content = this.getColumnContent(column);
      return <td role="cell" staticClass="td" class={getColumnClass(column)}>{ content }</td>;
    },
    handleClick(event) {
      if (!isParentElementInteractive(event.target)) {
        this.$emit('click', event);
      }
    }
  }
}
</script>

<style lang="scss">
.tr {
  position: relative;
  margin-bottom: -1px;
  min-height: var(--tr-min-height);
  --hover-color: var(--tr-hover-background-color, var(--tr-main-color));
  --border-color: var(--tr-border-color, var(--tr-main-color));
  &--hov {
    cursor: pointer;
    &:hover,
    &[data-active] {
      background-color: var(--hover-color);
      z-index: 10;
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: var(--tr-hover-offset);
      background-color: var(--hover-color);
      opacity: 0;
    }
    &[data-active]::before,
    &[data-active]::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: var(--tr-hover-offset);
      background-color: var(--hover-color);
      opacity: 1;
    }
    &::before {
      right: 100%;
    }
    &::after {
      left: 100%;
    }
    &:hover::before,
    &:hover::after {
      opacity: 1;
    }
  }

  &:last-child::after {
    // display: none;
  }

  &--skel {
    pointer-events: none;
  }
}
.tr--loading {
  opacity: 50%;
  pointer-events:none;
}
.td {
  position: relative;
  font-size: 14px;
  color: #f2f2f2;
  transition: background-color 100ms ease-in-out;
  &:first-child {
    position: static;
    display: flex;
    align-items: center;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: var(--tr-border-left-indent);
      right: 0;
      @at-root {
        tbody .tr:last-child & {
          display: none;
        }
      }
    }
  }
}
</style>
