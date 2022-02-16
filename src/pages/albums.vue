<template>
  <user-albums-layout class="p-my-albums">
    <template #title>My albums</template>

    <template #top-panel>
      <user-albums-search v-model="searchQuery" @input="debouncedSearch" />
      <base-plain-button class="p-my-albums__create-album" @click="openAlbumModal">
        <plus-icon /> New Album
      </base-plain-button>
    </template>

    <template #content>
      <transition name="fade-fast" mode="out-in">
        <albums-grid
          v-if="displayAlbumsGrid"
          :albums="albums.data"
          :pagination="albums.pagination"
          :loading="albums.isLoading"
          :fetch-data="fetchAlbums"
          show-artist
        >
          <template #album-dropdown="{ album }">
            <base-menu>
              <album-menu-item action="share-label-copy" :album="album" />
              <album-menu-item v-if="!album.releaseDate" action="finalize-album" :album="album" />
              <album-menu-item v-if="album.canRemoveMyself" action="remove-credits" :album="album" :profile-id="currentUser.id" />
              <album-menu-item v-if="album.canDelete" action="remove-album" :album="album" />
            </base-menu>
          </template>

          <template #empty>
            <div class="p-my-albums__empty empty">
              <img class="empty__img" src="images/zero-state/sad-smile.svg" width="96" height="96" />
              <p class="empty__text">Oops, no results found.</p>
            </div>
          </template>
        </albums-grid>

        <div v-else class="zero-static p-my-albums__zero-state">
          <img class="zero-static__img" src="images/zero-state/half-circle.svg" width="100" height="100" />
          <p class="zero-static__text">No albums are on Muso.AI yet. Create one!</p>
          <brand-button class="zero-static__button" @click="openAlbumModal">
            Create an Album
          </brand-button>
        </div>
      </transition>
    </template>
  </user-albums-layout>
</template>

<script>
import PlainLink from 'components/ui/plain-link.vue';
import Breadcrumb from 'components/breadcrumb';
import BasePlainButton from '../components/ui/base-plain-button/base-plain-button.vue';
import AlbumsGrid from 'components/collection/albums-grid.vue';
import UserAlbumsSearch, { ALBUMS_SEARCH_QUERY } from 'components/user/user-albums-search.vue';
import BaseMenu, { BaseMenuItem } from 'components/ui/base-menu/base-menu.vue';
import PlusIcon from 'assets/images/icons/plus.svg';
import BrandButton from 'components/ui/brand-button.vue';
import UserAlbumsLayout from 'components/user/user-albums-layout.vue';
import AlbumsSideNav, { ARTIST_ID_KEY, ALBUM_TYPE_KEY } from 'components/collection/albums-side-nav.vue';
import AlbumMenuItem from 'components/collection/album-menu-item.vue';
import { clientFetchData } from "mixins/client-fetch-data";
import { FetchUserAlbums } from 'mixins/fetch-user-albums.mixin';
import { debounce } from 'helpers/utils';

export default {
  name: 'albums-page',
  mixins: [clientFetchData],
  components: {
    UserAlbumsLayout,
    Breadcrumb,
    PlainLink,
    BasePlainButton,
    AlbumsGrid,
    UserAlbumsSearch,
    AlbumsSideNav,
    BaseMenu,
    BaseMenuItem,
    PlusIcon,
    BrandButton,
    AlbumMenuItem
  },
  data() {
    return {
      searchQuery: this.query(ALBUMS_SEARCH_QUERY) || '',
      isSearchingQuery: false,
      albums: new FetchUserAlbums(this)
    };
  },
  serverPrefetch() {
    return this.fetchAlbums();
  },
  clientFetchData() {
    this.fetchAlbums();
  },
  watch: {
    searchQuery() {
      this.isSearchingQuery = true;
      this.albums.pagination.reset();
    },
    artistId() {
      this.freshAlbumsSearch();
    },
    albumType() {
      this.freshAlbumsSearch();
    }
  },
  computed: {
    displayAlbumsGrid() {
      const values = [this.albums.data.length, this.albums.isLoading, this.searchQuery, this.isSearchingQuery];
      return values.some(item => item);
    },
    artistId() {
      return Number(this.$route.query[ARTIST_ID_KEY]) || null;
    },
    albumType() {
      return this.$route.query[ALBUM_TYPE_KEY] || 'unreleased';
    },
    currentUser() {
      return this.$store.getters['user/data'];
    },
    debouncedSearch() {
      return debounce(this.fetchAlbums, 500);
    }
  },
  methods: {
    query(queryKey) {
      return this.$route.query[queryKey];
    },
    freshAlbumsSearch() {
      this.albums.pagination.reset();
      return this.fetchAlbums();
    },
    fetchAlbums() {
      return this.albums.fetchData({
        query: this.searchQuery || undefined,
        isPublished: this.artistId ? undefined : this.albumType === 'released',
        artistId: this.artistId
      })
        .then(() => this.isSearchingQuery = false);
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push({ name: 'login' });
    },
    openAlbumModal() {
      this.$modal.open({
        name: 'create-album'
      });
    }
  }
}
</script>

<style lang="scss">
.p-my-albums {
  &__breadcrumb[class] {
    margin-bottom: 9px;
  }
  &__filters {
    flex-grow: 1;
    margin-right: -30px;
    margin-left: -10px;
    padding-top: 15px;
    padding-bottom: 30px;
    padding-left: 10px;
    padding-right: 20px;
    height: 0;
    overflow: auto;
  }
  &__create-album {
    margin-left: auto;
  }
  &__zero-state,
  &__empty {
    flex-grow: 1;
    justify-content: center;
    max-height: 550px;
  }
  &__zero-state {
    margin-top: auto;
    margin-bottom: auto;
  }
}
</style>