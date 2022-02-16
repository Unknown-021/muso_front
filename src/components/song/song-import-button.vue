<template>
  <dropdown-trigger v-model="isMenuOpen" v-bind="triggerProps">
    <plain-button variant="light">
      <import-icon class="btn-icon btn-icon--tall" width="20" /> Import Collaborators
    </plain-button>
    <template #dropdown="slots">
      <song-import-menu
        :album-id="song.collection.id"
        :filter="notCurrentSong"
        @collaborators-import="importCollaborators"
      />
    </template>
  </dropdown-trigger>
</template>

<script>
import SongImportMenu from 'components/song/song-import-menu.vue';
import DropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import ImportIcon from 'assets/images/icons/import.svg';

export default {
  name: 'song-import-button',
  components: {
    DropdownTrigger,
    SongImportMenu,
    PlainButton,
    ImportIcon
  },
  props: {
    song: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isMenuOpen: false
    };
  },
  computed: {
    triggerProps() {
      return {
        placement: 'bottom-end',
        offset: [0, 5]
      };
    }
  },
  methods: {
    importCollaborators(payload) {
      this.isMenuOpen = false;
      this.$emit('collaborators-import', payload);
    },
    notCurrentSong(song) {
      return song.id !== this.song.id;
    }
  }
}
</script>