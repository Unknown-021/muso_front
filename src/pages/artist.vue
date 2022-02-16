<template>
  <div class="artist-page container">
    <profile-sticky-header :shown="stickyTabs.sticked" :profile="artist" />
    <page-background-image v-if="!isLoadingArtist" :src="artist.avatarUrl" />

    <div class="main-content">
      <breadcrumb />
      <artist-hero :artist="artist" :loading="isLoadingArtist" @info-show="stickyTabs.update" />
      <horizontal-line class="profile-hero-hr" />

      <sticky-tabs @change="stickyTabs.setValue">
        <base-tabs v-model="activeTab" class="artist-page__tabs">
          <base-tab-panel tab="Tracks" key="tracks">
            <profile-credits
              :data="credits.data"
              :loading="credits.isLoading"
              :pagination="credits.pagination"
              :associations="credits.roles"
              :credits-query.sync="credits.params"
              :fetch-data="fetchSongsCreditsWrap"
            >
              <template #title>{{ artist.creditCount }} Tracks</template>
              <template #zero-state>
                <div class="zero-state">
                  <img class="zero-state__img" src="images/zero-state/tracks.svg" width="100" height="100" />
                  <p class="zero-state__text">No Tracks On Muso.AI Yet</p>
                </div>
              </template>
            </profile-credits>
          </base-tab-panel>

          <base-tab-panel tab="Albums" key="albums">
            <albums-section
              :albums="albums.data"
              :pagination="albums.pagination"
              :loading="albums.isLoading"
              :fetch-data="fetchAlbumsWrap"
            />
          </base-tab-panel>

          <base-tab-panel tab="Collaborators" key="collaborators">
            <collaborators-section
              class="artist-page__collaborators"
              :collaborators="collaborators.data"
              :pagination="collaborators.pagination"
              :loading="collaborators.isLoading"
              :fetch-data="fetchCollaboratorsWrap"
            />
          </base-tab-panel>
        </base-tabs>
      </sticky-tabs>

      <mobile-footer v-if="isNeedToShowFooter" />
    </div>
  </div>
</template>

<script>
import SEO from "seo";
import Breadcrumb from "components/breadcrumb";
import ArtistHero from "components/artist/artist-hero.vue";
import MembersSection from "components/member/members-section.vue";
import AlbumsSection from 'components/collection/albums-section.vue';
import CollaboratorsSection from 'components/collaborator/collaborators-section.vue';
import ProfileCredits from "components/profile/profile-credits";
import PageBackgroundImage from "components/ui/page-background-image";
import BaseTabs, { BaseTabPanel } from "components/ui/base-tabs/base-tabs.vue";
import MobileFooter from "components/layouts/mobile-footer.vue";
import StickyTabs, { StickyTriggerController } from 'components/ui/sticky-tabs.vue';
import HorizontalLine from "components/ui/horizontal-line";
import { clientFetchData } from "mixins/client-fetch-data";
import { FetchAlbums } from 'mixins/fetch-albums.mixin';
import { FetchCollaborators } from 'mixins/fetch-collaborators.mixin';
import { FetchProfileCredits } from 'components/profile/profile-credits.mixin';
import ProfileStickyHeader from 'components/profile/profile-sticky-header';

export default {
  name: 'artist-page',
  mixins: [clientFetchData],
  components: {
    Breadcrumb,
    ArtistHero,
    AlbumsSection,
    ProfileCredits,
    CollaboratorsSection,
    MembersSection,
    BaseTabs,
    BaseTabPanel,
    StickyTabs,
    MobileFooter,
    ProfileStickyHeader,
    PageBackgroundImage,
    HorizontalLine,
  },
  metaInfo() {
    return {
      title: this.title,
      titleTemplate: "%s - Credits",
      meta: [
        { name: "description", content: this.description },
        { property: "og:description", content: this.description },
        { property: "og:url", content: `${this.$root.origin}${this.$route.fullPath }` },
        { property: "og:image", content: this.artistAvatar },
        { property: "al:ios:url", content: `${SEO.iosUrl}/?$deeplink_path=artist/${this.artistId}` },
        { property: "twitter:title", content: `${this.title} - Credits` },
        { property: "twitter:card", content: `${this.$root.origin}/${SEO.summaryImg}` },
        { property: "twitter:description", content: this.description },
        { property: "twitter:image", content: this.artistAvatar },
      ],
    };
  },
  props: {
    artistId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      activeTab: 'tracks',
      stickyTabs: new StickyTriggerController(this),
      isLoadingArtist: false,
      albums: new FetchAlbums(this),
      collaborators: new FetchCollaborators(this, 'artist'),
      credits: new FetchProfileCredits(this, 'artist')
    };
  },
  serverPrefetch() {
    return this.fetchData();
  },
  clientFetchData() {
    this.fetchData();
  },
  // created() {
  //   this.fetchData();
  // },
  watch: {
    artistId() {
      this.activeTab = 'tracks';
      this.fetchData();
    }
  },
  computed: {
    artist() {
      return this.$store.getters['artist/artistDetails'];
    },
    artistAvatar() {
      return this.artist?.avatarUrl;
    },
    title() {
      return this.artist?.name;
    },
    description() {
      return `View credits to ${this.title} on Muso.AI`;
    },
    // We want to show mobile footer only when all data have been loaded, otherwise it has negative impact on UX
    isNeedToShowFooter() {
      if (this.loading) {
        return false;
      }

      if (this.activeTab === 'tracks') {
        return this.credits.isNoMoreData;
      } if (this.activeTab === 'albums') {
        return this.albums.isNoMoreData;
      } else if (this.activeTab === 'collaborators') {
        return this.collaborators.isNoMoreData;
      }

      return true;
    },
    loading() {
      return this.isLoadingArtist || this.credits.isLoading || this.collaborators.isLoading  || this.albums.isLoading;
    }
  },
  methods: {
    fetchData(id = this.artistId) {
      this.$store.commit('artist/cleanDetails');
      return Promise.all([
        this.fetchDetails(id),
        this.fetchOtherData(id)
      ]);
    },
    async fetchDetails(id) {
      try {
        this.isLoadingArtist = true;
        await this.$store.dispatch('artist/getDetails', { id });
      } finally {
        this.isLoadingArtist = false;
      }
    },
    fetchOtherData(id) {
      this.albums.pagination.reset();
      this.collaborators.pagination.reset();
      this.credits.pagination.reset();

      return Promise.all([
        this.fetchAlbumsWrap(),
        this.fetchCollaboratorsWrap(),
        this.credits.fetchRelatedData(id),
      ]);
    },
    fetchAlbumsWrap() {
      return this.albums.fetchData(this.artistId);
    },
    fetchCollaboratorsWrap() {
      return this.collaborators.fetchData(this.artistId);
    },
    fetchSongsCreditsWrap() {
      return this.credits.fetchData(this.artistId);
    }
  }
};
</script>

<style lang="scss">
.artist-page {
  @media (min-width: 768px) {
    padding-bottom: 35px;
  }
  &__tabs {
    margin-top: 16px;
  }
  &__collaborators {
    @media (min-width: 768px) {
      margin-top: -8px;
    }
  }
}
</style>
