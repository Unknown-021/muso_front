<template>
  <remove-admin-option @click="confirmAdminRemove" />
</template>

<script>
import RemoveAdminOption from './remove-admin-option.vue';

export default {
  name: 'remove-admin',
  components: {
    RemoveAdminOption
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    album: {
      type: Object,
      required: true
    }
  },
  methods: {
    confirmAdminRemove() {
      this.$confirm({
        title: 'Remove admin',
        body: `Are you sure you want to remove admin “${this.profile.fullName}”?`,
        okButton: {
          text: 'Remove',
          props: {
            variant: 'danger'
          },
          handler: this.removeAdmin
        }
      });
    },
    async removeAdmin() {
      try {
        await this.$store.dispatch('collection/removeAdmin', {
          id: this.album.id,
          profileId: this.profile.id
        });
      } catch (error) {
        this.$handleError(error);
      }
    }
  }
}
</script>