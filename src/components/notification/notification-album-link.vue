<template>
  <span class="c-overlay-1">
    “<router-link :to="route">{{ album.title }}</router-link>”
  </span>
</template>

<script>
import { albumRoute } from 'helpers/routing';

export default {
  name: 'notification-album-link',
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  computed: {
    route() {
      return albumRoute(this.album);
    }
  }
}
</script>
