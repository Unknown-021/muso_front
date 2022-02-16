<template>
  <base-menu class="sort-dropdown">
    <p class="dropdown__title">Sort</p>
    <template v-for="sorter in sorters">
      <div :key="sorter.key" class="form-group">
        <form-select
          :value="sorter.key"
          :options="columnsOptions"
          searchable
          @change="setSorterKey(sorter, $event)"
        >
          <template v-slot="{ option }">
            <form-option :option="option" :disabled="isColumnSelected(option)" />
          </template>
        </form-select>
        <form-select
          :value="sorter.order"
          :options="sortDirections"
          @change="setSorterOrder(sorter, $event)"
        />
      </div>
    </template>
  </base-menu>
</template>

<script>
import BaseMenu from 'components/ui/base-menu/base-menu';
import FormSelect, { FormOption } from 'components/ui/form-select.vue';

const sortDirections = [{
  value: 'ASC',
  title: 'Ascending'
}, {
  value: 'DESC',
  title: 'Descending'
}];

export default {
  name: 'sort-dropdown',
  components: {
    BaseMenu,
    FormSelect,
    FormOption
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    sorters: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortDirections: () => sortDirections,
    columnsOptions() {
      return this.columns
        .filter(item => item.sorter)
        .map(item => ({
          value: item.sortKey,
          title: item.title
        }));
    }
  },
  methods: {
    setSorterKey(sorter, value) {
      this.setSorter(sorter, 'key', value);
    },
    setSorterOrder(sorter, value) {
      this.setSorter(sorter, 'order', value);
    },
    setSorter(sorter, key, value) {
      const indexOf = this.sorters.indexOf(sorter);
      const sorters = this.sorters.slice();
      sorters[indexOf] = {
        ...sorter,
        [key]: value
      };

      this.$emit('update:sorters', sorters);
    },
    isColumnSelected(col) {
      return this.sorters.some(item => item.key === col.value);
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";

.form-group {
  display: flex;
  margin-right: -10px;
  > * {
    margin-right: 10px;
  }
  + .form-group {
    margin-top: 10px;
  }
}
.dropdown,
.sort-dropdown {
  padding: 20px;
  min-width: 382px;
  &__title {
    margin-bottom: 15px;
    line-height: 1.4;
    font-weight: 600;
  }
  &__add-btn {
    margin-top: 20px;
  }
}

.sort-dropdown {
  @media #{$before-tablet} {
    display: none;
  }
  &__col {
    width: 0;
    flex-grow: 0.42;
  }
  &__dir {
    width: 0;
    flex-grow: 0.58;
  }
}
</style>