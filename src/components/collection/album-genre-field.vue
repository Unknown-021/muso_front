<template>
  <genre-field :source="album" :save="saveGenres">
    <template #zero>
      <plain-button>
        <plus-icon /> Add genre
      </plain-button>
    </template>
  </genre-field>
</template>

<script>
import GenreField from 'components/genre/genre-field.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import PlusIcon from 'assets/images/icons/plus.svg';

export default {
  name: 'album-genre-field',
  components: {
    GenreField,
    PlainButton,
    PlusIcon
  },
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  methods: {
    async saveGenres({ genres }) {
      await this.$store.dispatch('collection/updateInfo', {
        albumId: this.album.id,
        genres
      });
    }
  }
}
</script>