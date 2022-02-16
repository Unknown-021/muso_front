<template>
  <action-modal
    ref="modal"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <h2 class="action-modal-title action-modal-title--small">Add track</h2>
    <form @submit.prevent="createSong">
      <div class="action-modal-body">
        <form-input v-focus.nested type="text" placeholder="Track name" v-model="songTitle" />
      </div>
      <div class="create-song-modal-footer action-modal-footer">
        <brand-button :loading="isLoading" :disabled="!isFormValid">Create</brand-button>
      </div>
    </form>
  </action-modal>
</template>

<script>
import FormInput from "components/ui/form-input";
import ActionModal from 'components/ui/base-action-modal/base-action-modal.vue';
import BrandButton from 'components/ui/brand-button.vue';

export default {
  name: 'create-song-modal',
  components: {
    FormInput,
    ActionModal,
    BrandButton
  },
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      songTitle: '',
      isLoading: false
    };
  },
  computed: {
    isFormValid() {
      return this.songTitle.length > 1;
    }
  },
  methods: {
    async createSong() {
      try {
        this.isLoading = true;
        // TOOD: Ask backend developer to return song object, so we don't need to add
        // redundant request to referesh albums songs data
        await this.$store.dispatch('song/createSong', {
          albumId: this.album.id,
          title: this.songTitle,
          trackNum: this.album.trackCount + 1
        });
        await this.$store.dispatch('collection/getSongs', {
          id: this.album.id,
          cache: false
        });
        this.hide();
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    hide() {
      return this.getModal().hide(); 
    },
    getModal() {
      return this.$refs.modal.getModal();
    }
  }
}
</script>

<style lang="scss">
.create-song-modal-footer {
  margin-top: 10px;
}
</style>
