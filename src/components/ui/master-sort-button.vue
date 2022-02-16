<template>
  <div class="sort-btn-wrap">
    <dropdown-trigger
      :disabled="isMobile"
      :visible="isOpen"
      :offset="[0, 5]"
      placement="bottom-end"
      @auto-hide="close"
    >
      <master-button class="mobile-none">Sort</master-button>

      <template #dropdown="props">
        <sort-dropdown
          :columns="columns"
          :sorters="sorters"
          @update:sorters="setSorters"
        />
      </template>
    </dropdown-trigger>

    <ghost-icon-button class="mobile-only" icon="sort-amount-down" @click="open" />
    <sort-modal
      v-if="isMobile"
      :show.sync="isOpen"
      :sorting="sorters[0]"
      :columns="columns"
      @change="setModalSorter"
    />
  </div>
</template>

<script>
import DropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import SortModal from 'components/ui/sort-modal.vue';
import SortDropdown from './sort-dropdown.vue';
import MasterButton from './master-button.vue';
import GhostIconButton from './ghost-icon-button.vue';

export default {
  name: 'sort-button',
  components: {
    DropdownTrigger,
    SortModal,
    SortDropdown,
    GhostIconButton,
    MasterButton
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
  data() {
    return {
      isMobile: false,
      isOpen: false
    };
  },
  mounted() {
    this.$syncMediaWithComponent(this.$mediaQueries.PHONE, 'isMobile');
  },
  methods: {
    setSorters(value) {
      this.$emit('update:sorters', value);
    },
    setModalSorter(value) {
      this.setSorters([value]);
    },
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    }
  }
}
</script>

<style lang="scss">
.sort-btn-wrap {
  display: inline-flex;
}

.sort-btn {
  position: relative;
  border: none;
  border-radius: 0;
  padding: 0;
  width: 22px;
  height: 22px;
  background-image: url("images/icons/sort.svg");
  background-size: 24px auto;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
  }
}
</style>
