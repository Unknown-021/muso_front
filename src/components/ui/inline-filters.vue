<template>
  <div class="ifilters no-scrollbar">
    <check-button :selected="isAllSelected" @click="selectAll">
      All
    </check-button>

    <template v-for="item in items">
      <check-button
        :key="item.value"
        :value="item.value"
        :selected="selected"
        @change="setSelected"
      >
        <template v-if="item.logo">
          <base-logo-round class="check-btn__img" :name="item.logo" width="16px" height="16px" sizes="16px" />
        </template>
        {{ item.title }}
      </check-button>
    </template>
  </div>
</template>

<script>
import CheckButton from 'components/ui/check-button.vue';
import BaseLogoRound from 'components/ui/base-logo-round/base-logo-round.vue';

export default {
  name: 'inline-filters',
  components: {
    CheckButton,
    BaseLogoRound
  },
  props: {
    selected: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    isAllSelected() {
      return (
        this.items.length === this.selected.length ||
        !this.selected.length
      );
    }
  },
  methods: {
    selectAll() {
      if (!this.isAllSelected) {
        this.setSelected([]);
      }
    },
    setSelected(value) {
      this.$emit('update:selected', value);
    }
  }
};
</script>

<style lang="scss">
.ifilters {
  display: flex;
  --gap-size: 8px;
  @media (max-width: 767px) {
    margin-left: -15px;
    margin-right: -15px;
    overflow: scroll;
  }
  @media (min-width: 768px) {
    --gap-size: 5px;
    flex-wrap: wrap;
    margin-right: calc(var(--gap-size) * -1);
    margin-bottom: calc(var(--gap-size) * -1);
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
    margin-right: var(--gap-size);
    @media (min-width: 768px) {
      margin-bottom: var(--gap-size);
    }
    &:last-child {
      @media (max-width: 767px) {
        margin-right: 0;
      }
    }
  }
}
</style>
