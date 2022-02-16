<template>
  <div
    :data-editable-hovered="isHovered"
    v-on="$listeners"
    @mouseenter="enableHover"
    @mouseleave="disableHover"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'editable-parent',
  data() {
    return {
      isHovered: false
    };
  },
  methods: {
    enableHover() {
      this.isHovered = true;
    },
    disableHover() {
      this.isHovered = false;
    }
  }
}
</script>