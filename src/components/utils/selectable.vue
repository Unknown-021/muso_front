<script>
import { removeArrayElement } from 'helpers/array';
import { identity as empty } from 'helpers/utils';
import baseLogoRoundVue from '../ui/base-logo-round/base-logo-round.vue';

export default {
  name: 'selectable',
  provide() {
    return {
      selectable: this
    };
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    selected: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    selected() {
      this.$emit('item-selected', this.selectedItems[0]);
    }
  },
  render() {
    const content = this.$scopedSlots.default
      ? this.$scopedSlots.default(this)
      : null;
    return content;
  },
  computed: {
    isAllSelected() {

      if (this.data.length === this.selected.length && this.data.length > 1) {
          this.setSelected([]);
      }

      return (
        this.data.length === this.selected.length ||
        this.selected.length === 0 && this.data.length > 1
      );
    },
    selectedItems() {
      return this.selected.map(id => {
        return this.data.find(item => item.id === id);
      })
      .filter(empty);
    },
    nonSelectedItems() {
      return this.data.filter(item => !this.isSelected(item));
    },
    sortedData() {
      return [
        ...this.selectedItems,
        ...this.nonSelectedItems
      ];
    },
    selectedSet() {
      return new Set(this.selected);
    }
  },
  methods: {
    toggleAll() {
      this.setSelected([]);
    },
    select(item) {
      const selected = [];

      if (item.id !== this.selected[0]) {
        selected.push(item.id)
        this.setSelected(selected);
      } else {
        selected.pop()
        this.setSelected(selected);
      }
    },
    toggle(item) {
      const selected = this.selected.slice();
      const itemId = item.id;
      const removedEl = removeArrayElement(selected, itemId);

      if (!removedEl) {
        selected.push(itemId);
      }
      this.setSelected(selected);
    },
    setSelected(value) {
      this.$emit('update:selected', value);
    },
    isSelected(item) {
      return this.selectedSet.has(item.id);
    }
  }
};
</script>
