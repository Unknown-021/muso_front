<template>
  <profile-list-item
    :item="artist"
    :navigable="false"
    type="artist"
    class="artist-menu-item"
    :loading="isLoading"
    :removeable="role && isHovered"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="toggleRowAndClose"
  >
    <template v-if="role" #after>
      <span class="artist-role">{{ role.association }}</span>
    </template>
  </profile-list-item>
</template>

<script>
import ProfileListItem from 'components/ui/profile/list-item';

export default {
  name: 'artist-menu-item',
  components: {
    ProfileListItem
  },
  inject: {
    artistField: {
      type: Object,
      required: true
    }
  },
  props: {
    artist: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isHovered: false,
      isLoading: false
    };
  },
  computed: {
    role() {
      return this.$store.getters['artist/getRole'](this.artist.associationId);
    },
    primaryArtistRole() {
      return this.$store.getters['artist/getRoleByTag']('primary-artist');
    },
    songIds() {
      return this.artistField.songIds;
    },
    album() {
      return this.$store.getters['collection/collectionDetails'];
    }
  },
  methods: {
    async toggleRowAndClose() {
      await this.toggleRole();
      this.$emit('close');
    },
    async toggleRole() {
      try {
        this.isLoading = true;

        const payload = {
          albumId: this.album.id,
          collaboratorIds: [this.artist.id],
          songIds: this.songIds
        };
        if (this.role) {
          await this.$store.dispatch('collection/credits/deleteCollaborators', payload);
        } else {
          await this.$store.dispatch('collection/credits/addCollaborators', {
            ...payload,
            associationIds: [this.primaryArtistRole.id]
          });
        }
        this.updateUserAlbums();
      } catch (error) {
        this.$notify(error.message || 'Something went wrong. Please, try again later.', 'error');
      } finally {
        this.isLoading = false;
      }
    },
    updateUserAlbums() {
      const { id, primaryArtists } = this.$store.getters['collection/collectionDetails'];
      const performer = primaryArtists
        .map(item => item.fullName)
        .join('/');
      this.$store.commit('user/albums/updateAlbum', { id, performer });
    }
  }
}
</script>
