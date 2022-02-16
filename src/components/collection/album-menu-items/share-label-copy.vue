<template>
  <base-menu-item icon="arrow-turn-right" @click="shareLabelCopy" v-on="$listeners">
    Share Label Copy
  </base-menu-item>
</template>

<script>
import { copyToClipboard } from 'helpers/dom';
import { BaseMenuItem } from 'components/ui/base-menu/base-menu';

export default {
  name: 'share-label-copy',
  components: {
    BaseMenuItem
  },
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  methods: {
    shareLabelCopy() {
      try {
        const { route } = this.$router.resolve({
          name: 'project',
          params: {
            id: this.album.id
          }
        });
        copyToClipboard(this.$root.origin + route.fullPath);
        this.$notify('Link copied. Now, you can share it');
      } catch (error) {
        this.$notify(error.message, 'error');
      }
    }
  }
}
</script>