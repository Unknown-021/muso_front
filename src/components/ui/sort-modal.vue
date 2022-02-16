<template>
  <base-modal :mobile-sliding="true" class="sort-modal" ref="modal" v-bind="$attrs" v-on="$listeners">
    <h2 class="modal-title">Sorty by</h2>

    <div class="modal-body">
      <div class="modal-list">
        <template v-for="col in columns">
          <div :key="col.key" class="modal-list__item" v-touch @click="selectSorter(col)">
            <span class="modal-list__icon">
              <base-icon v-if="col.sortIcon" :name="col.sortIcon" />
            </span>
            {{ col.title }}
            <img class="sort-modal__check-icon" :src="getIconUrl(col)" />
          </div>
        </template>
      </div>

      <base-modal-cancel-button />
    </div>
  </base-modal>
</template>

<script>
import BaseModal, { BaseModalCancelButton } from 'components/ui/base-modal/base-modal.vue';
import { touch } from 'directives/touch';
import { DEFAULT_SORT_DIRECTIONS } from 'helpers/constants';
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

export default {
  name: "sort-modal",
  directives: {
    touch
  },
  components: {
    BaseModal,
    BaseIcon,
    BaseModalCancelButton
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    sorting: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      activeSorting: {
        key: undefined,
        order: undefined
      }
    };
  },
  watch: {
    sorting: {
      immediate: true,
      handler(value) {
        if (value) {
          this.activeSorting = value;
        }
      }
    }
  },
  methods: {
    getIconUrl(col) {
      return col.sortKey === this.activeSorting.key
        ? 'images/icons/check-active-2.svg'
        : 'images/icons/check-passive-2.svg';
    },
    isSorterActive(column) {
      return column.sortKey === this.activeSorting.key;
    },
    selectSorter(column) {
      this.activeSorting = {
        key: column.sortKey,
        order: this.getNextSortingOrder(column)
      };

      this.$emit('change', this.activeSorting);
      this.hideWithDelay();
    },
    getNextSortingOrder(column) {
      const sortDirections = column.sortDirections || DEFAULT_SORT_DIRECTIONS;
      const activeColumnOrder = this.activeSorting.key === column.sortKey
        ? this.activeSorting.order
        : 'NONE';

      return activeColumnOrder === 'NONE' ? sortDirections[0] : 'NONE';
    },
    hideWithDelay() {
      setTimeout(() => {
        this.$refs.modal.hide();
      }, 150);
    }
  }
};
</script>

<style lang="scss">
.sort-modal {
  &__check-icon {
    margin-left: auto;
    &--active {
      fill: #6BE7C8;
    }
  }
}
</style>
