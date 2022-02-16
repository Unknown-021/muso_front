<template>
  <div class="container album-page">
    <album-sticky-header :shown="stickyTabs.sticked" :collection="album" />
    <page-background-image v-if="!loading && album.avatarUrl" :src="album.avatarUrl" />

    <div class="main-content">
      <top-panel>
        <breadcrumb class="top-panel__breadcrumb" />

        <template v-if="album && !isGuest" #controls>
          <album-settings-button :album="album" class="top-panel__options" />
        </template>
      </top-panel>

      <base-hero :loading="loadingAlbum" @info-show="stickyTabs.update">
        <template #skeleton>
          <album-hero-skeleton />
        </template>
        <component :is="heroComponent" :collection="album" />
      </base-hero>
      <horizontal-line class="album-page__hero-hr" />

      <sticky-tabs @change="stickyTabs.setValue">
        <base-tabs class="album-page__tabs">
          <base-tab-panel tab="Track list" key="songs">
            <album-songs
              class="album-page__songs"
              :loading="loadingSongs || loadingAlbum"
              :songs="songs"
            />
          </base-tab-panel>

          <base-tab-panel tab="Credits" key="credits">
            <credits-section
              class="album-page__credits"
              type="album"
              :loading="loadingCreditsSection"
            />
          </base-tab-panel>
        </base-tabs>
      </sticky-tabs>
    </div>

    <mobile-footer v-if="isGuest" />
  </div>
</template>

<script>
import SEO from 'seo';
import Breadcrumb from 'components/breadcrumb';
import BaseHero from 'components/ui/base-hero/base-hero';
import AlbumHero from 'components/collection/album-hero';
import AlbumHeroEdit from 'components/collection/album-hero-edit';
import AlbumHeroSkeleton from 'components/collection/album-hero-skeleton';
import AlbumSongs from 'components/collection/album-songs';
import CreditsSection from 'components/ui/credits/credits-section';
import HorizontalLine from 'components/ui/horizontal-line';
import PageBackgroundImage from 'components/ui/page-background-image';
import { clientFetchData } from 'mixins/client-fetch-data';
import BaseTabs, { BaseTabPanel } from 'components/ui/base-tabs/base-tabs.vue';
import StickyTabs, { StickyTriggerController } from 'components/ui/sticky-tabs.vue';
import MobileFooter from 'components/layouts/mobile-footer.vue';
import AlbumStickyHeader from 'components/collection/album-sticky-header';
import TopPanel from 'components/layouts/top-panel.vue';
import AlbumSettingsButton from 'components/collection/album-settings-button.vue';

export default {
  name: 'album-page',
  mixins: [clientFetchData],
  components: {
    AlbumStickyHeader,
    Breadcrumb,
    BaseHero,
    AlbumSongs,
    CreditsSection,
    PageBackgroundImage,
    HorizontalLine,
    BaseTabs,
    StickyTabs,
    MobileFooter,
    BaseTabPanel,
    TopPanel,
    AlbumSettingsButton,
    AlbumHeroSkeleton
  },
  metaInfo() {
    return {
      title: this.title,
      titleTemplate: "%s - Credits",
      meta: [
        { name: "description", content: this.description },
        { property: "og:description", content: this.description },
        { property: "og:url", content: `${this.$root.origin}${this.$route.fullPath }` },
        { property: "og:image", content: this.album.avatarUrl },
        { property: "al:ios:url", content: `${SEO.iosUrl}/?$deeplink_path=collection/${this.albumId}` },
        { property: "twitter:title", content: `${this.title} - Credits` },
        { property: "twitter:card", content: `${this.$root.origin}/${SEO.summaryImg}` },
        { property: "twitter:description", content: this.description },
        { property: "twitter:image", content: this.album.avatarUrl },
      ],
    };
  },
  props: {
    albumId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      stickyTabs: new StickyTriggerController(this),
      isChecked: [],
      loadingAlbum: false,
      loadingSongs: false,
      loadingCredits: false
    }
  },
  serverPrefetch() {
    return this.fetchData();
  },
  clientFetchData() {
    this.fetchData();
  },
  watch: {
    albumId() {
      this.fetchData();
    }
  },
  computed: {
    album() {
      return this.$store.getters['collection/collectionDetails'];
    },
    songs() {
      return this.$store.getters['collection/albumSongs'](this.albumId);
    },
    loading() {
      return this.loadingAlbum || this.loadingSongs || this.loadingCredits;
    },
    loadingCreditsSection() {
      return this.loadingCredits || this.loadingSongs;
    },
    title() {
      return this.album.title;
    },
    description() {
      return `View credits to ${this.title} on Muso.AI`;
    },
    isGuest() {
      return !this.album.isCollaborator && !this.album.isAdmin;
    },
    heroComponent() {
      if (this.album.isCollaborator || this.album.isAdmin) {
        return AlbumHeroEdit;
      }

      return AlbumHero;
    }
  },
  methods: {
    async fetchData(id = this.albumId) {
      try {
        await Promise.all([
          this.fetchAlbum(id),
          this.fetchSongs(id),
          this.fetchCredits(id)
        ]);
      } catch(error) {
        if (error) {
          if (error.code === 404) {
            this.$router.replace({ name: 'not-found' });
          } else if (!this.$isServer) {
            this.$notify('Something went wrong. Please, try later', 'error');
          }
        }

        throw error;
      }
    },
    async fetchAlbum(id) {
      try {
        this.loadingAlbum = true;
        await this.$store.dispatch('collection/getDetails', { id });
      } finally {
        this.loadingAlbum = false;
      }
    },
    async fetchSongs(id) {
      try {
        this.loadingSongs = true;
        await this.$store.dispatch('collection/getSongs', { id });
      } finally {
        this.loadingSongs = false;
      }
    },
    async fetchCredits(id) {
      try {
        this.loadingCredits = true;
        await this.$store.dispatch('collection/credits/getCredits', { id });
      } finally {
        this.loadingCredits = false;
      }
    }
  }
};
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";

.album-page {
  position: relative;
  @media (min-width: 768px) {
    padding-bottom: 35px;
  }
  &__hero-hr {
    margin-top: 22px;
    margin-bottom: 24px;
    @media #{$tablet} {
      display: none;
    }
  }
  &__tabs {
    margin-top: 20px;
  }
  &__credits {
    --credits-card-top: 42px;
    @media (min-width: 768px) {
      --credits-card-top: calc(var(--sticky-header-height) - 1px);
    }
  }
}
</style>