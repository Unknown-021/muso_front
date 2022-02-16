<template>
  <base-menu-item icon="lock" @click="finalizeAlbum" v-on="$listeners">
    Finalize Album
  </base-menu-item>
</template>

<script>
import { BaseMenuItem } from 'components/ui/base-menu/base-menu';

export default {
  name: 'finalize-album',
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
    finalizeAlbum() {
      console.log('finalize');
    }
  }
}
</script>