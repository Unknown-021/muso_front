<template>
  <base-menu-item icon="user-times" danger @click="confirmCreditsRemove" v-on="$listeners">
    Remove Credits
  </base-menu-item>
</template>

<script>
import { BaseMenuItem } from 'components/ui/base-menu/base-menu';

export default {
  name: 'remove-credits',
  components: {
    BaseMenuItem
  },
  props: {
    profileId: {
      type: Number,
      required: true
    },
    album: {
      type: Object,
      required: true
    }
  },
  methods: {
    confirmCreditsRemove() {
      const confirm = this.$confirm({
        title: 'Remove Yourself From Album',
        body: `Are you sure you want to remove yourself from “${this.album.title}”?`,
        okButton: {
          text: 'Remove',
          props: {
            variant: 'danger'
          },
          handler: () => this.removeCredits(confirm)
        }
      });
    },
    async removeCredits(confirmModal) {
      try {
        const payload = {
          albumId: this.album.id,
          collaboratorIds: [this.profileId]
        };
        await this.$store.dispatch('collection/credits/deleteCollaborators', payload);
        this.$store.commit('user/albums/deleteAlbum', this.album.id);
      } catch (error) {
        confirmModal.hide();
        this.$handleError(error);
        throw error;
      }
    }
  }
}
</script>