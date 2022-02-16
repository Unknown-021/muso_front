<template>
  <component :is="component" class="plain-link" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "plain-link",
  props: {
    component: {
      type: String,
      default: "a",
    },
  },
};
</script>

<style lang="scss">
.plain-link {
  display: inline-block;
  -webkit-appearance: none;
  border: none;
  border-bottom: 1px solid #36B696;
  padding: 0;
  color: #F7F7F7;
  background-color: transparent;
  text-decoration: none;
  &:hover {
    border-bottom-color: transparent;
    // TODO: remove styles which force us to use !important down here
    text-decoration: none !important;
  }
}
</style>