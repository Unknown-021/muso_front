<template>
  <div class="container song-page">
    <page-background-image v-if="!loading && song.avatarUrl" :src="song.avatarUrl" />

    <breadcrumb />
    <base-hero class="song-page__hero-wrap" :loading="loadingSong">
      <template #skeleton>
        <song-hero-skeleton />
      </template>
      <song-hero :song="song" />
    </base-hero>
    <horizontal-line class="thick-12 song-page__hr" />

    <credits-section
      class="song-page__credits"
      type="song"
      :loading="loadingCredits"
    />

    <mobile-footer />
  </div>
</template>

<script>
import SEO from "seo";
import Breadcrumb from "components/breadcrumb";
import SongHero from "components/song/song-hero.vue";
import PageBackgroundImage from "components/ui/page-background-image";
import CreditsSection from "components/ui/credits/credits-section";
import HorizontalLine from "components/ui/horizontal-line";
import MobileFooter from "components/layouts/mobile-footer.vue";
import { clientFetchData } from "mixins/client-fetch-data";
import BaseHero from 'components/ui/base-hero/base-hero';
import SongHeroSkeleton from 'components/song/song-hero-skeleton';

export default {
  name: 'song-page',
  mixins: [clientFetchData],
  components: {
    Breadcrumb,
    HorizontalLine,
    MobileFooter,
    PageBackgroundImage,
    CreditsSection,
    BaseHero,
    SongHero,
    SongHeroSkeleton
  },
  metaInfo() {
    return {
      title: this.title,
      titleTemplate: "%s - Credits",
      meta: [
        { name: "description", content: this.description },
        { property: "og:description", content: this.description },
        { property: "og:url", content: `${this.$root.origin}${this.$route.fullPath }` },
        { property: "og:image", content: this.avatarUrl },
        { property: "al:ios:url", content: SEO.iosUrl },
        { property: "twitter:title", content: `${this.title} - Credits` },
        { property: "twitter:card", content: `${this.$root.origin}/${SEO.summaryImg}` },
        { property: "twitter:description", content: this.description },
        { property: "twitter:image", content: this.avatarUrl },
      ],
    };
  },
  props: {
    songId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loadingSong: false,
      loadingCredits: false
    };
  },
  computed: {
    song() {
      return this.$store.getters['song/songDetails'];
    },
    title() {
      return this.song?.title;
    },
    avatarUrl() {
      return this.song?.avatarUrl;
    },
    description() {
      return `View credits to ${this.title} on Muso.AI`;
    },
    loading() {
      return this.loadingSong || this.loadingCredits;
    }
  },
  serverPrefetch() {
    return this.fetchData(this.songId);
  },
  clientFetchData() {
    return this.fetchData(this.songId);
  },
  methods: {
    fetchData(id = this.songId) {
      return Promise.all([
        this.fetchSong(id),
        this.fetchCredits(id)
      ]);
    },
    async fetchSong(id) {
      this.loadingSong = true;

      try {
        await this.$store.dispatch("song/getSongDetails", { id });
      } finally {
        this.loadingSong = false;
      }
    },
    async fetchCredits(id) {
      this.loadingCredits = true;
      try {
        await this.$store.dispatch('song/credits/getCredits', { id });
      } finally {
        this.loadingCredits = false;
      }
    }
  },
  watch: {
    songId() {
      this.fetchData();
    },
  },
};
</script>

<style lang="scss">
.song-page {
  padding-bottom: 35px;
  @media (max-width: 767px) {
    padding-top: 13px;
  }
  &__hero-wrap {
    // this class uses nagative value for margin-buttom property. It doesn't work with <fade-height-transition /> component.
    // When we set "height" property to hero-wrapi, negative margin stops working.
    .details-container {
      margin-bottom: 0;
    }
  }
  &__hr {
    // Take a look on the comment above.
    --margin-top: 14px;
    margin-top: calc(var(--margin-top) - var(--details-row-gap));
    margin-bottom: 20px;
    background: var(--base-2-color);
    @media (min-width: 768px) {
      --margin-top: 30px;
      margin-bottom: 22px;
    }
  }
}
</style>
