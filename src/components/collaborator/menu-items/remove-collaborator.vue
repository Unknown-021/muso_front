<template>
  <remove-collaborator-option @click="confirmCollaboratorRemove" v-on="$listeners">
    <slot />
  </remove-collaborator-option>
</template>

<script>
import RemoveCollaboratorOption from './remove-collaborator-option.vue';

export default {
  name: 'remove-collaborator',
  components: {
    RemoveCollaboratorOption
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    album: {
      type: Object,
      required: true
    },
    songIds: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    confirmCollaboratorRemove() {
      this.$confirm({
        title: 'Remove profile credits',
        body: `Are you sure you want to remove profile from "${this.album.title}" album?`,
        okButton: {
          text: 'Remove',
          props: {
            variant: 'danger'
          },
          handler: this.removeCollaborator
        }
      });
    },
    async removeCollaborator() {
      try {
        const payload = {
          albumId: this.album.id,
          collaboratorIds: [this.profile.id],
          songIds: this.songIds
        };
        await this.$store.dispatch('collection/credits/deleteCollaborators', payload);
      } catch (error) {
        this.$handleError(error);
      }
    }
  }
}
</script>