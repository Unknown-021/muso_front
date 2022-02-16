<template>
  <img class="album-cover" :class="{'small-avatar-cover': !smallAvatar}" :src="src"  />
</template>

<script>
export default {
  name: 'album-cover',
  props: {
    album: {
      type: [Object, String],
      default: () => {}
    }
  },
  computed: {
    src() {
      return this.album?.avatarUrl || this.album || 'images/default-avatars/collection-default_noframe.svg';
    },
    smallAvatar() {
      return (this.album?.avatarUrl || this.album);
    }
  }
}
</script>

<style lang="scss">
:root {
  --album-cover-size: unset;
  --album-cover-background-color: transparent;
}
.album-cover {
  flex-shrink: 0;
  width: var(--album-cover-size);
  min-width: 31px;
  height: var(--album-cover-size);
  min-height: 31px;
  object-fit: cover;
  background-color: var(--album-cover-background-color);
}
.small-avatar-cover {
  width: 20px;
  height: 20px;
}
</style>
