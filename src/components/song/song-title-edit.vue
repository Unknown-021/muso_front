<template>
  <editable-content
    :value="song.title"
    :save="saveTitle"
    :enabled="!isPublished"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import EditableContent from 'components/ui/editable-content';

export default {
  name: 'song-title-edit',
  components: {
    EditableContent
  },
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  computed: {
    isPublished() {
      return Boolean(this.song.releaseDate);
    }
  },
  methods: {
    async saveTitle(title) {
      try {
        await this.$store.dispatch('song/updateInfo', {
          songId: this.song.id,
          title: title  
        });
      } catch (error) {
        this.$handleError(error);
        throw error;
      }
    }
  }
};
</script>