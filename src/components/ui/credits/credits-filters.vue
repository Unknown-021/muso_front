<template>
  <div class="credits-filters no-scrollbar">
    <check-button v-if="parentAssociations.length > 1" :selected="isAllSelected" @click="selectAll">
      All
    </check-button>

    <check-button
      v-for="association in parentAssociations"
      :key="association.id"
      :value="association.id"
      v-model="selectedFilters"
      @change="selectFilter"
    >
      {{ association.name }}
    </check-button>
  </div>
</template>

<script>
import CheckButton from 'components/ui/check-button.vue';

export default {
  name: 'credits-filters',
  model: {
    prop: 'selected',
    event: 'change'
  },
  components: {
    CheckButton
  },
  props: {
    selected: {
      type: Array,
      required: true,
    },
    parentAssociations: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedFilters: []
    };
  },
  watch: {
    selected: {
      immediate: true,
      handler(selected) {
        if (selected === this.selectedFilters) return;
        if (selected.length === 0 && this.isAllSelected) return;

        this.selectedFilters = selected.slice();
      }
    }
  },
  computed: {
    isAllSelected() {
      return (
        this.selectedFilters.length === 0 ||
        this.selectedFilters.length === this.parentAssociations.length
      );
    }
  },
  methods: {
    selectAll() {
      if (!this.isAllSelected) {
        this.select([]);
      }
    },
    selectFilter(selectedFilters) {
      this.select(selectedFilters)
    },
    select(value) {
      this.$emit('change', value);
    }
  },
};
</script>

<style lang="scss">
.credits-filters {
  display: flex;
  --cf-gap-size: 8px;
  @media (max-width: 767px) {
    margin-left: -15px;
    margin-right: -15px;
    overflow: scroll;
  }
  @media (min-width: 768px) {
    --cf-gap-size: 5px;
    flex-wrap: wrap;
    margin-right: calc(var(--cf-gap-size) * -1);
    margin-bottom: calc(var(--cf-gap-size) * -1);
  }
  &::after,
  &::before {
    @media(max-width: 767px) {
      content: "";
      width: 15px;
      flex-shrink: 0;
    }
  }
  > * {
    margin-right: var(--cf-gap-size);
    @media (min-width: 768px) {
      margin-bottom: var(--cf-gap-size);
    }
    &:last-child {
      @media (max-width: 767px) {
        margin-right: 0;
      }
    }
  }
}
</style>
