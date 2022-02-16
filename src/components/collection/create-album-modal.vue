<template>
  <create-modal ref="modal" v-bind="$attrs" v-on="$listeners">
    <template #title>Create new album</template>

    <form action="" @submit.prevent="createAlbum">
      <div class="create-modal-body">
        <input
          type="text"
          v-focus
          v-model="albumName"
          class="create-input"
          placeholder="Album Name"
        />
      </div>
      <div class="create-modal-footer create-modal-buttons">
        <brand-button type="reset" variant="default" @click="hide">Cancel</brand-button>
        <brand-button :loading="isLoading" :disabled="!isValidAlbumName">Create</brand-button>
      </div>
    </form>
  </create-modal>
</template>

<script>
import CreateModal from 'components/ui/create-modal.vue';
import BrandButton from 'components/ui/brand-button.vue';
import { FetchUserAlbums } from 'mixins/fetch-user-albums.mixin';
import { sleep } from 'helpers/utils';

export default {
  name: 'create-album-modal',
  components: {
    CreateModal,
    BrandButton
  },
  data() {
    return {
      albumName: '',
      isLoading: false
    };
  },
  computed: {
    isValidAlbumName() {
      return this.albumName.length > 1;
    }
  },
  methods: {
    async createAlbum() {
      try {
        this.isLoading = true;
        const album = await this.$store.dispatch('collection/createAlbum', {
          title: this.albumName
        });
        await this.updateAlbumsSidebarIfNeeded();
        this.hide().then(() => this.navigateToAlbumWithDelay(album.id));
      } catch(error) {
        this.$notify(error.message || 'Something went wrong. Please try later again', 'error');
      } finally {
        this.isLoading = false;
      }
    },
    updateAlbumsSidebarIfNeeded() {
      if (this.$route.name === 'collection') {
        const albums = new FetchUserAlbums(this);
        return albums.fetchUnreleased({ clear: false });
      }
    },
    // We use delay for navigation to provide smooth UX
    async navigateToAlbumWithDelay(albumId) {
      await sleep(500);
      this.$router.push({
        name: 'collection',
        params: {
          id: albumId
        }
      });
    },
    async hide() {
      const modal = this.$refs.modal.getModal();
      await modal.hide();
      this.albumName = '';
    }
  }
}
</script>