<template>
  <base-menu-item icon="bin" danger @click="confirmAlbumRemove" v-on="$listeners">
    Delete Album
  </base-menu-item>
</template>

<script>
import { BaseMenuItem } from 'components/ui/base-menu/base-menu';

const albumsRoute = { name: 'albums' };

export default {
  name: 'remove-album',
  components: {
    BaseMenuItem
  },
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  methods: {
    confirmAlbumRemove() {
      this.$confirm({
        title: 'Delete Album',
        body: `Are you sure you want to delete your album “${this.album.title}”?`,
        okButton: {
          text: 'Delete',
          props: {
            variant: 'danger'
          },
          handler: this.removeAlbum
        }
      });
    },
    async removeAlbum() {
      try {
        await this.$store.dispatch('collection/deleteAlbum', {
          beforeUpdateStore: this.navigateToAlbumsPageIfNeeded,
          albumId: this.album.id
        });
      } catch (error) {
        this.$handleError(error);
      }
    },
    navigateToAlbumsPageIfNeeded() {
      if (this.$route.name !== albumsRoute.name) {
        return this.$router.push(albumsRoute);
      }
    }
  }
}
</script>