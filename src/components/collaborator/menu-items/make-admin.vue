<template>
  <make-admin-option :loading="isLoading" @click="makeAdmin" v-on="$listeners" />
</template>

<script>
import MakeAdminOption from './make-admin-option.vue';

export default {
  name: 'remove-admin',
  components: {
    MakeAdminOption
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
  inject: {
    dropdownTrigger: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    handler() {
      return this.makeAdmin();
    },
    async makeAdmin() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('collection/addAdmin', {
          id: this.album.id,
          profile: this.profile
        });
        this.$notify(`${this.profile.fullName} has become an admin`, 'info');
        this.dropdownTrigger.close();
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>