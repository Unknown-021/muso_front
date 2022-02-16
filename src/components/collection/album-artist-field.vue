<template>
  <artist-field type="primary-artist" :artists="album.primaryArtists" :artists-menu="artists">
    <template #zero>
      <plain-button>
        <plus-icon /> Add artist
      </plain-button>
    </template>
  </artist-field>
</template>

<script>
import ArtistField from 'components/artist/artist-field.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import PlusIcon from 'assets/images/icons/plus.svg';
import { unionByIds } from 'helpers/array';

export default {
  components: {
    ArtistField,
    PlainButton,
    PlusIcon
  },
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  computed: {
    profileArtists() {
      return this.$store.getters['user/artists'];
    },
    primaryArtistRole() {
      return this.$store.getters['artist/getRoleByTag']('primary-artist');
    },
    artists() {
      return unionByIds(this.album.primaryArtists, this.profileArtists)
        .map(artist => ({
          ...artist,
          associationId: this.isPrimaryArtist(artist) ? this.primaryArtistRole.id : null  
        }));
    },
    primaryArtistIds() {
      const ids = this.album.primaryArtists.map(item => item.id);
      return new Set(ids);
    }
  },
  methods: {
    isPrimaryArtist(artist) {
      return this.primaryArtistIds.has(artist.id);
    }
  }
}
</script>