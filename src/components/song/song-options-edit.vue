<template>
  <options-button v-bind="$attrs" v-on="$listeners">
    <template #dropdown="props">
      <base-menu>
        <base-menu-item v-if="song.isCollaborator" icon="user-times" danger @click="confirmCreditsRemove">
          Remove My Credits
        </base-menu-item>
        <base-menu-item v-if="!isPublished" icon="bin" danger @click="confirmSongRemove">
          Remove Track
        </base-menu-item>
      </base-menu>
    </template>
  </options-button>
</template>

<script>
import OptionsButton from 'components/ui/options-button.vue';
import BaseMenu, { BaseMenuItem } from 'components/ui/base-menu/base-menu.vue';

export default {
  name: 'song-options',
  components: {
    BaseMenu,
    BaseMenuItem,
    OptionsButton
  },
  props: {
    song: {
      type: Object,
      required: true
    },
    beforeRemove: {
      type: Function,
      default: undefined
    }
  },
  computed: {
    album() {
      return this.$store.getters['collection/collectionDetails'];
    },
    isPublished() {
      return Boolean(this.song.releaseDate);
    },
    canShowOptions() {
      return this.song.isCollaborator || !this.isPublished;
    },
    currentUser() {
      return this.$store.getters['user/data'];
    }
  },
  methods: {
    confirmCreditsRemove() {
      this.$confirm({
        title: 'Remove credits',
        body: `Are you sure want to remove your credits for "${this.song.title}" track?`,
        okButton: {
          text: 'Remove',
          props: {
            variant: 'danger'
          },
          handler: this.removeCredits
        }
      });
    },
    async removeCredits() {
      try {
        const payload = {
          albumId: this.album.id,
          songIds: [this.song.id],
          collaboratorIds: [this.currentUser.id]
        };
        await this.$store.dispatch('collection/credits/deleteCollaborators', payload);
        this.$emit('credits-remove');
      } catch(error) {
        this.$handleError(error);
      }
    },
    confirmSongRemove() {
      this.$confirm({
        title: 'Remove song',
        body: `Are you sure want to remove "${this.song.title}" track?`,
        okButton: {
          text: 'Remove',
          props: {
            variant: 'danger'
          },
          handler: this.removeSong
        }
      });
    },
    async removeSong() {
      try {
        const updateStore = await this.$store.dispatch('song/deleteSong', {
          songId: this.song.id,
          albumId: this.album.id
        });

        Promise.resolve()
          .then(this.beforeRemove || this.navigateToAlbumPageIfNeeded)
          .then(updateStore)
      } catch (error) {
        this.$handleError(error);
      }
    },
    navigateToAlbumPageIfNeeded() {
      if (this.$route.name === 'song') {
        return this.$router.push({
          name: 'collection',
          params: {
            id: this.album.id
          }
        });
      }
    }
  }
};
</script>