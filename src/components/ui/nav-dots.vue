<template>
  <div class="nav-dots">
    <template v-for="(item, index) in count">
      <button
        :key="item"
        class="nav-dots__dot"
        :data-active="index === activeIndex"
        @click="setActive(index)"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'nav-dots',
  props: {
    count: {
      type: Number,
      required: true
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    setActive(value) {
      this.$emit('change', value);
    }
  }
}
</script>

<style lang="scss">
.nav-dots {
  margin-top: 25px;
  display: flex;
  &__dot {
    margin: 0 8px;
    padding: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: none;
    background-color: var(--overlay-3-color);
    cursor: pointer;
    &[data-active] {
      background-color: var(--overlay-1-color);
    }
  }
}
</style>