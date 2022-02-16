<template>
  <div>
    <router-link :to="albumRoute">
      {{discography.title}}
    </router-link>
    <artists-enumeration class="info-cell-text" :artists="discography.artists" />
  </div>
</template>

<script>
import ArtistsEnumeration from 'components/artist/artists-enumeration';
import { albumGroupingRoute } from 'helpers/routing';

export default {
  name: 'table-cell-discography-grouping',
  components: {
    ArtistsEnumeration
  },
  props: {
    discography: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      require: true
    }
  },
  computed: {
    demoProfileId() {
      return this.$route.params.id;
    },
    albumRoute() {
      return albumGroupingRoute(this.discography, this.demoProfileId)
    }
  }
}
</script>
