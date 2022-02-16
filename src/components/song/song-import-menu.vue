<template>
  <search-menu
    v-model="songName"
    :list="list"
    :loading="isLoading"
    placeholder="Search by name..."
    @item-select="selectItem"
  >
    <template #search-placeholder>Search for a song</template>

    <template #item="{ item, focused }">
      <article class="litem song-item">
        <span class="litem__number">{{ item.trackNum }}</span> {{ item.title }}
        <span v-if="focused" class="litem__after">
          <import-icon />
        </span>
      </article>
    </template>
  </search-menu>
</template>

<script>
import SearchMenu from 'components/ui/search-menu.vue';
import ImportIcon from 'assets/images/icons/import.svg';
import { createNumbersSorter } from 'helpers/sorters';

export default {
  name: 'song-import-menu',
  components: {
    SearchMenu,
    ImportIcon
  },
  props: {
    albumId: {
      type: Number,
      required: true
    },
    filter: {
      type: Function,
      default: () => true
    }
  },
  data() {
    return {
      songName: '',
      isLoading: false,
      songsIds: []
    };
  },
  mounted() {
    this.getImportableSongs();
  },
  computed: {
    songs() {
      const albumSongs = this.$store.getters['collection/albumSongs'](this.albumId);
      return this.songsIds
        .map(songId => albumSongs.find(song => song.id === songId))
        .sort(createNumbersSorter('trackNum'));
    },
    list() {
      return [{
        id: 'songs',
        title: 'Import collaborators from track',
        items: this.filteredSongs,
        // TODO: Move this logic to search menu component
        empty: !this.isLoading ? 'There are no tracks to import collaborators from' : undefined
      }];
    },
    filteredSongs() {
      const songs = this.songs.filter(this.filter);
      const query = this.songName.toLowerCase();
      return query
        ? songs.filter(song => song.title.toLowerCase().includes(query))
        : songs;
    },
    primaryArtistRole() {
      return this.$store.getters['artist/getRoleByTag']('primary-artist');
    }
  },
  methods: {
    async getImportableSongs() {
      try {
        this.isLoading = true;
        const response = await this.$store.http.get(`/album/${this.albumId}/songs/import`);
        this.songsIds = response.data.songsIds;
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async selectItem(song) {
      try {
        this.isLoading = true;
        const collaborators = await this.$store.dispatch('song/credits/getCollaborators', { id: song.id });
        this.$emit('collaborators-import', {
          collaborators: collaborators.filter(this.notPrimaryArtist),
          song
        });
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    notPrimaryArtist(profile) {
      return profile.roles.every(role => role.id !== this.primaryArtistRole.id);
    }
  }
}
</script>

<style lang="scss">
</style>