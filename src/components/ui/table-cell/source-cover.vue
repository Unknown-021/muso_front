<template functional>
  <img
    class="source-cover-cell"
    :src="$options.iconPath(props.iconType, props.isPending)"
    width="24"
    height="24"
  />
</template>

<script>

export default {
  functional: true,
  name: 'source-cover',
  props: {
    iconType: {
      type: String,
      required: true
    },
    isPending: {
      type: Boolean,
      default: false
    }
  },
  iconPath(iconType, isPending) {
    if (isPending && iconType === 'youtube') {
      return '/images/icons/link.svg'
    } else {
      const normalizedIconType = iconType.replace(/_/gi, '-')
      return `/images/logos-round/${normalizedIconType}.png`
    }
  },
};
</script>

<style lang="scss">
.source-cover-cell {
  display: block;
}
</style>
